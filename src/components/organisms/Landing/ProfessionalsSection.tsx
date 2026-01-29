"use client";
import { Button } from "@/components/atoms/Button";
import UserCard from "@/components/molecules/UserCard";
import Loader from "@/components/atoms/Loader";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { getRecentProfessionals } from "@/services/professional";
// import { useTranslation } from "react-i18next";

function ProfessionalsSection() {
  const {
    data: artists,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["Professionals"],
    queryFn: async () => await getRecentProfessionals({ limit: 3 }),
    select: (data) => {
      // setPagination(prevPa+gination => ({
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
      <div className="mx-auto max-w-screen-xl py-6 px-4 md:px-8">
        <div className="my-6 md:my-10">
          <h1 className="font-semibold text-2xl md:text-4xl">
            {/* {t("professionals_title")} */}
            Seeking Profiles, Link With Professionals
          </h1>
        </div>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {!isLoading &&
            (artists ?? [])?.length > 0 &&
            artists?.map((artist) => (
              <Link key={artist?.id} href="/professionals">
                <UserCard artistProfile={artist} />
              </Link>
            ))}
        </div>

        {isLoading && <Loader />}

        <div className="mx-auto flex justify-center items-center text-center max-w-full my-10">
          <Link href="/professionals">
            <Button
              variant="tertiary"
              size="xl"
              className="sm:text-sm lg:text-lg py-3 lg:px-8 px-4 sm:px-4 "
            >
              {/* {t("link_professional")} */}
              Link With Professionals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalsSection;
