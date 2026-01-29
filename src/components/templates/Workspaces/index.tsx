"use client";
import React, { useEffect, useMemo, useState } from "react";
import BaseTemplate from "../BaseTemplate";
import { getBusinesses, getEvents, getProjects } from "@/services/workspaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Workspace } from "@/types/workspaces";
import { Button } from "@/components/atoms/Button";
import SearchBarWithFilter from "@/components/molecules/SearchBarWithFilter";
import Loader from "@/components/atoms/Loader";
import WorkspaceCard from "@/components/molecules/WorkspaceCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function Workspaces() {
  const [workspaces, setWorkspaces] = useState([] as Workspace[]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const currentUser = useCurrentUser();
  // From the backend API the list of workspaces is gotten by combining data from these 3 endpoints (events, projects, businesses)

  const filterByoptions = [
    { label: "Name", value: "name" },
    { label: "Industry", value: "industry" },
    { label: "Country", value: "country" },
    { label: "Organisation", value: "business" },
    { label: "Events", value: "events" },
    { label: "Projects", value: "projects" },
  ];

  // Fetch Events using useInfiniteQuery
  const {
    data: events,
    error: eventsError,
    fetchNextPage: fetchEventsNextPage,
    isLoading: eventsLoading,
    hasNextPage: eventsHasNextPage,
    isFetchingNextPage: eventsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allEvents", currentUser?.id ?? "anonymous"],
    queryFn: ({ pageParam }) =>
      getEvents({ pageParam, limit: 5, loggedInUserId: currentUser?.id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Extract the next page number from the next_page_url
      const nextPageUrl = lastPage?.pagination?.next_page_url;
      if (nextPageUrl) {
        const nextPageParam = new URL(nextPageUrl).searchParams.get("page");
        return nextPageParam ? parseInt(nextPageParam) : undefined;
      }
      return undefined;
    },
  });

  // Fetch Projects using useInfiniteQuery
  const {
    data: projects,
    error: projectsError,
    fetchNextPage: fetchProjectsNextPage,
    isLoading: projectsLoading,
    hasNextPage: projectsHasNextPage,
    isFetchingNextPage: projectsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allProjects", currentUser?.id ?? "anonymous"],
    enabled: !!currentUser?.id,
    queryFn: ({ pageParam }) =>
      getProjects({ pageParam, limit: 5, loggedInUserId: currentUser?.id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Extract the next page number from the next_page_url
      const nextPageUrl = lastPage?.pagination?.next_page_url;
      if (nextPageUrl) {
        const nextPageParam = new URL(nextPageUrl).searchParams.get("page");
        return nextPageParam ? parseInt(nextPageParam) : undefined;
      }
      return undefined;
    },
  });

  // Fetch Businesses using useInfiniteQuery
  const {
    data: businesses,
    error: businessesError,
    fetchNextPage: fetchBusinessesNextPage,
    isLoading: businessesLoading,
    hasNextPage: businessesHasNextPage,
    isFetchingNextPage: businessesFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allBusinesses", currentUser?.id ?? "anonymous"],
    enabled: !!currentUser?.id,
    queryFn: ({ pageParam }) =>
      getBusinesses({ pageParam, limit: 5, loggedInUserId: currentUser?.id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Extract the next page number from the next_page_url
      const nextPageUrl = lastPage?.pagination?.next_page_url;
      if (nextPageUrl) {
        const nextPageParam = new URL(nextPageUrl).searchParams.get("page");
        return nextPageParam ? parseInt(nextPageParam) : undefined;
      }
      return undefined;
    },
  });

  // Update workspaces state when we get first page or next page for events, projects and businesses
  useEffect(() => {
    const allWorkspaces: Workspace[] = [];

    // Add events data if available
    if (events?.pages) {
      allWorkspaces.push(
        ...events.pages.flatMap((page) =>
          page.data.map((workspace) => ({ ...workspace, type: "event" }))
        )
      );
    }

    // Add projects data if available
    if (projects?.pages) {
      allWorkspaces.push(
        ...projects.pages.flatMap((page) =>
          page.data.map((workspace) => ({ ...workspace, type: "project" }))
        )
      );
    }

    // Add businesses data if available
    if (businesses?.pages) {
      allWorkspaces.push(
        ...businesses.pages.flatMap((page) =>
          page.data.map((workspace) => ({ ...workspace, type: "business" }))
        )
      );
    }

    setWorkspaces(allWorkspaces);

    // Check if all sources are on their last page
    const allLastPages =
      !eventsHasNextPage && !projectsHasNextPage && !businessesHasNextPage;
    setIsLastPage(allLastPages);
  }, [
    events,
    projects,
    businesses,
    eventsHasNextPage,
    projectsHasNextPage,
    businessesHasNextPage,
  ]);

  // Handle load more
  const handleLoadMore = () => {
    if (eventsHasNextPage) fetchEventsNextPage();
    if (projectsHasNextPage) fetchProjectsNextPage();
    if (businessesHasNextPage) fetchBusinessesNextPage();
  };

  // Filter Workspaces based on searchQuery or workspaces type
  // Update filteredWorkspaces state when searchQuery, filterBy or workspaces state changes
  const filteredWorkspaces = useMemo(() => {
    const autoFilters =
      filterBy === "business" ||
      filterBy === "events" ||
      filterBy === "projects"; // these filters  automatically filters the list when clicked on and does not depend on the search query the user enters
    if (!searchQuery && !autoFilters) return workspaces;

    return workspaces.filter((workspace) => {
      switch (filterBy) {
        case "name":
          const name = workspace?.name.toLowerCase();
          return name.includes(searchQuery.toLowerCase());

        case "industry":
          const industry = workspace?.industry?.name.toLowerCase();
          return industry?.includes(searchQuery.toLowerCase());
        case "country":
          const country = workspace?.country?.toLowerCase();
          return country.includes(searchQuery.toLowerCase());
        case "business":
          return workspace?.type === "business";

        case "events":
          return workspace?.type === "event";

        case "projects":
          return workspace?.type === "project";

        default:
          const all =
            `${workspace?.name} ${workspace?.industry?.name} ${workspace?.country}`.toLowerCase();
          return all.includes(searchQuery.toLowerCase());
      }
    });
  }, [workspaces, searchQuery, filterBy]);

  const isLoading = eventsLoading || projectsLoading || businessesLoading;

  return (
    <BaseTemplate>
      <div className="main  lg:py-36 lg:px-10 px-4 pt-32 pb-4 max-w-[1920px] mx-auto ">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="lg:text-4xl font-bold mb-8 text-center">
            Discover Workspaces
          </h1>
        </div>

        {/* SEARCH BAR  */}
        <div className="md:mb-0  pb-8">
          <SearchBarWithFilter
            filterByOptions={filterByoptions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </div>

        {/* WORKSPACES LIST   */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredWorkspaces.length ? (
              <div className="mt-16 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4 justify-center">
                {filteredWorkspaces.map((workspace, index) => {
                  return (
                    <WorkspaceCard key={index} searchedWorkspace={workspace} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center mt-8 text-gray-600">
                No workspaces found
              </div>
            )}
          </>
        )}

        {/* LOAD MORE BUTTON */}
        {/* show if we have next page and our filtered search is not empty */}
        {!isLastPage && filteredWorkspaces.length ? (
          <Button
            variant="primary"
            size="2xl"
            className="flex justify-center mx-auto mt-4 md:mt-8 "
            type="submit"
            onClick={handleLoadMore}
            disabled={
              eventsFetchingNextPage ||
              projectsFetchingNextPage ||
              businessesFetchingNextPage
            }
            loading={
              eventsFetchingNextPage ||
              projectsFetchingNextPage ||
              businessesFetchingNextPage
            }
          >
            {/* {t("common:contact_us")} */}
            Show more
          </Button>
        ) : (
          ""
        )}
      </div>
    </BaseTemplate>
  );
}

export default Workspaces;
