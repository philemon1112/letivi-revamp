import { Professional } from "@/types/common/professional";
import SocialHandles from "@/components/molecules/SocialHandles";
import React from "react";
import { getCountryNameById } from "@/utils/constants";

function index({ artistProfile }: { artistProfile: any }) {
  return (
    <div className="cursor-pointer bg-white shadow-md pb-4 lg:rounded-2xl">
      <div className="relative block h-64 overflow-hidden rounded-lg">
        <img
          src={
            artistProfile?.profile?.picture
              ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${artistProfile?.profile?.picture}`
              : "/assets/Img/default.png"
          }
          alt="profile_image"
          className="h-full w-full object-cover object-center p-2"
        />
      </div>
      <div className="pb-8">
        <div className="p-1">
          <h2 className="text-lg font-bold text-center mt-4 truncate">
            {artistProfile?.first_name} {artistProfile?.last_name}
          </h2>
          <p className="text-gray-400 text-center line-clamp-1">
            {artistProfile?.profession?.profession || "Profession"} |
            <span className="ml-1">
              {artistProfile?.profile?.country?.length === 2
                ? getCountryNameById(artistProfile?.profile.country?.toLowerCase())
                : artistProfile?.profile?.country}
            </span>
          </p>
        </div>
        <SocialHandles searchedUser={artistProfile} />
      </div>
    </div>
  );
}

export default index;
