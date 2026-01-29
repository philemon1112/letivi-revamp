"use client";

import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState } from "react";
import SocialHandles from "@/components/molecules/SocialHandles";
import { Button } from "@/components/atoms/Button";
import { Workspace } from "@/types/workspaces";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Share from "../Share";
import { getCountryNameById } from "@/utils/constants";
import { useWorkspaceEndorse } from "@/hooks/useWorkspaceEndorse";

function WorkspaceCard({
  searchedWorkspace,
  type,
}: {
  searchedWorkspace: Workspace;
  type?: string;
}) {
  const currentUser = useCurrentUser();

  const {
    isFollowing,
    followersCount,
    isLoading: isFollowLoading,
    handleFollowToggle,
  } = useWorkspaceEndorse({
    workspaceId: searchedWorkspace.id.toString(),
    type: searchedWorkspace.type,
    initialFollowState: searchedWorkspace?.is_endorsed || false,
    initialFollowersCount: searchedWorkspace?.total_followings || 0,
  });
  // const [followersCount, setFollowersCount] = useState(
  //   searchedWorkspace?.total_followings
  // );
  // const [isFollowing, setIsFollowing] = useState(
  //   searchedWorkspace?.is_endorsed
  // );
  const [share, setShare] = useState(false);

  const getGetDefaultImg = () => {
    if (searchedWorkspace?.type === "project") {
      return "/assets/Img/project.jpg";
    } else if (searchedWorkspace?.type === "event") {
      return "/assets/Img/event.jpg";
    } else if (searchedWorkspace?.type === "business") {
      return "/assets/Img/chef.png";
    }
  };

  function getWorkspaceImage(workspace: Workspace) {
    if (workspace.type === "event" && workspace.event_profile?.logo) {
      return getApiMedia(workspace.event_profile.logo);
    } else if (
      workspace.type === "project" &&
      workspace.project_profile?.logo
    ) {
      return getApiMedia(workspace.project_profile.logo);
    } else if (
      workspace.type === "business" &&
      workspace.business_profile?.logo
    ) {
      return getApiMedia(workspace.business_profile.logo);
    } else {
      return getGetDefaultImg();
    }
  }

  return (
    <div className="relative transition-all duration-300 group w-full max-w-md mx-auto bg-white shadow rounded-2xl overflow-hidden">
      {/* Image Wrapper */}
      <Link
        href={
          type === "personal"
            ? `/profile/workspace/${searchedWorkspace.type}/${searchedWorkspace.id}`
            : searchedWorkspace.slug
        }
        className="block relative w-full aspect-[4/3]"
      >
        <Image
          src={getWorkspaceImage(searchedWorkspace) ?? ""}
          alt="workspace_image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full px-3 py-1 text-xs text-white font-medium capitalize z-10">
          {searchedWorkspace?.type === "business"
            ? "Organisation"
            : searchedWorkspace?.type}
        </span>
      </Link>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-center truncate">
          {searchedWorkspace?.name || "Letivi"}
        </h2>

        <p className="text-center text-sm text-gray-600 truncate">
          {searchedWorkspace?.industry?.name ||
            searchedWorkspace?.other_industry ||
            "UI/UX Design"}{" "}
          |{" "}
          {searchedWorkspace?.country?.length === 2
            ? getCountryNameById(searchedWorkspace.country?.toLowerCase())
            : searchedWorkspace?.country}
        </p>

        {/* Stats */}
        {/* <div className="flex justify-center items-center gap-6 text-sm text-gray-700">
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {searchedWorkspace?.total_images || 0}
            </h3>
            <p>Photos</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {searchedWorkspace?.total_video || 0}
            </h3>
            <p>Videos</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 text-sm text-gray-700">
          <div className="text-center">
            <h3 className="text-lg font-bold">{followersCount || 0}</h3>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {searchedWorkspace?.total_posts || 0}
            </h3>
            <p>Posts</p>
          </div>
        </div> */}
        <div className="mt-5 justify-center flex items-center  gap-4">
          <div className="flex gap-2">
            <h1>Photo</h1>
            <span className="text-2xl font-bold -mt-[3px]">
              {searchedWorkspace?.total_images || "0"}
            </span>
          </div>
          <div className="flex gap-2">
            <h1>Video</h1>
            <span className="text-2xl font-bold -mt-[3px]">
              {searchedWorkspace?.total_video || "0"}
            </span>
          </div>
        </div>
        <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
          <div className="text-center">
            <h1 className="font-bold lg:text-2xl ">{followersCount || 0}</h1>
            <p className="text-gray-400 text-xs"> followers</p>
          </div>
          <div className="text-center">
            <h1 className="font-bold lg:text-2xl ">
              {searchedWorkspace?.total_posts || 0}
            </h1>
            <p className="text-gray-400 text-xs"> Posts</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2">
          {/* {isFollowing ? (
            <Button variant="tertiary" outlined size="sm" disabled>
              Unfollow
            </Button>
          ) : (
            <Button variant="info" outlined size="sm" disabled>
              Follow
            </Button>
          )} */}
          {currentUser && (
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
            onClick={() => setShare(!share)}
          >
            Share Profile
          </Button>
        </div>

        {/* Share Modal */}
        {share && (
          <Share
            handleModal={() => setShare(false)}
            url={searchedWorkspace?.slug || ""}
            header={`Send Invite via`}
            text={"Or invite with link"}
          />
        )}

        <SocialHandles searchedUser={searchedWorkspace} />
      </div>

      {/* Description for Unauthenticated Users */}
      {/* {!currentUser && (
        <div className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm transition-all duration-300 transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-20">
          <div className="p-4 space-y-3 text-center">
            <h1 className="uppercase text-[#EE364F] font-bold text-lg">
              About {searchedWorkspace?.type}
            </h1>
            <Link href="/signup">
              {searchedWorkspace?.description ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: searchedWorkspace.description.substring(0, 450),
                    }}
                  />
                  {searchedWorkspace.description.length >= 450 && (
                    <p className="text-na_blue mt-2 cursor-pointer">
                      ...Read More
                    </p>
                  )}
                </>
              ) : (
                <p>No Biography available for this workspace</p>
              )}
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default WorkspaceCard;
