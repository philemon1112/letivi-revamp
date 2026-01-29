"use client";
import Modal from "@/components/molecules/Modal";
import { activateAccount } from "@/services/admin";
import { AdminUser, UserData } from "@/types/admin";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";
// import { toast } from "react-hot-toast";

const ActivateUser = ({
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

  const handleDeactivate = async () => {
    setLoading(true);
    const form = {
      user_id: user?.id,
    };
    try {
      const { data } = await activateAccount(form);
      toast.success("User Account Activated Successfully");
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
      onAction={handleDeactivate}
      cancelButton={"Cancel"}
      actionButton={"Confirm"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl  mb-4">
        Are you sure you want to Activate {user?.first_name} {user?.last_name}
        {`'s`} Account ?
      </h1>
      <br />
    </Modal>
  );
};

export default ActivateUser;
