"use client";
import Modal from "@/components/molecules/Modal";
import { getReportFlags, submitReport } from "@/services/posts";
import { Post } from "@/types/nature";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const ReportPostModal = ({
  post,
  open,
  handleModal,
}: {
  post: Post;
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");

  const {
    data: flags,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["ReportFlagsList"],
    queryFn: () => getReportFlags(),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = {
        post_id: post?.id?.toString(),
        complain_flag_id: reason,
        description: description,
      };

      const { data } = await submitReport(formData);
      toast.success("Report Submitted Successfully");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      handleModal(false);
      setDescription("");
      setReason("");
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      cancelButton={"Cancel"}
      actionButton={`Submit Report`}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="light"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Report Post
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Reason</h1>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          name="industry"
          id="industry"
          className="p-2 mb-2 bg-gray-50 text-gray-600 w-full rounded-lg  border outline-none"
        >
          <option value="">-- Select --</option>

          {flags?.data.map((item: any) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <h1 className="mb-2 lg:text-base ">Description</h1>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          name="message"
          placeholder="Tell us more"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
        />
      </div>
      <br />
    </Modal>
  );
};

export default ReportPostModal;
