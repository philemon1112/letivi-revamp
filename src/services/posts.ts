import { PaginationParams } from "@/types/common/pagination";
import { Response, request } from "./axios-utils";
import { Post, SaveToGalleryForms } from "@/types/nature";

interface getUserPostsProps {
  token: string;
  limit?: number;
}

export const getAllPosts = async (params: PaginationParams) => {
  return await request<Post[]>({
    url: `/explore/posts`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getUserPosts = async ({ token, limit }: getUserPostsProps) => {
  return await request<Response<any>>({
    url: `user/posts`,
    method: "GET",
    params: {
      limit: limit,
    },
    data: token,
  });
};

interface getPostsProps {
  limit?: number;
  pageParam?: number;
  userId?: string;
}

export const getPosts = async ({ limit, pageParam, userId }: getPostsProps) => {
  return await request<Response<any>>({
    url: `/posts`,
    method: "GET",
    params: {
      limit: limit,
      user_id: userId,
      page: pageParam,
    },
  });
};

export const getPeopleiIFollow = async () => {
  return await request<Response<any>>({
    url: `/amfollowing`,
    method: "GET",
  });
};

export const getPostComments = async (postId: number) => {
  console.log("Fetching post comments of post: ", postId);
  return await request<Response<any>>({
    url: `/posts/${postId}/comments`,
    method: "GET",
  });
};

interface commentOnPostProps {
  newComment: string | undefined;
  postId: number;
}
export const commentOnPost = async ({
  newComment,
  postId,
}: commentOnPostProps) => {
  console.log("Commenting on post: ", postId);
  return await request<Response<any>>({
    url: `/posts/${postId}/comments`,
    method: "POST",
    data: { comment: newComment },
  });
};

export const savePost = async ({ postId }: { postId: number }) => {
  return await request<Response<any>>({
    url: `/post/saves`,
    method: "POST",
    data: { post_id: postId },
  });
};

export const sharePost = async (postId: number) => {
  return await request<Response<any>>({
    url: `/share/post/${postId}`,
    method: "POST",
  });
};

export const viewPost = async (postId: number) => {
  return await request<Response<any>>({
    url: `/post/views`,
    method: "POST",
    data: { post_id: postId },
  });
};

export const mutePost = async (postId: number) => {
  return await request<Response<any>>({
    url: `mute/post/${postId}`,
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}`,
  });
};

export const createPost = async (
  data: FormData,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  return await request<any>({
    url: `/posts`,
    method: "POST",
    data,
    onUploadProgress, // Pass onUploadProgress callback
  });
};

export const savePostToGallery = async (
  data: SaveToGalleryForms,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  return await request<any>({
    url: `/posts/fromurls`,
    method: "POST",
    data,
    onUploadProgress, // Pass onUploadProgress callback
  });
};

export const updatePost = async (
  postId: number,
  data: FormData,
  onUploadProgress?: (progressEvent: ProgressEvent) => void
) => {
  return await request<any>({
    url: `/posts/${postId}`,
    method: "POST",
    data,
    onUploadProgress, // Pass onUploadProgress callback
  });
};

export const getReportFlags = async () => {
  return await request<any[]>({
    url: `/complainflags`,
    method: "GET",
  });
};

export const submitReport = async (data: any) => {
  return await request<any>({
    url: `/complaints`,
    method: "POST",
    data,
  });
};

export const addImpression = async (postId: number) => {
  return await request<Response<any>>({
    url: `impressions`,
    method: "POST",
    data: { post_id: postId },
  });
};
