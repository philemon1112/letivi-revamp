"use client";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import { FiBell, FiGlobe, FiMenu, FiX } from "react-icons/fi";
import SideBar from "./SideBar";
import { logoutUser } from "@/services/login";

function AdminHeader() {
  const currentUser = useCurrentUser();
  const defaultImg = "/assets/Img/default.png";
  const logo = "Assets/Img/mobile.png";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for profile dropdown

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <button
              aria-controls="sidebar"
              onClick={toggleSidebar}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <a className="block flex-shrink-0 lg:hidden" href="/">
              <img
                alt="Logo"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                data-nimg="1"
                src={logo}
              />
            </a>
          </div>
          <div className="hidden sm:block"></div>
          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              <li className="relative mx-4">
                <FiBell />
              </li>
              <li className="relative mx-4 hover:bg-gray-100 cursor-pointer">
                <Link href="/">
                  <FiGlobe />
                </Link>
              </li>
            </ul>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-4"
              >
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    {currentUser?.first_name} {currentUser?.last_name}
                  </span>
                  <span className="block text-xs">
                    {currentUser?.user_role?.name ?? "Admin"}
                  </span>
                </span>
                <span>
                  <img
                    alt="User"
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-full"
                    data-nimg="1"
                    src={
                      currentUser?.profile?.picture
                        ? getApiMedia(currentUser?.profile?.picture)
                        : defaultImg
                    }
                  />
                </span>
                <svg
                  className="hidden fill-current sm:block"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                    fill=""
                  ></path>
                </svg>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-28 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <ul className="">
                      <li>
                        <a
                          onClick={() => logoutUser()}
                          className="block p-4 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-boxdark shadow-md transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <SideBar isMobile={true} />
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default AdminHeader;
