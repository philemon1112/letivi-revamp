// @ts-nocheck
"use client";
import { getUserAlbums } from "@/services/gallery";
import { AlbumsData } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import { AlbumsGrid } from "@/components/molecules/Album/AlbumsGrid";

import { useRouter } from "next/navigation";

function AlbumsList({ isPrivate }: { isPrivate: number }) {
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
  } = useInfiniteQuery<AlbumsData>({
    queryKey: ["ALbumsData", { isPrivate }],
    queryFn: ({ pageParam = 1 }) =>
      getUserAlbums({
        private: isPrivate,
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

  const allAlbums = data?.pages.flatMap((page) => page.data) ?? [];

  const handleAlbumClick = ({
    album,
    location,
  }: {
    album: AlbumsData;
    location: string;
  }) => {
    router.push(`/profile/gallery?tab=albums&id=${album.id}`);
    console.log("this");
  };

  return (
    <div>
      <div className="py-4 md:py-8">
        <div>
          {isLoading ? (
            <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
              loading
            </div>
          ) : (
            <AlbumsGrid
              albumsData={allAlbums}
              onAlbumClick={handleAlbumClick}
              canEditAlbum={true}
              privacyControl={true}
              albumColumns={[1, 2, 4]} // Responsive grid: mobile, tablet, desktop
              privacy={isPrivate}
              refetch={refetch}
            />
          )}
        </div>

        <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
          {isFetchingNextPage && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          )}
        </div>
      </div>
    </div>
  );
}

export default AlbumsList;
