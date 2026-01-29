"use client";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

const ConfirmTwoFa = ({
  open,
  handleModal,
  handleConfirm,
  loading,
}: {
  open: boolean;
  handleModal: (open: boolean) => void;
  handleConfirm: () => void;
  loading: boolean;
}) => {
  const currentUser = useCurrentUser();
  return (
    <Modal
      show={open}
      onAction={handleConfirm}
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
        {currentUser?.is_2fa === "on"
          ? "Confirm Disable 2FA"
          : "Confirm Two-Factor Authentication"}
      </h2>
      <p className="font-medium text-sm lg:text-base my-4">
        {currentUser?.is_2fa === "on"
          ? "Disabling Two-Factor Authentication will remove the extra layer of security from your account."
          : "By Confirming 2FA you would be required to use an authentication app or browser extension to generate one-time codes for signing in to your account."}
        <br /> Do you want to proceed ?
      </p>
    </Modal>
  );
};

export default ConfirmTwoFa;
