interface PostReactionProps {
  handleReactionModal: () => void;
  sendReaction: (reactionType: string) => void;
  reactions: {
    liked: boolean;
    loved: boolean;
    clapped: boolean;
  };
  reactionsCount: {
    total: number;
    fit_bump_count: number;
    salut_count: number;
    bow_count: number;
  };
}
const PostReaction = ({
  handleReactionModal,
  sendReaction,
  reactions,
  reactionsCount,
}: PostReactionProps) => {
  const handleReact = (reactionType: string) => {
    sendReaction(reactionType);
    handleReactionModal(); // Close modal
  };
  // [110px] lg:w-[150px] -top-14 -left-6
  return (
    <div className="absolute w-[160px] -top-14 -left-1 z-10 flex items-center justify-evenly space-x-1 bg-white rounded-full p-2 border border-black">
      {reactions?.liked ? (
        <>
          <img
            onClick={() => handleReact("UnLike")}
            src={"/assets/Svg/Dashboard/fist-bump.png"}
            alt="."
            width={25}
          />
          <span className="text-[10px]">{reactionsCount.fit_bump_count}</span>
        </>
      ) : (
        <>
          <img
            onClick={() => handleReact("Like")}
            src={"/assets/Svg/Dashboard/fist-bump.png"}
            alt="."
            width={25}
          />
          <span className="text-[10px]">{reactionsCount.fit_bump_count}</span>
        </>
      )}
      {reactions?.loved ? (
        <>
          <img
            src={"/assets/Svg/Dashboard/salute.png"}
            alt=""
            width={25}
            onClick={() => handleReact("UnLove")}
          />
          <span className="text-[10px]">{reactionsCount.salut_count}</span>
        </>
      ) : (
        <>
          <img
            onClick={() => handleReact("Love")}
            src={"/assets/Svg/Dashboard/salute.png"}
            alt="."
            width={25}
          />
          <span className="text-[10px]">{reactionsCount.salut_count}</span>
        </>
      )}
      {reactions?.clapped ? (
        <>
          <img
            onClick={() => handleReact("UnClap")}
            src={"/assets/Svg/Dashboard/man-bowing.png"}
            alt=""
            width={20}
          />
          <span className="text-[10px]">{reactionsCount.bow_count}</span>
        </>
      ) : (
        <>
          <img
            onClick={() => handleReact("Clap")}
            src={"/assets/Svg/Dashboard/man-bowing.png"}
            alt=""
            width={20}
          />
          <span className="text-[10px]">{reactionsCount.bow_count}</span>
        </>
      )}
    </div>
  );
};

export default PostReaction;
