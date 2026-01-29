"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BaseTemplate from "../BaseTemplate";
import TabMenu from "@/components/molecules/GalleryHeader";
import {
  FaPhotoVideo,
  FaEyeSlash,
  FaRegSave,
  FaDownload,
  FaUserCheck,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import SavedPost from "./SavedPost";
import MyDownloads from "./MyDownloads";
import Downloaders from "./Downloaders";
import PrivateGallery from "./PrivateGallery";
import PublicGallery from "./PublicGallery";
import AlbumDetails from "./AlbumDetails";

interface Tab {
  title: string;
  icon: IconType;
  href: string;
  count: number;
}

const tabs: Tab[] = [
  {
    title: "Gallery",
    icon: FaPhotoVideo,
    href: "",
    count: 0,
  },
  {
    title: "Private",
    icon: FaEyeSlash,
    href: "private",
    count: 0,
  },
  {
    title: "Saved",
    icon: FaRegSave,
    href: "savedpost",
    count: 0,
  },
  {
    title: "My Downloads",
    icon: FaDownload,
    href: "downloads",
    count: 0,
  },
  {
    title: "Downloaders",
    icon: FaUserCheck,
    href: "downloaders",
    count: 0,
  },
];

// Separate the component that uses useSearchParams
function GalleryContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  const renderContent = () => {
    switch (currentTab.toLowerCase()) {
      case "saved":
        return <SavedPost />;
      case "my downloads":
        return <MyDownloads />;
      case "private":
        return <PrivateGallery />;
      case "downloaders":
        return <Downloaders />;
      case "albums":
        return <AlbumDetails />;
      default:
        return <PublicGallery />;
    }
  };

  return (
    <>
      <TabMenu tabs={tabs} basePath="/profile" />
      <div className="mx-auto max-w-screen-xl px-4 md:px-2">
        {renderContent()}
      </div>
    </>
  );
}

// Main component with Suspense wrapper
function Gallery() {
  return (
    <BaseTemplate withFooter={false}>
      <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto hide-scrollbar">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
            </div>
          }
        >
          <GalleryContent />
        </Suspense>
      </div>
    </BaseTemplate>
  );
}

export default Gallery;
