import React from "react";

interface EmptyMediaProps {
  isPhoto?: boolean;
  isVideo?: boolean;
}

const EmptyMedia = ({ isPhoto, isVideo }: EmptyMediaProps) => {
  return (
    <div>
      <div className="py-36 carousel w-full">
        {isPhoto && (
          <div className="flex flex-col  justify-center items-center space-y-4 w-full">
            <img
              src={"/assets/Svg/emptyphoto.svg"}
              className="object-contain h-32 w-32"
              alt="emptyPhoto"
            />
            <h1 className="text-gray-600 font-bold">No Photos</h1>
          </div>
        )}
        {isVideo && (
          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <img
              src={"/assets/Svg/emptyvideo.svg"}
              className="object-contain h-32 w-32"
              alt="emptyVideo"
            />
            <h1 className="text-gray-600 font-bold">No Videos</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyMedia;
