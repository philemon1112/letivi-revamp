"use client";

import React, { SyntheticEvent, useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";

import { LoaderIcon } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "@/services/auth";
import { logoutUser } from "@/services/login";

function PasswordReset() {
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRouter();
  const [errors, setErrors] = useState({
    password: "",
    confirm_password: "",
  });

  // update  using react-query
  const changePassword = useMutation({
    mutationKey: ["password"],
    mutationFn: async () => {
      const payload = {
        current_password: oldpassword,
        new_password: password,
        confirm_password: cpassword,
      };
      await changeUserPassword(payload);
    },
    onSuccess: () => {
      toast.success("Password Changed! Please re-login");
      logoutUser();
      setOldPassword("");
      setPassword("");
      setCPassword("");
    },
    onError: () => {
      toast.error("Something happened, Change Failed");
      route.refresh(); //refresh page after failure
    },
  });

  const handlePasswordReset = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!errors.password && !errors.confirm_password) {
      setLoading(true);

      try {
        await changePassword.mutateAsync(); // Trigger the mutation function
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    }
  };

  function ResetPassword(e: SyntheticEvent) {
    e.preventDefault();
    if (password && password.length > 7) {
      setErrors({ ...errors, password: "" });
      if (cpassword && cpassword === password) {
        setErrors({ ...errors, confirm_password: "" });
        handlePasswordReset(e);
      } else {
        setErrors({ ...errors, confirm_password: "Passwords do not match" });
      }
    } else {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters",
      });
    }
  }

  return (
    <div className="">
      <form onSubmit={ResetPassword} className="lg:px-4 px-2 py-6 max-w-xl">
        <h1 className="font-normal text-base lg:text-xl  mb-4">
          Your Password
        </h1>
        <input
          required
          type="password"
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          value={oldpassword}
          placeholder="Current Password *"
          className="lg:text-base text-xs p-4 mb-6 border w-full rounded-[10px] outline-none placeholder-red-500 focus:border-blue-600 focus:border-2"
        />

        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password *"
          minLength={8}
          className="lg:text-base text-xs p-4 mb-6 border w-full rounded-[10px] outline-none placeholder-gray-500 focus:border-blue-600 focus:border-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm -mt-3 mb-6">{errors.password}</p>
        )}

        <input
          required
          type="password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          placeholder="Confirm New Password *"
          className="lg:text-base text-xs p-4 mb-6 border w-full rounded-[10px] outline-none placeholder-gray-500 focus:border-blue-600 focus:border-2"
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm -mt-3 mb-6">
            {errors.confirm_password}
          </p>
        )}

        <Button size="lg" variant="primary">
          {loading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default PasswordReset;
