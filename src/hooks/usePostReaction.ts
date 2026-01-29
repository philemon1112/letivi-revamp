import {
  bowToPost,
  likePost,
  salutePost,
  unBowToPost,
  unLikePost,
  unSalutePost,
} from "@/services/postReaction";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return likePost(postId);
    },
    onSuccess: (data) => {
      console.log("like successful", data);
    },
  });
};

export const useUnLikePost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return unLikePost(postId);
    },
    onSuccess: (data) => {
      console.log("unlike successful", data);
    },
  });
};

export const useSalutePost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return salutePost(postId);
    },
    onSuccess: (data) => {
      console.log("salute post successful", data);
    },
  });
};

export const useUnSalutePost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return unSalutePost(postId);
    },
    onSuccess: (data) => {
      console.log("unSalute post successful", data);
    },
  });
};
export const useBowToPost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return bowToPost(postId);
    },
    onSuccess: (data) => {
      console.log("Bow post successful", data);
    },
  });
};
export const useUnBowToPost = () => {
  return useMutation({
    mutationFn: (postId: { post_id: number }) => {
      return unBowToPost(postId);
    },
    onSuccess: (data) => {
      console.log("UnBow post successful", data);
    },
  });
};
