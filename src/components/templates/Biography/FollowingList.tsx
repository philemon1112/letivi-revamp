// @ts-nocheck
import Loader from "@/components/atoms/Loader";
import ProfessionalCard from "@/components/molecules/ProfessionalCard";
import { fetchUserFollowers, fetchUserFollowing } from "@/services/biography";
import { Followers } from "@/types/biography";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function FollowingList() {
  const router = useRouter();
  const [index, setIndex] = useState(1);
  const pageSize = 10;
  const { ref: loadMoreRef, inView } = useInView();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Followers>({
      queryKey: ["Following List"],
      queryFn: ({ pageParam = 1 }) =>
        fetchUserFollowing({
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

  const following = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mx-auto max-w-screen-xl bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main flex justify-center my-2 rounded-t-xl  gap-4">
        <button
          onClick={() => setIndex(1)}
          className={`${
            index === 1 && "bg-na_yellow"
          } px-4 py-2  rounded-md text-sm lg:text-[20px] font-medium`}
        >
          Professionals
        </button>

        <button
          onClick={() => setIndex(2)}
          className={`${
            index === 2 && "bg-na_yellow"
          } px-4 py-2 rounded-md text-sm lg:text-[20px] font-medium`}
        >
          Workspaces
        </button>
      </div>

      {index === 1 && (
        <div className="">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {following.length ? (
                <div className="mt-2 grid lg:grid-cols-3 sm:grid-cols-2 gap-10 p-4 justify-center">
                  {following.map((user, index) => {
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
      )}

      {index === 2 && (
        <div className="py-4 md:py-8">
          <div>
            <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="text-center mt-8 text-gray-600">
                  No workspaces found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowingList;
