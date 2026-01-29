import PostReaction from "@/components/atoms/PostReaction";
import React, { useState } from "react";

interface ReactionButtonProps {
  reactionsCount: {
    total: number;
    fit_bump_count: number;
    salut_count: number;
    bow_count: number;
  };
  selectedReaction: string;
  reactions: {
    liked: boolean;
    loved: boolean;
    clapped: boolean;
  };
  sendReaction: (reaction: string) => void;
}

const ReactionButton = ({
  reactionsCount,
  selectedReaction,
  reactions,
  sendReaction,
}: ReactionButtonProps) => {
  const [openReaction, setOpenReaction] = useState(false);

  const reactionsData = [
    {
      type: "Like",
      icon: "/assets/Svg/Dashboard/fist-bump.png",
      label: "Fist Bump",
      color: "text-blue-600",
    },
    {
      type: "Love",
      icon: "/assets/Svg/Dashboard/salute.png",
      label: "Salute",
      color: "text-red-600",
    },
    {
      type: "Clap",
      icon: "/assets/Svg/Dashboard/man-bowing.png",
      label: "Bow",
      color: "text-amber-800",
    },
    {
      type: "",
      icon: "/assets/Svg/Dashboard/react.png",
      label: "Emojis",
      color: "text-amber-800",
    },
  ];

  return (
    <button
      onClick={() => setOpenReaction(!openReaction)}
      className="relative flex items-center lg:p-2 px-1 lg:gap-x-2 gap-[1px]  py-1"
    >
      {reactionsCount?.total > 0 ? (
        reactionsData.map(
          (reaction) =>
            selectedReaction === reaction.type && (
              <React.Fragment key={reaction.type}>
                {reaction?.label === "Emojis" ? (
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
                    src={reaction.icon}
                    alt={reaction.type}
                    width={reaction.type === "Clap" ? 20 : 25}
                  />
                )}

                <p
                  className={`text-[8px] flex items-center gap-1 truncate lg:text-base ${reaction.color}`}
                >
                  {reaction.label}
                  <span className="text-[8px] md:text-[10px] text-black font-medium bg-na_yellow rounded-full size-4  flex justify-center items-center">
                    {reactionsCount.total}
                  </span>
                </p>
              </React.Fragment>
            )
        )
      ) : (
        <>
          {/* <img src={"/assets/Svg/Dashboard/react.png"} alt="." width={30} /> */}
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

          <p className="text-[8px] truncate lg:text-base">Emojis</p>
        </>
      )}

      {openReaction && (
        <PostReaction
          handleReactionModal={() => setOpenReaction(!openReaction)}
          sendReaction={sendReaction}
          reactions={reactions}
          reactionsCount={reactionsCount}
        />
      )}
    </button>
  );
};

export default ReactionButton;
