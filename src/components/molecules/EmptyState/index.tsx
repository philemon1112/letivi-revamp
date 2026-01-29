import React from "react";

interface PostEmptyStateProps {
  title?: string;
  imageUrl?: string;
}

function PostEmptyState({
  title,
  imageUrl = "/assets/Svg/emptyphoto.svg",
}: PostEmptyStateProps) {
  return (
    <div className="py-36 carousel">
      <div className="flex flex-col justify-center items-center space-y-4">
        <img src={imageUrl} className="object-contain h-32 w-32" alt="" />
        <h1 className="text-gray-600 font-bold">{title || "No Photos"}</h1>
      </div>
    </div>
  );
}

export default PostEmptyState;
