"use client";
import Modal from "@/components/molecules/Modal";
import { deleteUser } from "@/services/admin";
import { AdminUser, UserData } from "@/types/admin";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUser = ({
  user,
  open,
  handleModal,
  refetchUsers,
}: {
  user: AdminUser | UserData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUsers: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await deleteUser(user?.id);
      toast.success("User Deleted Successfully");
      handleModal(false);
      refetchUsers();
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
      <h1 className="text-center font-medium text-lg lg:text-2xl  mb-4">
        Are you sure you want to Delete {user?.first_name} {user?.last_name} ?
      </h1>
      <br />
    </Modal>
  );
};

export default DeleteUser;
