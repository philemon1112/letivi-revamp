"use client";

import { Professional } from "@/types/common/professional";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState } from "react";
import SocialHandles from "@/components/molecules/SocialHandles";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Share from "../Share";
import { getCountryNameById } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { getMessages } from "@/services/messages";
import { useFollow } from "@/hooks/useUserFollow";

function ProfessionalCard({ searchedUser }: { searchedUser: Professional }) {
  const defaultImg = "/assets/Img/default.png";
  // Use the custom follow hook
  const {
    isFollowing,
    followersCount,
    isLoading: isFollowLoading,
    handleFollowToggle,
  } = useFollow({
    userId: searchedUser.id.toString(),
    initialFollowState: searchedUser?.is_followed || false,
    initialFollowersCount: searchedUser?.total_followers || 0,
  });
  const [share, setShare] = useState(false);

  const currentUser = useCurrentUser();

  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getMessages({ limit: 100 }),
    select: (response) => {
      return response?.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const router = useRouter();
  const handleStartMessage = () => {
    // Navigate to messages page with the contact data as URL parameters

    const existingContact = contacts.find((contact) => {
      const otherUserId =
        contact.sender?.id === currentUser?.id
          ? contact.recipient?.id
          : contact.sender?.id;
      return otherUserId?.toString() === searchedUser.id.toString();
    });

    if (existingContact) {
      // Fixed: Use & instead of second ?
      router.push(`/messages?startChat=false&contactId=${existingContact.id}`);
      return;
    }
    const params = new URLSearchParams({
      startChat: "true",
      userId: searchedUser.id.toString(),
      userName: `${searchedUser.first_name} ${searchedUser.last_name}`,
      userPicture: searchedUser.profile?.picture || "",
      userEmail: searchedUser.email || "",
      to: searchedUser.email,
    });
    router.push(`/messages?${params.toString()}`);
  };

  return (
    <div className="relative cursor-pointer transition-all duration-300 group">
      <div className=" lg:max-w-md mx-auto bg-white shadow rounded-[20px] p-3">
        {/* PROFESSIONAL CARD IMAGE */}
        <Link
          className="mb-0.5 block h-60 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-1"
          href={`${searchedUser?.profile?.profile}`}
        >
          <img
            src={
              searchedUser?.profile?.picture
                ? getApiMedia(searchedUser?.profile?.picture)
                : defaultImg
            }
            alt="profile_image"
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
        </Link>

        {/* PROFESSIONAL CARD CONTENT  */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-center mt-4 truncate">
            {searchedUser?.first_name} {searchedUser?.last_name}
          </h2>
          <p className="text-gray-400 text-center line-clamp-1">
            {searchedUser?.profession?.profession || "Profession"} |
            <span className="ml-1">
              {searchedUser?.profile?.country?.length === 2
                ? getCountryNameById(
                    searchedUser.profile?.country?.toLowerCase()
                  )
                : searchedUser?.profile?.country}
            </span>
          </p>

          <div className="mt-5 justify-center flex items-center  gap-4">
            <div className="flex gap-2">
              <h1>Photo</h1>
              <span className="text-xl font-bold -mt-[3px]">
                {searchedUser?.total_public_post_images || "0"}
              </span>
            </div>
            <div className="flex gap-2">
              <h1>Video</h1>
              <span className="text-xl font-bold -mt-[3px]">
                {searchedUser?.total_public_post_videos || "0"}
              </span>
            </div>
          </div>

          <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
            <div className="text-center">
              <h1 className="font-bold lg:text-2xl ">
                {followersCount || "0"}
              </h1>
              <p className="text-gray-400 text-xs"> followers</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold lg:text-2xl ">
                {searchedUser?.total_followings || "0"}
              </h1>
              <p className="text-gray-400 text-xs"> following</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold lg:text-2xl ">
                {searchedUser?.total_posts || "0"}
              </h1>
              <p className="text-gray-400 text-xs"> Posts</p>
            </div>
          </div>

          <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
            {currentUser && currentUser?.id !== searchedUser?.id && (
              <Button
                variant={isFollowing ? "tertiary" : "primary"}
                outlined
                size="sm"
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

            <Button
              variant="secondary"
              outlined
              size="sm"
              className="text-na_yellow"
              onClick={() => {
                setShare(!share);
              }}
            >
              Share
            </Button>

            {currentUser && currentUser?.id !== searchedUser?.id && (
              <Button
                variant="primary"
                onClick={handleStartMessage}
                size="sm"
                type="button"
              >
                Message
              </Button>
            )}
          </div>
          {share && (
            <Share
              handleModal={() => {
                setShare(!share);
              }}
              url={searchedUser?.profile?.profile || ""}
              header={`Send Invite via`}
              text={"Or invite with link"}
            />
          )}
          <SocialHandles searchedUser={searchedUser} />
        </div>
      </div>

      {/* {!currentUser && (
        <div
          className={`absolute inset-0 bg-white transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}
        >
          <div className="p-2 lg:h-fit lg:p-10 py-5 bg-white">
            <div className="flex justify-center space-x-4 text-[#EE364F] py-2 font-bold text-center text-3xl mb-2">
              <h1> BIOGRAPHY</h1>
            </div>

            <Link href="/signup">
              <div className="">
                {searchedUser?.profile?.bio == null ? (
                  <>
                    <p>No Biography available for this searchedUser</p>
                  </>
                ) : (
                  <>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: searchedUser?.profile?.bio.substring(0, 450),
                      }}
                    ></div>
                    {searchedUser?.profile?.bio.length >= 450 && (
                      <div className="text-na_blue cursor-pointer">
                        ....Read More
                      </div>
                    )}
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ProfessionalCard;
