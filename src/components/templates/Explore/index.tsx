// @ts-nocheck
"use client";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostEmptyState from "@/components/molecules/EmptyState";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import { getAllPosts } from "@/services/posts";
import { Post } from "@/types/nature";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import BaseTemplate from "../BaseTemplate";

function ExplorePageContent() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const categoryList = [
    { id: "all", name: "All" },
    { id: 1, name: "Nature" },
    { id: 2, name: "People" },
    { id: 3, name: "Lifestyle" },
    { id: 4, name: "Culture" },
    { id: 5, name: "Animal" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
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
  } = useInfiniteQuery<Post>({
    queryKey: ["GetAllPosts", selectedCategory.id, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getAllPosts({
        search: searchQuery,
        category_id: selectedCategory.id === "all" ? null : selectedCategory.id,
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

  const handleSearchSubmit = async () => {
    setLoaderSearch(true);
    try {
      await refetch();
    } finally {
      setLoaderSearch(false);
    }
  };

  const handleCategorySelect = async (category: (typeof categoryList)[0]) => {
    setSelectedCategory(category);
    setOpenDropDown(false);
    await refetch();
  };

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
      <div className="main xl:pt-[130px] md:pt-[130px]  pb-10 py-24 lg:px-10 px-4 max-w-[1920px] mx-auto">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="lg:text-4xl text-xl font-bold mb-8 text-center">
            Uncovering people, brand and nature stories!
          </h1>
        </div>

        <div className="flex lg:w-1/2 w-11/12 mx-auto">
          <div className=" w-11/12 border-2 bg-white border-gray-400 divide-x-2 divide-gray-400 flex rounded-l-xl  ">
            <div
              onClick={() => {
                setOpenDropDown(!openDropDown);
              }}
              className="relative flex items-center md:px-6 px-4 py-4 cursor-pointer"
            >
              <p>{selectedCategory?.name}</p>
              <img src={`/assets/Svg/dropdown_select.svg`} alt="" />

              {openDropDown && (
                <div className="absolute top-14 z-50 left-0 flex flex-col bg-white shadow rounded-lg">
                  {categoryList.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="py-2 px-6 hover:bg-na_blue text-center text-black hover:text-white"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search...."
              className="bg-transparent flex-1 w-full p-3 outline-none"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            className="h-auto grid place-content-center px-4 text-white bg-red-500 rounded-r-xl -mr-[2px]"
          >
            {loaderSearch ? <Loader /> : <BsSearch />}
          </button>
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
    </BaseTemplate>
  );
}

export default ExplorePageContent;
