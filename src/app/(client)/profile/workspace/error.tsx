"use client";

import { Button } from "@/components/atoms/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Workspace error:", error);
  }, [error]);

  return (
    <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error loading your workspaces. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="base"
              onClick={() => {
                // Clear any cached data and do a full page reload
                window.location.reload();
              }}
            >
              Try again
            </Button>
            <Button
              variant="secondary"
              size="base"
              onClick={() => window.location.href = "/feed"}
            >
              Go to Feed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
