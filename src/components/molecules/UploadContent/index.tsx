"use client";
import { Professional } from "@/types/common/professional";
import { getApiMedia } from "@/utils/getApiMedia";
import React, { useState } from "react";
import UploadMedia from "../UploadMedia";
import UploadDocument from "../UploadDocument";

interface UploadContentProps {
  currentUser: Professional | undefined;
  refetchAllPosts: () => void;
}

function UploadContent({ currentUser, refetchAllPosts }: UploadContentProps) {
  const picture = currentUser?.profile?.picture;

  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("image");
  const [uploadBiography, setUploadBiography] = useState(false);

  const handleModal = (value: string) => {
    setOpenModal(!openModal);
    setType(value);
  };

  const handleBiographyModal = () => {
    setUploadBiography(!uploadBiography);
  };

  const refetchPosts = () => {
    refetchAllPosts();
    // Refetch posts logic here
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 mb-6 mr-1.5 lg:mr-2">
      <div className="bg-white rounded-2xl p-2 flex items-center justify-between gap-2">
        {picture ? (
          <div className="flex items-center space-x-2">
            <img
              src={getApiMedia(picture)}
              className=" rounded-lg w-11 h-11 bg-cover"
              alt=""
            />
            <h1 className="font-semibold text-lg">Upload:</h1>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="rounded-lg border border-blue-500 text-xl font-bold w-8 h-8 md:w-12 md:h-12 flex justify-center items-center">
              {currentUser?.first_name.charAt(0).toUpperCase()}
            </div>

            <h1 className="font-semibold text-lg">Upload:</h1>
          </div>
        )}

        <div className="flex text-gray-600 justify-end ">
          <button
            onClick={() => {
              handleModal("image");
            }}
            className="lg:text-base text-xs flex items-center gap-2 px-2 py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <p className="hidden sm:block">Photo</p>
          </button>
          <button
            onClick={() => {
              handleModal("video");
            }}
            className="lg:text-base text-xs flex items-center gap-2 px-2 py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>

            <p className="hidden sm:block">Video</p>
          </button>
          <button
            onClick={() => {
              handleBiographyModal();
            }}
            className="lg:text-base text-xs flex items-center gap-2 px-2 py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="hidden sm:block">Biography</p>
          </button>
        </div>
      </div>

      {openModal && (
        <UploadMedia
          handleModal={() => setOpenModal(!openModal)}
          open={openModal}
          refetchPosts={refetchPosts}
          type={type}
        />
      )}

      <UploadDocument
        open={uploadBiography}
        handleModal={() => handleBiographyModal()}
        refetchUserInfo={() => console.log("Refetch user info")}
      />
    </div>
  );
}

export default UploadContent;
