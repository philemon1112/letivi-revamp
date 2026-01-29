// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getApiMedia } from "@/utils/getApiMedia";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  MoreVertical,
  X,
} from "lucide-react";
import { useImpression, useSavePost } from "@/hooks/usePost";
import SharePost from "@/components/organisms/Post/SharePost";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import CommentComp from "@/components/organisms/Post/CommentComp";
import MobileBottomContentBar from "../BottomNavBar";
import DesktopSideContentBar from "../SideNavConten";
import { Post, SavedPost } from "@/types/common";
import MultipleDownload from "@/components/organisms/Post/MultipleDownload";
import TruncatedDescription from "../TruncatedDescription";
import LoginPromptModal from "../LoginPrompt";
import GalleryAuthor from "./author";
import GalleryPostInteractions from "./reaction";
import Link from "next/link";
import PostDropdownButton from "@/components/organisms/Post/PostDropdownButton";
import PostDropdownMenu from "@/components/organisms/Post/PostDropdownMenu";
import CustomVideoPlayer from "../CustomVideoPlayer";

interface ImageCardProps {
  post: SavedPost | Post;
  index: number;
  onVideoHover: (video: HTMLVideoElement) => void;
  onVideoLeave: (video: HTMLVideoElement) => void;
  onSelected?: (post: Post) => void;
  isSelectable?: boolean;
  selected?: Post[];
  allPosts: Post[] | SavedPost[];
  showAuthor?: boolean;
  refetchPosts?: () => void;
}

interface CarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPost: SavedPost;
  allPosts?: SavedPost[] | Post[];
  currentImgIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  isSharedPost?: boolean;
}

export const CarouselModal: React.FC<CarouselModalProps> = ({
  isOpen,
  onClose,
  currentPost,
  allPosts,
  currentImgIndex,
  onNext,
  onPrevious,
  isSharedPost = false,
}) => {
  const normalizedPost = currentPost?.post || currentPost;
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [showPostId, setShowPostId] = useState<number | null>(null);
  const [openComment, setOpenComment] = useState(false);
  const [openMultipleDownload, setOpenMultipleDownload] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [sharePost, setSharePost] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [commentCount, setcommentCount] = useState(
    normalizedPost?.comment_count
  );
  const [isMobile, setIsMobile] = useState(false);
  const [showPostDropdown, setShowPostDropdown] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(
    currentImgIndex ?? 0
  );
  const [prompt, setPrompt] = useState("interact with this post");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  useEffect(() => {
    setCurrentImageIndex(currentImgIndex ?? 0);
  }, [currentImgIndex, normalizedPost?.id]);

  const currentUser = useCurrentUser();
  const currentMedia =
    normalizedPost?.medias?.length && normalizedPost?.medias[currentImageIndex];

  const handleNextImage = () => {
    if (isLoadingPreview) return;
    const nextIndex = (currentImageIndex + 1) % normalizedPost?.medias?.length;
    setIsLoadingPreview(true);
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    if (isLoadingPreview) return;
    const previousIndex =
      (currentImageIndex - 1 + normalizedPost?.medias.length) %
      normalizedPost?.medias.length;
    setIsLoadingPreview(true);
    setCurrentImageIndex(previousIndex);
  };
  //   SAVE POST
  const { mutateAsync: savePostMutation } = useSavePost();

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchStartX(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouchY = e.targetTouches[0].clientY;
    const currentTouchX = e.targetTouches[0].clientX;
    const diffY = touchStart! - currentTouchY;
    const diffX = touchStartX! - currentTouchX;

    // Determine primary direction of swipe
    if (isSharedPost) {
      setTranslateX(-diffX);
      setTranslateY(0);
    } else {
      // Original behavior for non-shared posts
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setTranslateX(-diffX);
        setTranslateY(0);
      } else {
        setTranslateY(-diffY);
        setTranslateX(0);
      }
    }

    setTouchEnd(currentTouchY);
    setTouchEndX(currentTouchX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !touchStartX || !touchEndX) return;

    const distanceY = touchStart - touchEnd;
    const distanceX = touchStartX - touchEndX;

    // Handle horizontal swipes for image navigation
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          handleNextImage();
        } else {
          handlePreviousImage();
        }
      }
    } else if (!isSharedPost) {
      // Handle vertical swipes for post navigation only if not a shared post
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          onNext();
        } else {
          onPrevious();
        }
      }
    }

    // Reset states
    setTouchStart(null);
    setTouchStartX(null);
    setTouchEnd(null);
    setTouchEndX(null);
    setIsDragging(false);
    setTranslateY(0);
    setTranslateX(0);
  };

  useEffect(() => {
    if (currentImgIndex !== currentImageIndex) {
      setIsLoadingPreview(true);
      setCurrentImageIndex(currentImgIndex ?? 0);
    }
  }, [currentImgIndex, normalizedPost]);

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

  if (!isOpen) return null;

  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const handleSavePost = () => {
    savePostMutation({ postId: normalizedPost?.id });
  };

  const handleComment = (postId: number) => {
    setShowPostId(postId);
    setOpenComment(!openComment);
  };

  const PaginationDots = () => (
    <div className="flex justify-center gap-2 mt-4">
      {normalizedPost?.medias.map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            setIsLoadingPreview(true);
            setCurrentImageIndex(index);
          }}
          className={`w-2 h-2 rounded-full transition-all ${
            currentImageIndex === index ? "bg-black w-4" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );

  const RightIcons = ({ isMobile = false }) => (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-6" : "flex-row gap-4"
      } items-center`}
    >
      <button
        onClick={() => {
          if (!currentUser) {
            setPrompt("save this post");
            setShowLoginPrompt(true);
            return;
          }
          handleSavePost;
        }}
        className={` ${
          !isMobile && "flex gap-x-2 items-center"
        }inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        <span className="hidden md:block">Save</span>
      </button>
      <button
        onClick={() => {
          setSharePost(!sharePost);
        }}
        className={` ${
          !isMobile && "flex gap-x-2 items-center"
        }inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="w-7 h-7 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          ></path>
        </svg>
        <span className="hidden md:block">Share</span>
      </button>
      <button
        onClick={() => {
          if (!currentUser) {
            setPrompt("interact with this post");
            setShowLoginPrompt(true);
            return;
          }
        }}
        className={` ${
          !isMobile && "flex gap-x-2 items-center"
        }p-2 hover:bg-gray-100 hover:bg-opacity-20 rounded-full transition-colors`}
      >
        <PostDropdownButton setShowPostDropdown={setShowPostDropdown} />

        {/* <MoreVertical className="w-7 h-7" /> */}
      </button>
    </div>
  );

  const LeftIcons = ({ isMobile = false }) => (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-6" : "flex-row gap-4"
      } items-center`}
    >
      <GalleryPostInteractions
        post={normalizedPost}
        currentUser={currentUser}
        onClick={() => {
          if (!currentUser) {
            setPrompt("like this post");
            setShowLoginPrompt(true);
            return;
          }
        }}
      />

      <div>
        {normalizedPost?.medias?.length > 1 ? (
          // Multiple media - open modal
          <button
            onClick={() => {
              if (!currentUser) {
                setPrompt("download this post");
                setShowLoginPrompt(true);
                return;
              }
              setOpenMultipleDownload(true);
            }}
            className={`${
              !isMobile && "flex gap-x-2 items-center"
            } inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span className="hidden md:block">Download</span>
          </button>
        ) : (
          // Single media - direct download
          <a
            onClick={(e) => {
              if (!currentUser) {
                e.preventDefault(); // Prevent navigation
                setPrompt("download this post");
                setShowLoginPrompt(true);
              }
            }}
            href={
              currentUser
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${normalizedPost?.id}/medias/${normalizedPost?.medias[0]?.id}/download?user_token=${currentUser?.user_token}`
                : undefined
            }
            rel="noreferrer"
            download={!!currentUser}
            className={`${
              !isMobile && "flex gap-x-2 items-center"
            } inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 md:w-6 md:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span className="hidden md:block">Download</span>
          </a>
        )}
      </div>

      <button
        onClick={() => {
          if (!currentUser) {
            setPrompt("comment on this post");
            setShowLoginPrompt(true);
            return;
          }
          handleComment(normalizedPost?.id);
        }}
        className={` ${
          !isMobile && "flex gap-x-2 items-center"
        }inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-7 h-7 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        <span className="hidden md:block">Comment</span>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white text-black z-50 flex items-center justify-center no-scrollbar">
      <LoginPromptModal
        open={showLoginPrompt}
        handleModal={setShowLoginPrompt}
        prompt={prompt}
      />

      <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100  hover:text-black  rounded-full z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="absolute top-4 left-4 p-2 z-50">
          <GalleryAuthor post={normalizedPost} currentUser={currentUser} />
        </div>

        {normalizedPost?.medias.length > 1 && (
          <div className="hidden md:block">
            <div className="absolute z-50 bottom-1/4 right-4 flex gap-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
                disabled={currentImageIndex === 0}
                className={`inline-flex items-center ${
                  currentImageIndex === 0 ? "" : ""
                } rounded-lg bg-white p-2 shadow-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                disabled={
                  currentImageIndex === normalizedPost?.medias.length - 1
                }
                className={`inline-flex items-center ${
                  currentImageIndex === normalizedPost?.medias.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } rounded-lg bg-white p-2 shadow-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {/* Desktop-only navigation buttons */}
        {!isSharedPost && (
          <div className="hidden md:block">
            <button
              onClick={(e) => handleClick(e, onPrevious)}
              className="absolute cursor-pointer -left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 hover:text-black rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => handleClick(e, onNext)}
              className="absolute cursor-pointer -right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 hover:text-black rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {/* Mobile interaction icons - Left side */}
        <div className="md:hidden absolute left-4 bottom-32 flex flex-col gap-6 z-50">
          <LeftIcons isMobile={true} />
        </div>

        {/* Mobile interaction icons - Right side */}
        <div className="md:hidden absolute right-4 bottom-32 flex flex-col gap-6 z-50">
          <RightIcons isMobile={true} />
        </div>
        <PostDropdownMenu
          currentUser={currentUser}
          post={normalizedPost}
          showPostDropdown={showPostDropdown}
          setShowPostDropdown={setShowPostDropdown}
          showAsModal={true}
          handleParentModal={onClose}
        />
        {/* Main content with touch handlers */}
        <div
          ref={contentRef}
          className="relative w-full h-[70vh] touch-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translate(${translateX}px, ${translateY}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {normalizedPost?.type === "video" &&
          normalizedPost?.medias?.length ? (
            <CustomVideoPlayer normalizedPost={normalizedPost} />
          ) : (
            <>
              {isLoadingPreview && (
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  </div>
                </div>
              )}
              <div className="">
                <Image
                  src={getApiMedia(
                    currentMedia?.large_thumbnail || currentMedia?.path
                  )}
                  alt={normalizedPost?.title || "Gallery image"}
                  fill
                  className={`w-full object-contain rounded-lg transition-opacity duration-300 ${
                    isLoadingPreview ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setIsLoadingPreview(false)}
                  onError={() => setIsLoadingPreview(false)}
                />
              </div>
            </>
          )}
        </div>

        {normalizedPost?.medias.length > 1 && <PaginationDots />}
        <div className="hidden md:flex justify-between w-full max-w-4xl px-4 mt-4">
          <LeftIcons />
          <RightIcons />
        </div>

        {/* Swipe indicator for mobile */}
        <div className="md:hidden absolute bottom-8 left-1/2  -translate-x-1/2 text-sm text-gray-400">
          <ChevronUp className=" animate-bounce w-6 h-6" />
          <ChevronDown className=" animate-pulse w-6 h-6" />
        </div>

        {/* Title and description */}
        <div className="mt-4 text-center justify-center">
          {normalizedPost?.title && (
            <TruncatedDescription
              maxLength={isMobile ? 20 : 75}
              customStyles="text-lg md:text-xl font-semibold mb-2"
              title={normalizedPost.description}
              description={normalizedPost.title}
              invert={true}
              showDrawer={true}
            />
          )}
          {normalizedPost?.description && (
            <TruncatedDescription
              maxLength={isMobile ? 30 : 100}
              customStyles="text-gray-700"
              title={normalizedPost.title}
              description={normalizedPost.description}
              showDrawer={true}
            />
          )}
        </div>
      </div>

      {sharePost && (
        <SharePost
          handleModal={() => {
            setSharePost(!sharePost);
          }}
          url={`${normalizedPost?.slug}`}
          header={"Share post"}
          text={"Or copy link to share"}
          postId={normalizedPost?.id}
        />
      )}

      {openMultipleDownload && (
        <>
          {isMobile ? (
            <MobileBottomContentBar
              setOpen={setOpenMultipleDownload}
              open={openMultipleDownload}
            >
              <MultipleDownload post={normalizedPost} />
            </MobileBottomContentBar>
          ) : (
            <DesktopSideContentBar
              setOpen={setOpenMultipleDownload}
              open={openMultipleDownload}
            >
              <MultipleDownload post={normalizedPost} type="sidebar" />
            </DesktopSideContentBar>
          )}
        </>
      )}

      {showPostId === normalizedPost?.id && openComment ? (
        <>
          {isMobile ? (
            <MobileBottomContentBar setOpen={setOpenComment} open={openComment}>
              <CommentComp
                postId={normalizedPost?.id}
                setCommentCount={setcommentCount}
              />
            </MobileBottomContentBar>
          ) : (
            <DesktopSideContentBar setOpen={setOpenComment} open={openComment}>
              <CommentComp
                postId={normalizedPost?.id}
                type="sidebar"
                setCommentCount={setcommentCount}
              />
            </DesktopSideContentBar>
          )}
        </>
      ) : null}
    </div>
  );
};

const PostGalleryCard: React.FC<ImageCardProps> = ({
  post,
  index,
  onVideoHover,
  onVideoLeave,
  allPosts,
  isSelectable,
  onSelected,
  selected = [],
  showAuthor = false,
  refetchPosts = () => {},
}) => {
  const normalizedPost = (post as SavedPost)?.post || post;
  const { mutate: triggerImpression } = useImpression();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(index);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    const nextIndex =
      currentPostIndex === allPosts.length - 1 ? 0 : currentPostIndex + 1;
    setCurrentPostIndex(nextIndex);
    console.log("current post", allPosts[currentPostIndex]);

    // Reset image index when switching posts
    setCurrentImageIndex(0);
  };

  const handlePrevious = () => {
    const prevIndex =
      currentPostIndex === 0 ? allPosts.length - 1 : currentPostIndex - 1;
    setCurrentPostIndex(prevIndex);
    console.log("current post", allPosts[currentPostIndex]);
    // Reset image index when switching posts
    setCurrentImageIndex(0);
    console.log(currentImageIndex);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (isModalOpen) {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "Escape") setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setCurrentImageIndex(0);
    }
  }, [isModalOpen]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <>
      <div
        onMouseEnter={() => triggerImpression(post?.id)}
        className="break-inside-avoid mb-4 relative group"
        onClick={() => {
          if (isSelectable) {
            onSelected && onSelected(normalizedPost);
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        {normalizedPost?.type === "video" ? (
          <>
            {normalizedPost?.medias?.length && (
              <>
                <div className="relative aspect-video cursor-pointer">
                  {normalizedPost?.medias[0]?.file_view ? (
                    <Image
                      src={getApiMedia(normalizedPost?.medias[0]?.file_view)}
                      alt={`Saved post ${index + 1}`}
                      width={normalizedPost?.width || 400}
                      height={normalizedPost?.height || 300}
                      className={`w-full rounded-lg transition-opacity duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                      priority={index < 4}
                      onLoad={() => setIsLoading(false)}
                    />
                  ) : (
                    <Image
                      src="/assets/Img/letiviAlbum.png"
                      alt={`Saved post ${index + 1}`}
                      width={normalizedPost?.width || 400}
                      height={normalizedPost?.height || 300}
                      className={`w-full rounded-lg transition-opacity duration-300 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                      priority={index < 4}
                      onLoad={() => setIsLoading(false)}
                    />
                    // <video
                    //   className="w-full h-full object-cover rounded-lg"
                    //   src={getApiMedia(normalizedPost?.medias[0]?.path)}
                    //   controls
                    //   preload="metadata"
                    //   muted
                    //   loop
                    //   playsInline
                    //   onMouseEnter={(e) => onVideoHover(e.currentTarget)}
                    //   onMouseLeave={(e) => onVideoLeave(e.currentTarget)}
                    // />
                  )}

                  <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                  {showAuthor && (
                    <div className="flex absolute top-2 mb-1 left-4 items-center gap-x-2">
                      <img
                        className="object-cover w-8 h-8 rounded-lg"
                        src={getApiMedia(normalizedPost?.user?.picture)}
                        alt=""
                      />

                      <div>
                        <Link href={normalizedPost.user?.profile}>
                          <h1 className="text-sm md:text-base font-medium text-white capitalize underline ">
                            {normalizedPost?.user?.first_name}{" "}
                            {normalizedPost?.user?.last_name}
                          </h1>
                        </Link>
                      </div>
                    </div>
                  )}
                  {isSelectable && (
                    <div
                      className={`
                  absolute 
                  top-5 
                  right-5 
                  p-[10px] 
                  rounded-full 
                  border-2 
                  border-white
                  ${
                    selected.findIndex((el) => el.id === normalizedPost.id) ===
                    -1
                      ? "bg-white/90"
                      : "bg-[#EE364F]"
                  }
                `}
                    ></div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            {isLoading && (
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>
              </div>
            )}
            {normalizedPost?.medias?.length && (
              <>
                <Image
                  src={getApiMedia(
                    normalizedPost?.medias[0]?.large_thumbnail
                      ? `${normalizedPost?.medias[0]?.large_thumbnail}`
                      : `${normalizedPost?.medias[0]?.path}` || ""
                  )}
                  alt={`Saved post ${index + 1}`}
                  width={normalizedPost?.width || 400}
                  height={normalizedPost?.height || 300}
                  className={`w-full rounded-lg transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  priority={index < 4}
                  onLoad={() => setIsLoading(false)}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                {showAuthor && (
                  <div className="flex absolute bottom-1 mb-1 left-4 items-center gap-x-2">
                    <img
                      className="object-cover w-8 h-8 rounded-lg"
                      src={getApiMedia(normalizedPost?.user?.picture)}
                      alt=""
                    />

                    <div>
                      <Link href={normalizedPost.user?.profile}>
                        <h1 className="text-sm md:text-base font-medium text-white capitalize underline ">
                          {normalizedPost?.user?.first_name}{" "}
                          {normalizedPost?.user?.last_name}
                        </h1>
                      </Link>
                    </div>
                  </div>
                )}

                {isSelectable && (
                  <div
                    className={`
                  absolute 
                  top-5 
                  right-5 
                  p-[10px] 
                  rounded-full 
                  border-2 
                  border-white
                  ${
                    selected.findIndex((el) => el.id === normalizedPost.id) ===
                    -1
                      ? "bg-white/90"
                      : "bg-[#EE364F]"
                  }
                `}
                  ></div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <CarouselModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          refetchPosts();
        }}
        currentPost={allPosts[currentPostIndex]}
        currentImgIndex={currentImageIndex}
        allPosts={allPosts}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isSharedPost={false}
      />
    </>
  );
};

export default PostGalleryCard;
