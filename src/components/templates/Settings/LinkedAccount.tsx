"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

function LinkedAccount() {
  const currentUser = useCurrentUser();
  return (
    <div className="lg:px-4 px-2 py-14 max-w-xl">
      <h1 className="font-normal text-lg lg:text-2xl mb-3">Linked Accounts </h1>

      {currentUser?.signup_mode === "apple" ? (
        <>
          <div className="flex items-center space-x-4 lg:p-4 p-2 mt-4 w-full lg:text-base text-sm text-[#333333]">
            <img src="/assets/Svg/Social/apple.svg" alt="" /> <h1>Apple</h1>
          </div>

          <p className="text-gray-800">
            Your Apple account is currently linked to this account
          </p>
        </>
      ) : (
        <>
          {
            <>
              <div className="flex items-center space-x-4 lg:p-4 p-2 mt-4 w-full lg:text-base text-sm text-[#333333]">
                <img src="/assets/Svg/Social/google.svg" alt="" />{" "}
                <h1>Google</h1>
              </div>

              <p className="text-gray-800">
                Your Google account is currently linked to this account.
              </p>
            </>
          }
        </>
      )}
    </div>
  );
}

export default LinkedAccount;
