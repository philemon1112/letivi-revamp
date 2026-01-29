// @ts-nocheck
"use client";
import { deletePost } from "@/services/gallery";
import { Post } from "@/types/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import PostLoadingShimmer from "@/components/atoms/PostLoading";
import PostGalleryCard from "@/components/molecules/PostGalleryItem";
import PostEmptyState from "@/components/molecules/EmptyState";
import { Button } from "@/components/atoms/Button";
import {
  getBusinessPosts,
  getSharedBusinessPosts,
} from "@/services/workspaces";
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

function BusinessGallery({
  businessId,
  type,
}: {
  businessId: string;
  type: string;
}) {
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Post[]>([]);
  const [uploadType, setUploadType] = useState("image");
  const [openModal, setOpenModal] = useState(false);
  const { ref: loadMoreRef, inView } = useInView();
  const pageSize = 10;

  const {
    data,
    isLoading: postLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery<PostResponse>({
    queryKey: ["BusinessDetailsPost", type, businessId], // Include type in queryKey to refetch when type changes
    queryFn: ({ pageParam = 1 }) => {
      return type === "shared"
        ? getSharedBusinessPosts(businessId, {
            page: pageParam,
            limit: pageSize,
          })
        : getBusinessPosts(businessId, { page: pageParam, limit: pageSize });
    },
    getNextPageParam: (lastPage, pages) => {
      const lastPageNum = lastPage?.pagination?.last_page;
      return lastPageNum && pages.length < lastPageNum
        ? pages.length + 1
        : undefined;
    },
    select: (data) => {
      if (!data?.pages) return { pages: [], pageParams: [] };
      return {
        pages: data.pages,
        pageParams: data.pageParams ?? [],
      };
    },
    initialPageParam: 1,
    enabled: !!businessId,
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

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

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
  };

  const handleModal = (value: string) => {
    setOpenModal(!openModal);
    setUploadType(value);
  };

  return (
    <div className="py-2 md:py-2 px-3 md:px-6">
      <div>
        {postLoading ? (
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
            <PostLoadingShimmer />
          </div>
        ) : (
          <>
            {allPosts?.length > 0 ? (
              <>
                <div
                  className={`flex flex-wrap justify-end gap-3 mb-3 ${
                    type === "shared" && "hidden"
                  }`}
                >
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
                    outlined
                    size="base"
                    className="text-na_blue"
                    onClick={() => {
                      handleModal("image");
                    }}
                  >
                    Add Photo
                  </Button>
                  <Button
                    variant="tertiary"
                    outlined
                    size="base"
                    className="text-na_red"
                    onClick={() => {
                      handleModal("video");
                    }}
                  >
                    Add Video
                  </Button>
                </div>

                {edit && (
                  <div className="flex justify-end my-4">
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
                <div className="columns-2 sm:columns-2 lg:columns-3 gap-4">
                  {allPosts.map((post, index) => (
                    <PostGalleryCard
                      key={post.id}
                      post={post}
                      index={index}
                      onVideoHover={handleVideoHover}
                      onVideoLeave={handleVideoLeave}
                      allPosts={allPosts}
                      isSelectable={edit}
                      selected={selected}
                      onSelected={handleSelected}
                      showAuthor={type !== "shared" && true}
                      refetchPosts={refetch}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex justify-end gap-x-4 mb-3 ${
                    type === "shared" && "hidden"
                  }`}
                >
                  <Button
                    variant="primary"
                    outlined
                    size="base"
                    className="text-na_blue"
                    onClick={() => {
                      handleModal("image");
                    }}
                  >
                    Add Photo
                  </Button>
                  <Button
                    variant="tertiary"
                    outlined
                    size="base"
                    className="text-na_red"
                    onClick={() => {
                      handleModal("video");
                    }}
                  >
                    Add Video
                  </Button>
                </div>

                <PostEmptyState title="No Organisation Post yet" />
              </>
            )}
          </>
        )}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>

      <UploadMedia
        handleModal={() => setOpenModal(!openModal)}
        open={openModal}
        refetchPosts={refetch}
        type={uploadType}
        initialBusinessId={businessId}
      />
    </div>
  );
}

export default BusinessGallery;
