"use client";

import React, { useState } from "react";
import Dropdown from "../Dropdown";
import Image from "next/image";

interface FilterByOption {
  label: string;
  value: string;
}
interface SearchBarWithFilterProps {
  filterByOptions: FilterByOption[];
  searchQuery: string;
  filterBy: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBarWithFilter({
  searchQuery,
  setSearchQuery,
  filterByOptions,
  filterBy,
  setFilterBy,
}: SearchBarWithFilterProps) {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <div className="flex md:w-6/12 w-full mx-auto">
      <div className="w-11/12 border-2 bg-white border-gray-400 divide-x-2 divide-gray-400 flex rounded-l-xl  ">
        {/* FILTER AND DROPDOWN */}
        <div className="w-3/12 z-10 py-4 px-2">
          <div
            onClick={() => {
              setOpenDropDown(!openDropDown);
            }}
            className="relative flex items-center md:px-6   cursor-pointer"
          >
            <p className="truncate capitalize">
              {filterBy === "all" ? "Filter" : filterBy}
            </p>

            {openDropDown && (
              <Dropdown
                options={filterByOptions}
                onSelect={(value) => {
                  setOpenDropDown(false);
                  setFilterBy(value);
                }}
              />
            )}
          </div>
        </div>

        {/* SEARCH INPUT FIELD */}
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search...."
          className="bg-transparent flex-1 w-full p-3 outline-none"
        />
      </div>

      {/* SEARCH BUTTON */}
      <button className="h-auto grid place-content-center px-4 text-white bg-red-500 rounded-r-xl -mr-[2px]">
        <Image
          src="/assets/Svg/Dashboard/search.svg"
          alt="search"
          width={15}
          height={15}
        />
      </button>
    </div>
  );
}

export default SearchBarWithFilter;
