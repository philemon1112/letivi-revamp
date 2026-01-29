// @ts-nocheck
import { deletePost, getUserGalleryPost } from "@/services/gallery";
import { Post } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import PostEmptyState from "@/components/molecules/EmptyState";
import AlbumsList from "./AlbumsList";
import { Button } from "@/components/atoms/Button";
import UploadMedia from "@/components/molecules/UploadMedia";

interface PostResponse {
  data: {
    posts: Post[];
  };
  pagination: {
    total: number;
    last_page: number;
  };
}

function PublicGallery() {
  const [index, setIndex] = useState(1);
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Post[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("image");
  const [uploadBiography, setUploadBiography] = useState(false);

  const { ref: loadMoreRef, inView } = useInView();
  const pageSize = 10;

  const handleModal = (value: string) => {
    setOpenModal(!openModal);
    setType(value);
  };

  const {
    data,
    isLoading: postLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery<PostResponse>({
    queryKey: ["PublicGalleryUsersPost"],
    queryFn: ({ pageParam = 1 }) =>
      getUserGalleryPost({
        private: 0,
        page: pageParam,
        limit: pageSize,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (
        !lastPage?.pagination ||
        !Array.isArray(allPages) ||
        allPages.length === 0
      ) {
        return undefined;
      }
      const currentPage = allPages.length;
      const totalPages = lastPage.pagination.last_page;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    select: (data) => {
      if (!data?.pages) return { pages: [], pageParams: [] };
      return {
        pages: data.pages,
        pageParams: data.pageParams ?? [],
      };
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleVideoHover = (video: HTMLVideoElement) => {
    video.muted = true; // Must be muted for autoplay to work on most browsers
    video.play().catch(() => {
      // Handle any autoplay errors silently
    });
  };

  const handleVideoLeave = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  const allPosts = data?.pages[0]?.data?.posts
    ? data?.pages?.flatMap((page) => page?.data?.posts)
    : [];

  const handleSelected = (item: Post) => {
    const isSelected = selected.findIndex((el) => el.id == item.id);
    if (isSelected === -1) {
      setSelected([...selected, item]);
    } else {
      const newSelected = selected.filter((el) => el.id !== item.id);
      setSelected(newSelected);
    }
  };

  const removeFromAlbum = async () => {
    setIsEditing(true);
    await Promise.all(
      selected.map(async (post) => {
        await deletePost(post?.id);
      }),
    );
    setIsEditing(false);
    setSelected([]);
    refetch();
  };

  return (
    <div className="bg-white !rounded-3xl h-screen overflow-x-auto mt-5 no-scrollbar">
      <div className="main  rounded-t-xl overflow-x-auto px-3 md:px-6">
        <div className="main flex justify-center my-2 rounded-t-xl  gap-4">
          <button
            onClick={() => setIndex(1)}
            className={`${
              index === 1 && "bg-na_yellow"
            } px-4 py-2  rounded-md text-sm lg:text-[20px] font-medium`}
          >
            Gallery
            {/* {downloaders?.length + businessCount ||
            0 + eventCount ||
            0 + projectCount ||
            0} */}
          </button>

          <button
            onClick={() => setIndex(2)}
            className={`${
              index === 2 && "bg-na_yellow"
            } px-4 py-2 rounded-md text-sm lg:text-[20px] font-medium`}
          >
            Album
          </button>
        </div>

        {index === 2 && (
          <>
            <AlbumsList isPrivate={0} />
          </>
        )}
        {index === 1 && (
          <>
            {edit && (
              <div className="flex justify-end mt-4">
                <Button
                  variant="tertiary"
                  size="base"
                  onClick={removeFromAlbum}
                  loading={isEditing}
                >
                  <img
                    src="/assets/Svg/trash.svg"
                    alt=""
                    width={15}
                    className="mr-2"
                  />
                  <p className="font-semibold tracking-wider">
                    Remove {selected.length > 0 && `(${selected.length})`}
                  </p>
                </Button>
              </div>
            )}

            <div className="py-4 md:py-6">
              <div>
                {postLoading ? (
                  <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                    <PostLoadingShimmer />
                  </div>
                ) : (
                  <>
                    {allPosts?.length > 0 ? (
                      <>
                        <div className="flex flex-wrap justify-end gap-3 mb-2">
                          <Button
                            variant="primary"
                            size="base"
                            className="flex"
                            onClick={() => setEdit(!edit)}
                          >
                            <img
                              src="/assets/Svg/edit_photo.svg"
                              alt=""
                              width={15}
                              className="mr-2"
                            />
                            <p className="font-semibold tracking-wider">
                              {" "}
                              {edit ? "Cancel" : "Edit"}
                            </p>
                          </Button>
                          <Button
                            variant="primary"
                            size="base"
                            className="text-na_blue"
                            onClick={() => handleModal("image")}
                          >
                            Upload Photo
                          </Button>
                          <Button
                            variant="primary"
                            outlined
                            size="base"
                            className="text-na_blue"
                            onClick={() => handleModal("video")}
                          >
                            Upload Video
                          </Button>
                        </div>
                        <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                          {allPosts.map((post, index) => (
                            <PostGalleryCard
                              key={post?.id}
                              post={post}
                              index={index}
                              onVideoHover={handleVideoHover}
                              onVideoLeave={handleVideoLeave}
                              allPosts={allPosts}
                              isSelectable={edit}
                              selected={selected}
                              onSelected={handleSelected}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-end gap-x-4">
                          <Button
                            variant="primary"
                            size="base"
                            className="text-na_blue"
                            onClick={() => handleModal("image")}
                          >
                            Upload Photo
                          </Button>
                          <Button
                            variant="primary"
                            outlined
                            size="base"
                            className="text-na_blue"
                            onClick={() => handleModal("video")}
                          >
                            Upload Video
                          </Button>
                        </div>
                        <PostEmptyState title="No Public Post" />
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Loading indicator and intersection observer target */}
              <div
                ref={loadMoreRef}
                className="w-full py-8 flex justify-center"
              >
                {isFetchingNextPage && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                )}
              </div>
            </div>
          </>
        )}

        {openModal && (
          <UploadMedia
            handleModal={() => setOpenModal(!openModal)}
            open={openModal}
            refetchPosts={refetch}
            type={type}
          />
        )}
      </div>
    </div>
  );
}

export default PublicGallery;
