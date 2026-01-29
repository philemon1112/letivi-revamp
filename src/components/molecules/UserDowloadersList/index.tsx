import Loader from "@/components/atoms/Loader";
import { getPostUserDownloadersList } from "@/services/gallery";
import { PostUser } from "@/types/common";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";

interface DownloadListProps {
  postId: number;
}

function UserDownloadersList({ postId }: DownloadListProps) {
  const defaultImg = "/assets/Img/default.png";
  const {
    data: downloadList,
    isError,
    error,
    isLoading,
    refetch: fetchDownloadList,
    isRefetching,
  } = useQuery({
    queryKey: ["userDownloaders"],
    queryFn: () => getPostUserDownloadersList(postId),
    select: (data) => data.data as unknown as PostUser[],
    enabled: false,
  });

  useEffect(() => {
    fetchDownloadList(); // Refetch the post comments each time post id changes
  }, [postId]);

  return (
    <div className="flex p-4 w-full h-[400px] md:h-full flex-col justify-between">
      <div className="space-y-4">
        {isLoading || isRefetching ? (
          <div className="my-5">
            <Loader />
          </div>
        ) : downloadList && downloadList.length > 0 ? (
          downloadList.map((user) => (
            <div
              key={user?.id}
              className="p-4 md:p-6 border rounded-lg dark:border-gray-700"
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center  -mx-2">
                  <img
                    className="object-cover mx-2 rounded-full md:w-14 shrink-0 h-11 w-11 md:h-14 ring-4 ring-gray-300 dark:ring-gray-700"
                    src={
                      user?.picture ? getApiMedia(user?.picture) : defaultImg
                    }
                    alt="user profile"
                  />
                  <div className="mx-2">
                    <h1 className="font-semibold text-gray-800 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </h1>
                    <span className="text-sm text-gray-500">{user?.email}</span>
                  </div>
                </div>
                <Link href={`${user?.profile}`}>
                  <button
                    title="view profile"
                    className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 md:w-6 h-4 md:h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No downloaders found.</div>
        )}
      </div>
    </div>
  );
}

export default UserDownloadersList;
