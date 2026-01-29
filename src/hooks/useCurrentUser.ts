"use client";
import React, { useEffect, useState } from "react";
import { useGetMyProfile } from "@/hooks/useProfile";
import { Professional } from "@/types/common/professional";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";

export const useCurrentUser = () => {
  const [user, setUser] = useState<Professional | any | undefined>(undefined);
  const { data: apiUserData, isError: apiUserError } = useGetMyProfile();

  useEffect(() => {
    // Try to fetch user from API
    if (!apiUserError && apiUserData) {
      setUser(apiUserData);

      //TODO: Find a better way to persist user data, when the update visibility status
      // if (typeof window !== "undefined") {
      //   localStorage.setItem("USER", JSON.stringify(apiUserData));
      // }
    } else {
      // If API call fails or returns no data, try getting user from local storage
      const localUser = getUserFromLocalStorage();
      if (localUser) {
        setUser(localUser);
      }
    }
  }, [apiUserData, apiUserError]);

  return user;
};
