"use Client";
import { Button } from "@/components/atoms/Button";
import { Professional } from "@/types/common/professional";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Share from "../Share";
import { togglePrivacy } from "@/services/myProfile";
import { toast } from "sonner";
import UploadProfileImage from "../UploadProfileImage";

interface MobileProfileCardProps {
  currentUser: Professional | undefined;
}
function MobileProfileCard({ currentUser }: MobileProfileCardProps) {
  const defaultImg = "/assets/Img/default.png";
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
    <div className="lg:hidden block w-full mb-1">
      <div className="bg-white shadow rounded-2xl mx-2 p-4 sm:p-6">
        <div className="flex mb-1 sm:flex-row justify-between items-center sm:items-center">
          <h2 className="text-base sm:text-lg font-bold truncate">
            Hi, {currentUser?.first_name} {currentUser?.last_name}
          </h2>
          <div className="flex space-x-2 sm:mt-0">
            <div
              onClick={handleUserPrivacyChange}
              className={`cursor-pointer rounded-full shadow ${
                visible ? "text-red-500" : ""
              } border p-1 w-7 h-7 grid place-content-center`}
            >
              {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {/* Uncomment and refine below if needed */}
            {/* <div className="...">Notification icons</div> */}
          </div>
        </div>

        <div className=" flex flex-col items-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <div
              onClick={() => setOpenImageModal(!openImageModal)}
              className="absolute -top-2 -right-2 cursor-pointer border-2 border-red-500 bg-white rounded-full p-1"
            >
              <img
                src="/assets/Svg/Profile/edit.svg"
                className="w-4 h-4"
                alt="edit"
              />
            </div>
            <img
              src={
                currentUser?.profile?.picture
                  ? getApiMedia(currentUser?.profile?.picture)
                  : defaultImg
              }
              alt="profile_image"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <div className="flex gap-1">
              <span>Photo</span>
              <span className="font-bold">
                {(currentUser?.total_public_post_images || 0) +
                  (currentUser?.total_private_post_images || 0)}
              </span>
            </div>
            <div className="flex gap-1">
              <span>Video</span>
              <span className="font-bold">
                {(currentUser?.total_public_post_videos || 0) +
                  (currentUser?.total_private_post_videos || 0)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-6 text-center text-sm sm:text-base">
            <div>
              <div className="font-bold">
                {currentUser?.total_followers || "0"}
              </div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
            <div>
              <div className="font-bold">
                {currentUser?.total_followings || "0"}
              </div>
              <div className="text-gray-400 text-xs">Following</div>
            </div>
            <div>
              <div className="font-bold">{currentUser?.total_posts || "0"}</div>
              <div className="text-gray-400 text-xs">Posts</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <Link href="/profile/biography">
              <Button variant="tertiary" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => setShare(!share)}
              variant="secondary"
              className="text-yellow-500 border-yellow-500"
              outlined
              size="sm"
            >
              Share
            </Button>
          </div>
        </div>

        {/* Modals */}
        {openImageModal && (
          <UploadProfileImage
            closeModal={() => setOpenImageModal(false)}
            picture={
              currentUser?.profile?.picture
                ? getApiMedia(currentUser?.profile?.picture)
                : defaultImg
            }
          />
        )}
        {share && (
          <Share
            handleModal={() => setShare(false)}
            url={currentUser?.profile?.profile || ""}
            header="Send Invite via"
            text="Or invite with link"
          />
        )}
      </div>
    </div>
  );
}

export default MobileProfileCard;
