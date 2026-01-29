/* eslint-disable react/no-unescaped-entities */
"use client";
import DeletePostModal from "@/components/molecules/ConfirmDeletePost";
import LoginPromptModal from "@/components/molecules/LoginPrompt";
import Modal from "@/components/molecules/Modal";
import PostInfoModal from "@/components/molecules/PostInfoModal";
import ReportPostModal from "@/components/molecules/ReportPostModal";
import UploadMedia from "@/components/molecules/UploadMedia";
import { useHasMembershipAccess } from "@/hooks/useHasMembershipAccrss";
import { useMutePost, useViewPost } from "@/hooks/usePost";
import { Professional } from "@/types/common/professional";
import { Post } from "@/types/nature";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface PostDropdownMenuProps {
  currentUser: Professional | any;
  post: Post | any;
  showPostDropdown: boolean;
  showAsModal?: boolean;
  setShowPostDropdown: (value: boolean) => void;
  handleParentModal?: (open: boolean) => void;
}

const PostDropdownMenu = ({
  currentUser,
  post,
  showPostDropdown,
  setShowPostDropdown,
  showAsModal = false,
  handleParentModal = () => {},
}: PostDropdownMenuProps) => {
  const queryClient = useQueryClient();
  const { mutate: view } = useViewPost();
  const { mutate: mute } = useMutePost();
  const [prompt, setPrompt] = useState("interact with this post");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showPostInfo, setShowPostInfo] = useState(false);
  const [showReportInfo, setShowReportInfo] = useState(false);
  const [confirmDelete, setShowConfirmDelete] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const hasAccess = useHasMembershipAccess(post);

  const handleMutePost = async () => {
    await mute(post?.id);
    setShowPostDropdown(false);
    queryClient.invalidateQueries({ queryKey: ["allPosts"] });
  };

  const closeParentModal = () => {
    if (typeof handleParentModal === "function") {
      handleParentModal(false);
    }
  };
  const handleReportPost = () => {
    setShowReportInfo(true);
    setShowPostDropdown(false);
  };

  const handleViewPost = () => {
    setShowPostInfo(true);
    view(post?.id);
    setShowPostDropdown(false);
  };

  const handleDeletePost = () => {
    setShowPostDropdown(false);
    setShowConfirmDelete(true);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setShowPostDropdown(false);
  };

  return (
    <>
      <LoginPromptModal
        open={showLoginPrompt}
        handleModal={setShowLoginPrompt}
        prompt={prompt}
      />
      <ReportPostModal
        open={showReportInfo}
        post={post}
        handleModal={setShowReportInfo}
      />
      <PostInfoModal
        open={showPostInfo}
        post={post}
        handleModal={setShowPostInfo}
      />
      <DeletePostModal
        open={confirmDelete}
        post={post}
        handleModal={setShowConfirmDelete}
      />
      <UploadMedia
        type={post?.type || "image"} // Use the post type or default to "image"
        open={isEditModalOpen}
        handleModal={() => handleEditModal()}
        refetchPosts={() => {
          queryClient.invalidateQueries({
            queryKey: [
              "allPosts",
              "EventDetailsPost",
              "ProjectDetailsPost",
              "BusinessDetailsPost",
              "AlbumDetails",
              "PrivateGalleryUsersPost",
              "PublicGalleryUsersPost",
            ],
          });
          if (typeof handleParentModal === "function") {
            handleParentModal(false);
          }
        }}
        post={post} // Pass the selected post for editing
      />
      {showAsModal ? (
        <Modal
          show={showPostDropdown}
          actionButtonVariant="primary"
          onCloseAction={() => setShowPostDropdown(false)}
          overlay="light"
          className="!p-4 !py-2"
        >
          <div
            className=" bg-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {post?.business || post?.event || post?.project ? (
                <>
                  {hasAccess ? (
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <button
                          onClick={() => {
                            handleEditModal();
                          }}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 md:w-6 md:h-6"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                          </svg>

                          <p className="">Edit post</p>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleDeletePost}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 md:w-6 md:h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p className="">Delete post</p>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleViewPost();
                          }}
                          className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 md:w-6 md:h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>View Post Info</p>
                        </button>
                      </li>
                    </ul>
                  ) : (
                    // Display something different when not part of the workspace
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <button
                          onClick={handleMutePost}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <img
                            src={"/assets/Svg/Dashboard/eye.svg"}
                            alt="eye"
                          />
                          <p className="">I don't want to see this post</p>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={handleReportPost}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <img
                            src={"/assets/Svg/Dashboard/report.svg"}
                            alt="unfollow"
                          />
                          <p>Report Post</p>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleViewPost();
                          }}
                          className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 md:w-6 md:h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>View Post Info</p>
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <>
                  {currentUser?.id === post?.user?.id ? (
                    <>
                      <ul
                        className="py-2 text-sm text-gray-700 "
                        aria-labelledby="dropdownMenuIconButton"
                      >
                        <li>
                          <button
                            onClick={() => {
                              handleEditModal();
                            }}
                            className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 md:w-6 md:h-6"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>

                            <p className="">Edit post</p>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleDeletePost}
                            className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 md:w-6 md:h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <p className="">Delete post</p>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleViewPost();
                            }}
                            className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 md:w-6 md:h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <p>View Post Info</p>
                          </button>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <button
                          onClick={handleMutePost}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <img
                            src={"/assets/Svg/Dashboard/eye.svg"}
                            alt="eye"
                          />
                          <p className="">I don't want to see this post</p>
                        </button>
                      </li>
                      <li>
                        {/* {following ? (
              <button
                //   onClick={handleUnfollowUser}
                className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
              >
                <img
                  src={"/assets/Svg/Dashboard/unfollow.svg"}
                  alt="unfollow"
                />
                <p className="">
                  Unfollow {post?.user?.first_name}{" "}
                  {post?.user?.last_name}
                </p>
              </button>
            ) : (
              <button
                //   onClick={handlefollowUser}
                className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
              >
                <img
                  src={"/assets/Svg/Dashboard/unfollow.svg"}
                  alt="unfollow"
                />
                <p className="">
                  follow {post?.user?.first_name}{" "}
                  {post?.user?.last_name}
                </p>
              </button>
            )} */}
                      </li>
                      <li>
                        <button
                          // onClick={handleMuteUser}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <img
                            src={"/assets/Svg/Dashboard/mute.svg"}
                            alt="unfollow"
                          />
                          <p>
                            Mute {post?.user?.first_name}{" "}
                            {post?.user?.last_name}
                          </p>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleReportPost}
                          className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                        >
                          <img
                            src={"/assets/Svg/Dashboard/report.svg"}
                            alt="unfollow"
                          />
                          <p>Report Post</p>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleViewPost();
                          }}
                          className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 md:w-6 md:h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <p>View Post Info</p>
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </Modal>
      ) : (
        <div
          className={`${
            !showPostDropdown && "hidden"
          } z-10  bg-white divide-y divide-gray-100 rounded-lg shadow  absolute right-5 top-12`}
        >
          {post?.business || post?.event || post?.project ? (
            <>
              {hasAccess ? (
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <button
                      onClick={() => {
                        handleEditModal();
                      }}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>

                      <p className="">Edit post</p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeletePost}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p className="">Delete post</p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleViewPost();
                      }}
                      className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>View Post Info</p>
                    </button>
                  </li>
                </ul>
              ) : (
                // Display something different when not part of the workspace
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <button
                      onClick={handleMutePost}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <img src={"/assets/Svg/Dashboard/eye.svg"} alt="eye" />
                      <p className="">I don't want to see this post</p>
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={handleReportPost}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <img
                        src={"/assets/Svg/Dashboard/report.svg"}
                        alt="unfollow"
                      />
                      <p>Report Post</p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleViewPost();
                      }}
                      className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>View Post Info</p>
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              {currentUser?.id === post?.user?.id ? (
                <>
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <button
                        onClick={() => {
                          handleEditModal();
                        }}
                        className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>

                        <p className="">Edit post</p>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDeletePost}
                        className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <p className="">Delete post</p>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleViewPost();
                        }}
                        className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 md:w-6 md:h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <p>View Post Info</p>
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <button
                      onClick={handleMutePost}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <img src={"/assets/Svg/Dashboard/eye.svg"} alt="eye" />
                      <p className="">I don't want to see this post</p>
                    </button>
                  </li>
                  <li>
                    {/* {following ? (
              <button
                //   onClick={handleUnfollowUser}
                className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
              >
                <img
                  src={"/assets/Svg/Dashboard/unfollow.svg"}
                  alt="unfollow"
                />
                <p className="">
                  Unfollow {post?.user?.first_name}{" "}
                  {post?.user?.last_name}
                </p>
              </button>
            ) : (
              <button
                //   onClick={handlefollowUser}
                className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
              >
                <img
                  src={"/assets/Svg/Dashboard/unfollow.svg"}
                  alt="unfollow"
                />
                <p className="">
                  follow {post?.user?.first_name}{" "}
                  {post?.user?.last_name}
                </p>
              </button>
            )} */}
                  </li>
                  <li>
                    <button
                      // onClick={handleMuteUser}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <img
                        src={"/assets/Svg/Dashboard/mute.svg"}
                        alt="unfollow"
                      />
                      <p>
                        Mute {post?.user?.first_name} {post?.user?.last_name}
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleReportPost}
                      className="flex w-full gap-2 px-4 py-3  hover:bg-gray-100"
                    >
                      <img
                        src={"/assets/Svg/Dashboard/report.svg"}
                        alt="unfollow"
                      />
                      <p>Report Post</p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleViewPost();
                      }}
                      className="flex w-full gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <p>View Post Info</p>
                    </button>
                  </li>
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PostDropdownMenu;
