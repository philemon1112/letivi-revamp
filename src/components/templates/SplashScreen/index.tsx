// components/SplashScreen.tsx
"use client";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number; // Minimum time to show splash (in ms)
}

export default function SplashScreen({
  onComplete,
  minDisplayTime = 2000,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center text-white">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-slow">
            {/* Letivi Logo - Replace with your actual logo */}
            <div className="text-4xl font-bold text-blue-600">L</div>
          </div>
          <h1 className="text-5xl font-bold mb-3 animate-fade-in tracking-tight">
            Letivi
          </h1>
          <p className="text-xl opacity-90 animate-fade-in-delay font-light">
            Archive. Showcase. Be Discovered.
          </p>
        </div>

        {/* Loading animation */}
        <div className="flex justify-center space-x-3 mb-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Loading text */}
        <p className="text-sm opacity-75 animate-pulse font-medium">
          Preparing your creative space...
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
}
