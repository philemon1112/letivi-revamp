"use client";
import Modal from "@/components/molecules/Modal";
import React from "react";

const VerifyOtp = ({
  open,
  handleModal,
  handleConfirm,
  loading,
}: {
  open: boolean;
  handleModal: (open: boolean) => void;
  handleConfirm: (otp: string) => void;
  loading: boolean;
}) => {
  const [otp, setOtp] = React.useState("");
  return (
    <Modal
      show={open}
      onAction={() => handleConfirm(otp)}
      cancelButton={"Cancel"}
      actionButton={"Confirm"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="light"
      onCloseAction={() => handleModal(false)}
    >
      <h2
        id="modalTitle"
        className="text-xl font-bold text-gray-900 sm:text-2xl"
      >
        Confirm 2-FA Authentication
      </h2>
      <p className="font-medium text-sm lg:text-base mt-2 ">
        Enter the OTP from your authentication app to verify your identity
      </p>
      <input
        type="text"
        placeholder="Otp Code eg. 123456"
        id="otp"
        required
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        className="input"
      />
    </Modal>
  );
};

export default VerifyOtp;
