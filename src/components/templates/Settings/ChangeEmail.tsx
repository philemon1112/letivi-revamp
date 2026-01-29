// @ts-nocheck
"use client";

import React, { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "react-hot-toast";
import { toast } from "sonner";
import { Button } from "@/components/atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { changeUserEmail } from "@/services/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function ChangeEmail() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [email, setEmail] = useState<string>(""); //set email type to a string
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser?.email || "");
    }
  }, [currentUser]);

  // update  using react-query
  const changeEmail = useMutation({
    mutationKey: ["email"],
    mutationFn: async () => {
      await changeUserEmail(email);
    },
    onSuccess: () => {
      toast.success("Email changed successfully");
      setEmail(""); // Clear input field after successful change
    },
    onError: (error) => {
      // Handle error here, e.g., show a toast notification
      toast.error("Change Failed" + error?.response?.data?.message);
    },
  });

  const handleChangeEmail = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("You can't enter an empty email");
      return;
    }

    try {
      setIsLoading(true);
      await changeEmail.mutateAsync(); // Trigger the mutation

      setEmail("");

      //? todo: check error status
    } catch (error) {
      console.error("Failed to change email:", error);
      router.refresh(); // Refresh the page on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-3xl">
        <h1 className="lg:text-4xl text-xl font-bold mb-8">Settings</h1>
      </div>
      <form onSubmit={handleChangeEmail} className="lg:px-4 px-2 py-6 max-w-xl">
        <label className="font-normal text-lg lg:text-2xl pb-4 mb-4">
          {" "}
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter new email"
          className="lg:text-base text-xs p-4 mb-6 mt-3 border w-full rounded-[10px] outline-none placeholder-gray-500"
        />
        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
          {isLoading ? <LoaderIcon className="animate-spin" /> : "Change Email"}
        </Button>
      </form>
    </div>
  );
}

export default ChangeEmail;
