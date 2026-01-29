"use client";
import Loader from "@/components/atoms/Loader";
import { getPosts } from "@/services/posts";
import { Post } from "@/types/nature";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SinglePost from "@/components/organisms/Post";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function PostList({ refetchPost }: { refetchPost: number }) {
  const userId: string | undefined = getUserFromLocalStorage()?.id;
  const [posts, setPosts] = useState([] as Post[]);
  const { ref, inView } = useInView();
  const currentUser = useCurrentUser();

  // Fetch Posts using useInfiniteQuery
  const {
    data,
    error,
    fetchNextPage,
    refetch,
    isLoading,
    hasNextPage,
    isFetching,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allPosts"],
    queryFn: ({ pageParam }) =>
      getPosts({ pageParam, limit: 20, userId: userId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // Extract the next page number from the next_page_url
      const nextPageUrl = lastPage.pagination.next_page_url;
      if (nextPageUrl) {
        const nextPageParam = new URL(nextPageUrl).searchParams.get("page");
        return nextPageParam ? parseInt(nextPageParam) : undefined;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (refetchPost > 0) {
      refetch(); // Trigger refetch when the prop changes
    }
  }, [refetchPost, refetch]);
  // Update posts state when we get first page or next page
  useEffect(() => {
    var isLastPage = false;
    if (data && !isLastPage) {
      const newPosts = data.pages.flatMap((page) => page.data); // we get the actual data from the page and pass it to a newPosts
      setPosts((prevPosts) => [...(newPosts as unknown as Post[])]);

      if (!hasNextPage) {
        isLastPage = true;
      }
    }
  }, [data, hasNextPage]);

  // const { data: peopleIFollow } = useQuery({
  //   queryKey: ["followings"],
  //   queryFn: () => getPeopleiIFollow(),
  // });

  // console.log("People I follow: ", peopleIFollow);

  // FETCH NEXT PAGE WHEN AT BOTTOM
  useEffect(() => {
    if (inView && !isRefetching && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isRefetching, isLoading, hasNextPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {posts.length ? (
            <>
              <div className="flex flex-col gap-4 mr-1.5 lg:mr-2">
                {posts.map((post, index) => {
                  return (
                    <SinglePost
                      key={index}
                      currentUser={currentUser}
                      post={post}
                    />
                  );
                })}
                {/* LOAD MORE */}
                <div ref={ref} className="pt-4 ">
                  {isFetchingNextPage && <Loader />}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-8 text-gray-600">No posts found</div>
          )}
        </>
      )}
    </>
  );
}

export default PostList;
