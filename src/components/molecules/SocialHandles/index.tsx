import { Professional } from "@/types/common/professional";
import { UserProfile } from "@/types/events";
import { Workspace } from "@/types/workspaces";
import React from "react";

const index = ({ searchedUser }: { searchedUser: any }) => {
  // const  { facebook, instagram, linkedin, tiktok, twitter, website, youtube } = searchedUser;
  return (
    <div>
      <div className=" mt-4 flex justify-center items-stretch space-x-4">
        {searchedUser?.website && (
          <a href={searchedUser?.website || "https://letivi.com"}>
            <img
              src="/assets/Svg/Social/web.svg"
              alt=""
              className=" w-4 h-4 "
            />
          </a>
        )}

        {searchedUser?.facebook && (
          <a
            href={
              searchedUser?.facebook ||
              "https://www.facebook.com/letivieverywhere/"
            }
          >
            <img src="/assets/Svg/Social/fb.svg" alt="" className=" w-4 h-4 " />
          </a>
        )}
        {searchedUser?.twitter && (
          <a
            href={searchedUser?.twitter || "https://www.twitter.com/letiviapp"}
          >
            <img
              src="/assets/Svg/Social/twitter.svg"
              alt=""
              className=" w-4 h-4 "
            />
          </a>
        )}
        {searchedUser?.linkedin && (
          <a
            href={
              searchedUser?.linkedin ||
              "https://www.linkedin.com/company/letiviapp/"
            }
          >
            <img
              src="/assets/Svg/Social/linkedin.svg"
              className=" w-4 h-4"
              alt=""
            />
          </a>
        )}
        {searchedUser?.youtube && (
          <a
            href={
              searchedUser?.youtube || "https://youtube.com/@Letivieverywhere"
            }
          >
            <img src="/assets/Svg/Social/yt.svg" alt="" className=" w-4 h-4 " />
          </a>
        )}
        {searchedUser?.instagram && (
          <a
            href={
              searchedUser?.instagram || "https://www.instagram.com/letiviapp/"
            }
          >
            <img
              src="/assets/Svg/Social/instagram.svg"
              alt=""
              className=" w-4 h-4 "
            />
          </a>
        )}
        {searchedUser?.tiktok && (
          <a href={searchedUser?.tiktok || "https://www.tiktok.com/@letiviapp"}>
            <img
              src="/assets/Svg/Social/tiktok.svg"
              alt=""
              className=" w-4 h-4 "
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default index;
