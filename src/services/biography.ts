import {
  Award,
  BasicFormData,
  Followers,
  Nomination,
  Organization,
  ProfessionalFormData,
  Project,
  ProjectUpdatePayload,
  Qualification,
} from "@/types/biography";
import { request } from "./axios-utils";
import { PaginationParams } from "@/types/common/pagination";
import { GalleryPostResponse } from "@/types/gallery";

export const fetchUserOrganizations = async (userId: number) => {
  return await request<Organization[]>({
    url: `/professionalinfo/organizations?user_id=${userId}`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserAwards = async (userId: number) => {
  return await request<Award[]>({
    url: `/professionalinfo/awards?user_id=${userId}`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserNominations = async (userId: number) => {
  return await request<Nomination[]>({
    url: `/professionalinfo/nominations?user_id=${userId}`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserQualifications = async (userId: number) => {
  return await request<Qualification[]>({
    url: `/professionalinfo/qualifications?user_id=${userId}`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserProjects = async () => {
  return await request<Project>({
    url: `/user/projects`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserFollowers = async (params: PaginationParams) => {
  return await request<Followers[]>({
    url: `/user/followers`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const fetchUserFollowing = async () => {
  return await request<Followers[]>({
    url: `/user/followings`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserEndorsedProjects = async () => {
  return await request<Followers[]>({
    url: `/user/endorsed-projects`,
    method: "GET",
    handleError: false,
  });
};

export const fetchUserEndorsedEvents = async (params: PaginationParams) => {
  return await request<Followers[]>({
    url: `/user/endorsed-events`,
    method: "GET",
    handleError: false,
    params,
  });
};

export const fetchUserEndorsedBusinesses = async () => {
  return await request<Followers[]>({
    url: `/user/endorsed-businesses`,
    method: "GET",
    handleError: false,
  });
};

export const updateUserProfile = async (data: BasicFormData) => {
  return await request<BasicFormData>({
    url: `/users/profile/updates`,
    method: "POST",
    data,
  });
};

export const updateProfessionalInfo = async (data: ProfessionalFormData) => {
  return await request<ProfessionalFormData>({
    url: `/professionalinfos`,
    method: "POST",
    data,
  });
};

export const updateUserProjects = async (data: ProjectUpdatePayload) => {
  return await request<Project>({
    url: `/user/projects`,
    method: "POST",
    data,
  });
};

export const getSharedUserGalleryPost = async (
  params: PaginationParams,
  userId: number
) => {
  return await request<GalleryPostResponse[]>({
    url: `/users/${userId}/posts`,
    method: "GET",
    params,
    handleError: false,
  });
};

export const getSharedUserProjects = async (userId: number) => {
  return await request<Project>({
    url: `/user/${userId}/projects`,
    method: "GET",
    handleError: false,
  });
};

export const getSharedUserWorkspaceProject = async (userId: number) => {
  return await request<any[]>({
    url: `/workspaceusers/${userId}/projects`,
    method: "GET",
    handleError: false,
  });
};
export const getSharedUserWorkspaceBusiness = async (userId: number) => {
  return await request<any[]>({
    url: `/workspaceusers/${userId}/businesses`,
    method: "GET",
    handleError: false,
  });
};
export const getSharedUserWorkspaceEvent = async (userId: number) => {
  return await request<any[]>({
    url: `/workspaceusers/${userId}/events`,
    method: "GET",
    handleError: false,
  });
};

export const uploadBioDocument = async (data: FormData) => {
  return await request<Project>({
    url: `uploadBio`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}`,
  });
};

export const updateUserBio = async (bio: string) => {
  return await request<any>({
    url: `/user/bio/update`,
    method: "POST",
    data: { bio },
  });
};
