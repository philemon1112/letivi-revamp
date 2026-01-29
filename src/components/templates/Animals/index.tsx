// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import BaseTemplate from "../BaseTemplate";
import SearchBar from "@/components/molecules/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/services/posts";
import { useInView } from "react-intersection-observer";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import PostEmptyState from "@/components/molecules/EmptyState";
import { Post } from "@/types/common";

interface PostsResponse {
  data: Post[];
  pagination: {
    last_page: number;
  };
}

function Animals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loaderSearch, setLoaderSearch] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();
  const pageSize = 15;

  const {
    data,
    isLoading: postLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery<PostsResponse>({
    queryKey: ["AnimalPost", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getAllPosts({
        search: searchQuery,
        category_id: 5,
        page: pageParam,
        limit: pageSize,
      }),
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
    <BaseTemplate>
      {/* HEADER AND SEARCH BAR */}
      <div className="main xl:pt-[130px] md:pt-[130px]  pb-10 py-24 lg:px-10 px-4 max-w-[1920px] mx-auto ">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold mb-8 text-center">
            Explore the science and beauty of animals!
          </h1>
        </div>

        <div className="">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="py-4 md:py-8">
          <div>
            {postLoading ? (
              <div className="columns-2 sm:columns-2 lg:columns-4 gap-2">
                <PostLoadingShimmer />
              </div>
            ) : (
              <>
                {allPosts?.length > 0 ? (
                  <div className="columns-2 sm:columns-2 lg:columns-4 gap-4">
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
      </div>
    </BaseTemplate>
  );
}

export default Animals;
