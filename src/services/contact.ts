import { Response, request } from "./axios-utils";
import { ContactFormData } from "@/types/contact";

export const contactUs = async (data: ContactFormData) => {
  return await request<Response<any>>({
    url: `/contactus`,
    method: "POST",
    data,
  });
};
