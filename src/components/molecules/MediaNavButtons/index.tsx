import React from "react";

interface MediaNavButtonsProps {
  currentImageIndex: number;
  totalImages: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
}

function MediaNavButtons({
  currentImageIndex,
  totalImages,
  onPreviousImage,
  onNextImage,
}: MediaNavButtonsProps) {
  const handlePreviousClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreviousImage();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNextImage();
  };

  return (
    <div className="absolute z-10 bottom-10 right-3 flex gap-x-4">
      <button
        onClick={handlePreviousClick}
        disabled={currentImageIndex === 0}
        className={`inline-flex items-center ${
          currentImageIndex === 0 ? "" : ""
        } rounded-lg bg-white p-2 shadow-lg`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={handleNextClick}
        disabled={currentImageIndex === totalImages - 1}
        className={`inline-flex items-center ${
          currentImageIndex === totalImages - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        } rounded-lg bg-white p-2 shadow-lg`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default MediaNavButtons;
