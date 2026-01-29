"use client";
import Modal from "@/components/molecules/Modal";
import { removeWorkspace } from "@/services/admin";
import { WorkspaceData } from "@/types/common";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteWorkspace = ({
  workspace,
  type,
  open,
  handleModal,
  refetchWorkspaces,
}: {
  workspace: WorkspaceData;
  open: boolean;
  type: string;
  handleModal: (open: boolean) => void;
  refetchWorkspaces: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await removeWorkspace(workspace?.id);
      toast.success("User Deleted Successfully");
      handleModal(false);
      refetchWorkspaces();
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
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
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Are you sure you want to delete {workspace?.name} {type} ?
      </h1>
      <br />
    </Modal>
  );
};

export default DeleteWorkspace;
