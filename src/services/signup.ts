import { IndustriesData } from "@/types/common";
import { Response, request } from "./axios-utils";
import { UserData } from "@/types/auth";

export const signupUser = async (data: UserData) => {
  const response = await request<Response<any>>({
    url: `/users/signup`,
    method: "POST",
    data,
  });

  return response.data;
};

export const validateEmail = async (data: { email: string }) => {
  const response = await request<Response<any>>({
    url: `mails/`,
    method: "POST",
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}`,
    data,
  });
};

export const getIndustries = async () => {
  const response = await request<Response<IndustriesData[]>>({
    url: `industries/all`,
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL_OLD}`,
    method: "GET",
  });

  return response.data.industries;
};
