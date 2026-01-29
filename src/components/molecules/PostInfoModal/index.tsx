"use client";
import Modal from "@/components/molecules/Modal";
import { Post } from "@/types/nature";
import { getApiMedia } from "@/utils/getApiMedia";
import React from "react";

const PostInfoModal = ({
  post,
  open,
  handleModal,
}: {
  post: Post;
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  return (
    <Modal
      className="!p-2"
      show={open}
      overlay="light"
      onCloseAction={() => handleModal(false)}
    >
      <div className="flex item-center gap-4 p-4">
        <div className="w-5/12">
          {post?.type === "image" ? (
            <img
              src={
                post?.medias?.length > 0
                  ? post?.medias[0]?.medium_thumbnail
                    ? getApiMedia(post?.medias[0]?.medium_thumbnail)
                    : getApiMedia(post?.medias[0]?.path)
                  : ""
              }
              alt=""
              className="rounded-xl w-full object-cover lg:h-[200px] h-[150px]"
            />
          ) : (
            <video
              src={getApiMedia(post?.medias[0]?.path)}
              className="rounded-xl w-full object-cover lg:h-[200px] h-[150px]"
            />
          )}
        </div>
        <div className="mt-10 text-black">
          <h1 className="font-bold  text-base lg:text-2xl capitalize">
            {post?.type} details
          </h1>
          <p className="mt-4 font-medium text-sm lg:text-base">
            Posted {new Date(post?.created_at)?.toLocaleDateString()}
          </p>
          <p className="mt-4 font-medium text-sm lg:text-base">
            {post?.impression_count} total Impressions
          </p>
        </div>
      </div>
      <div className="p-4 text-xs lg:text-base flex justify-center flex-wrap lg:space-x-6 space-x-2 my-2">
        <div className="space-y-4 font-medium text-center text-black">
          <h1 className="">Views</h1>
          <p className="text-base">{post?.view_count}</p>
        </div>
        <div className="space-y-4 font-medium text-center text-black">
          <h1 className="">Likes</h1>
          <p className="text-base">{post?.fit_bump_count}</p>
        </div>
        <div className="space-y-4 font-medium text-center text-black">
          <h1 className="">Downloads</h1>
          <p className="text-base">{post?.download_count || 0} </p>
        </div>
        <div className="space-y-4 font-medium text-center text-black">
          <h1 className="">Save</h1>
          <p className="text-base">{post?.saved_count || 0} </p>
        </div>
        <div className="space-y-4 font-medium text-center text-black">
          <h1 className="">Comments</h1>
          <p className="text-base">{post?.comment_count}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PostInfoModal;
