"use client";
import Modal from "@/components/molecules/Modal";
import { createIndustry, editIndustry } from "@/services/admin";
import { IndustriesData } from "@/types/common";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const IndustryForm = ({
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
  const [name, setName] = useState("");

  // Update name when industry changes or modal opens
  useEffect(() => {
    if (open) {
      setName(industry?.name || "");
    }
  }, [industry, open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setName("");
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (industry?.id) {
        const { data } = await editIndustry(industry?.id, name);
        toast.success("industry Updated Successfully");
        // edit request goes here
      } else {
        const { data } = await createIndustry(name);
        toast.success("Industry Created Successfully");
        // create request goes here
      }

      refetchIndustries();
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
      actionButton={`${industry ? "Update" : "Create"}`}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        {industry ? `Update ${industry?.name}` : "Add new"} Industry ?
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Industry Name</h1>
        <input
          value={name}
          name="industry"
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
      <br />
    </Modal>
  );
};

export default IndustryForm;
