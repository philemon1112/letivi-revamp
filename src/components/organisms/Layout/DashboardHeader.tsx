// "use client";

import { Button } from "@/components/atoms/Button";
import AppLogo from "@/components/molecules/AppLogo";
import MenuLink from "@/components/molecules/MenuLink";

import { logoutUser } from "@/services/login";

import React, { useState } from "react";

import { RiHome2Line } from "react-icons/ri";
import { CgUserList } from "react-icons/cg";
import { TiMessages } from "react-icons/ti";
import { AiOutlineFileSearch } from "react-icons/ai";
import HeaderProfile from "@/components/molecules/HeaderProfile";

function DashboardHeader() {
  const menus = [
    {
      name: "Home",
      link: "/feed",
      icon: <RiHome2Line />,
    },
    {
      name: "Explore",
      link: "#",
      icon: <AiOutlineFileSearch />,
      dropdown: [
        { label: "All", value: "explore" },
        { label: "Nature", value: "nature" },
        { label: "Professionals", value: "professionals" },
        { label: "Lifestyle", value: "lifestyle" },
        { label: "Culture", value: "culture" },
        { label: "Animals", value: "animals" },
        { label: "Workspaces", value: "workspaces" },
      ],
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <CgUserList />,
    },
    {
      name: "Messages",
      link: "/messages",
      icon: <TiMessages />,
    },
    // {
    //   name: "Notifications",
    //   link: "/notifications",
    //   icon: <MdOutlineNotificationsNone />,
    // },
  ];

  return (
    <div
      className={`header fixed left-0 right-0 border-b max-w-[1920px] border-gray-400 z-50 mx-auto bg-white flex justify-between py-3  lg:py-5 lg:px-20 px-2 w-full`}
    >
      <div className="">
        <a href={"/"} className="relative">
          <AppLogo responsive={false} image={false} />
          {/* <span className="absolute top-0 -right-32 w-36 translate-y-4 -translate-x-6 -rotate-45 bg-na_blue text-center text-sm text-white">Beta</span> */}
          <div className="relative group">
            <span className="absolute -top-14 mt-2 md:mt-0 -right-12 inline-block rounded-full bg-na_blue py-1 px-2.5 text-xs md:text-sm font-medium text-white">
              Beta
            </span>

            <span className="absolute hidden group-hover:flex -right-24 -top-8 w-fit px-4 py-2 bg-black rounded-md text-center text-white text-sm after:content-[''] after:absolute after:left-3/4 after:bottom-[100%] after:border-[6px] after:border-x-transparent after:border-b-black after:border-t-transparent">
              Letivi Beta test , (Version 1.2)
            </span>
          </div>
        </a>
      </div>

      <div className="space-x-8 hidden xl:flex items-center text-na_blue">
        {menus.map((menu) => (
          <MenuLink
            key={menu.name}
            href={menu.link}
            icon={menu.icon}
            name={menu.name}
            dropdown={menu.dropdown}
          />
        ))}

        {/* USER PROFILE AND DROPDOWN WITH SETTINGS AND LOGOUT */}

        <HeaderProfile />
      </div>
      <div className="flex justify-between items-center text-black xl:hidden">
        <HeaderProfile />
      </div>
    </div>
  );
}

export default DashboardHeader;
