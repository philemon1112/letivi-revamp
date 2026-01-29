import { PaginationParams } from "@/types/common/pagination";
import { request } from "./axios-utils";
import {
  CollaboratorPayload,
  deleteCollaboratorPayload,
  Workspace,
} from "@/types/workspaces";
import {
  AlbumsData,
  Media,
  Post,
  PostUser,
  SavedPost,
  WorkspaceData,
} from "@/types/common";

// From the backend api the list of workspaces is gotten by combining data from these 3 endpoints (events, projects, businesses)

interface requestProps {
  limit?: number | null;
  pageParam?: number | null;
  loggedInUserId: string | null
}

export const getEvents = async ({ limit, pageParam, loggedInUserId }: requestProps) => {
  return await request<Workspace[]>({
    url: `/events`,
    method: "GET",
    params: {
      limit: limit,
      user_id: loggedInUserId ?? null,
      page: pageParam,
    },
  });
};
export const getProjects = async ({ limit, pageParam, loggedInUserId }: requestProps) => {
  return await request<Workspace[]>({
    url: `/projects`,
    method: "GET",
    params: {
      limit: limit,
      user_id: loggedInUserId,
      page: pageParam,
    },
  });
};
export const getBusinesses = async ({ limit, pageParam, loggedInUserId }: requestProps) => {
  return await request<Workspace[]>({
    url: `/businesses`,
    method: "GET",
    params: {
      limit: limit,
      user_id: loggedInUserId ?? null,
      page: pageParam,
    },
  });
};

export const getUserWorkspaceProjects = async (
  userId: number,
  params: PaginationParams
) => {
  return await request<Workspace[]>({
    url: `/workspaceusers/${userId}/projects`,
    method: "GET",
    handleError: false,
    params,
  });
};
export const getUserWorkspaceBusinesses = async (
  userId: number,
  params: PaginationParams
) => {
  return await request<Workspace[]>({
    url: `/workspaceusers/${userId}/businesses`,
    method: "GET",
    handleError: false,
    params,
  });
};
export const getUserWorkspaceEvents = async (
  userId: number,
  params: PaginationParams
) => {
  return await request<Workspace[]>({
    url: `/workspaceusers/${userId}/events`,
    method: "GET",
    handleError: false,
    params,
  });
};

export const createBusinessWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/businesses`,
    method: "POST",
    data,
  });
};

export const updateBusinessWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/business-update`,
    method: "POST",
    data,
  });
};

export const updateProjectWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/project-update`,
    method: "POST",
    data,
  });
};

export const createEventWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/events`,
    method: "POST",
    data,
  });
};

export const updateEventWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/event-update`,
    method: "POST",
    data,
  });
};

export const createProjectWorkspace = async (data: FormData) => {
  return await request<Workspace[]>({
    url: `/projects`,
    method: "POST",
    data,
  });
};

export const getBusinessDetails = async (id: string) => {
  return await request<WorkspaceData>({
    url: `/businesses/${id}`,
    method: "GET",
  });
};

export const getProjectDetails = async (id: string) => {
  return await request<WorkspaceData>({
    url: `/projects/${id}`,
    method: "GET",
  });
};

export const getEventDetails = async (id: string) => {
  return await request<WorkspaceData>({
    url: `/events/${id}`,
    method: "GET",
  });
};

export const getBusinessAlbums = async (
  id: string,
  params: PaginationParams
) => {
  return await request<AlbumsData[]>({
    url: `/workspaces/${id}/type/business/albums`,
    method: "GET",
    params,
  });
};

export const getProjectAlbums = async (
  id: string,
  params: PaginationParams
) => {
  return await request<AlbumsData[]>({
    url: `/workspaces/${id}/type/project/albums`,
    method: "GET",
    params,
  });
};

export const getEventAlbums = async (id: string, params: PaginationParams) => {
  return await request<AlbumsData[]>({
    url: `/workspaces/${id}/type/event/albums`,
    method: "GET",
    params,
  });
};

export const getBusinessPosts = async (
  id: string,
  params: PaginationParams
) => {
  return await request<Post[]>({
    url: `/businesses/${id}/posts`,
    method: "GET",
    params,
  });
};

export const getProjectsPosts = async (
  id: string,
  params: PaginationParams
) => {
  return await request<Post[]>({
    url: `/projects/${id}/posts`,
    method: "GET",
    params,
  });
};

export const getEventsPosts = async (id: string, params: PaginationParams) => {
  return await request<Post[]>({
    url: `/events/${id}/posts`,
    method: "GET",
    params,
  });
};

export const deleteBusinessWorkspace = async (id: number) => {
  return await request<Workspace[]>({
    url: `/delete-business`,
    method: "POST",
    data: { business_id: id },
  });
};

export const deleteProjectWorkspace = async (id: number) => {
  return await request<Workspace[]>({
    url: `/delete-project`,
    method: "POST",
    data: { project_id: id },
  });
};

export const deleteEventWorkspace = async (id: number) => {
  return await request<Workspace[]>({
    url: `/delete-event`,
    method: "POST",
    data: { event_id: id },
  });
};

export const addBusinessCollaborators = async (data: CollaboratorPayload) => {
  return await request<Workspace[]>({
    url: `/business/memberships`,
    method: "POST",
    data,
  });
};

export const addProjectCollaborators = async (data: CollaboratorPayload) => {
  return await request<Workspace[]>({
    url: `/project/memberships`,
    method: "POST",
    data,
  });
};

export const addEventCollaborators = async (data: CollaboratorPayload) => {
  return await request<Workspace[]>({
    url: `/event/memberships`,
    method: "POST",
    data,
  });
};

export const removeBusinessCollaborator = async (
  data: deleteCollaboratorPayload
) => {
  return await request<Workspace[]>({
    url: `/business/memberships/remove`,
    method: "POST",
    data,
  });
};

export const removeProjectCollaborator = async (
  data: deleteCollaboratorPayload
) => {
  return await request<Workspace[]>({
    url: `/project/memberships/remove`,
    method: "POST",
    data,
  });
};

export const removeEventCollaborator = async (
  data: deleteCollaboratorPayload
) => {
  return await request<Workspace[]>({
    url: `/event/memberships/remove`,
    method: "POST",
    data,
  });
};

export const getSharedBusinessDetails = async (name: string) => {
  return await request<WorkspaceData>({
    url: `/business/${name}?user_id=${null}`,
    method: "GET",
  });
};

export const getSharedBusinessPosts = async (
  name: string,
  params: PaginationParams
) => {
  return await request<Post[]>({
    url: `/business/${name}/posts?user_id=${null}`,
    method: "GET",
    params,
  });
};

export const getSharedProjectDetails = async (name: string) => {
  return await request<WorkspaceData>({
    url: `/project/${name}?user_id=${null}`,
    method: "GET",
  });
};

export const getSharedProjectPosts = async (
  name: string,
  params: PaginationParams
) => {
  return await request<Post[]>({
    url: `/project/${name}/posts?user_id=${null}`,
    method: "GET",
    params,
  });
};

export const getSharedEventDetails = async (name: string) => {
  return await request<WorkspaceData>({
    url: `/event/${name}?user_id=${null}`,
    method: "GET",
  });
};

export const getSharedEventPosts = async (
  name: string,
  params: PaginationParams
) => {
  return await request<Post[]>({
    url: `/event/${name}/posts?user_id=${null}`,
    method: "GET",
    params,
  });
};

export const followUnfollowBusiness = async (businessId: string) => {
  return await request<any>({
    url: `/business-followorunfollow`,
    method: "POST",
    data: { business_id: businessId },
  });
};

export const followUnfollowEvent = async (eventId: string) => {
  return await request<any>({
    url: `/event-followorunfollow`,
    method: "POST",
    data: { event_id: eventId },
  });
};

export const followUnfollowProject = async (projectId: string) => {
  return await request<any>({
    url: `/project-followorunfollow`,
    method: "POST",
    data: { project_id: projectId },
  });
};
