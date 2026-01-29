// @ts-nocheck
import Loader from "@/components/atoms/Loader";
import ProfessionalCard from "@/components/molecules/ProfessionalCard";
import { fetchUserFollowers } from "@/services/biography";
import { Followers } from "@/types/biography";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function FollowersList() {
  const router = useRouter();
  const pageSize = 10;
  const { ref: loadMoreRef, inView } = useInView();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<Followers>({
    queryKey: ["Followers List"],
    queryFn: ({ pageParam = 1 }) =>
      fetchUserFollowers({
        page: pageParam,
        limit: pageSize,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (
        !lastPage?.pagination ||
        !Array.isArray(allPages) ||
        allPages.length === 0
      ) {
        return undefined;
      }
      const currentPage = allPages.length;
      const totalPages = lastPage.pagination.last_page;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    select: (data) => {
      if (!data?.pages) return { pages: [], pageParams: [] };
      return {
        pages: data.pages,
        pageParams: data.pageParams ?? [],
      };
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const followers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mx-auto max-w-screen-xl bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {followers.length ? (
            <div className="mt-4 grid lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4 justify-center">
              {followers.map((user, index) => {
                return (
                  <ProfessionalCard key={index} searchedUser={user?.user} />
                );
              })}
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              No professionals found
            </div>
          )}
        </>
      )}
      <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}

export default FollowersList;
