"use client";
import Modal from "@/components/molecules/Modal";
import React from "react";

const ConfirmDelete = ({
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
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Are you sure you want to delete {name} ?
      </h1>
      <br />
    </Modal>
  );
};

export default ConfirmDelete;
