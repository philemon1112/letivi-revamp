import { CareerFormData } from "@/types/career";
import { request } from "./axios-utils";

export const career = async (data: CareerFormData) => {
  return await request<any[]>({
    url: `/carers`,
    method: "POST",
    data,
  });
};
