"use client";
import React, { useState, useRef, useEffect } from "react";
import { getApiMedia } from "@/utils/getApiMedia";
import { Post } from "@/types/common";
import { Settings, Check } from "lucide-react";

interface QualityOption {
  key: string;
  label: string;
  path: string;
}

interface CustomVideoPlayerProps {
  normalizedPost: Post;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  normalizedPost,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string>(
    normalizedPost?.medias?.[0]?.medium_thumbnail ? "medium" : "original"
  );
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-hide controls on mobile
  useEffect(() => {
    if (isMobile && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isMobile]);

  const handleVideoClick = (): void => {
    if (isMobile) {
      setShowControls(!showControls);
    }
  };

  // Quality options mapping
  const qualityOptions: QualityOption[] = [
    {
      key: "small",
      label: "240p",
      path: normalizedPost?.medias?.[0]?.small_thumbnail,
    },
    {
      key: "medium",
      label: "480p",
      path: normalizedPost?.medias?.[0]?.medium_thumbnail,
    },
    {
      key: "large",
      label: "720p",
      path: normalizedPost?.medias?.[0]?.large_thumbnail,
    },
    // Conditionally spread the original option
    ...(!normalizedPost?.medias?.[0]?.medium_thumbnail
      ? [
          {
            key: "original",
            label: "Original",
            path: normalizedPost?.medias?.[0]?.path,
          },
        ]
      : []),
  ].filter((option): option is QualityOption => Boolean(option.path));

  const handleQualityChange = (quality: string): void => {
    if (videoRef.current) {
      // Store current playback state
      const wasPlaying = !videoRef.current.paused;
      const currentTime = videoRef.current.currentTime;

      setSelectedQuality(quality);

      // Wait for the video to load the new source
      const handleLoadedData = (): void => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
          if (wasPlaying) {
            videoRef.current.play();
          }
        }
        videoRef.current?.removeEventListener("loadeddata", handleLoadedData);
      };

      videoRef.current.addEventListener("loadeddata", handleLoadedData);
    }
    setShowQualityMenu(false);
  };

  const handleTimeUpdate = (): void => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayPause = (): void => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const togglePlayPause = (): void => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const selectedQualityOption = qualityOptions.find(
    (option) => option.key === selectedQuality
  );

  if (normalizedPost?.type !== "video" || !normalizedPost?.medias?.length) {
    return null;
  }

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        src={getApiMedia(selectedQualityOption?.path ?? "")}
        controls={!isMobile}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
        onClick={handleVideoClick}
        playsInline
      />

      {/* Custom Quality Selector Overlay */}
      <div
        className={`absolute top-4 right-4 transition-opacity duration-200 ${
          isMobile
            ? showControls
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="relative">
          <button
            onClick={() => setShowQualityMenu(!showQualityMenu)}
            className={`bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all duration-200 flex items-center gap-2 ${
              isMobile ? "p-3 touch-manipulation" : "p-2"
            }`}
            title="Video Quality"
            type="button"
          >
            <Settings size={isMobile ? 20 : 16} />
            <span className={`${isMobile ? "text-base" : "text-sm"}`}>
              {selectedQualityOption?.label}
            </span>
          </button>

          {showQualityMenu && (
            <div
              className={`absolute right-0 top-full mt-2 bg-black bg-opacity-95 text-white rounded-lg py-2 z-20 ${
                isMobile ? "min-w-40" : "min-w-32"
              }`}
            >
              <div
                className={`px-3 py-1 text-gray-400 border-b border-gray-600 mb-1 ${
                  isMobile ? "text-sm" : "text-xs"
                }`}
              >
                Quality
              </div>
              {qualityOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleQualityChange(option.key)}
                  className={`w-full text-left hover:bg-gray-700 active:bg-gray-600 transition-colors duration-150 flex items-center justify-between touch-manipulation ${
                    isMobile ? "px-4 py-3" : "px-3 py-2"
                  }`}
                  type="button"
                >
                  <span className={`${isMobile ? "text-base" : "text-sm"}`}>
                    {option.label}
                  </span>
                  {selectedQuality === option.key && (
                    <Check
                      size={isMobile ? 18 : 14}
                      className="text-blue-400"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay for better touch interaction */}
      {isMobile && showControls && (
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-gray-300 touch-manipulation"
              type="button"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <span className="text-sm">{formatTime(currentTime)}</span>
          </div>
          <div className="text-sm text-gray-300">
            {selectedQualityOption?.label}
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showQualityMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowQualityMenu(false)}
          onTouchStart={() => setShowQualityMenu(false)}
        />
      )}
    </div>
  );
};

export default CustomVideoPlayer;
