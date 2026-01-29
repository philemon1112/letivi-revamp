"use client";
import { Button } from "@/components/atoms/Button";
import Share from "@/components/molecules/Share";
import UploadProfileImage from "@/components/molecules/UploadProfileImage";
import SocialHandles from "@/components/molecules/SocialHandles";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountryNameById } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { getMessages } from "@/services/messages";
import { useFollow } from "@/hooks/useUserFollow";

function UserStatistics({
  userData,
  isShared,
}: {
  userData: any | null;
  isShared: boolean;
}) {
  const fetchedUser = useCurrentUser();
  const currentUser = userData?.data || fetchedUser;
  const router = useRouter();
  const defaultImg = "/assets/Img/default.png";
  const isPrivate = currentUser?.private;
  const [share, setShare] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);

  const {
    isFollowing,
    followersCount,
    isLoading: isFollowLoading,
    handleFollowToggle,
  } = useFollow({
    userId: userData?.data?.id.toString(),
    initialFollowState: userData?.data?.is_followed || false,
    initialFollowersCount: userData?.data?.total_followers || 0,
  });

  const stats = [
    { label: "Books", value: currentUser?.total_books },
    { label: "Film", value: currentUser?.total_films },
    { label: "Article", value: currentUser?.total_articles },
    { label: "Photos", value: currentUser?.total_photography },
    { label: "Exhibition", value: currentUser?.total_exhibition },
    { label: "Others", value: currentUser?.total_other },
  ].filter((stat) => stat?.value > 0);

  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getMessages({ limit: 100 }),
    select: (response) => {
      return response?.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const handleStartMessage = () => {
    // Navigate to messages page with the contact data as URL parameters

    const existingContact = contacts.find((contact) => {
      const otherUserId =
        contact.sender?.id === fetchedUser?.id
          ? contact.recipient?.id
          : contact.sender?.id;
      return otherUserId?.toString() === fetchedUser.id.toString();
    });

    if (existingContact) {
      // Fixed: Use & instead of second ?
      router.push(`/messages?startChat=false&contactId=${existingContact.id}`);
      return;
    }
    const params = new URLSearchParams({
      startChat: "true",
      userId: currentUser.id.toString(),
      userName: `${currentUser.first_name} ${currentUser.last_name}`,
      userPicture: currentUser.profile?.picture || "",
      userEmail: currentUser.email || "",
      to: currentUser.email,
    });
    router.push(`/messages?${params.toString()}`);
  };
  return (
    <div>
      <div className="bg-white shadow rounded-[20px] mx-1.5 py-8 px-3">
        <div className="group relative mb-2 block h-60 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
          <img
            src={
              currentUser?.profile?.picture
                ? getApiMedia(currentUser?.profile?.picture)
                : defaultImg
            }
            alt="profile_image"
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
          {!isShared && (
            <div
              onClick={() => {
                setOpenImageModal(!openImageModal);
              }}
              className="absolute right-3 top-2 h-10 w-10 cursor-pointer"
            >
              <img src="/assets/Svg/Profile/edit.svg" alt="" />
            </div>
          )}
        </div>

        <div className="">
          <div className="">
            <h2 className="text-lg font-bold text-center mt-4">
              {currentUser?.first_name} {currentUser?.last_name}
            </h2>
            <p className="text-gray-400 text-center">
              {currentUser?.profession?.profession || ""} |
              <span className="ml-1">
                {currentUser?.profile?.country?.length === 2
                  ? getCountryNameById(
                      currentUser?.profile.country?.toLowerCase()
                    )
                  : currentUser?.profile?.country}
              </span>
            </p>
            <div className="mt-5 justify-center flex items-center  gap-4">
              <div className="flex gap-2">
                <h1>Photo</h1>
                {currentUser?.id === fetchedUser?.id ? (
                  <span className="text-2xl font-bold -mt-[3px]">
                    {(currentUser?.total_public_post_images ?? 0) +
                      (currentUser?.total_private_post_images ?? 0)}
                  </span>
                ) : (
                  <span className="text-2xl font-bold -mt-[3px]">
                    {currentUser?.total_public_post_images ?? 0}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <h1>Video</h1>
                {currentUser?.id === fetchedUser?.id ? (
                  <span className="text-2xl font-bold -mt-[3px]">
                    {(currentUser?.total_public_post_videos ?? 0) +
                      (currentUser?.total_private_post_videos ?? 0)}
                  </span>
                ) : (
                  <span className="text-2xl font-bold -mt-[3px]">
                    {currentUser?.total_public_post_videos ?? 0}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {currentUser?.total_followers || 0}
                </h1>
                <p className="text-gray-400 text-xs"> followers</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {currentUser?.total_followings || 0}
                </h1>
                <p className="text-gray-400 text-xs"> following</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {currentUser?.total_posts || 0}
                </h1>
                <p className="text-gray-400 text-xs"> Posts</p>
              </div>
            </div>
            <div className="flex mt-5 items-center justify-center">
              {fetchedUser && fetchedUser?.id !== currentUser?.id && (
                <Button
                  variant={isFollowing ? "tertiary" : "primary"}
                  outlined
                  size="base"
                  onClick={handleFollowToggle}
                  disabled={isFollowLoading}
                  loading={isFollowLoading}
                >
                  {isFollowLoading
                    ? isFollowing
                      ? "Unfollowing..."
                      : "Following..."
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>
            <div className="mt-3 justify-center  mx-auto flex items-center gap-4">
              <Button
                onClick={() => {
                  setShare(!share);
                }}
                variant="warning"
                outlined
                size="base"
              >
                Share Profile
              </Button>
              <Button
                variant="primary"
                onClick={handleStartMessage}
                size="base"
                type="button"
              >
                Message
              </Button>
            </div>
            {share && (
              <Share
                handleModal={() => {
                  setShare(!share);
                }}
                url={currentUser?.profile?.profile || ""}
                header={`Send Invite via`}
                text={"Or invite with link"}
              />
            )}
          </div>
          <SocialHandles searchedUser={currentUser?.profession} />
        </div>
      </div>

      <div className="bg-na_blue mt-4 text-white shadow rounded-[20px] mx-1.5 py-4 px-3">
        <div className="flex align-bottom items-center gap-2 px-2 py-4">
          <img
            src="/assets/Svg/Profile/trophy.svg"
            className="w-8 h-8"
            alt=""
          />
          <p className="lg:text-xl text-lg font-semibold">Achievement</p>
        </div>
        <p className="flex items-center gap-2 px-2">
          <img src="/assets/Svg/Profile/award.svg" alt="" />
          {currentUser?.total_awards}
          <span>Award(s)</span>
        </p>
        <p className="flex items-center gap-2 px-2">
          <img src="/assets/Svg/Profile/award.svg" alt="" />
          {currentUser?.total_nominations}
          <span>Nomination(s)</span>
        </p>

        <div className="flex align-bottom items-center gap-2 px-2 py-4">
          <img
            src="/assets/Svg/Profile/qualifications.svg"
            className="w-8 h-8"
            alt=""
          />
          <p className="lg:text-xl text-lg font-semibold">Qualifications</p>
        </div>
        {currentUser?.total_qualifications &&
          Number(currentUser?.total_qualifications) > 0 && (
            <p className="flex items-center gap-2 px-2">
              <img src="/assets/Svg/Profile/award.svg" alt="" />
              {currentUser?.total_qualifications}
              <span>Qualification(s)</span>
            </p>
          )}

        {currentUser?.profession?.work_experience &&
          Number(currentUser.profession.work_experience) > 0 && (
            <p className="flex items-center gap-2 px-2">
              <img src="/assets/Svg/Profile/award.svg" alt="" />
              {currentUser?.profession?.work_experience || 0}
              <span>Years Experience</span>
            </p>
          )}

        <div className="flex align-bottom items-center gap-2 px-2 py-4">
          <img
            src="/assets/Svg/Profile/publication.svg"
            className="w-8 h-8"
            alt=""
          />
          <p className="lg:text-xl text-lg font-semibold">Project</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 px-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 ">
              <span>{stat.label}:</span> {stat.value}
            </div>
          ))}
        </div>
      </div>

      {openImageModal && (
        <UploadProfileImage
          closeModal={() => {
            setOpenImageModal(!openImageModal);
          }}
          picture={
            currentUser?.profile?.picture
              ? getApiMedia(currentUser?.profile?.picture)
              : defaultImg
          }
        />
      )}
    </div>
  );
}

export default UserStatistics;
