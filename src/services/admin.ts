import {
  AdminUser,
  DashboardStats,
  ActivationForm,
  DectivationForm,
  RevokeRoleForm,
  UserData,
  emailBroadcastPayload,
} from "@/types/admin";
import { request } from "./axios-utils";
import {
  PaginationParams,
  SearchPaginationParams,
} from "@/types/common/pagination";
import {
  IndustriesData,
  Permission,
  UserRoleDetails,
  UserRolesData,
  WorkspaceData,
  AssignPermissionData,
  AssignUserData,
} from "@/types/common";

export const getDashboardStats = async () => {
  return await request<DashboardStats>({
    url: `/dashboards`,
    method: "GET",
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getAdminUsersList = async (params: PaginationParams) => {
  return await request<AdminUser[]>({
    url: `/admin/users`,
    method: "GET",
    params,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getAllUsersList = async (params: PaginationParams) => {
  return await request<UserData[]>({
    url: `/users`,
    method: "GET",
    params,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getSearchUsersList = async (data: SearchPaginationParams) => {
  return await request<UserData[]>({
    url: `/user/search`,
    method: "POST",
    data,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const deactivateAccount = async (data: DectivationForm) => {
  return await request<any>({
    url: `/user/account/deactivate`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const activateAccount = async (data: ActivationForm) => {
  return await request<any>({
    url: `/user/accountrecoveries`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const revokeUserRole = async (data: RevokeRoleForm) => {
  return await request<any>({
    url: `/revokeuserfromroles`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const deleteUser = async (userId: number) => {
  return await request<any>({
    url: `/users/${userId}`,
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const resendUserVerification = async (userToken: string) => {
  return await request<any>({
    url: `/users/${userToken}`,
    method: "POST",
  });
};

export const validateUserEmail = async (email: string) => {
  return await request<any>({
    url: `mails/`,
    data: { email },
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}`,
  });
};

export const sendInvite = async (receipent_email: string) => {
  return await request<any>({
    url: `/sendinvite/`,
    data: { receipent_email },
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const createUser = async (data: any) => {
  return await request<any>({
    url: `/user/signup`,
    data,
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getEventWorkspaceList = async (params: PaginationParams) => {
  return await request<WorkspaceData[]>({
    url: `/events/`,
    method: "GET",
    params,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getBusinessWorkspaceList = async (params: PaginationParams) => {
  return await request<WorkspaceData[]>({
    url: `/businesses/`,
    method: "GET",
    params,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getProjectWorkspaceList = async (params: PaginationParams) => {
  return await request<WorkspaceData[]>({
    url: `/projects/`,
    method: "GET",
    params,
    handleError: false,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const removeWorkspace = async (workspaceId: number) => {
  return await request<any>({
    url: `/delete-business`,
    data: { business_id: workspaceId },
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getIndustryList = async (params: PaginationParams) => {
  return await request<IndustriesData[]>({
    url: `/industries`,
    method: "GET",
    params,
  });
};

export const createIndustry = async (name: string) => {
  return await request<any>({
    url: `/industries/`,
    data: { name },
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const editIndustry = async (industryId: number, name: string) => {
  return await request<any>({
    url: `/industries/${industryId}`,
    data: { name },
    method: "PUT",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const removeIndustry = async (industryId: number) => {
  return await request<any>({
    url: `/industries/${industryId}`,
    method: "DELETE",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getUserRolesList = async (params: PaginationParams) => {
  return await request<UserRolesData[]>({
    url: `/roles`,
    method: "GET",
    params,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const createUserRole = async (role: string) => {
  return await request<any>({
    url: `/roles/`,
    data: { role },
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const editUserRole = async (roleId: number, role: string) => {
  return await request<any>({
    url: `/roles/${roleId}`,
    data: { role },
    method: "PUT",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getUserRolePermissions = async (roleId: number) => {
  return await request<UserRoleDetails>({
    url: `/roles/${roleId}`,
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const getPermissions = async () => {
  return await request<Permission[]>({
    url: `/permissions`,
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const AssignPermissions = async (data: AssignPermissionData) => {
  return await request<any>({
    url: `/rolehaspermissions`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const AssignUserToRole = async (data: AssignUserData) => {
  return await request<any>({
    url: `/assignusertoroles`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const sendEmailBroadcast = async (data: emailBroadcastPayload) => {
  return await request<any>({
    url: `/sendmail`,
    method: "POST",
    data,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const searchBusinesses = async (query: string) => {
  return await request<WorkspaceData[]>({
    url: `/business/search?query=${query}`,
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const searchEvents = async (query: string) => {
  return await request<WorkspaceData[]>({
    url: `/event/search?query=${query}`,
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};

export const searchProjects = async (query: string) => {
  return await request<WorkspaceData[]>({
    url: `/project/search?query=${query}`,
    method: "GET",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}admin/v1`,
  });
};
