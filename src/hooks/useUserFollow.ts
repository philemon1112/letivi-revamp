// hooks/useFollow.ts
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser } from "@/services/auth";

interface UseFollowProps {
  userId: string;
  initialFollowState: boolean;
  initialFollowersCount: number;
}

export const useFollow = ({
  userId,
  initialFollowState,
  initialFollowersCount,
}: UseFollowProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: (userId: string) => followUnfollowUser(userId),
    onMutate: async (userId) => {
      // Optimistic update
      const previousFollowState = isFollowing;
      const previousFollowersCount = followersCount;

      // Update local state immediately
      setIsFollowing(!isFollowing);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));

      // Return context for rollback if needed
      return { previousFollowState, previousFollowersCount };
    },
    onError: (error, userId, context) => {
      // Rollback on error
      if (context) {
        setIsFollowing(context.previousFollowState);
        setFollowersCount(context.previousFollowersCount);
      }
      console.error("Follow/Unfollow error:", error);

      // You can also show a toast notification here
      // toast.error("Failed to update follow status");
    },
    onSuccess: (data) => {
      // Invalidate relevant queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["allProfessionals"] });

      // Optional: Update specific cache entries if you have them
      // queryClient.setQueryData(["userProfile", userId], (oldData) => {
      //   if (oldData) {
      //     return {
      //       ...oldData,
      //       is_followed: !isFollowing,
      //       total_followers: followersCount
      //     };
      //   }
      //   return oldData;
      // });

      // Show success notification
      // toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");
    },
  });

  const handleFollowToggle = () => {
    followMutation.mutate(userId);
  };

  return {
    isFollowing,
    followersCount,
    isLoading: followMutation.isPending,
    handleFollowToggle,
    error: followMutation.error,
  };
};
