import { deletePost } from "@/services/gallery";
import {
  addImpression,
  mutePost,
  savePost,
  sharePost,
  viewPost,
} from "@/services/posts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSavePost = () => {
  return useMutation({
    mutationFn: (postId: { postId: number }) => savePost(postId),
    onSuccess: () => {
      toast.success("Media saved successfully.");
    },
  });
};

export const useShare = () => {
  return useMutation({
    mutationFn: (postId: number) => sharePost(postId),
    onSuccess: () => {
      //   toast.success("Media saved successfully.");
    },
  });
};

export const useViewPost = () => {
  return useMutation({
    mutationFn: (postId: number) => viewPost(postId),
    onSuccess: () => {
      //   toast.success("Media saved successfully.");
    },
  });
};
export const useMutePost = () => {
  return useMutation({
    mutationFn: (postId: number) => mutePost(postId),
    onSuccess: () => {
      toast.success("Post Muted successfully.");
    },
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      toast.success("Post Deleted successfully.");
    },
  });
};

export const useImpression = () => {
  return useMutation({
    mutationFn: (postId: number) => addImpression(postId),
    onSuccess: () => {
      //   toast.success("Media saved successfully.");
    },
  });
};
