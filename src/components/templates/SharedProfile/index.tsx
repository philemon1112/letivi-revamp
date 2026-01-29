"use client";
import { FaPhotoVideo, FaUsers, FaUser } from "react-icons/fa";
import BaseTemplate from "../BaseTemplate";
import { useSearchParams } from "next/navigation";
import TabMenu from "@/components/molecules/GalleryHeader";
import { IconType } from "react-icons/lib";
import UserStatistics from "@/components/organisms/Biography/UserStatistics";
import GalleryList from "./GalleryList";
import UserDetails from "./UserDetails";
import WorkspaceList from "./WorkspaceList";

interface Tab {
  title: string;
  icon: IconType;
  href: string;
  count: number;
}
interface ParamsType {
  id: string;
}

function SharedProfile({
  userData,
  params,
}: {
  userData: any;
  params: ParamsType;
}) {
  const bio_tabs: Tab[] = [
    {
      title: "About Me",
      icon: FaUser,
      href: "personal",
      count: 0,
    },
    {
      title: "Gallery",
      icon: FaPhotoVideo,
      href: `gallery`,
      count: userData?.data?.total_posts || 0,
    },
    {
      title: `Workspaces`,
      icon: FaUsers,
      href: "workspaces",
      count: null,
    },
  ];
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  const renderContent = () => {
    switch (currentTab.toLowerCase()) {
      case "about me":
        return <UserDetails userData={userData} />;
      case "gallery":
        return <GalleryList userId={userData?.data?.id} />;
      case "workspaces":
        return <WorkspaceList userId={userData?.data?.id} />; // Add your Private component
      default:
        return <UserDetails userData={userData} />; // Default to SavedPost for empty path or unknown routes
    }
  };

  return (
    <BaseTemplate withFooter={false}>
      <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto hide-scrollbar">
        <div className="max-w-screen-2xl mx-auto px-2 md:px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-8">
            <div className="md:col-span-1">
              <UserStatistics userData={userData} isShared={true} />
            </div>

            <div className="md:col-span-3">
              <TabMenu tabs={bio_tabs} basePath="/lt" type={params?.id} />
              <div className="">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default SharedProfile;
