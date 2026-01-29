import { PaginationParams } from "@/types/common/pagination";
import { request } from "./axios-utils";
import {
  AlbumDetailsResponse,
  BioDownloadersResponse,
  GalleryPostResponse,
  PostDownloadersResponse,
  SavedResponse,
} from "@/types/gallery";
import { AlbumFormData, AlbumsData, PostUser, SavedPost } from "@/types/common";

export const getUserSavedPost = async (params: PaginationParams) => {
  return await request<SavedResponse[]>({
    url: `/user/saved/posts`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getMyDownloads = async (params: PaginationParams) => {
  return await request<SavedPost[]>({
    url: `/my/downloads/posts`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getMyBiographyDownloaders = async (params: PaginationParams) => {
  return await request<BioDownloadersResponse[]>({
    url: `/my/bio/downloaders`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getMyPostDownloaders = async (params: PaginationParams) => {
  return await request<PostDownloadersResponse[]>({
    url: `/my/posts/downloaded`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getPostUserDownloadersList = async (postId: number) => {
  return await request<PostUser[]>({
    url: `/my/posts/downloaders`,
    method: "GET",
    params: {
      post_id: postId,
    },
    handleError: false,
  });
};

export const getUserGalleryPost = async (params: PaginationParams) => {
  return await request<GalleryPostResponse[]>({
    url: `/user/posts`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getUserAlbums = async (params: PaginationParams) => {
  return await request<AlbumsData[]>({
    url: `/me/albums`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const createAlbum = async (data: AlbumFormData) => {
  return await request<AlbumsData[]>({
    url: `albums`,
    method: "POST",
    data,
    handleError: false,
  });
};

export const editAlbum = async (albumId: number, data: AlbumFormData) => {
  return await request<AlbumsData[]>({
    url: `/album-update/${albumId}`,
    method: "PUT",
    data,
    handleError: false,
  });
};

export const deleteAlbum = async (albumId: number) => {
  return await request<AlbumsData[]>({
    url: `/delete-album/${albumId}`,
    method: "DELETE",
    handleError: false,
  });
};

export const getAlbumsPost = async (albumId: string, userId: number) => {
  return await request<AlbumDetailsResponse>({
    url: `/albums/${albumId}?user_id=${userId}`,
    method: "GET",
    handleError: false,
  });
};

export const deletePost = async (postId: number) => {
  return await request<AlbumDetailsResponse>({
    url: `/posts/${postId}`,
    method: "delete",
  });
};

export const getSharedAlbumDetails = async (name: string) => {
  return await request<AlbumDetailsResponse>({
    url: `/album/${name}`,
    method: "GET",
    handleError: false,
  });
};
