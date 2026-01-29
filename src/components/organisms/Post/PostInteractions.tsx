"use client";
import PostReaction from "@/components/atoms/PostReaction";
import { Professional } from "@/types/common/professional";
import { Post } from "@/types/nature";
import React, { useState, useEffect } from "react";
import ReactionButton from "./ReactionButton";

import {
  useBowToPost,
  useLikePost,
  useSalutePost,
  useUnBowToPost,
  useUnLikePost,
  useUnSalutePost,
} from "@/hooks/usePostReaction";
import CommentButton from "./CommentButton";
import CommentComp from "./CommentComp";
import { useMutation } from "@tanstack/react-query";
import { savePost } from "@/services/posts";
import { toast } from "sonner";
import SharePost from "./SharePost";
import { useSavePost } from "@/hooks/usePost";
import MobileBottomContentBar from "@/components/molecules/BottomNavBar";
import MultipleDownload from "./MultipleDownload";
import DesktopSideContentBar from "@/components/molecules/SideNavConten";

interface PostInteractionsProps {
  post: Post | any;
  currentUser: Professional | undefined;
}

const PostInteractions = ({ post, currentUser }: PostInteractionsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("image");
  const [isMobile, setIsMobile] = useState(false);
  // const [reactionCount, setReactionCount] = useState(
  //   post?.fit_bump_count + post?.salut_count + post?.bow_count
  // );
  const [reactionsCount, setReactionsCount] = useState({
    total: post?.fit_bump_count + post?.salut_count + post?.bow_count,
    fit_bump_count: post?.fit_bump_count,
    salut_count: post?.salut_count,
    bow_count: post?.bow_count,
  });

  // const { userData } = useCurrentAuth();

  const [imageMeta, setImageMeta] = useState(null);
  const [openComment, setOpenComment] = useState(false);
  const [openReaction, setOpenReaction] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const [isAction, setisAction] = useState(false);
  const [actionLabel, setActionLabel] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [commentLoader, setcommentLoader] = useState(false);
  const [commentCount, setcommentCount] = useState(post?.comment_count);
  const [viewsCount, setViewsCount] = useState(post?.view_count);
  const [downloadsCount, setDownloadsCount] = useState(post?.download_count);
  // const [sharesCount, setSharesCount] = useState(
  //   post?.post_shares?.share_count || 0
  // );
  const [impressionCount, setImpressionCount] = useState(
    post?.impression_count
  );

  const [postId, setPostId] = useState(0);

  const [selectedReaction, setSelectedReaction] = useState(
    post?.fitsbumped
      ? "Like"
      : post?.saluted
      ? "Love"
      : post?.bowed
      ? "Clap"
      : ""
  );
  const [reactions, setReactions] = useState({
    liked: post?.fitsbumped,
    loved: post?.saluted,
    clapped: post?.bowed,
  });
  const [openMultipleDownload, setOpenMultipleDownload] = useState(false);
  const [form, setForm] = useState({});

  const [showPostId, setShowPostId] = useState<number | null>(null);

  //   LIKE POST
  const { mutateAsync: likePostMutation } = useLikePost();
  //   UNLIKE POST
  const { mutateAsync: unLikePostMutation } = useUnLikePost();

  //   SALUTE POST
  const { mutateAsync: salutePostMutation } = useSalutePost();
  //   UNSALUTE POST
  const { mutateAsync: unSalutePostMutation } = useUnSalutePost();

  //   BOW TO POST
  const { mutateAsync: bowToPostMutation } = useBowToPost();
  //   UNBOW TO POST
  const { mutateAsync: unBowToPostMutation } = useUnBowToPost();

  //   SEND REACTION
  const sendReaction = (reactionType: string) => {
    // Update the counts based on the reaction type
    switch (reactionType) {
      case "Like":
        setSelectedReaction("Like");
        setReactions((prev) => ({ ...prev, liked: true }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total + 1, // update the total reaction count
          fit_bump_count: prev.fit_bump_count + 1, // update the fit bump reaction count
        }));
        console.log("About to like post : ", post?.id);
        likePostMutation({ post_id: post?.id }); // send a request to like the post
        break;
      case "UnLike":
        setSelectedReaction("Like");
        setReactions((prev) => ({ ...prev, liked: false }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total - 1, // update the total reaction count
          fit_bump_count: prev.fit_bump_count - 1, // update the fit bump reaction count
        }));
        unLikePostMutation({ post_id: post?.id }); // send a request to unlike the post
        break;
      case "Love":
        setSelectedReaction("Love");
        setReactions((prev) => ({ ...prev, loved: true }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total + 1, // update the total reaction count
          salut_count: prev.salut_count + 1, // update the salutation reaction count
        }));
        salutePostMutation({ post_id: post?.id }); // send a request to salute the post
        break;
      case "UnLove":
        setSelectedReaction("Like");
        setReactions((prev) => ({ ...prev, loved: false }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total - 1, // update the total reaction count
          salut_count: prev.salut_count - 1, // update the salutation reaction count
        }));
        unSalutePostMutation({ post_id: post?.id }); // send a request to unsalute the post
        break;
      case "Clap":
        setSelectedReaction("Clap");
        setReactions((prev) => ({ ...prev, clapped: true }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total + 1, // update the total reaction count
          bow_count: prev.bow_count + 1, // update the bow reaction count
        }));
        bowToPostMutation({ post_id: post?.id }); // send a request to bow to the post
        break;
      case "UnClap":
        setSelectedReaction("Like");
        setReactions((prev) => ({ ...prev, clapped: false }));
        setReactionsCount((prev) => ({
          ...prev,
          total: prev.total - 1, // update the total reaction count
          bow_count: prev.bow_count - 1, // update the bow reaction count
        }));
        unBowToPostMutation({ post_id: post?.id }); // send a request to unbow to the post
        break;
      default:
        break;
    }
  };

  //   SAVE POST
  const { mutateAsync: savePostMutation } = useSavePost();

  const handleComment = (postId: number) => {
    setShowPostId(postId);
    setOpenComment(!openComment);
  };

  const handleSavePost = () => {
    savePostMutation({ postId: post?.id });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-6 text-black justify-evenly">
        {/* RACTION BUTTON AND REACTION POPUP */}
        <ReactionButton
          reactionsCount={reactionsCount}
          reactions={reactions}
          selectedReaction={selectedReaction}
          sendReaction={sendReaction}
        />

        {/* COMMENT */}
        <CommentButton handleComment={handleComment} postId={post?.id} />

        {/* DOWNLOAD */}
        {post?.medias?.length > 1 ? (
          <a
            onClick={() => {
              setOpenMultipleDownload(true);
            }}
            rel="noreferrer"
            className="relative flex items-center hover:cursor-pointer lg:p-2 px-1 lg:gap-x-2 gap-[1px]  py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <div className="text-[10px] lg:text-base">Download</div>
          </a>
        ) : (
          <a
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${post?.id}/medias/${post?.medias[0]?.id}/download?user_token=${currentUser?.user_token}`}
            rel="noreferrer"
            download
            className="relative flex items-center hover:cursor-pointer lg:p-2 px-1 lg:gap-x-2 gap-[1px]  py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <div className="text-[10px] lg:text-base">Download</div>
          </a>
        )}

        {/* SAVE */}
        <button
          onClick={handleSavePost}
          className="relative flex items-center lg:p-2 px-1 lg:gap-x-2 gap-[1px]  py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>

          <p className="text-[10px] lg:text-base">Save</p>
        </button>

        {/* SHARE */}
        <button
          onClick={() => {
            setSharePost(!sharePost);
          }}
          className="relative flex items-center lg:p-2 px-1 lg:gap-x-2 gap-[1px]  py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          <p className="text-[10px] lg:text-base">Share</p>
        </button>
      </div>

      {showPostId === post?.id && openComment ? (
        <CommentComp postId={post.id} setCommentCount={setcommentCount} />
      ) : null}

      {sharePost && (
        <SharePost
          handleModal={() => {
            setSharePost(!sharePost);
          }}
          url={`${post?.slug}`}
          header={"Share post"}
          text={"Or copy link to share"}
          // setSharesCount={setSharesCount}
          postId={post?.id}
        />
      )}

      {openMultipleDownload && (
        <>
          {isMobile ? (
            <MobileBottomContentBar
              setOpen={setOpenMultipleDownload}
              open={openMultipleDownload}
            >
              <MultipleDownload post={post} />
            </MobileBottomContentBar>
          ) : (
            <DesktopSideContentBar
              setOpen={setOpenMultipleDownload}
              open={openMultipleDownload}
            >
              <MultipleDownload post={post} type="sidebar" />
            </DesktopSideContentBar>
          )}
        </>
      )}
    </>
  );
};

export default PostInteractions;
