"use client";
import { Button } from "@/components/atoms/Button";
import Skeleton from "@/components/atoms/Skeleton";
import { getRecentEvents } from "@/services/events";
import { PaginationOptions } from "@/types/common/pagination";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

function RecentsEvents() {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["RecentEvents"],
    queryFn: async () => await getRecentEvents({ limit: 4 }),
    select: (data) => {
      // setPagination(prevPagination => ({
      //     ...prevPagination,
      //     pageIndex: data.data.totalPages,
      //     totalPages: data.data.totalPages
      // }));
      return data.data;
    },
  });

  // const { t } = useTranslation();

  return (
    <div>
      <div className="px-4 py-1 mx-auto  max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="my-6">
          <h1 className="font-semibold text-2xl md:text-4xl md:hidden">
            {/* {t("latest_events")} */}
            Find Latest Workspaces
          </h1>
        </div>
        <div className="flex flex-wrap items-center mx-auto max-w-7xl">
          <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
            <div>
              <div className="relative w-full max-w-lg">
                <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  {isLoading ? (
                    <>
                      <div className="group mb-2 block md:h-48 overflow-hidden rounded-lg bg-gray-100 animate-pulse  lg:mb-3">
                        {/* <Skeleton width={150} height={150} /> */}
                      </div>
                      <div className="group mb-2 block md:h-48 overflow-hidden rounded-lg bg-gray-100 animate-pulse  lg:mb-3">
                        {/* <Skeleton width={150} height={150} /> */}
                      </div>
                      <div className="group mb-2 block md:h-48 overflow-hidden rounded-lg bg-gray-100 animate-pulse  lg:mb-3">
                        {/* <Skeleton width={150} height={150} /> */}
                      </div>
                      <div className="group mb-2 block md:h-48 overflow-hidden rounded-lg bg-gray-100 animate-pulse  lg:mb-3">
                        {/* <Skeleton width={150} height={150} /> */}
                      </div>
                    </>
                  ) : (
                    <>
                      {data?.map((item) => (
                        <Link key={item.id} href={`${item.slug}`}>
                          <div className="group mb-2 block h-44 md:h-48 overflow-hidden rounded-lg bg-gray-100 lg:mb-3">
                            <img
                              src={
                                item?.event_profile?.logo
                                  ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${item?.event_profile?.logo}`
                                  : "/assets/Img/event.jpg"
                              }
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                            />
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:mt-12  text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
            <h1 className="font-semibold text-2xl mb-4 md:text-4xl hidden md:flex">
              {/* {t("latest_events")}{" "} */}
              Find Latest Workspaces
            </h1>
            <div className="border border-l-2 border-t-0 my-6 border-b-0 border-r-0 border-na_red">
              <p className="text-xl md:text-lg px-4">
                {/* {t("events_subtext1")} */}
                Find high-resolution photos and videos showcasing the highlights
                of diverse workspaces.
              </p>
            </div>

            <div className="border border-l-2 border-t-0 my-6 border-b-0 border-r-0 border-na_blue">
              <p className="text-xl md:text-lg px-4">
                {/* {t("events_subtext2")} */}
                Click on the workspaces to view high-resolution photos, watch
                videos, and explore their insightful stories.
              </p>
            </div>
            <div className="my-6">
              <Link href="/workspaces">
                <Button
                  variant="tertiary"
                  size="xl"
                  className=" sm:text-sm lg:text-lg py-3 lg:px-8 px-4 sm:px-4 "
                >
                  {/* {t("featured_events")} */}
                  Featured Workspaces
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentsEvents;
