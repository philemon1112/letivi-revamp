import { Response, request } from "./axios-utils";

export const likePost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/fitbumps`,
    method: "POST",
    data: postId,
  });

  return response.data;
};

export const unLikePost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/fitbumps`,
    method: "POST",
    data: postId,
  });

  return response.data;
};

export const salutePost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/saluts`,
    method: "POST",
    data: postId,
  });

  return response.data;
};
export const unSalutePost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/saluts`,
    method: "POST",
    data: postId,
  });

  return response.data;
};

export const bowToPost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/bows`,
    method: "POST",
    data: postId,
  });

  return response.data;
};
export const unBowToPost = async (postId: { post_id: number }) => {
  const response = await request<Response<any>>({
    url: `/post/bows`,
    method: "POST",
    data: postId,
  });

  return response.data;
};

