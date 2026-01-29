"use client";
import { Button } from "@/components/atoms/Button";
import UploadDocument from "@/components/molecules/UploadDocument";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserBio } from "@/services/biography";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function BioForms() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const [showForms, setShowForms] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (currentUser) {
      setBio(currentUser?.profile?.bio || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await updateUserBio(bio);
      toast.success("Biography Updated Successfully");
      // crete request goes here
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setIsUpdating(false);
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    }
  };

  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <UploadDocument
        open={showForms}
        handleModal={() => setShowForms(false)}
        refetchUserInfo={() =>
          queryClient.invalidateQueries({ queryKey: ["myProfile"] })
        }
      />
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Biography
      </h2>
      <div>
        <ReactQuill
          value={bio}
          onChange={(e) => setBio(e)}
          className="bg-gray-50 text-gray-600 rounded-lg border outline-none my-2 lg:mx-4"
        />
      </div>
      <div className="flex items-end space-x-2 lg:px-4">
        <Button
          variant="tertiary"
          size="lg"
          className="ml-auto"
          onClick={() => setShowForms(true)}
        >
          Upload
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="ml-auto"
          disabled={isUpdating}
          loading={isUpdating}
          onClick={handleSubmit}
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default BioForms;
