// @ts-nocheck
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { USER_TOKEN } from "../utils/constants";

import { toast } from "sonner";
import Cookies from "js-cookie";
import { logoutUser } from "./login";

const client = axios.create({});

export interface Response<T> {
  industries: any;
  token: any;
  status: number;
  data: T;
  errors: null;
  message: string;
  pagination: PaginatedResponse<T>;
}

export interface ArrayData<T> {
  data: T;
}
export interface PaginatedResponse<T> {
  current_page: number;
  first_page_url: number;
  last_page_url: number;
  prev_page_url: number;
  next_page_url?: string;
  per_page: number;
  last_page: number;
  total: number;
  results: T;
}

export interface ExtendedAxiosResponse<T = any, D = any>
  extends AxiosResponse<Response<T>, D> {}

export interface ExtendedAxiosRequestConfig<D = any>
  extends AxiosRequestConfig<D> {
  handleError?: boolean;
  toastNotification?: boolean;
  onUploadProgress?: (progressEvent: ProgressEvent) => void; // Added support for upload progress
}

export const request = async <T>(
  options: ExtendedAxiosRequestConfig,
  event?: string | null,
  baseUrl?: string
): Promise<Response<T>> => {
  const {
    handleError = true,
    toastNotification = false,
    onUploadProgress,
  } = options;
  const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const defaultToken = process.env.NEXT_PUBLIC_DEFAULT_TOKEN;
  const apiSecret = "s0meR3ndomP@$$Word";

  client.defaults.headers.common["x-api-key"] = apiKey;
  client.defaults.headers.common["x-api-secret"] = apiSecret;
  client.defaults.baseURL = baseUrl ?? defaultBaseUrl;

  const token = localStorage.getItem("AUTH_TOKEN");

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else if (baseUrl) {
    client.defaults.headers.common["Authorization"] = `Bearer ${defaultToken}`;
  }

  const onSuccess = (response: ExtendedAxiosResponse<T>) => {
    return response.data;
  };

  const onError = (error: any) => {
    if (error.response?.request?.responseURL?.includes(defaultBaseUrl)) {
      handleError &&
        toastNotification &&
        toast.error(error.response.data.message);
    }

    if (
      error.response.status === 401 &&
      error.response?.request?.responseURL?.includes(defaultBaseUrl)
    ) {
      // logoutUser();
    }

    throw error;
  };

  return client({ ...options, onUploadProgress })
    .then(onSuccess)
    .catch(onError);
};
