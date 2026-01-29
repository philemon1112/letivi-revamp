// @ts-nocheck
"use client";
import { AlbumsData } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import { AlbumsGrid } from "@/components/molecules/Album/AlbumsGrid";
import { useRouter } from "next/navigation";
import { getEventAlbums } from "@/services/workspaces";

function EventAlbumList({ eventId }: { eventId: string }) {
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
    queryKey: ["EventAlbumsData", { eventId }],
    queryFn: ({ pageParam = 1 }) =>
      getEventAlbums(eventId, {
        page: pageParam,
        limit: pageSize,
      }),
    getNextPageParam: (lastPage, pages) => {
      const lastPageNum = lastPage?.pagination?.last_page;
      if (lastPageNum && pages.length < lastPageNum) {
        return pages.length + 1;
      }
      return undefined;
    },
    select: (data) => {
      if (!data?.pages) return { pages: [], pageParams: [] };
      return {
        pages: data.pages,
        pageParams: data.pageParams ?? [],
      };
    },
    initialPageParam: 1,
    enabled: !!eventId,
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
  };

  return (
    <div>
      <div className="py-4 md:py-8 px-3 md:px-6">
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
              albumColumns={[1, 2, 3]} // Responsive grid: mobile, tablet, desktop
              eventId={Number(eventId)}
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

export default EventAlbumList;
