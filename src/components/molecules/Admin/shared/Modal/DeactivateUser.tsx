"use client";
import Modal from "@/components/molecules/Modal";
import { deactivateAccount } from "@/services/admin";
import { AdminUser, UserData } from "@/types/admin";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const DeActivateUser = ({
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
  const [reason, setReason] = useState("");

  const handleDeactivate = async () => {
    console.log("Deactivate user");
    setLoading(true);
    const form = {
      user_id: user?.id,
      reason: reason,
    };
    try {
      const { data } = await deactivateAccount(form);
      handleModal(false);
      refetchUsers();
      toast.success("User Account Deactivated Successfully");
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleDeactivate}
      cancelButton={"Cancel"}
      actionButton={"Deactivate"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      // title={`Deactivate ${user?.first_name} ${user?.last_name}'s Account ?`}
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl  mb-4">
        Deactivate {user?.first_name} {user?.last_name}
        {`'s`} Account ?
      </h1>
      <div className=" mx-auto pb-3">
        <h1 className="mb-2  lg:text-base ">Select Reason</h1>
        <select
          name="reason"
          onChange={(e) => setReason(e.target.value)}
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        >
          <option value="">-- Select --</option>
          <option value="Not courteous">Not Courteous</option>
          <option value="Impersonation">Impersonation</option>
          <option value="Misleading">Misleading</option>
          <option value="Abusive">Abusive</option>
          <option value="No valid reason">No valid reason</option>
        </select>
      </div>
    </Modal>
  );
};

export default DeActivateUser;
