"use client";
import Modal from "@/components/molecules/Modal";
import { useDeletePost } from "@/hooks/usePost";
import { Post } from "@/types/nature";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const DeletePostModal = ({
  post,
  open,
  handleModal,
}: {
  post: Post;
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { mutate: deletePost } = useDeletePost();
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(post?.id);
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
      onAction={handleDelete}
      cancelButton={"Cancel"}
      actionButton={"Confirm"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="light"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-base capitalize mb-4">
        Are you sure you want to delete this Post?
      </h1>
      <br />
    </Modal>
  );
};

export default DeletePostModal;
