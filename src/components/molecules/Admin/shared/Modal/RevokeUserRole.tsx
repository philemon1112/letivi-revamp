"use client";
import Modal from "@/components/molecules/Modal";
import { revokeUserRole } from "@/services/admin";
import { AdminUser } from "@/types/admin";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const RevokeUserRole = ({
  user,
  open,
  handleModal,
  refetchUsers,
}: {
  user: AdminUser;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUsers: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleRevokeRole = async () => {
    setLoading(true);
    const form = {
      user_id: user?.id,
      role_id: user.user_role?.id,
    };
    try {
      const { data } = await revokeUserRole(form);
      toast.success("User Role Revoked Successfully");
      handleModal(false);
      refetchUsers();
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleRevokeRole}
      cancelButton={"Cancel"}
      actionButton={"Confirm"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl  mb-4">
        Are you sure you want to Revoke {user?.first_name} from{" "}
        {user?.user_role?.name} role ?
      </h1>
      <br />
    </Modal>
  );
};

export default RevokeUserRole;
