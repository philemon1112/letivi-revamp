// hooks/useFollow.ts
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  followUnfollowBusiness,
  followUnfollowEvent,
  followUnfollowProject,
} from "@/services/workspaces";

interface UseFollowProps {
  workspaceId: string;
  type: string;
  initialFollowState: boolean;
  initialFollowersCount: number;
}

export const useWorkspaceEndorse = ({
  workspaceId,
  initialFollowState,
  initialFollowersCount,
  type,
}: UseFollowProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async (workspaceId: string) => {
      if (type === "event") {
        return followUnfollowEvent(workspaceId);
      } else if (type === "project") {
        return followUnfollowProject(workspaceId);
      } else if (type === "business") {
        return followUnfollowBusiness(workspaceId);
      } else {
        return console.log("error");
      }
    },
    onMutate: async (workspaceId) => {
      // Optimistic update
      const previousFollowState = isFollowing;
      const previousFollowersCount = followersCount;

      // Update local state immediately
      setIsFollowing(!isFollowing);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));

      // Return context for rollback if needed
      return { previousFollowState, previousFollowersCount };
    },
    onError: (error, workspaceId, context) => {
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
      if (type === "event") {
        queryClient.invalidateQueries({
          queryKey: ["SharedEventDetails"],
        });
        queryClient.invalidateQueries({
          queryKey: ["allEvents"],
        });
      } else if (type === "project") {
        queryClient.invalidateQueries({
          queryKey: ["allProjects"],
        });
        queryClient.invalidateQueries({
          queryKey: ["sharedProjectDetails"],
        });
      } else if (type === "business") {
        queryClient.invalidateQueries({
          queryKey: ["allBusinesses"],
        });
        queryClient.invalidateQueries({
          queryKey: ["SharedBusinessDetails"],
        });
      } else {
        return console.log("error");
      }

      // Show success notification
      // toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");
    },
  });

  const handleFollowToggle = () => {
    followMutation.mutate(workspaceId);
  };

  return {
    isFollowing,
    followersCount,
    isLoading: followMutation.isPending,
    handleFollowToggle,
    error: followMutation.error,
  };
};
