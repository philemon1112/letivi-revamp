// @ts-nocheck
// GalleryPostInteractions.tsx
import { useState } from "react";
import {
  useBowToPost,
  useLikePost,
  useSalutePost,
  useUnBowToPost,
  useUnLikePost,
  useUnSalutePost,
} from "@/hooks/usePostReaction";
import GalleryReactionButton from "./reactionButton";
import { ReactionCounts, ReactionStates, ReactionType } from "@/types/common";

// Define all reactions data once
const REACTIONS_DATA: ReactionType[] = [
  {
    type: "Like",
    icon: "/assets/Svg/Dashboard/fist-bump.png",
    label: "Fist Bump",
    color: "text-na_blue",
    activeState: "liked",
    countKey: "fit_bump_count",
    addMutation: "likePostMutation",
    removeMutation: "unLikePostMutation",
  },
  {
    type: "Love",
    icon: "/assets/Svg/Dashboard/salute.png",
    label: "Salute",
    color: "text-na_red",
    activeState: "loved",
    countKey: "salut_count",
    addMutation: "salutePostMutation",
    removeMutation: "unSalutePostMutation",
  },
  {
    type: "Clap",
    icon: "/assets/Svg/Dashboard/man-bowing.png",
    label: "Bow",
    color: "text-amber-800",
    activeState: "clapped",
    countKey: "bow_count",
    addMutation: "bowToPostMutation",
    removeMutation: "unBowToPostMutation",
  },
];

interface PostInteractionsProps {
  post: any; // Replace with your Post type// Replace with your User type
}

const GalleryPostInteractions = ({ post }: PostInteractionsProps) => {
  // Initialize state based on post data
  const [reactionsCount, setReactionsCount] = useState<ReactionCounts>({
    total: post?.fit_bump_count + post?.salut_count + post?.bow_count || 0,
    fit_bump_count: post?.fit_bump_count || 0,
    salut_count: post?.salut_count || 0,
    bow_count: post?.bow_count || 0,
  });

  // Determine initial selected reaction
  const getInitialReaction = () => {
    if (post?.fitsbumped) return "Like";
    if (post?.saluted) return "Love";
    if (post?.bowed) return "Clap";
    return "";
  };

  const [selectedReaction, setSelectedReaction] = useState(
    post?.fitsbumped
      ? "Like"
      : post?.saluted
      ? "Love"
      : post?.bowed
      ? "Clap"
      : ""
  );

  // const [selectedReaction, setSelectedReaction] = useState<string>(
  //   getInitialReaction()
  // );
  const [reactions, setReactions] = useState<ReactionStates>({
    liked: Boolean(post?.fitsbumped),
    loved: Boolean(post?.saluted),
    clapped: Boolean(post?.bowed),
  });

  // Setup all mutations
  const { mutateAsync: likePostMutation } = useLikePost();
  const { mutateAsync: unLikePostMutation } = useUnLikePost();
  const { mutateAsync: salutePostMutation } = useSalutePost();
  const { mutateAsync: unSalutePostMutation } = useUnSalutePost();
  const { mutateAsync: bowToPostMutation } = useBowToPost();
  const { mutateAsync: unBowToPostMutation } = useUnBowToPost();

  // Map of mutations for easier access
  const mutations = {
    likePostMutation,
    unLikePostMutation,
    salutePostMutation,
    unSalutePostMutation,
    bowToPostMutation,
    unBowToPostMutation,
  };

  // Simplified reaction handler
  const sendReaction = (reactionType: string) => {
    // Find the reaction data
    const reactionData = REACTIONS_DATA.find(
      (r) => r.type === reactionType || `Un${r.type}` === reactionType
    );

    if (!reactionData) return;

    const isRemovingReaction = reactionType.startsWith("Un");
    const actualType = isRemovingReaction
      ? reactionType.slice(2)
      : reactionType;

    // Update selected reaction
    setSelectedReaction(isRemovingReaction ? "" : actualType);

    // Update reaction states
    setReactions((prev) => ({
      ...prev,
      [reactionData.activeState]: !isRemovingReaction,
    }));

    // Update counts
    setReactionsCount((prev) => ({
      ...prev,
      total: prev.total + (isRemovingReaction ? -1 : 1),
      [reactionData.countKey]:
        prev[reactionData.countKey] + (isRemovingReaction ? -1 : 1),
    }));

    // Call appropriate mutation
    const mutationKey = isRemovingReaction
      ? reactionData.removeMutation
      : reactionData.addMutation;

    mutations[mutationKey]({ post_id: post?.id });
  };

  return (
    <>
      <div className="inline-flex items-center text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50">
        <GalleryReactionButton
          reactionsCount={reactionsCount}
          reactions={reactions}
          selectedReaction={selectedReaction}
          sendReaction={sendReaction}
          reactionsData={REACTIONS_DATA}
        />
      </div>
    </>
  );
};

export default GalleryPostInteractions;
