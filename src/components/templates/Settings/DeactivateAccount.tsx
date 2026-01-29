"use client";

import { Button } from "@/components/atoms/Button";
import { deactivateUserAccount } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { toast } from "sonner";

function DeactivateAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const currentUser = auth.currentUser;
  // const token = currentUser?.getIdToken(true);

  // update  using react-query
  const deactivateAccount = useMutation({
    mutationKey: ["email"],
    mutationFn: async () => {
      await deactivateUserAccount();
    },
    onSuccess: () => {
      toast.success("Account Deactivated Successfully");
      router.push("/"); //redirects users back to homepage after successful deactivation
    },
    onError: () => {
      toast.error("Deactivation Failed!");
    },
  });

  // Account deactivation modal
  const ConfirmationModal = () => {
    const handleAccountDeactivation = async (e: any) => {
      e.preventDefault();

      setLoading(true);
      setShowModal(false);

      try {
        await deactivateAccount.mutateAsync(); //trigger the mutation function
      } catch (error) {
        toast.error("Error Deactivating Account");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="carousel fixed inset-0 bg-[#000000ef] z-[99] flex flex-col justify-start items-center p-4 ">
        <div className="rounded-2xl max-w-max max-h-full  bg-white px-6 mt-[15%]">
          <div className=" flex flex-col items-center justify-center space-y-4 py-10">
            <div className="flex flex-col justify-center space-y-5 my-6">
              <p>Do you wish to proceed with account Deactivation ?</p>
              <div className="flex w-full justify-around">
                <button
                  onClick={handleAccountDeactivation}
                  className="bg-white border-[1px] border-solid border-na_red text-red-400 font-medium rounded-md py-2 px-4 hover:bg-na_red hover:text-white"
                >
                  Proceed
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-na_blue text-white font-medium rounded-md py-2 px-4 hover:bg-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }; // Modal ends

  return (
    <div className="lg:px-4 px-2 py-6 max-w-xl">
      <h1 className="font-normal text-lg lg:text-2xl  mb-3">
        Deactivate Account{" "}
      </h1>

      <p className="text-gray-800">
        If you delete your account, your personal information will be wiped from
        Letivi&apos;s servers, all of your activity will be anonymized and all
        of your data including photos, videos, albums and workspaces will be
        deleted. This action cannot be undone!
      </p>
      <br />

      <Button variant="tertiary" size="lg" onClick={() => setShowModal(true)}>
        {loading ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          "Deactivate My Account"
        )}
      </Button>
      {showModal && <ConfirmationModal />}
    </div>
  );
}

export default DeactivateAccount;
