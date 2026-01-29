"use client";
import { Professional } from "@/types/common/professional";
import { Post as PostType } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TruncatedDescription from "../../molecules/TruncatedDescription";
import PostReaction from "@/components/atoms/PostReaction";
import { useQuery } from "@tanstack/react-query";
import { getPeopleiIFollow } from "@/services/posts";
import PostAuthor from "./PostAuthor";
import PostDropdownButton from "./PostDropdownButton";
import PostDropdownMenu from "./PostDropdownMenu";
import PostTitleAndDesc from "./PostTitleAndDesc";
import PostMedia from "./PostMedia";
import PostInteractions from "./PostInteractions";
import PostDetail from "../PostDetail";
import { useImpression, useMutePost } from "@/hooks/usePost";

interface PostProps {
  post: PostType;
  picture?: string;
  currentUser: Professional | undefined;
  isPostDetail?: boolean;
}

function Post({ post, currentUser, isPostDetail }: PostProps) {
  const { mutate: triggerImpression } = useImpression();
  const [showPostDropdown, setShowPostDropdown] = useState(false);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);

  //   const { data } = useSelector((state) => state.peopleIFollow);

  // const [following, setFollowing] = useState(
  //   data.some((user) => user.user?.id === post?.user?.id)
  // );

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerImpression(post.id);
          observer.disconnect(); // only trigger once
        }
      },
      {
        threshold: 0.5, // Adjust based on how much should be visible
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        // this would later be modified so that request would be queewed
        className="px-2 pt-2 pb-4 text-xs bg-white rounded-2xl lg:text-base"
      >
        {/* POST HEADER STARTS*/}
        <div className="relative flex items-center justify-between gap-2">
          <PostAuthor post={post} currentUser={currentUser} />
          <PostDropdownButton setShowPostDropdown={setShowPostDropdown} />
          <PostDropdownMenu
            currentUser={currentUser}
            post={post}
            showPostDropdown={showPostDropdown}
            setShowPostDropdown={setShowPostDropdown}
          />
        </div>
        {/* POST HEADER ENDS*/}

        {/* POST CONTENT STARTS */}
        <div className="hover:cursor-pointer">
          <PostTitleAndDesc post={post} />
          <PostMedia
            post={post}
            setOpenPostDetailsModal={setOpenPostDetailsModal}
            isPostDetail={isPostDetail}
          />
        </div>

        {/* POST INTERACTIONS */}
        <PostInteractions post={post} currentUser={currentUser} />

        {/* POST DETAIL MODAL */}
        {openPostDetailsModal && (
          <PostDetail
            post={post}
            currentUser={currentUser}
            handleModal={() => setOpenPostDetailsModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default Post;
