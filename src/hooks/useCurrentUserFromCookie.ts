"use client";
import { useState, useEffect } from "react";
import { Professional } from "@/types/common/professional";

// Utility function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

export const useCurrentUserFromCookie = () => {
  const [user, setUser] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userCookie = getCookie("USER");

      if (userCookie) {
        const parsedUser = JSON.parse(decodeURIComponent(userCookie));

        // Optional: Check if token is expired
        if (parsedUser.expiredAt && Date.now() > parsedUser.expiredAt) {
          setUser(null);
        } else {
          setUser(parsedUser);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optional: Listen for cookie changes
  useEffect(() => {
    const handleStorageChange = () => {
      const userCookie = getCookie("USER");
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userCookie));
          setUser(parsedUser);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Listen for focus events to check for cookie changes
    window.addEventListener("focus", handleStorageChange);

    return () => {
      window.removeEventListener("focus", handleStorageChange);
    };
  }, []);

  return { user, isLoading };
};
