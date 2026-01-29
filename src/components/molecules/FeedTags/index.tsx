import Link from "next/link";
import React from "react";

function FeedTags() {
  return (
    <div className="hidden md:flex items-center md:gap-x-3 md:gap-y-3 gap-x-2 gap-y-2 md:justify-center justify-evenly py-4 md:py-8 flex-wrap">
      <Link
        href="/professionals"
        className="font-medium md:px-5 md:py-2.5 px-3 py-1.5 text-[11px] md:text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Professionals
      </Link>
      <Link
        href="/workspaces"
        className="font-medium md:px-5 md:py-2.5 px-3 py-1.5 text-[11px] md:text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Workspaces
      </Link>
      <div
        // onClick={() => handleExplorePopUp()}
        className="font-medium flex md:hidden md:px-5 md:py-2.5 px-3 py-1.5 text-[11px] md:text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        More
      </div>
      {/* hide on smaller devices but show on larger ones */}
      <Link
        href="/explore"
        className="font-medium hidden lg:flex px-5 py-2.5 text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Explore
      </Link>

      <Link
        href="/nature"
        className="font-medium hidden lg:flex px-5 py-2.5 text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Nature
      </Link>
      <Link
        href="/lifestyle"
        className="font-medium hidden lg:flex px-5 py-2.5 text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Lifestyle
      </Link>
      <Link
        href="/culture"
        className="font-medium hidden lg:flex px-5 py-2.5 text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Culture
      </Link>
      <Link
        href="/animals"
        className="font-medium hidden lg:flex px-5 py-2.5 text-base bg-[#fff] border-2 border-white hover:border-na_blue text-gray-500 rounded-2xl shadow-sm"
      >
        Animals
      </Link>
    </div>
  );
}

export default FeedTags;
