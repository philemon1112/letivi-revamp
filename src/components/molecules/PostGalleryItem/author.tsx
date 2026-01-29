import Link from "next/link";
import React from "react";
import { getApiMedia } from "@/utils/getApiMedia";
import { Professional } from "@/types/common/professional";

interface GalleryAuthorProps {
  post: any;
  currentUser: Professional | undefined;
}
function GalleryAuthor({ post, currentUser }: GalleryAuthorProps) {
  const generatePageLink = (page: string | null) => {
    switch (page) {
      case "business":
        return post?.business
          ? post?.user?.id === currentUser?.id
            ? `/profile/workspace/business/${post.business.id}`
            : `${post?.business?.slug}`
          : "";

      case "project":
        return post?.project
          ? post.user.id === currentUser?.id
            ? `/profile/workspace/project/${post.project.id}`
            : `${post.project.slug}`
          : "";

      case "event":
        return post?.event
          ? post?.user?.id === currentUser?.id
            ? `/profile/workspace/event/${post.event.id}`
            : `${post.event.slug}`
          : "";

      default:
        return "";
    }
  };

  const profileLink =
    currentUser?.id === post?.user?.id
      ? "/profile/biography"
      : `${post?.user?.profile}`;
  return (
    <div className="mt-auto flex items-end justify-between ">
      <div className="flex items-center gap-2">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100">
          {post?.business || post?.event || post?.project ? (
            <Link
              href={generatePageLink(
                (post?.business && "business") ||
                  (post?.event && "event") ||
                  (post?.project && "project")
              )} // Provide a default URL if undefined
            >
              <img
                src={
                  post?.business
                    ? getApiMedia(post?.business?.business_profile?.logo)
                    : post?.event
                    ? getApiMedia(post?.event?.event_profile?.logo)
                    : getApiMedia(post?.project?.project_profile?.logo || "")
                }
                className="h-full w-full object-cover object-center"
                alt=""
              />
            </Link>
          ) : (
            <Link href={profileLink}>
              {post?.user?.picture ? (
                <img
                  src={getApiMedia(post?.user?.picture)}
                  className="h-full w-full object-cover object-center"
                  alt=""
                />
              ) : (
                <div className="flex items-center justify-center w-11 h-11 text-xl font-bold border border-blue-500 rounded-lg lg:w-14 lg:h-14">
                  {post?.user?.first_name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          )}
        </div>

        <div>
          <Link
            className="block text-sm w-48 truncate md:w-full font-bold text-gray-900 underline cursor-pointer"
            href={
              post?.business || post?.event || post?.project
                ? generatePageLink(
                    (post?.business && "business") ||
                      (post?.event && "event") ||
                      (post?.project && "project")
                  )
                : profileLink
            }
          >
            {post?.business || post?.event || post?.project
              ? post?.business
                ? `${post?.business?.name}`
                : post?.event
                ? `${post?.event?.name}`
                : `${post?.project?.name}`
              : ` ${post?.user?.first_name} ${post?.user?.last_name}`}
          </Link>
          <span className="block text-sm text-gray-400">
            {post?.business || post?.event || post?.project
              ? "Workspace"
              : "Personal"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GalleryAuthor;
