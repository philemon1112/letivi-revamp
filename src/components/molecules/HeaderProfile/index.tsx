"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getApiMedia } from "@/utils/getApiMedia";
import Link from "next/link";
import React, { useState } from "react";
import { FaCog, FaEllipsisV, FaUser } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";
import SearchDialog from "../SearchDialog";

const HeaderProfile = () => {
  const [showForms, setShowForms] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const defaultImg = "/assets/Img/default.png";
  const profile = useCurrentUser();
  const authUser = getUserFromLocalStorage();

  //  { label: "Settings", value: "settings", icon: <FaCog /> },

  const dropdownList = [
    ...(authUser?.is_admin
      ? [{ label: "Dashboard", value: "admin", icon: <FaUser /> }] // Replace with actual icon component or value
      : []),
    { label: "Settings", value: "settings", icon: <FaCog /> },
  ];

  const handleCloseModal = () => {
    setShowForms(false);
  };

  return (
    <div className="relative flex justify-between items-center text-black ">
      <div
        onClick={() => {
          setShowForms(true);
        }}
        className="bg-gray-200 flex md:hidden items-center justify-center w-10 h-10 mx-2 overflow-hidden rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Link href="/profile/gallery">
        <div className="flex items-center justify-center w-10 h-10 mx-2 overflow-hidden rounded-lg">
          <img
            src={
              profile?.profile?.picture
                ? getApiMedia(profile?.profile?.picture)
                : defaultImg
            }
            alt="profile_image"
          />
        </div>
      </Link>

      <div className="cursor-pointer ">
        <FaEllipsisV
          onClick={() => {
            setOpenDropDown((prev) => !prev);
          }}
          className="cursor-pointer"
        />
      </div>
      {/* DROPDOWN LIST */}
      {openDropDown && <Dropdown hasLogout options={dropdownList} />}

      <SearchDialog open={showForms} handleModal={handleCloseModal} />
    </div>
  );
};

export default HeaderProfile;
