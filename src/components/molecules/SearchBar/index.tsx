import Image from "next/image";
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="flex lg:w-1/2 w-11/12 mx-auto">
      <div className=" w-11/12 border-2 bg-white border-gray-400 divide-x-2 divide-gray-400 flex rounded-l-xl  ">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search...."
          className="bg-transparent flex-1 w-full p-3 outline-none"
        />
      </div>
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
};

export default SearchBar;
