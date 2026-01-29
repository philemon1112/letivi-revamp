import PhotoGallery from "@/components/molecules/PhotoGallery";
import VideoGallery from "@/components/molecules/VideoGallery";
import { Post } from "@/types/nature";
import React from "react";

interface AllGalleryProps {
  videoPosts: Post[];
  photoPosts: Post[];
  filter: string;
}

const AllGallery = ({ videoPosts, photoPosts, filter }: AllGalleryProps) => {
  switch (filter) {
    case "photos":
      return <PhotoGallery photoPosts={photoPosts} />;
    case "videos":
      return <VideoGallery videoPosts={videoPosts} />;
    default:
      return <PhotoGallery photoPosts={photoPosts} />;
  }
};

export default AllGallery;
