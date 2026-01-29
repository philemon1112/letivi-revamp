"use client";
import Modal from "@/components/molecules/Modal";
import { createUserRole, editUserRole } from "@/services/admin";
import { UserRolesData } from "@/types/common";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserRoleForm = ({
  userRole,
  open,
  handleModal,
  refetchUserRoles,
}: {
  userRole: UserRolesData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUserRoles: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  // Update name when industry changes or modal opens
  useEffect(() => {
    if (open) {
      setRole(userRole?.name || "");
    }
  }, [userRole, open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setRole("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (userRole?.id) {
        const { data } = await editUserRole(userRole?.id, role);
        toast.success("User role Updated Successfully");
        // edit request goes here
      } else {
        const { data } = await createUserRole(role);
        toast.success("User role Created Successfully");
        // create request goes here
      }

      refetchUserRoles();
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
      actionButton={`${userRole ? "Update" : "Create"}`}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        {userRole ? `Update ${userRole?.name}` : "Add new"} Role ?
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Role Name</h1>
        <input
          value={role}
          name="industry"
          onChange={(e) => setRole(e.target.value)}
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
      <br />
    </Modal>
  );
};

export default UserRoleForm;
