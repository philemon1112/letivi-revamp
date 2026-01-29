"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BaseTemplate from "../BaseTemplate";
import TabMenu from "@/components/molecules/GalleryHeader";
import { FaBriefcase, FaTicketAlt, FaPeopleCarry } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Businesses from "./Businesses";
import Projects from "./Projects";
import Events from "./Events";

interface Tab {
  title: string;
  icon: IconType;
  href: string;
  count: number;
}

const tabs: Tab[] = [
  {
    title: "Organisation",
    icon: FaBriefcase,
    href: "organisation",
    count: 0,
  },
  {
    title: "Events",
    icon: FaTicketAlt,
    href: "events",
    count: 0,
  },
  {
    title: "Projects",
    icon: FaPeopleCarry,
    href: "projects",
    count: 0,
  },
];

// Separate the component that uses useSearchParams
function WorkspaceContent() {
  const currentUser = useCurrentUser();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  // Don't render until we have a valid user ID
  if (!currentUser?.id) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentTab.toLowerCase()) {
      case "organisation":
        return <Businesses userId={currentUser.id} />;
      case "projects":
        return <Projects userId={currentUser.id} />;
      case "events":
        return <Events userId={currentUser.id} />;
      default:
        return <Businesses userId={currentUser.id} />;
    }
  };

  return (
    <>
      <TabMenu tabs={tabs} basePath="/profile" type="workspace" />
      <div className="mx-auto max-w-screen-xl px-4 md:px-2">
        {renderContent()}
      </div>
    </>
  );
}

// Main component with Suspense wrapper
function Workspace() {
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
          <WorkspaceContent />
        </Suspense>
      </div>
    </BaseTemplate>
  );
}

export default Workspace;
