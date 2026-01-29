import { logoutUser } from "@/services/login";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

interface DropdownOption {
  label: string;
  value: string;
  link?: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect?: (value: string) => any;
  hasLogout?: boolean;
}

/* there are 2 types of dropdowns in the project one in 
 which the dropdown options are links to different pages 
 and others which handles filters. If it has no onSelect 
 props then the dropdown list is a link to a different page.
*/

const Dropdown = ({ options, onSelect, hasLogout }: DropdownProps) => {
  const isDropdownLink = !onSelect;

  return (
    <>
      {/* {hasLogout && (
        <div className="absolute z-30 top-12 left-0 text-left flex-col bg-white shadow rounded-lg">
          {options.map((option) => (
            <Link
              href={`/${option.value}`}
              key={option.value}
              className="flex items-center  gap-2 py-2 px-6 hover:bg-na_blue text-black hover:text-white cursor-pointer"
            >
              <div>{option?.icon}</div>
              {option.label}
            </Link>
          ))}
           LOGOUT BUTTON 
          <button
            onClick={() => logoutUser()}
            className="flex items-center gap-2 py-2 px-6 hover:bg-na_blue text-black hover:text-white cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )} */}

      {isDropdownLink ? (
        <div className="absolute z-30 top-12 right-0 text-left flex flex-col bg-white shadow rounded-lg">
          {options.map((option) => (
            <Link
              href={`/${option.value}`}
              key={option.value}
              className="flex items-center  gap-2 py-2 px-6 hover:bg-na_blue text-black hover:text-white cursor-pointer"
            >
              {option?.icon}
              {option.label}
            </Link>
          ))}

          {hasLogout && (
            <button
              onClick={() => logoutUser()}
              className="flex items-center gap-2 py-2 px-6 hover:bg-na_blue text-black hover:text-white cursor-pointer"
            >
              <FiLogOut />
              Logout
            </button>
          )}
        </div>
      ) : (
        <div className="absolute z-30 top-12 left-0 text-left flex flex-col bg-white shadow rounded-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="py-2 px-6 hover:bg-na_blue text-black hover:text-white cursor-pointer"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;
