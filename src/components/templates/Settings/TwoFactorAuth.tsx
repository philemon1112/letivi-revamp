"use client";

import { Button } from "@/components/atoms/Button";
import ConfirmTwoFa from "@/components/organisms/Settings/confirmTwoFa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { enableTwoFactor, disableTwoFactor } from "@/services/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function TwoFactorAuthentication() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let currentToken = "";
  if (typeof window !== "undefined") {
    currentToken = localStorage.getItem("2FA_TOKEN") || "";
  }
  const [token, setToken] = useState(currentToken);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);

    toast.success("Link Copied");
  };

  const currentUser = useCurrentUser();
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (currentUser?.is_2fa === "on") {
        const res = await disableTwoFactor();
        toast.success("Two Factor Authentication Disabled Successfully");
      } else {
        const res = await enableTwoFactor();
        localStorage.setItem("2FA_TOKEN", res?.data?.token);
        setToken(res?.data?.token);

        toast.success("Two Factor Authentication Enabled Successfully");
      }
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    }
  };

  return (
    <div className="lg:px-4 px-2 py-6 max-w-xl">
      <ConfirmTwoFa
        open={showModal}
        handleModal={(open: boolean) => setShowModal(open)}
        handleConfirm={handleConfirm}
        loading={loading}
      />
      <div className="flex justify-between items-center mb-3 ">
        <h1 className="font-normal text-lg lg:text-2xl  ">
          Two-Factor Authentication
        </h1>

        {currentUser?.is_2fa === "on" ? (
          <span className="m-2 px-3 py-1 bg-green-100 border border-green-500 hover:bg-green-300 rounded-full text-sm font-normal text-green-600">
            Enabled
          </span>
        ) : (
          <span className="m-2 px-3 py-1 bg-yellow-100 border border-yellow-500 hover:bg-yellow-300 rounded-full text-sm font-normal text-yellow-600">
            Pending
          </span>
        )}
      </div>

      <p className="text-gray-800">
        Two-factor authentication adds an additional layer of security to your
        account by requiring more than just a password to sign in
      </p>
      <br />

      {token && (
        <>
          <div className="flex justify-between mb-4 items-center space-x-2">
            <div className="p-3 w-full text-center text-gray-400 truncate bg-gray-100 rounded-2xl">
              {token}
            </div>

            <Button variant="tertiary" size="lg" onClick={handleCopy}>
              Copy Code
            </Button>
          </div>

          <div className="my-3 bg-blue-50 border border-na_blue text-sm text-gray-500 rounded-lg p-2 sm:p-5 dark:bg-blue-600/10">
            <div className="flex">
              <div className="ms-3">
                <h3 className="text-na_blue font-semibold dark:font-medium dark:text-white">
                  Set Up Your Authenticator App
                </h3>
                <p className="mt-2 text-gray-800 dark:text-neutral-400">
                  Open your preferred authenticator app eg Google , Microsoft
                  Authenticator and scan the QR code or enter the token provided
                  above. The app will generate a 6-digit code you&apos;ll use to
                  log in.
                </p>
                <div className="mt-2 sm:mt-4">
                  <a
                    className="inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-white"
                    href="https://support.google.com/accounts/answer/1066447"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
        {currentUser?.is_2fa === "on" ? (
          <span>Disable Two-Factor Authentication</span>
        ) : (
          <span>Enable Two-Factor Authentication</span>
        )}
      </Button>
    </div>
  );
}

export default TwoFactorAuthentication;
