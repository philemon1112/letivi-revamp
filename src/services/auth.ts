import { Response, request } from "./axios-utils";
import { ContactFormData } from "@/types/contact";
import { LoginData, UpdatePasswordPayload } from "@/types/auth";
import Cookies from "js-cookie";

export const loginUser = async (data: LoginData) => {
  const response = await request<Response<any>>({
    url: `/login`,
    method: "POST",
    data,
  });

  return response.data;
};

export const loginUserWithGoogle = async (data: string) => {
  const response = await request<Response<any>>({
    url: `/googlelogin`,
    method: "POST",
    data,
  });

  return response.data;
};

export const changeUserEmail = async (email: string) => {
  return await request<any>({
    url: `/users/email-update`,
    method: "PATCH",
    data: { email },
  });
};

export const changeUserPassword = async (data: UpdatePasswordPayload) => {
  return await request<any>({
    url: `/users/update-password`,
    method: "PATCH",
    data,
  });
};

export const deactivateUserAccount = async () => {
  return await request<any>({
    url: `/users/account/deactivate`,
    method: "POST",
  });
};

export const enableTwoFactor = async () => {
  return await request<any>({
    url: `/users/enable-twofa`,
    method: "POST",
    data: { action: "on" },
  });
};

export const disableTwoFactor = async () => {
  return await request<any>({
    url: `/users/disable-twofa`,
    method: "POST",
    data: { action: "off" },
  });
};
type TwoFactorFormData = {
  otp: string;
  token: string;
};

export const verifyTwoFactor = async (formData: TwoFactorFormData) => {
  return request<any>({
    url: `/users/verify-twofaotp`,
    method: "POST",
    data: formData,
  });
};

export const followUnfollowUser = async (userId: string) => {
  return await request<any>({
    url: `/user/followorunfollows`,
    method: "POST",
    data: { user_id: userId },
  });
};
// const token = localStorage.getItem(USER_TOKEN);

export const logoutUser = () => {
  Cookies.remove("USER");
  Cookies.remove("AUTH_TOKEN");
  localStorage.removeItem("USER");
  localStorage.removeItem("AUTH_TOKEN");
  window.location.reload();
};
