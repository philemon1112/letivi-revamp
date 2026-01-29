"use client";
import { usePermission } from "@/hooks/usePermission";
import React, { useState } from "react";
import AccessDeniedModal from "./shared/AcessDeniedModal";
import AllUsersBroadcast from "./BroadCastOptions/AllUsers";
import SelectedWorkspaces from "./BroadCastOptions/SelectedWorkspaces";
import OtherCriteria from "./BroadCastOptions/OtherCriteria";
import SelectedUsers from "./BroadCastOptions/Selectedusers";

export default function BroadcastIndex() {
  const canSendMessages = usePermission("can_send_emails");
  const [step, setStep] = useState(0);

  if (!canSendMessages) {
    return <AccessDeniedModal permission={"send messages"} />;
  }
  return (
    <div>
      <div className="max-w-xl">
        <h1 className="font-semibold text-xl text-gray-800">Email Broadcast</h1>
        <p className="text-gray-500 text-base mt-2">
          Send Email Broadcast messages to Users on Letivi.
        </p>
      </div>

      <div className="flex items-center text-sm font-medium text-gray-800 cursor-pointer my-6">
        <span
          onClick={() => setStep(0)}
          className={`px-6 py-3 border-b-2 truncate ${
            step === 0 ? "border-na_blue text-na_blue" : "border-gray-30"
          }`}
        >
          All users
        </span>
        <span
          onClick={() => setStep(1)}
          className={`px-6 py-3 border-b-2 truncate ${
            step === 1 ? "border-na_blue text-na_blue" : "border-gray-30"
          }`}
        >
          Selected Users
        </span>
        <span
          onClick={() => setStep(2)}
          className={`px-6 py-3 border-b-2 truncate ${
            step === 2 ? "border-na_blue text-na_blue" : "border-gray-30"
          }`}
        >
          Selected Workspaces
        </span>
        <span
          onClick={() => setStep(3)}
          className={`px-6 py-3 border-b-2 truncate ${
            step === 3 ? "border-na_blue text-na_blue" : "border-gray-30"
          }`}
        >
          Other Criteria
        </span>
      </div>

      <div className="my-6">
        {step === 0 && <AllUsersBroadcast />}
        {step === 1 && <SelectedUsers />}
        {step === 2 && <SelectedWorkspaces />}
        {step === 3 && <OtherCriteria />}
      </div>
    </div>
  );
}
