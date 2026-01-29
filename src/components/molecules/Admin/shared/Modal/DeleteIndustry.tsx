"use client";
import Modal from "@/components/molecules/Modal";
import { removeIndustry, removeWorkspace } from "@/services/admin";
import { IndustriesData } from "@/types/common";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteIndustry = ({
  industry,
  open,
  handleModal,
  refetchIndustries,
}: {
  industry: IndustriesData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchIndustries: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await removeIndustry(industry?.id);
      toast.success("Industry Deleted Successfully");
      handleModal(false);
      refetchIndustries();
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "An error occurred");
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
        Are you sure you want to delete {industry?.name} industry ?
      </h1>
      <br />
    </Modal>
  );
};

export default DeleteIndustry;
