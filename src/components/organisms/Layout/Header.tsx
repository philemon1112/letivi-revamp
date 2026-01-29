"use client";
import { Button } from "@/components/atoms/Button";
import AppLogo from "@/components/molecules/AppLogo";
import Link from "next/link";
import React, { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import DashboardHeader from "./DashboardHeader";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import MobileBottomNavigationBar from "./MobileBNB";
import { useCurrentUserFromCookie } from "@/hooks/useCurrentUserFromCookie";
import Skeleton from "@/components/atoms/Skeleton";

function Header() {
  // const { t } = useTranslation();
  // const isAuthenticated = getLoggedInUser();
  const { user: currentUser, isLoading } = useCurrentUserFromCookie();

  if (isLoading) {
    return (
      <Skeleton
        height={60}
        width={100}
        className="header header fixed left-0 right-0 border-b max-w-[1920px] border-gray-400 z-50 mx-auto  flex justify-between py-3  lg:py-5 lg:px-20 px-2 w-full"
      />
    ); // Or your loading component
  }

  return (
    <>
      {currentUser ? (
        <>
          <DashboardHeader />
          <MobileBottomNavigationBar />
        </>
      ) : (
        <div
          className={`header fixed left-0 right-0 border-b max-w-[1920px] border-gray-400 z-50 mx-auto bg-white flex justify-between py-3  lg:py-5 lg:px-20 px-2 w-full`}
        >
          <Link href={"/"}>
            <div className="">
              <div className="relative cursor-pointer">
                <AppLogo responsive={false} image={false} />

                <div className="relative group">
                  <span className="absolute -top-14 md:mt-0 mt-2 -right-12 inline-block rounded-full bg-na_blue py-1 px-2.5 text-xs md:text-sm font-medium text-white">
                    Beta
                  </span>

                  <span className="absolute hidden group-hover:flex -right-24 -top-8 w-fit px-4 py-2 bg-black rounded-md text-center text-white text-sm after:content-[''] after:absolute after:left-3/4 after:bottom-[100%] after:border-[6px] after:border-x-transparent after:border-b-black after:border-t-transparent">
                    Letivi Beta test , (Version 2.5)
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex space-x-2 items-center font-medium">
            <Link href={"/login"} aria-label="Login">
              <Button
                variant="tertiary"
                outlined
                size="lg"
                className="text-[10px] sm:text-xs lg:text-base rounded-md py-2 lg:px-8 px-2 sm:px-4 border "
              >
                {/* {t("common:sign_in")} */}
                Sign in
              </Button>
            </Link>

            <Link
              href={"/signup"}
              aria-label="Sign up"
              className="hidden md:flex"
            >
              <Button
                variant="tertiary"
                size="lg"
                className="rounded-md text-[10px] sm:text-xs lg:text-base py-2 lg:px-8 px-2 sm:px-4 "
              >
                {/* {t("common:sign_up")} */}
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
