// @ts-nocheck
"use client";
import { getUserPosts } from "@/services/posts";
import { Post } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import UploadMedia from "../UploadMedia";
import { Button } from "@/components/atoms/Button";

function GalleryCard() {
  const [openModal, setOpenModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("image");
  const userToken = getUserFromLocalStorage()?.user_token;
  const handleModal = (value: string) => {
    setOpenModal(!openModal);
    setType(value);
  };

  // GET USER POSTS
  const {
    data: userPosts,
    isLoading: userPostsLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => getUserPosts({ token: userToken, limit: 3 }),
    select: (data) => data.data?.posts as unknown as Post[],
  });

  // console.log("user Posts: ", userPosts);

  return (
    <div className="hidden col-span-4 my-2 lg:block">
      <div className="bg-white shadow rounded-2xl py-3 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Gallery</h2>
          <Link href="/profile/gallery">
            <button className="text-base text-na_blue">
              {userPosts && userPosts?.length > 0 ? "See all" : ""}
            </button>
          </Link>
        </div>

        {userPosts && (
          <>
            {userPosts?.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 my-2 items-center">
                  {userPosts?.map((item) => (
                    <div key={item?.id}>
                      {/* if it is an image post or photo post */}
                      {item.type === "image" ? (
                        <img
                          className="object-cover object-center w-full mb-1 rounded-lg lg:h-16"
                          src={
                            item?.medias?.length > 0
                              ? item?.medias[item?.medias.length - 1]
                                  ?.small_thumbnail
                                ? getApiMedia(
                                    item?.medias[item?.medias.length - 1]
                                      ?.small_thumbnail
                                  )
                                : getApiMedia(
                                    item?.medias[item?.medias.length - 1]?.path
                                  )
                              : ""
                          }
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        // if it is a video post
                        <div className="w-full mb-1 rounded-lg lg:h-16">
                          <video
                            src={
                              item?.medias?.length > 0
                                ? item?.medias[item?.medias.length - 1]
                                    ?.small_thumbnail
                                  ? getApiMedia(
                                      item?.medias[item?.medias.length - 1]
                                        ?.small_thumbnail
                                    )
                                  : getApiMedia(
                                      item?.medias[item?.medias.length - 1]
                                        ?.path
                                    )
                                : ""
                            }
                            loop
                            autoPlay
                            muted
                            playsInline
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 8,
                              display: "block",
                              objectFit: "cover",
                              backgroundColor: "rgba(0, 0, 0, 0)",
                              objectPosition: "50% 50%",
                            }}
                          ></video>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      handleModal("image");
                    }}
                    className="p-2 px-8 text-white cursor-pointer bg-na_blue rounded-xl"
                  >
                    Start Uploading
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {!userPosts && (
          <>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  handleModal("image");
                }}
                className="p-2 px-8 text-white cursor-pointer bg-na_blue rounded-xl"
              >
                Start Uploading
              </button>
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
      <div className="">
        <div className="bg-white shadow rounded-2xl py-3 px-4 mt-2 w-full">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg">Visit </h2>
          </div>
          <div className="mx-auto flex justify-center items-center gap-x-2">
            {/* <Link href="/profile/gallery">
              <Button variant="primary" size="lg">
                Gallery
              </Button>
            </Link> */}
            <Link href="/profile/workspace">
              <Button variant="primary" size="lg" outlined>
                My Workspaces
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
