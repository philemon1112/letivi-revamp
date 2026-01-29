import { emailSubscription } from "@/types/subscribe"
import { Response, request } from "./axios-utils"

export const subscribe = async (data: emailSubscription) => {
    return await request<Response<any>>({
      url: `newsletters`,
      method: 'POST',
      data,
    })
  }