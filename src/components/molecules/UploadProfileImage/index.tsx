"use client";
import { Button } from "@/components/atoms/Button";
import { useUpdateProfilePicture } from "@/hooks/useProfile";
import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

interface UploadProfileImageProps {
  closeModal: () => void;
  picture?: string;
}

function UploadProfileImage({ closeModal, picture }: UploadProfileImageProps) {
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
  });

  // Update profile picture hook
  const { mutateAsync: uploadProfileMutation, isPending } =
    useUpdateProfilePicture(closeModal);

  // Update the state when files are selected via file picker
  useEffect(() => {
    if (filesContent.length > 0 && plainFiles.length > 0) {
      const rawFile = plainFiles[0]; // Get the first selected file
      setFile(rawFile); // Update the states with selected file data
      setFilename(rawFile.name);
      setProfileImage(filesContent[0].content);
    }
  }, [filesContent, plainFiles]);

  const updateProfilePicture = () => {
    if (file) {
      const formData = new FormData();
      formData.append("media", file);
      uploadProfileMutation(formData);
    }
  };

  return (
    <div>
      <div className="carousel fixed inset-0 bg-[#000000ef] z-[100] grid lg:place-content-center md:px-4 pb-24 md:pt-4">
        <div className="lg:rounded-2xl rounded-b-2xl lg:w-[700px] w-full bg-white px-4 md:px-6 py-4 md:py-6 h-auto gallery_modal overflow-y-auto">
          <>
            {/* TITLE AND CURRENT PROFILE PICTURE */}
            <div onClick={closeModal} className="flex justify-end">
              <img
                src={"/assets/Svg/cancel.svg"}
                alt=""
                className="cursor-pointer lg:w-h-10 lg:h-10 h-6 w-6"
              />
            </div>
            <h1 className="text-center font-medium text-lg lg:text-2xl mb-4">
              Profile Photo
            </h1>
            <div className="mt-4">
              <img
                src={profileImage || picture}
                alt={`profile-image`}
                className="rounded lg:w-8/12 w-10/12 mx-auto h-[400px] object-cover"
              />
            </div>

            {/* FILE PICKER */}
            <div
              onClick={() => {
                openFilePicker();
              }}
              className="mt-6 w-full border-2 bg-white border-gray-400 divide-x-2 divide-gray-400 flex rounded-[10px] mb-6 hover:cursor-pointer"
            >
              <div className="p-4">
                <div className="lg:text-base text-xs">Choose</div>
              </div>
              <div className="lg:text-base text-xs p-4 truncate">
                {filename || "No file chosen"}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  updateProfilePicture();
                }}
                variant="primary"
                size="2xl"
                className="flex justify-center rounded-lg text-[10px] py-1 px-24 mx-auto mt-4 md:mt-8 max-w-max"
                type="submit"
                loading={isPending}
                disabled={isPending}
              >
                Update Profile Picture
              </Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default UploadProfileImage;
