"use client";

import Link from "next/link";
import React, { useState } from "react";
// import { useRouter } from "next/router";

import { MdOutlineArrowDropDown } from "react-icons/md";
import Dropdown from "../Dropdown";

type DropdownOption = {
  label: string;
  value: string;
};

interface MenuLinkProps {
  href: string;
  name: string;
  icon: React.ReactNode;
  dropdown?: DropdownOption[];
}

const MenuLink = ({ href, icon, name, dropdown }: MenuLinkProps) => {
  const isActive = window?.location?.pathname === href;
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <>
      {/* if menu link has a dropdown show menu with dropdown icon else show menu link */}
      {dropdown ? (
        <button
          onClick={() => setOpenDropDown((prev) => !prev)}
          className={`${
            isActive
              ? "active bg-na_blue rounded-md px-2 py-3 text-white"
              : "text-na_blue"
          } flex gap-2 items-center text-lg relative `}
        >
          {icon}
          <p className="capitalize">{name}</p>
          <div className={` text-3xl`}>
            <MdOutlineArrowDropDown />
          </div>

          {/* DROPDOWN LIST */}
          {openDropDown && <Dropdown options={dropdown} />}
        </button>
      ) : (
        <Link
          href={href}
          className={`${
            isActive
              ? "active bg-na_blue rounded-md px-2 py-3 text-white"
              : "text-na_blue"
          } flex gap-2 items-center text-lg `}
        >
          {icon}
          <p className="capitalize">{name}</p>
        </Link>
      )}
    </>
  );
};

export default MenuLink;
