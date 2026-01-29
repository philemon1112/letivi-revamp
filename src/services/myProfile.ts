import { BasicFormData, switchActionPayload } from "@/types/biography";
import { request } from "./axios-utils";

export const getMyProfile = async () => {
  return await request<any[]>({
    url: `/user/me`,
    method: "GET",
    handleError: false,
  });
};
export const updateProfile = async (data: BasicFormData) => {
  return await request<any[]>({
    url: `users/profile/photo`,
    method: "POST",
    data,
  });
};

export const togglePrivacy = async (data: switchActionPayload) => {
  return await request<any>({
    url: `/user/privacy-setting`,
    method: "POST",
    data,
  });
};
