"use client";

import MultipleMediaTag from "@/components/atoms/MultipleMediaTag";
import CustomVideoPlayer from "@/components/molecules/CustomVideoPlayer";
import MediaNavButtons from "@/components/molecules/MediaNavButtons";
import { useViewPost } from "@/hooks/usePost";
import { Post } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import { AnyCnameRecord } from "dns";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface PostMediaProps {
  post: any;
  setOpenPostDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isPostDetail?: boolean;
  currentImgIndex?: number;
}

const PostMedia = ({
  post,
  setOpenPostDetailsModal,
  isPostDetail,
  currentImgIndex,
}: PostMediaProps) => {
  const { mutateAsync: viewPostMutation } = useViewPost();
  const [currentImageIndex, setCurrentImageIndex] = useState(
    currentImgIndex ?? 0
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setCurrentImageIndex(currentImgIndex ?? 0);
  }, [currentImgIndex, post.id]);

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleViewMediaDetails = (e: React.MouseEvent) => {
    // viewPostMutation(post?.id);
    // Ensure modal is not already open
    if (isPostDetail) return;

    // Ensure click is not on a navigation button
    if ((e.target as HTMLElement).closest(".nav-button")) {
      return;
    }

    // Open the modal
    setOpenPostDetailsModal(true);
  };
  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % post.medias.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex =
      (currentImageIndex - 1 + post.medias.length) % post.medias.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <div
      className={`${isPostDetail ? "" : "hover:cursor-pointer"} `}
      onClick={handleViewMediaDetails}
    >
      {/* IF POST MEDIA IS AN IMAGE  */}
      {post.type === "image" ? (
        <div className="">
          <div className="relative">
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              placeholderSrc={"/assets/Img/plain-placeholder.png"}
              src={
                post?.medias?.length > 0
                  ? post?.medias[currentImageIndex]?.medium_thumbnail
                    ? getApiMedia(
                        post?.medias[currentImageIndex]?.medium_thumbnail
                      )
                    : getApiMedia(post?.medias[currentImageIndex]?.path)
                  : ""
              }
              alt={post?.title}
              width={"100%"}
              className="my-2 rounded-sm"
            />

            {/* IF POST HAS MULTIPLE MEDIA  */}
            {post?.medias?.length > 1 && (
              <>
                <MultipleMediaTag
                  imageLength={post?.medias?.length}
                  currentImageIndex={currentImageIndex + 1}
                />

                <MediaNavButtons
                  currentImageIndex={currentImageIndex}
                  totalImages={post?.medias?.length}
                  onNextImage={handleNextImage}
                  onPreviousImage={handlePreviousImage}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* IF POST MEDIA IS A VIDEO */}
          <video
            src={getApiMedia(
              isMobile
                ? post?.medias[currentImageIndex]?.small_thumbnail ??
                    post?.medias[currentImageIndex]?.path // Fallback for mobile
                : post?.medias[currentImageIndex]?.medium_thumbnail ??
                    post?.medias[currentImageIndex]?.path // Fallback for desktop
            )}
            loop
            controls
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
              display: "block",
              objectFit: "cover",
              backgroundColor: "rgba(0, 0, 0, 0)",
              objectPosition: "50% 50%",
            }}
          ></video>
          {/* <CustomVideoPlayer normalizedPost={post} /> */}

          {/* IF POST HAS MULTIPLE MEDIA  */}
          {post?.medias?.length > 1 && (
            <>
              <MultipleMediaTag
                imageLength={post?.medias?.length}
                currentImageIndex={currentImageIndex + 1}
              />

              <MediaNavButtons
                currentImageIndex={currentImageIndex}
                totalImages={post?.medias?.length}
                onNextImage={handleNextImage}
                onPreviousImage={handlePreviousImage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMedia;
