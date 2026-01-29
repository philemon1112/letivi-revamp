// @ts-nocheck
"use client";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getAllPosts } from "@/services/posts";
import { getApiMedia } from "@/utils/getApiMedia";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SearchDialog = ({
  open,
  handleModal,
}: {
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
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
    <Modal
      show={open}
      size="2xl"
      actionButton={`cancel`}
      actionButtonVariant="danger"
      onAction={() => handleModal(false)}
      overlay="light"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-xl capitalize mb-2">
        Search for posts
      </h1>

      <>
        <input
          type="text"
          placeholder="Search something..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />

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
          <div className="p-4 text-sm text-gray-500 bg-white rounded shadow mb-4">
            No results found.
          </div>
        )}

        {searchResults?.length > 0 && (
          <div className="space-y-3 mb-4">
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
      </>
    </Modal>
  );
};

export default SearchDialog;
