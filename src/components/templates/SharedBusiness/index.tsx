"use client";
import { getSharedBusinessDetails } from "@/services/workspaces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Skeleton from "@/components/atoms/Skeleton";
import { getApiMedia } from "@/utils/getApiMedia";
import SocialHandles from "@/components/molecules/SocialHandles";
import { Button } from "@/components/atoms/Button";

import BaseTemplate from "../BaseTemplate";
import WorkspaceLoadingTemplate from "../Workspace/loadingTemplate";
import BusinessProfile from "../Workspace/Details/businessProfile";
import BusinessGallery from "../Workspace/Details/businessGallery";
import TruncatedDescription from "@/components/molecules/TruncatedDescription";
import Link from "next/link";
import { getCountryNameById } from "@/utils/constants";

function SharedBusinessDetails({ name }: { name: string }) {
  // component logic
  const defaultImg = "/assets/Img/default.png";

  const {
    data: business,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["SharedBusinessDetails", name],
    queryFn: () => {
      return getSharedBusinessDetails(name);
    },
    select: (response) => {
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <BaseTemplate withFooter={false}>
      {isLoading ? (
        <WorkspaceLoadingTemplate />
      ) : (
        <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto hide-scrollbar">
          <div className="max-w-screen-2xl mx-auto px-2 md:px-4">
            <div className="bg-white p-2 flex items-center rounded-2xl mb-2 flex-wrap overflow-x-auto no-scrollbar">
              <nav aria-label="breadcrumb">
                <ol className="flex leading-none text-blue-500 divide-x">
                  <li className="pr-4">
                    <Link
                      href="/feed"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </Link>
                  </li>

                  <li
                    className="inline-flex items-center px-4 text-gray-700"
                    aria-current="page"
                  >
                    <Link
                      href="/workspaces"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 truncate"
                    >
                      Workspaces
                    </Link>
                  </li>

                  <li
                    className="inline-flex items-center px-4 text-gray-700"
                    aria-current="page"
                  >
                    <a className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 truncate">
                      {business?.name}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-8">
              <div className="md:col-span-1 mt-4">
                <BusinessProfile
                  businessData={business || null}
                  refetchBusinesses={refetch}
                  type="shared"
                />
              </div>

              <div className="md:col-span-3">
                <div className="mx-auto max-w-screen-xl mt-4">
                  <div className=" px-2 md:px-4 bg-white py-4 md:py-6 rounded-xl">
                    <div className="flex justify-between items-center align-bottom">
                      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4 mb-2">
                        About
                      </h2>
                      <a
                        download
                        href={`${process.env.NEXT_PUBLIC_OLD_API_BASE}/workspaces/download/project/${business?.id}`}
                      >
                        <Button variant="tertiary" size="sm">
                          Download
                        </Button>
                      </a>
                    </div>

                    <p className="lg:px-4">
                      <TruncatedDescription
                        maxLength={350}
                        description={business?.description ?? ""}
                      />
                    </p>
                  </div>
                </div>

                <div className="mx-auto max-w-screen-xl bg-white !rounded-xl overflow-x-auto mt-5 no-scrollbar">
                  <div className=" px-2 bg-white py-4 md:py-6 rounded-xl">
                    <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4 mb-2">
                      Gallery
                    </h2>
                    <BusinessGallery businessId={name} type="shared" />
                  </div>
                </div>

                <div className="mx-auto max-w-screen-xl">
                  <div className=" px-2 md:px-4 bg-white py-4 md:py-6 my-4 rounded-xl">
                    <div className="flex justify-between items-center align-bottom">
                      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
                        Collaborators
                      </h2>
                    </div>
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        {business?.collaborators?.length ? (
                          <div className="grid grid-cols-1 gap-8 mt-4 xl:mt-6 md:grid-cols-2 xl:grid-cols-3">
                            {business?.collaborators.map((user, index) => (
                              <div
                                key={index}
                                className={`flex relative flex-col items-center p-6 md:p-8 transition-colors duration-300 transform ${
                                  user?.id === business?.user?.id
                                    ? "border border-yellow-600 hover:bg-na_yellow"
                                    : "border hover:bg-na_red"
                                } cursor-pointer rounded-xl hover:border-transparent group  dark:border-gray-700 dark:hover:border-transparent`}
                              >
                                <img
                                  className="object-cover w-16 h-16 md:w-32 md:h-32 rounded-full ring-4 ring-gray-300"
                                  src={
                                    user?.profile?.picture
                                      ? getApiMedia(user?.profile?.picture)
                                      : defaultImg
                                  }
                                  alt="user profile"
                                />

                                <h1 className="mt-4 text-sm md:text-xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                                  {user?.first_name} {user?.last_name}
                                </h1>
                                <p className="text-gray-400 group-hover:text-gray-200 justify-center text-center">
                                  {user?.profession?.profession || ""} |
                                  <span className="ml-1">
                                    {user?.profile?.country?.length === 2
                                      ? getCountryNameById(
                                          user?.profile?.country?.toLowerCase()
                                        )
                                      : user?.profile?.country}
                                  </span>
                                </p>

                                <SocialHandles
                                  searchedUser={user?.profession}
                                />
                                {user?.id === business?.user?.id && (
                                  <p className="text-xs md:text-sm text-gray-900 mt-1 dark:text-gray-300">
                                    Admin
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>No Collaborators addded yet</>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseTemplate>
  );
}

export default SharedBusinessDetails;
