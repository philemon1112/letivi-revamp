import Loader from "@/components/atoms/Loader";
import WorkspaceCard from "@/components/molecules/WorkspaceCard";
import {
  getSharedUserWorkspaceBusiness,
  getSharedUserWorkspaceEvent,
  getSharedUserWorkspaceProject,
} from "@/services/biography";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// Define types for different workspace types
type BusinessWorkspace = {
  type: "business";
  [key: string]: any;
};

type EventWorkspace = {
  type: "event";
  [key: string]: any;
};

type ProjectWorkspace = {
  type: "project";
  [key: string]: any;
};

type Workspace = BusinessWorkspace | EventWorkspace | ProjectWorkspace;

function WorkspaceList({ userId }: { userId: number }) {
  const { data: businessList, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["SharedUserBusinessList"],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is undefined");
      const businesses = await getSharedUserWorkspaceBusiness(userId);
      return {
        ...businesses,
        data: businesses.data?.map((business) => ({
          ...business,
          type: "business",
        })),
      };
    },
  });

  const { data: projectsList } = useQuery({
    queryKey: ["SharedUserProjectsList"],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is undefined");
      const projects = await getSharedUserWorkspaceProject(userId);
      return {
        ...projects,
        data: projects.data?.map((project) => ({
          ...project,
          type: "project",
        })),
      };
    },
  });

  const { data: eventsList } = useQuery({
    queryKey: ["SharedUserEventsList"],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is undefined");
      const events = await getSharedUserWorkspaceEvent(userId);
      return {
        ...events,
        data: events.data?.map((event) => ({ ...event, type: "event" })),
      };
    },
  });

  // Combine all workspaces
  const allWorkspaces = [
    ...(businessList?.data || []),
    ...(projectsList?.data || []),
    ...(eventsList?.data || []),
  ];

  return (
    <div>
      <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
        <div className="main rounded-t-xl overflow-x-auto px-3 md:px-6">
          <div className="py-4 md:py-8">
            {isBusinessLoading ? (
              <Loader />
            ) : (
              <>
                {allWorkspaces.length ? (
                  <div className="mt-16 grid lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4 justify-center">
                    {allWorkspaces.map((workspace, index) => (
                      <WorkspaceCard
                        key={`${workspace.type}-${index}`}
                        searchedWorkspace={workspace}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center mt-8 text-gray-600">
                    No workspaces found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceList;
