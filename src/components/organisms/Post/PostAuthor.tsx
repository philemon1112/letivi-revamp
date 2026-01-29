import Link from "next/link";
import React from "react";
import { getApiMedia } from "@/utils/getApiMedia";
import { Post } from "@/types/nature";
import { Professional } from "@/types/common/professional";

interface PostAuthorProps {
  post: any;
  currentUser: Professional | undefined;
}
function PostAuthor({ post, currentUser }: PostAuthorProps) {
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
    <div className="flex items-center gap-2">
      {post?.business || post?.event || post?.project ? (
        <Link
          href={generatePageLink(
            (post?.business && "business") ||
              (post?.event && "event") ||
              (post?.project && "project")
          )} // Provide a default URL if undefined
          className="shrink-0"
        >
          <img
            src={
              post?.business
                ? getApiMedia(post?.business?.business_profile?.logo)
                : post?.event
                ? getApiMedia(post?.event?.event_profile?.logo)
                : getApiMedia(post?.project?.project_profile?.logo || "")
            }
            className="object-cover w-10 h-10 rounded-lg  lg:w-14 lg:h-14"
            alt=""
          />
        </Link>
      ) : (
        <Link href={profileLink}>
          {post?.user?.picture ? (
            <img
              src={getApiMedia(post?.user?.picture)}
              className="object-cover w-10 h-10 rounded-lg  lg:w-14 lg:h-14"
              alt=""
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 text-xl font-bold border border-blue-500 rounded-lg lg:w-14 lg:h-14">
              {post?.user?.first_name.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      )}
      <Link
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
        <h2 className="text-base font-bold ">
          {post?.business || post?.event || post?.project
            ? post?.business
              ? `${post?.business?.name}`
              : post?.event
              ? `${post?.event?.name}`
              : `${post?.project?.name}`
            : ` ${post?.user?.first_name} ${post?.user?.last_name}`}
        </h2>
      </Link>
    </div>
  );
}

export default PostAuthor;
