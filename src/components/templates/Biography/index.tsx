"use client";

import { Suspense } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaPhotoVideo, FaUsers, FaUser } from "react-icons/fa";
import BaseTemplate from "../BaseTemplate";
import { useSearchParams } from "next/navigation";
import UserStatistics from "@/components/organisms/Biography/UserStatistics";
import TabMenu from "@/components/molecules/GalleryHeader";
import { IconType } from "react-icons/lib";
import PersonalDetails from "./personalDetails";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

interface Tab {
  title: string;
  icon: IconType;
  href: string;
  count: number;
}

// Separate the component that uses useSearchParams
function BiographyContent() {
  const currentUser = useCurrentUser();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  const bio_tabs: Tab[] = [
    {
      title: "Personal",
      icon: FaUser,
      href: "personal",
      count: 0,
    },
    {
      title: "Following",
      icon: FaPhotoVideo,
      href: `following`,
      count: currentUser?.total_followings || 0,
    },
    {
      title: `followers`,
      icon: FaUsers,
      href: "followers",
      count: currentUser?.total_followers || 0,
    },
  ];

  const renderContent = () => {
    switch (currentTab.toLowerCase()) {
      case "personal":
        return <PersonalDetails />;
      case "following":
        return <FollowingList />;
      case "followers":
        return <FollowersList />;
      default:
        return <PersonalDetails />;
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-2 md:px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-8">
        <div className="md:col-span-1">
          <UserStatistics userData={null} isShared={false} />
        </div>

        <div className="md:col-span-3">
          <TabMenu tabs={bio_tabs} basePath="/profile" type="biography" />
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
function Biography() {
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
          <BiographyContent />
        </Suspense>
      </div>
    </BaseTemplate>
  );
}

export default Biography;
