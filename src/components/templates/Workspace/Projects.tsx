import { Button } from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import WorkspaceCard from "@/components/molecules/WorkspaceCard";
import ProjectForm from "@/components/organisms/WorkspaceModals/projectForm";
import { getUserWorkspaceProjects } from "@/services/workspaces";
import { Workspace } from "@/types/workspaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Projects({ userId }: { userId: number }) {
  const { ref: loadMoreRef, inView } = useInView();
  const [showForms, setShowForms] = useState(false);
  const pageSize = 10;

  const handleCloseModal = () => {
    setShowForms(false);
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["UserPersonalProjectsList", userId],
    queryFn: async ({ pageParam = 1 }) => {
      if (!userId) throw new Error("User ID is undefined");
      return await getUserWorkspaceProjects(userId, {
        page: pageParam,
        limit: pageSize,
        user_id: userId ?? null,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !allPages) return undefined;
      const lastPageNum = lastPage?.pagination?.last_page;
      if (lastPageNum && allPages.length < lastPageNum) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!userId && userId > 0, // Only run if userId is valid
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Transform data here instead of in select
  const allProjects =
    data?.pages?.flatMap(
      (page) =>
        page?.data?.map((project: Workspace) => ({
          ...project,
          type: "project",
        })) ?? [],
    ) ?? [];

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <ProjectForm
        open={showForms}
        project={null}
        handleModal={handleCloseModal}
        refetchProjects={refetch}
      />
      <div className="main rounded-t-xl overflow-x-auto px-3 md:px-6">
        <div className="py-4 md:py-8">
          <div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="flex justify-end gap-x-4">
                  <Button
                    variant="primary"
                    size="base"
                    className="text-na_blue"
                    onClick={() => {
                      setShowForms(true);
                    }}
                  >
                    Add Project
                  </Button>
                </div>
                {allProjects.length ? (
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4 justify-center">
                    {allProjects.map((workspace, index) => (
                      <WorkspaceCard
                        type="personal"
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

          <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
            {isFetchingNextPage && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
