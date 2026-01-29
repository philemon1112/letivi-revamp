// @ts-nocheck
// GalleryPostReaction.tsx
import { ReactionCounts, ReactionStates, ReactionType } from "@/types/common";
interface PostReactionProps {
  handleReactionModal: () => void;
  sendReaction: (reactionType: string) => void;
  reactions: ReactionStates;
  reactionsCount: ReactionCounts;
  reactionsData: ReactionType[];
}

const GalleryPostReaction = ({
  handleReactionModal,
  sendReaction,
  reactions,
  reactionsCount,
  reactionsData,
}: PostReactionProps) => {
  const handleReact = (reactionType: string) => {
    sendReaction(reactionType);
    handleReactionModal(); // Close modal
  };

  return (
    <div className="absolute w-[180px] -top-16 -left-1 z-10 flex items-center justify-evenly space-x-1 bg-white rounded-full p-3 border border-black shadow-lg">
      {reactionsData?.map((reaction) => {
        const isActive = reactions[reaction.activeState];
        const reactionType = isActive ? `Un${reaction.type}` : reaction.type;
        const count = reactionsCount[reaction.countKey];

        return (
          <div key={reaction.type} className="flex flex-row items-center">
            <img
              onClick={() => handleReact(reactionType)}
              src={reaction.icon}
              alt={reaction.label}
              width={reaction.type === "Clap" ? 25 : 30}
              className={`cursor-pointer transition-all duration-300 ${
                isActive
                  ? `scale-110 ${reaction.color} filter brightness-125`
                  : "hover:scale-110"
              }`}
            />
            <span className="text-[10px] font-medium mt-1">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryPostReaction;
