"use client";
import Modal from "@/components/molecules/Modal";
import { AssignPermissions, getPermissions } from "@/services/admin";
import { Permission, UserRolesData } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const Permissions = ({
  userRole,
  open,
  handleModal,
  refetchUserRoles,
}: {
  userRole: UserRolesData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUserRoles: () => void;
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: permissions, isLoading: fetching } = useQuery({
    queryKey: ["permissionsList"],
    queryFn: () => getPermissions(),
    enabled: !!userRole?.id,
    select: (response: any) => {
      return response?.data;
    },
  });

  const handleAssignPermissions = async () => {
    setLoading(true);
    try {
      const form = {
        role_id: userRole?.id,
        permission_ids: selectedPermissions,
      };
      const { data } = await AssignPermissions(form);
      toast.success("Permissions assigned Successfully");
      setSelectedPermissions([]);
      refetchUserRoles;
      handleModal(false);
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleAssignPermissions}
      cancelButton={"Cancel"}
      actionButtonVariant="primary"
      actionButton={"Confirm"}
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Assign / Revoke Permissions
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Role Name</h1>
        <input
          value={userRole?.name}
          name="industry"
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
      {permissions && (
        <>
          <div className="max-w-md mx-auto">
            <h1 className="mb-3 lg:text-base ">Permissions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {permissions?.map((permission: Permission, index: number) => (
                <div
                  className="flex flex-row space-x-[12px] items-center"
                  key={index}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row space-x-[12px] items-center">
                      <input
                        type="checkbox"
                        className={`
                            focus:border-primary-500 focus:bg-[#F4EBFF]
                            transition duration-300 w-4 h-4 text-primary-500 
                            bg-white rounded focus:outline-none focus:ring-0 
                            cursor-pointer`}
                        onChange={(e) => {
                          const permissionId = permission.id; // Assuming permission has an 'id'
                          if (e.target.checked) {
                            // Add the permission to selectedPermissions if checked
                            setSelectedPermissions((prevPermissions) => [
                              ...prevPermissions,
                              permissionId,
                            ]);
                          } else {
                            // Remove the permission from selectedPermissions if unchecked
                            setSelectedPermissions((prevPermissions) =>
                              prevPermissions.filter(
                                (id) => id !== permissionId
                              )
                            );
                          }
                        }}
                        // Check if permission is already selected
                        checked={selectedPermissions.includes(permission.id)}
                      />
                      {permission?.name && (
                        <h2 className="text-sm text-gray-700">
                          {permission?.name?.replaceAll("_", " ")}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <br />
    </Modal>
  );
};

export default Permissions;
