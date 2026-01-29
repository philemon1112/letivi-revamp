"use client";

import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface Tab {
  title: string;
  icon: IconType;
  href: string;
  count: number;
}

interface TabMenuProps {
  tabs: Tab[];
  basePath?: string;
  type?: string;
}

export default function TabMenu({ tabs, basePath = "", type }: TabMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || tabs[0].title.toLowerCase();

  const handleTabClick = (tab: Tab) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", tab.title.toLowerCase());
    router.push(`${basePath}/${type || "gallery"}?${newParams.toString()}`, {
      scroll: false, // 👈 prevent automatic scroll to top
    });
  };

  return (
    <div className="max-w-screen-xl px-4 md:px-2 items-center sm:flex justify-between mx-auto pt-4 md:pt-8">
      <Link href="/profile">
        <Button variant="tertiary" size="xl" className="hidden sm:flex">
          <FaArrowLeft className="mr-2" />
          Return
        </Button>
      </Link>

      <div className="bg-white px-1.5 md:px-3 py-2.5 border shadow rounded-xl">
        <nav className="flex no-scrollbar flex-nowrap gap-2 md:gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.title}
              onClick={() => handleTabClick(tab)}
              className={`
                transition-all duration-200 font-medium 
                px-3 py-2 whitespace-nowrap text-base md:text-lg rounded-xl
                inline-flex items-center hover:bg-gray-300 hover:text-black
                ${
                  currentTab === tab.title.toLowerCase()
                    ? "text-white bg-red-600"
                    : "text-black bg-transparent"
                }
              `}
            >
              <tab.icon className="text-lg md:text-2xl mr-1 md:mr-2.5" />
              <span className="pl-1 md:pl-3 text-sm md:text-base">
                {tab.title}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5  
                   ${
                     currentTab === tab.title.toLowerCase()
                       ? "text-black bg-white"
                       : "text-white bg-gray-400"
                   }
                   rounded-full`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
