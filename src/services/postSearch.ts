import { Response, request } from "./axios-utils";

export const searchPost = async (query: string) => {
  return await request<Response<any>>({
    url: `/search/posts?query=${query}`,
    method: "GET",
  });
};
