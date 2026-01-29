"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getApiMedia } from "@/utils/getApiMedia";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Modal from "@/components/molecules/Modal";
import PostAuthor from "./PostAuthor";
import PostDropdownButton from "./PostDropdownButton";
import PostDropdownMenu from "./PostDropdownMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PostTitleAndDesc from "./PostTitleAndDesc";
import PostMedia from "./PostMedia";
import PostInteractions from "./PostInteractions";

interface Media {
  path: string;
  large_thumbnail?: string;
}

interface PostMedia {
  medias: Media[];
  type: "video" | "image";
  title?: string;
  description?: string;
}

interface Post {
  id: string;
  post: PostMedia;
  width?: number;
  height?: number;
}

interface CarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPost: Post;
  allPosts: Post[];
  onNext: () => void;
  onPrevious: () => void;
  currentImageIndex: number;
}

export const CarouselModal: React.FC<CarouselModalProps> = ({
  isOpen,
  onClose,
  currentPost,
  allPosts,
  currentImageIndex,
  onNext,
  onPrevious,
}) => {
  const currentUser = useCurrentUser();
  const [openComment, setOpenComment] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const [showPostDropdown, setShowPostDropdown] = useState(false);
  if (!isOpen) return null;

  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent event from bubbling up
    action();
  };

  return (
    <Modal
      show={isOpen}
      onCloseAction={onClose}
      overlay="dark"
      size="3xl"
      className="relative !p-2 overflow-visible no-scrollbar"
      showCloseIcon={true}
    >
      <div
      // className="fixed inset-0 bg-black text-white z-50 flex items-center justify-center"
      >
        <div className="">
          {/* Navigation buttons */}
          <button
            onClick={(e) => handleClick(e, onPrevious)}
            className="absolute cursor-pointer left-0 md:-left-32 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => handleClick(e, onNext)}
            className="absolute cursor-pointer right-0
             md:-right-32 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <PostMedia
            post={currentPost?.post}
            setOpenPostDetailsModal={() => {}}
            isPostDetail={true}
            currentImgIndex={currentImageIndex}
          />

          {/* Title and description */}
          {/* <button onClick={onNext}>Next here</button> */}
          <div className="relative flex items-center justify-between gap-2">
            <PostAuthor post={currentPost?.post} currentUser={currentUser} />
            <PostDropdownButton setShowPostDropdown={setShowPostDropdown} />
            <PostDropdownMenu
              currentUser={currentUser}
              post={currentPost?.post}
              showPostDropdown={showPostDropdown}
              setShowPostDropdown={setShowPostDropdown}
            />
          </div>

          {/* POST CONTENT STARTS */}
          <div className="hover:cursor-pointer">
            <PostTitleAndDesc post={currentPost?.post} />
          </div>

          {/* POST INTERACTIONS */}
          <PostInteractions
            post={currentPost?.post}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Modal>
  );
};
