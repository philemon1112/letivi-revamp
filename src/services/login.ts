import { Response, request } from "./axios-utils";
import { ContactFormData } from "@/types/contact";
import { LoginData } from "@/types/auth";
import Cookies from "js-cookie";

export const loginUser = async (data: LoginData) => {
  const response = await request<Response<any>>({
    url: `/login`,
    method: "POST",
    data,
  });

  return response.data;
};

// // const token = localStorage.getItem(USER_TOKEN);

export const logoutUser = () => {
  Cookies.remove("USER");
  Cookies.remove("AUTH_TOKEN");
  localStorage.removeItem("USER");
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("2FA_TOKEN");
  window.location.replace("/login");
};
