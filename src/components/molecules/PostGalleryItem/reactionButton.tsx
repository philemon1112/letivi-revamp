// @ts-nocheck
// GalleryReactionButton.tsx with added debugging
import { useState, useEffect } from "react";
import GalleryPostReaction from "./postReaction";
import { ReactionCounts, ReactionStates, ReactionType } from "@/types/common";

interface ReactionButtonProps {
  reactionsCount: ReactionCounts;
  selectedReaction: string;
  reactions: ReactionStates;
  sendReaction: (reaction: string) => void;
  reactionsData: ReactionType[];
}

const GalleryReactionButton = ({
  reactionsCount,
  selectedReaction,
  reactions,
  sendReaction,
  reactionsData,
}: ReactionButtonProps) => {
  const [openReaction, setOpenReaction] = useState(false);

  // Debug logs
  useEffect(() => {}, [
    openReaction,
    selectedReaction,
    reactions,
    reactionsCount,
  ]);

  // Find the selected reaction data or use default
  const selectedReactionData = selectedReaction
    ? reactionsData.find((r) => r.type === selectedReaction)
    : { icon: "/assets/Svg/Dashboard/react.png", label: "Emojis", color: "" };

  const toggleReaction = () => {
    setOpenReaction(!openReaction);
  };

  return (
    <button
      className="relative flex items-center lg:p-2 px-1 lg:gap-x-2 gap-[1px] py-1 hover:bg-gray-100 rounded-lg transition-colors"
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        toggleReaction();
      }}
    >
      {reactionsCount?.total > 0 && selectedReactionData ? (
        <>
          {selectedReactionData.label === "Emojis" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : (
            <img
              src={selectedReactionData.icon}
              alt={selectedReactionData.label}
              width={selectedReactionData.type === "Clap" ? 20 : 25}
              className="transition-transform hover:scale-110"
            />
          )}

          <p
            className={`text-[8px]  items-center gap-1 truncate hidden md:flex lg:text-base ${selectedReactionData.color}`}
          >
            {selectedReactionData.label}
            <span className="text-[8px] md:text-[10px] text-black font-medium bg-na_yellow rounded-full size-4 flex justify-center items-center">
              {reactionsCount.total}
            </span>
          </p>
        </>
      ) : (
        <>
          {/* <img
            src="/assets/Svg/Dashboard/react.png"
            alt="Emojis"
            width={30}
            className="transition-transform hover:scale-110"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <p className="text-[8px] truncate lg:text-base md:block hidden">
            Emojis
          </p>
        </>
      )}

      {openReaction && (
        <div className="debugging-wrapper" onClick={(e) => e.stopPropagation()}>
          <GalleryPostReaction
            handleReactionModal={toggleReaction}
            sendReaction={sendReaction}
            reactions={reactions}
            reactionsCount={reactionsCount}
            reactionsData={reactionsData}
          />
        </div>
      )}
    </button>
  );
};

export default GalleryReactionButton;
