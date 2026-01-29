import { Event } from "@/types/events";
import { PaginatedResponse, request, Response } from "./axios-utils";
import {
  Contact,
  emailPayload,
  Message,
  MessageResponse,
} from "@/types/messages";

export const getMessages = async ({ limit }: { limit?: number | null }) => {
  return await request<Contact[]>({
    url: `/messages/`,
    method: "GET",
    params: {
      limit: limit,
    },
  });
};

export const getMessageDetails = async ({ id }: { id: number }) => {
  return await request<MessageResponse>({
    url: `/messages/${id}/replies`,
    method: "GET",
  });
};

export const sendMessageToUser = async (message: Message | FormData) => {
  return await request<Response<any>>({
    url: `/messages`,
    method: "POST",
    data: message,
  });
};

export const replyUser = async (messageId: string, message: Message) => {
  return await request<Response<any>>({
    url: `/messages/${messageId}/replies`,
    method: "POST",
    data: message,
  });
};

export const deleteMessage = async (messageId: number) => {
  return await request<Response<any>>({
    url: `/messages/${messageId}`,
    method: "DELETE",
  });
};

export const sendMail = async (data: emailPayload) => {
  return await request<any>({
    url: `/user/sendmail`,
    method: "POST",
    data,
  });
};
