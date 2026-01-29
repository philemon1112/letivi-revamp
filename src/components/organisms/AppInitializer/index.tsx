// components/AppInitializer.tsx
"use client";
import { ReactNode, useState, useEffect } from "react";

import { useGetMyProfile } from "@/hooks/useProfile";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";
import SplashScreen from "@/components/templates/SplashScreen";

interface AppInitializerProps {
  children: ReactNode;
}

export default function AppInitializer({ children }: AppInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: apiUserData,
    isLoading: userLoading,
    isError: apiUserError,
    error: userError,
  } = useGetMyProfile();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Ensure minimum splash screen display time for better UX
        const minSplashTime = new Promise((resolve) =>
          setTimeout(resolve, 1500)
        );

        // Wait for user data to be resolved (either from API or localStorage)
        const waitForUserData = new Promise<void>((resolve) => {
          if (!userLoading) {
            // Check if we have user data from API or localStorage
            const localUser = getUserFromLocalStorage();
            if (apiUserData || localUser || apiUserError) {
              resolve();
            }
          }
        });

        // Wait for both minimum time and user data
        await Promise.all([minSplashTime, waitForUserData]);

        // Check for critical errors
        if (apiUserError && !getUserFromLocalStorage()) {
          // Only set error if we have no fallback user data
          const errorMessage = userError?.message || "Failed to load user data";
          setError(errorMessage);
        }

        setIsInitialized(true);
      } catch (err) {
        console.error("App initialization error:", err);
        setError("Failed to initialize application");
      }
    };

    initializeApp();
  }, [apiUserData, userLoading, apiUserError, userError]);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    if (isInitialized) {
      setShowSplash(false);
    }
  };

  // Show splash screen while initializing
  if (showSplash || !isInitialized) {
    return (
      <SplashScreen onComplete={handleSplashComplete} minDisplayTime={1500} />
    );
  }

  // Show error state if initialization failed critically
  if (error && !getUserFromLocalStorage()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load Letivi
          </h2>
          <p className="text-gray-600 mb-4 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // App is ready, show main content
  return <>{children}</>;
}
