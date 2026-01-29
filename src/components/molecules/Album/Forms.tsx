"use client";
import Modal from "@/components/molecules/Modal";
import { createAlbum, editAlbum } from "@/services/gallery";
import { AlbumsData } from "@/types/common";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AlbumsForms = ({
  album,
  privacy,
  open,
  handleModal,
  refetchAlbums,
  businessId,
  eventId,
  projectId,
}: {
  album: AlbumsData;
  open: boolean;
  privacy: number | boolean;
  handleModal: (open: boolean) => void;
  refetchAlbums: () => void;
  businessId?: number | null;
  eventId?: number | null;
  projectId?: number | null;
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  // Update name when album changes or modal opens
  useEffect(() => {
    if (open) {
      setName(album?.name || "");
    }
  }, [album, open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setName("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (album?.id) {
        const { data } = await editAlbum(album?.id, {
          name,
          private: privacy ? 1 : 0,
          event_id: eventId ? eventId : undefined,
          business_id: businessId ? businessId : undefined,
          project_id: projectId ? projectId : undefined,
        });
        toast.success("album Updated Successfully");
        // edit request goes here
      } else {
        const res = await createAlbum({
          name,
          private: privacy ? 1 : 0,
          event_id: eventId ? eventId : undefined,
          business_id: businessId ? businessId : undefined,
          project_id: projectId ? projectId : undefined,
        });
        toast.success("Album Created Successfully");
        // create request goes here
      }

      refetchAlbums();
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      handleModal(false);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      cancelButton={"Cancel"}
      actionButton={`${album ? "Update" : "Create"}`}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        {album ? `Update ${album?.name}` : "Add "} Album ?
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Albums Name</h1>
        <input
          value={name}
          name="album"
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
      <br />
    </Modal>
  );
};

export default AlbumsForms;
