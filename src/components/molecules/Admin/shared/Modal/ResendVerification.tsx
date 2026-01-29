"use client";
import Modal from "@/components/molecules/Modal";
import { resendUserVerification } from "@/services/admin";
import { AdminUser, UserData } from "@/types/admin";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const ResendUserVerification = ({
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
      if (!("token" in user) || !user.token) {
        toast.error("User token is missing");
        setLoading(false);
        return;
      }
      const { data } = await resendUserVerification(user.token);
      if (data?.code == 300) {
        handleModal(false);
        toast.success("Verification email sent successfully");
      }

      handleModal(false);
      refetchUsers();
    } catch (error) {
      if ((error as any)?.response?.data?.code == 300) {
        handleModal(false);
        toast.success("Verification email sent successfully");
      }
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
        Are you sure to resend an email Verification mail to {user?.first_name}{" "}
        {user?.last_name} with the email {user?.email} ?
      </h1>
      <br />
    </Modal>
  );
};

export default ResendUserVerification;
