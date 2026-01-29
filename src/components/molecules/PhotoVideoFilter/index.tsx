import FilterTab from "@/components/atoms/FilterTab";
import React from "react";

interface PhotoVideoFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  videoCount: number;
  photoCount: number;
}

const PhotoVideoFilter = ({
  filter,
  setFilter,
  photoCount,
  videoCount,
}: PhotoVideoFilterProps) => {
  const isPhotoTabActive = filter === "photos";
  const isVideoTabActive = filter === "videos";
  return (
    <div className=" mt-10 main mb-2 flex justify-start rounded-t-xl gap-4">
      <FilterTab
        isActive={isPhotoTabActive}
        label="Photos"
        count={photoCount}
        onClick={() => setFilter("photos")}
      />
      <FilterTab
        isActive={isVideoTabActive}
        label="Videos"
        count={videoCount}
        onClick={() => setFilter("videos")}
      />
    </div>
  );
};

export default PhotoVideoFilter;
