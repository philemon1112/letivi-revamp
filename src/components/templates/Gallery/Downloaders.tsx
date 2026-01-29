// @ts-nocheck
"use client";
import Skeleton from "@/components/atoms/Skeleton";
import {
  getMyBiographyDownloaders,
  getMyPostDownloaders,
} from "@/services/gallery";
import { PostUser } from "@/types/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { getApiMedia } from "@/utils/getApiMedia";
import Pagination from "@/components/molecules/Admin/shared/Pagination";
import Table from "@/components/molecules/Admin/shared/Table";
import MobileBottomContentBar from "@/components/molecules/BottomNavBar";
import DesktopSideContentBar from "@/components/molecules/SideNavConten";
import UserDownloadersList from "@/components/molecules/UserDowloadersList";

interface PostResponse {
  data: {
    data: PostUser[];
  };
  pagination: {
    total: number;
    last_page: number;
  };
}
function Downloaders() {
  const [index, setIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { ref: loadMoreRef, inView } = useInView();
  const defaultImg = "/assets/Img/default.png";
  const pageSize = 10;
  const [isMobile, setIsMobile] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const headers = ["Media", "No. of downloads", "Date Created", ""];

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PostResponse>({
      queryKey: ["BioDownloaders"],
      queryFn: ({ pageParam = 1 }) =>
        getMyBiographyDownloaders({
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

  const {
    data: downloadersList,
    isLoading: isPostDownloadersLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["downloadersList", currentPage],
    queryFn: () =>
      getMyPostDownloaders({
        page: currentPage,
        limit: pageSize,
      }),
    select: (response) => {
      return {
        data: response?.data,
        total: response?.pagination.total,
        totalPages: response?.pagination.last_page,
      };
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allUsers = data?.pages.flatMap((page) => page?.data) ?? [];

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto">
        <div className="main flex justify-center my-2 rounded-t-xl  gap-4">
          <button
            onClick={() => setIndex(1)}
            className={`${
              index === 1 && "bg-na_yellow"
            } px-4 py-2  rounded-md text-sm lg:text-[20px] font-medium`}
          >
            Post
            {/* {downloaders?.length + businessCount ||
            0 + eventCount ||
            0 + projectCount ||
            0} */}
          </button>

          <button
            onClick={() => setIndex(2)}
            className={`${
              index === 2 && "bg-na_yellow"
            } px-4 py-2 rounded-md text-sm lg:text-[20px] font-medium`}
          >
            Biography
          </button>
        </div>

        {index === 1 && (
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Users who have downloaded your Post
            </h1>

            <p className="max-w-2xl mx-auto mb-6 mt-1 text-center text-gray-500 dark:text-gray-300">
              View profile and details of Users who have interacted with your
              Post.
            </p>

            <div className="flex flex-col">
              <div className="overflow-x-auto  no-scrollbar">
                <div className="inline-block min-w-full align-middle ">
                  {isPostDownloadersLoading ? (
                    <div className="flex justify-center py-10">
                      <img
                        src={"/assets/Img/mobile.png"}
                        width={60}
                        height={60}
                        alt="loader"
                        className="animate-spin mx auto"
                      />
                    </div>
                  ) : (
                    <>
                      {downloadersList && downloadersList?.data?.length >= 1 ? (
                        <Table
                          headers={headers}
                          pagination={
                            <Pagination
                              currentPage={currentPage}
                              totalPages={downloadersList.totalPages}
                              totalRecords={downloadersList.total}
                              pageSize={pageSize}
                              onPageChange={handlePageChange}
                            />
                          }
                          tableDesc="Post downloaders List Table"
                        >
                          {downloadersList?.data?.map((d, i) => (
                            <tr
                              key={i}
                              className="hover:bg-gray-50 cursor-pointer"
                            >
                              <td className="px-8 py-2 text-sm font-normal text-gray-700 whitespace-nowrap">
                                <img
                                  src={getApiMedia(d?.media[0]?.path || "")}
                                  className="w-12 h-12 aspect-square rounded-sm"
                                  alt=""
                                />
                              </td>
                              <td className="px-8 py-2 text-sm font-normal text-gray-700 whitespace-nowrap">
                                {d?.download_count?.downloads_count}
                              </td>
                              <td className="px-8 py-2 text-sm font-normal text-gray-700 whitespace-nowrap">
                                {new Date(
                                  d?.download_count?.created_at,
                                )?.toLocaleDateString()}
                              </td>
                              <td
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPostId(d?.post_id);
                                  setViewMore(true);
                                }}
                                className="px-8 py-2 text-sm font-medium cursor-pointer text-na_blue whitespace-nowrap"
                              >
                                view more
                              </td>
                            </tr>
                          ))}
                        </Table>
                      ) : (
                        <div className="flex justify-center py-10">
                          <p className="text-gray-500">No Data Found</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {index === 2 && (
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Users who have downloaded your biography
            </h1>

            <p className="max-w-2xl mx-auto mb-6 mt-1 text-center text-gray-500 dark:text-gray-300">
              View profile and details of people who have interacted with your
              biography.
            </p>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                {allUsers?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                    {allUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-6 md:p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-na_red dark:border-gray-700 dark:hover:border-transparent"
                      >
                        <img
                          className="object-cover w-16 h-16 md:w-32 md:h-32 rounded-full ring-4 ring-gray-300"
                          src={
                            user?.user?.picture
                              ? getApiMedia(user?.user?.picture)
                              : defaultImg
                          }
                          alt="user profile"
                        />

                        <h1 className="mt-4 text-sm md:text-xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                          {user?.user?.first_name} {user?.user?.last_name}
                        </h1>

                        <Link
                          href={`${user?.user?.profile}`}
                          className="mt-2 text-xs md:text-lg text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300"
                        >
                          View Profile
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>No Data</>
                )}
              </>
            )}
          </div>
        )}

        {index === 1 && viewMore ? (
          <>
            {isMobile ? (
              <MobileBottomContentBar
                height="[400px]"
                setOpen={setViewMore}
                open={viewMore}
              >
                {postId !== null && <UserDownloadersList postId={postId} />}
              </MobileBottomContentBar>
            ) : (
              <DesktopSideContentBar setOpen={setViewMore} open={viewMore}>
                {postId !== null && <UserDownloadersList postId={postId} />}
              </DesktopSideContentBar>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Downloaders;
