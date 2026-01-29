"use client";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { uploadBioDocument } from "@/services/biography";
import React, { useState } from "react";
import { toast } from "sonner";

const UploadDocument = ({
  open,
  handleModal,
  refetchUserInfo,
}: {
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUserInfo: () => void;
}) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (file) formData.append("bio_media", file);
      const { data } = await uploadBioDocument(formData);
      toast.success("Document Uploaded Successfully");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      handleModal(false);
      refetchUserInfo();
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      cancelButton={"Cancel"}
      size="2xl"
      actionButton={"Save Document"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <p className="text-gray-500 text-base mt-3 mb-1">Select Document</p>
      <label
        htmlFor="file-upload"
        className="w-full py-10 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          id="file-upload"
          type="file"
          hidden
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <div className="grid gap-1">
          {!file && (
            <h2 className="text-center text-gray-400 text-xs leading-4">
              PDF, smaller than 15MB
            </h2>
          )}
        </div>
        <div className="grid gap-2">
          {!file && (
            <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
              Drag and Drop your file here or Click to Upload
            </h4>
          )}

          {file && (
            <div className="flex flex-col items-center">
              {preview && file.type.startsWith("image/") && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <p className="text-xs text-gray-600 mt-1">{file.name}</p>
            </div>
          )}
        </div>
      </label>

      <br />
    </Modal>
  );
};

export default UploadDocument;
