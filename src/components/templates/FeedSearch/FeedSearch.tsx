"use Client";

import GalleryCard from "@/components/molecules/GalleryCard";
import { getAllPosts } from "@/services/posts";
import { Professional } from "@/types/common/professional";
import { getApiMedia } from "@/utils/getApiMedia";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FeedSearchProps {
  currentUser: Professional | undefined;
}
function FeedSearch({ currentUser }: FeedSearchProps) {
  const [searchQuery, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // SEARCH POST
  const {
    isPending: searchPending,
    mutateAsync: searchPostMutation,
    data: searchData,
    isError: searchError,
    reset: resetSearchMutation,
  } = useMutation({
    mutationFn: (query: string) =>
      getAllPosts({
        search: query,
        category_id: null,
        page: 1,
        limit: 100,
      }),
    onSuccess: (data) => {
      setSearchResults(data.data as unknown as any[]);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setErrorMessage(error?.response?.data?.message ?? "");
      setSearchResults([]);
    },
  });

  const handleSearch = (query: string) => {
    setQuery(query);
    if (query.trim()) {
      setDebouncedSearchQuery(query);
    } else {
      setDebouncedSearchQuery("");
      setSearchResults([]); // Clear search results when input is empty
      setSearching(false); // Reset searching state
      resetSearchMutation(); // Reset the mutation data
    }
  };

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      // Reset search state if input is empty
      setSearching(false);
      setSearchResults([]);
      return;
    }

    const delaySearch = setTimeout(() => {
      searchPostMutation(debouncedSearchQuery).then(() => {
        setSearching(true);
      });
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [debouncedSearchQuery]);

  return (
    <div className="flex-col flex-grow hidden w-3/12 h-screen py-4 pl-4 overflow-auto md:flex hide-scrollbar">
      <div className="flex w-full mx-auto rounded-2xl mb-4">
        <div className="relative w-full rounded-2xl h-12 bg-white shadow-sm  focus-within:shadow-lg flex items-center">
          <div className="grid h-full text-gray-300 place-items-center w-14">
            {/* search icon */}
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
          <input
            className="w-full h-full pr-2 text-sm text-gray-700 outline-none rounded-2xl"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search something..."
          />
        </div>
      </div>

      {searchPending && (
        <div className="p-4 text-sm text-gray-500 bg-white rounded shadow mb-4">
          Searching...
        </div>
      )}

      {searchError && (
        <div className="p-4 text-sm text-gray-500 bg-white rounded shadow mb-4">
          {errorMessage}
        </div>
      )}

      {searching && searchResults?.length === 0 && (
        <div className="p-4 text-sm text-gray-500 bg-white rounded shadow">
          No results found.
        </div>
      )}

      {searchResults?.length > 0 && (
        <div className="space-y-3">
          {searchResults?.map((result, index) => (
            <React.Fragment key={index}>
              {result.type === "image" ? (
                <Link href={result?.slug}>
                  <div className="flex my-1 items-center p-2 bg-white rounded shadow hover:bg-gray-50">
                    <img
                      src={getApiMedia(result?.medias[0]?.small_thumbnail)}
                      className="w-12 h-12 rounded object-cover"
                      alt=""
                    />
                    <div className="ml-2">
                      <h2 className="text-xs font-semibold truncate w-48">
                        {result?.title}
                      </h2>
                      <p className="text-xs text-gray-500 truncate w-48">
                        {result?.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full aspect-video b-2 overflow-hidden rounded-lg shadow">
                  <video
                    src={getApiMedia(result?.medias[0]?.path)}
                    controls
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      {/* <LinkedUsersCard /> */}

      {/* Gallery Card display for larger screens here */}
      <GalleryCard />
    </div>
  );
}

export default FeedSearch;
