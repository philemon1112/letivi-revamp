"use client";

import { Button } from "@/components/atoms/Button";
import { Professional } from "@/types/common/professional";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Share from "../Share";
import UploadProfileImage from "../UploadProfileImage";
import { toast } from "sonner";
import { togglePrivacy } from "@/services/myProfile";
import { useQueryClient } from "@tanstack/react-query";
import { getCountryNameById } from "@/utils/constants";

interface ProfileCardProps {
  currentUser: Professional | undefined;
}

function ProfileCard({ currentUser }: ProfileCardProps) {
  const defaultImg = "/assets/Img/default.png";
  const queryClient = useQueryClient();
  const isPrivate = currentUser?.private;
  const [unreadMessage, setUnreadMessage] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [share, setShare] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleUserVisibility = async () => {
    const formData = { action: "toggle" };

    const { data } = await togglePrivacy(formData);
    setVisible(data?.private === 1);
    if (data?.private === 1) {
      toast.success(
        "By going private all your photos and videos in your gallery would become private"
      );
    } else {
      toast.success(
        "By going public all your photos and videos in your gallery would become public"
      );
    }
    queryClient.invalidateQueries({ queryKey: ["myProfile"] });
  };

  useEffect(() => {
    if (currentUser) {
      setVisible(currentUser?.private === 1 ? true : false);
    }
  }, [currentUser]);
  const handleUserPrivacyChange = () => {
    setVisible((prev) => !prev);
    toggleUserVisibility();
  };

  return (
    <div className="hidden md:flex flex-col flex-grow overflow-auto h-screen hide-scrollbar w-3/12 py-4 md:mr-6">
      <div className="hidden lg:block col-span-4">
        <div className=" bg-white shadow rounded-2xl py-3 px-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base capitalize font-bold truncate">
              Hi {currentUser?.first_name},
            </h2>
            <div className="flex space-x-2">
              <div
                onClick={() => {
                  handleUserPrivacyChange();
                }}
                className={`cursor-pointer ${
                  visible ? "text-red-500" : ""
                } rounded-full shadow border p-1 w-8 h-8 grid place-content-center`}
              >
                {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              {/* <div
                className="rounded-full shadow border p-1 w-8 h-8 grid place-content-center hover:cursor-pointer"
              >
                {unreadMessage ? (
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#ff0000"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>

                    {unreadMessagesCount > 0 && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-1 flex items-center justify-center bg-red-500 rounded-full h-4 w-4 text-white text-xs">
                        {unreadMessagesCount}
                      </div>
                    )}
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 lg:w-5 lg:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                )}
              </div>
              <div
                className="rounded-full shadow border p-1 w-8 h-8 grid place-content-center hover:cursor-pointer"
              >
                {notifications >= 1 ? (
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#ff0000"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>

                    {notifications > 0 && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-1 flex items-center justify-center bg-red-500 rounded-full h-4 w-4 text-white text-xs">
                        {notifications}
                      </div>
                    )}
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                )}
              </div> */}
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <div className="group relative mb-2 block w-48 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img
                src={
                  currentUser?.profile?.picture
                    ? getApiMedia(currentUser?.profile?.picture)
                    : defaultImg
                }
                alt="profile_image"
                className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div
                onClick={() => {
                  setOpenImageModal(!openImageModal);
                }}
                className="absolute right-3 top-2 h-10 w-10 cursor-pointer"
              >
                <img src="/assets/Svg/Profile/edit.svg" alt="" />
              </div>
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

          <h2 className="text-lg font-bold text-center mt-4">
            {currentUser?.first_name} {currentUser?.last_name}
          </h2>
          <p className="text-gray-400 text-center">
            {currentUser?.profession?.profession || ""} |
            <span className="ml-1">
              {currentUser?.profile?.country?.length === 2
                ? getCountryNameById(
                    currentUser.profile?.country?.toLowerCase()
                  )
                : currentUser?.profile?.country}
            </span>
          </p>

          <div className="mt-5 justify-center flex items-center gap-x-4">
            <div className="flex gap-x-2">
              <h1>Photo</h1>
              <span className="text-lg font-bold -mt-[3px]">
                {(currentUser &&
                  currentUser?.total_public_post_images +
                    currentUser?.total_private_post_images) ||
                  0}
              </span>
            </div>
            <div className="flex gap-x-2">
              <h1>Video</h1>
              <span className="text-lg font-bold -mt-[3px]">
                {(currentUser &&
                  currentUser?.total_public_post_videos +
                    currentUser?.total_private_post_videos) ||
                  0}
              </span>
            </div>
          </div>

          <div className="mt-1 justify-center  mx-auto flex items-center gap-x-4">
            <div className="text-center">
              <h1 className="font-bold lg:text-xl ">
                {currentUser?.total_followers}
              </h1>
              <p className="text-gray-400 text-xs"> followers</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold lg:text-xl ">
                {currentUser && currentUser?.total_followings}
              </h1>
              <p className="text-gray-400 text-xs"> following</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold lg:text-xl ">
                {currentUser && currentUser.total_posts}
              </h1>
              <p className="text-gray-400 text-xs"> Posts</p>
            </div>
          </div>

          <div className="mt-5 text-base  mx-auto flex justify-center items-center gap-x-2">
            <Link href="/profile/biography" className="px-4 py-1.5 edit">
              <Button variant="tertiary" size="lg">
                Edit
              </Button>
            </Link>

            <Button
              onClick={() => {
                setShare(!share);
              }}
              variant="secondary"
              className="text-na_yellow"
              outlined
              size="lg"
            >
              Share
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

          <div className="flex justify-center mt-4">
            {/* <button
            onClick={() => {
              setInvite(!invite);
            }}
            className="bg-na_blue p-2 px-8 text-white rounded-xl"
          >
            Invited Friends: {currentUser?.totalInvitedFriends}
          </button> */}

            {/* {invite && (
              <Share
                handleModal={() => {
                  setInvite(!invite);
                }}
                url={currentUser?.profile?.invite_link}
                header={`Send Invite via`}
                text={"Or invite with link"}
              />
            )} */}
          </div>
        </div>
      </div>

      {/* <WorkspaceCard /> */}
    </div>
  );
}

export default ProfileCard;
