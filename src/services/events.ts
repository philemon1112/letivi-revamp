import { Event } from "@/types/events";
import { PaginatedResponse, request, Response } from "./axios-utils";

export const getRecentEvents = async ({ limit }:{ limit?: number | null }) => {
    return await request<Event[]>({
      url: `/events`,
      method: 'GET',
      params: {
        limit: limit,
      },
    })
  }