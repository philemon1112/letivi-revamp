// @ts-nocheck
"use client";

import { getUserSavedPost } from "@/services/gallery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import type { SavedPost } from "@/types/common";
import PostEmptyState from "@/components/molecules/EmptyState";

interface PostResponse {
  data: {
    saved_posts: SavedPost[];
  };
  pagination: {
    total: number;
    last_page: number;
  };
}

export default function SavedPost() {
  const { ref: loadMoreRef, inView } = useInView();
  const pageSize = 10;

  const {
    data,
    isLoading: postLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostResponse>({
    queryKey: ["savedPost"],
    queryFn: ({ pageParam = 1 }) =>
      getUserSavedPost({
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

  const handleVideoHover = (video: HTMLVideoElement) => {
    video.muted = true; // Must be muted for autoplay to work on most browsers
    video.play().catch(() => {
      // Handle any autoplay errors silently
    });
  };

  const handleVideoLeave = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };
  const allPosts = data?.pages[0]?.data?.saved_posts
    ? data?.pages?.flatMap((page) => page?.data?.saved_posts)
    : [];

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto px-3 md:px-6">
        {postLoading ? (
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 ">
            <PostLoadingShimmer />
          </div>
        ) : (
          <>
            {allPosts?.length > 0 ? (
              <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 px-4 py-2">
                {allPosts?.map((post, index) => (
                  <PostGalleryCard
                    key={post?.id}
                    post={post}
                    index={index}
                    onVideoHover={handleVideoHover}
                    onVideoLeave={handleVideoLeave}
                    allPosts={allPosts}
                  />
                ))}
              </div>
            ) : (
              <PostEmptyState title="No Saved Post" />
            )}
          </>
        )}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}
