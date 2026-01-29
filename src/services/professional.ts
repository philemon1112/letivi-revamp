import { UserProfile } from "@/types/events";
import { request } from "./axios-utils";
import { Professional } from "@/types/common/professional";
import { UserData } from "@/types/auth";
import { SearchPaginationParams } from "@/types/common/pagination";

export const getRecentProfessionals = async ({
  limit,
}: {
  limit?: number | null;
}) => {
  return await request<UserProfile[]>({
    url: `/frontpage/users`,
    method: "GET",
    params: {
      limit: limit,
    },
  });
};

interface getProfessionalsProps {
  limit?: number | null;
  pageParam?: number | null;
  loggedInUserId?: string | null;
  search?: string | null;
}

export const getProfessionals = async ({
  limit,
  pageParam,
  search,
  loggedInUserId,
}: getProfessionalsProps) => {
  return await request<Professional[]>({
    url: `/users`,
    method: "GET",
    params: {
      search: search ?? null,
      limit: limit,
      user_id: loggedInUserId ?? null,
      page: pageParam,
    },
  });
};

export const filterUsers = async (data: SearchPaginationParams) => {
  return await request<UserData[]>({
    url: `/user/search`,
    method: "POST",
    data,
    handleError: false,
  });
};
