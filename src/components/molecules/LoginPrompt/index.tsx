"use client";
import { Button } from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const LoginPromptModal = ({
  prompt,
  open,
  handleModal,
}: {
  prompt: string;
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  const router = useRouter();
  const handleSubmit = () => {
    handleModal(false);
    router.push("/login");
  };
  return (
    <Modal
      show={open}
      overlay="light"
      onAction={handleSubmit}
      cancelButton={"Cancel"}
      actionButton="Login"
      actionButtonVariant="primary"
      onCloseAction={() => handleModal(false)}
      size="md"
    >
      <svg
        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <h3 className="mb-3 text-lg font-normal text-center text-gray-600">
        Please you need to be logged in to {prompt}
      </h3>
      <div className="flex justify-center gap-4 hidden">
        <Link href="/signup">
          <Button
            variant="tertiary"
            size="base"
            className="text-sm inline-flex items-center !px-5 !py-2.5 text-center"
          >
            Sign Up
          </Button>
        </Link>

        <Link href="/login">
          <Button
            variant="primary"
            size="base"
            className="text-sm inline-flex items-center !px-5 !py-2.5 text-center"
          >
            Login
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default LoginPromptModal;
