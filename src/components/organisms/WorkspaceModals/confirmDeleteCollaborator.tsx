"use client";
import Modal from "@/components/molecules/Modal";
import React from "react";

const ConfirmDeleteCollaborator = ({
  name,
  open,
  handleModal,
  handleDelete,
  loading,
}: {
  name: string;
  open: boolean;
  handleModal: (open: boolean) => void;
  handleDelete: () => void;
  loading: boolean;
}) => {
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
      <h1 className="text-center font-medium text-lg lg:text-xl capitalize mb-4">
        Are you sure you want to delete <strong>{name}</strong> from the list of
        collaborators ?
      </h1>
      <br />
    </Modal>
  );
};

export default ConfirmDeleteCollaborator;
