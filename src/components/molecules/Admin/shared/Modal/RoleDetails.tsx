"use client";
import Modal from "@/components/molecules/Modal";
import { getUserRolePermissions } from "@/services/admin";
import { UserRolesData } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const RolesDetails = ({
  userRole,
  open,
  handleModal,
}: {
  userRole: UserRolesData;
  open: boolean;
  handleModal: (open: boolean) => void;
}) => {
  const { data: roleDetails, isLoading: loading } = useQuery({
    queryKey: ["userRoleDetails", userRole?.id],
    queryFn: () => getUserRolePermissions(userRole?.id),
    enabled: !!userRole?.id,
    select: (response: any) => {
      return response?.data;
    },
  });

  return (
    <Modal
      show={open}
      cancelButton={"Cancel"}
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Role Details
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Role Name</h1>
        <input
          value={userRole?.name}
          name="industry"
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
      {roleDetails && (
        <>
          {roleDetails?.permissions?.length <= 0 ? (
            <h2 className="text-lg font-semibold text-na_blue mx-auto text-center">
              No Permissions Assigned yet
            </h2>
          ) : (
            <div className="mx-auto">
              <h1 className="mb-2 lg:text-base ">Permissions</h1>
              <div className="flex flex-col gap-2">
                {roleDetails?.permissions?.map(
                  (
                    permission: { name: string },
                    index: React.Key | null | undefined
                  ) => (
                    <div
                      className="flex flex-row space-x-[12px] items-center"
                      key={index}
                    >
                      <div className="flex flex-col">
                        <div className="flex flex-row space-x-[12px] items-center">
                          <input
                            type="checkbox"
                            checked
                            className={`
                            focus:border-primary-500 focus:bg-[#F4EBFF]
                            transition duration-300 w-4 h-4 text-primary-500 
                            bg-white rounded focus:outline-none focus:ring-0 
                            cursor-pointer`}
                          />
                          {permission?.name && (
                            <h2 className="text-sm text-gray-700">
                              {permission?.name?.replaceAll("_", " ")}
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
      <br />
    </Modal>
  );
};

export default RolesDetails;
