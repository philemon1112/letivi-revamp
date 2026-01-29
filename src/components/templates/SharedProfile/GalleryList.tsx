// @ts-nocheck
import { Post } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import PostEmptyState from "@/components/molecules/EmptyState";
import { getSharedUserGalleryPost } from "@/services/biography";

interface PostResponse {
  data: {
    posts: Post[];
  };
  pagination: {
    total: number;
    last_page: number;
  };
}

function GalleryList({ userId }: { userId: number }) {
  const { ref: loadMoreRef, inView } = useInView();
  const pageSize = 10;

  const {
    data,
    isLoading: postLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery<PostResponse>({
    queryKey: ["UserSharedGalleryPost"],
    queryFn: ({ pageParam = 1 }) =>
      getSharedUserGalleryPost(
        {
          page: pageParam,
          limit: pageSize,
        },
        userId
      ),
    getNextPageParam: (lastPage, pages) => {
      // Add a safety check for pages
  if (!pages || !lastPage?.pagination) {
    return undefined;
  }
  
  if (pages.length < lastPage.pagination.last_page) {
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

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto px-3 md:px-6">
        <div className="py-4 md:py-8">
          <div>
            {postLoading ? (
              <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                <PostLoadingShimmer />
              </div>
            ) : (
              <>
                {allPosts?.length > 0 ? (
                  <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                    {allPosts.map((post, index) => (
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
      </div>
    </div>
  );
}

export default GalleryList;
