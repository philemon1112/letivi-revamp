"use client";
import React, { useEffect, useState } from "react";
import BaseTemplate from "../BaseTemplate";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import SearchBar from "@/components/molecules/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfessionals } from "@/services/professional";
import Loader from "@/components/atoms/Loader";
import ProfessionalCard from "@/components/molecules/ProfessionalCard";
import { Professional } from "@/types/common/professional";
import { Button } from "@/components/atoms/Button";

/* ---------------------------------------------
 * Debounce Hook
 * -------------------------------------------- */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  console.log("Debounced Value:", debouncedValue);

  return debouncedValue;
}

function Professionals() {
  const currentUser = useCurrentUser();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [professionals, setProfessionals] = useState<Professional[]>([]);

  /* ---------------------------------------------
   * Fetch Professionals (Server-side search)
   * -------------------------------------------- */
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "allProfessionals",
        currentUser?.id ?? "anonymous",
        debouncedSearchQuery,
      ],
      queryFn: ({ pageParam }) =>
        getProfessionals({
          pageParam,
          search: debouncedSearchQuery,
          limit: 15,
          loggedInUserId: currentUser?.id ?? null,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPageUrl = lastPage?.pagination?.next_page_url;
        if (!nextPageUrl) return undefined;

        const page = new URL(nextPageUrl)?.searchParams.get("page");
        return page ? Number(page) : undefined;
      },
    });

  /* ---------------------------------------------
   * Update professionals when data changes
   * -------------------------------------------- */
  useEffect(() => {
    if (!data) return;

    const newProfessionals = data.pages.flatMap((page) => page.data);

    setProfessionals(newProfessionals);
  }, [data]);

  return (
    <BaseTemplate>
      <div className="main lg:py-36 lg:px-10 px-4 pt-32 pb-4 max-w-[1920px] mx-auto">
        {/* HEADING */}
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="lg:text-4xl font-bold mb-8">
            Whose photo, video and bio do you need?
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="pb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* PROFESSIONAL LIST */}
        {isLoading ? (
          <Loader />
        ) : professionals.length ? (
          <div className=" grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4">
            {professionals.map((user, index) => (
              <ProfessionalCard key={index} searchedUser={user} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 text-gray-600">
            No professionals found
          </div>
        )}

        {/* LOAD MORE */}
        {hasNextPage && professionals.length > 0 && (
          <Button
            variant="primary"
            size="2xl"
            className="flex justify-center mx-auto mt-4 md:mt-8"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            disabled={isFetchingNextPage}
          >
            Show more
          </Button>
        )}
      </div>
    </BaseTemplate>
  );
}

export default Professionals;
