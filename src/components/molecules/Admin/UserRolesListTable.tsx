"use client";
import React, { useState } from "react";
import Table from "./shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getUserRolesList } from "@/services/admin";
import Pagination from "./shared/Pagination";
import { usePermission } from "@/hooks/usePermission";
import { UserRolesData } from "@/types/common";
import { FiPlus } from "react-icons/fi";
import UserRoleForm from "./shared/Modal/userRoleForm";
import RolesDetails from "./shared/Modal/RoleDetails";
import Permissions from "./shared/Modal/Permissions";
import UserAccess from "./shared/Modal/UserAccess";

function UserRolesListTable() {
  const canAssignUserRole = usePermission("can_assign_role_to_user");

  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [showUserAccessForm, setShowUserAccessForm] = useState(false);
  // Ensure you have the correct import for AdminUser

  const [userRole, setUserRole] = useState<UserRolesData | undefined>(
    undefined
  );

  // Default page size
  const pageSize = 10;

  const headers = [
    "ID",
    "Role Name",
    "Updated At",
    "Actions",
    "Additional Actions",
  ];

  const {
    data: UserRolesList,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["userRoleList", currentPage],
    queryFn: () =>
      getUserRolesList({
        page: currentPage,
        limit: pageSize,
      }),
    select: (response) => {
      return {
        data: response.data,
        total: response.pagination.total,
        totalPages: response.pagination.last_page,
      };
    },
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setShowForms(false);
    setUserRole(undefined); // Reset userRole when modal closes
  };

  return (
    <>
      <RolesDetails
        open={showDetails}
        handleModal={setShowDetails}
        userRole={userRole as UserRolesData}
      />

      <UserRoleForm
        open={showForms}
        handleModal={handleCloseModal}
        userRole={userRole as UserRolesData}
        refetchUserRoles={refetch}
      />

      <Permissions
        open={showAssignForm}
        handleModal={setShowAssignForm}
        userRole={userRole as UserRolesData}
        refetchUserRoles={refetch}
      />

      <UserAccess
        open={showUserAccessForm}
        handleModal={setShowUserAccessForm}
        userRole={userRole as UserRolesData}
        refetchUserRoles={refetch}
      />

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-2xl text-black capitalize">
                  Roles & Permissions
                </h2>
                <p className="text-base text-gray-500">
                  Here you can create a new role, update it , assign a role to a
                  permission and a user
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUserRole(undefined);
                  setShowForms(true);
                }}
                className="flex w-fit items-center justify-center text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
              >
                <FiPlus size={16} color="#ffff" style={{ marginRight: 4 }} />
                Add Role
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto  no-scrollbar">
          <div className="inline-block min-w-full align-middle ">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <img
                  src={"/assets/Img/mobile.png"}
                  width={60}
                  height={60}
                  alt="loader"
                  className="animate-spin mx auto"
                />
              </div>
            ) : (
              <>
                {UserRolesList && UserRolesList?.data?.length >= 1 ? (
                  <Table
                    headers={headers}
                    pagination={
                      <Pagination
                        currentPage={currentPage}
                        totalPages={UserRolesList.totalPages}
                        totalRecords={UserRolesList.total}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                      />
                    }
                    tableDesc="Industries List Table"
                  >
                    {UserRolesList?.data?.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-12  py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.id}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.name}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {new Date(d?.updated_at)?.toLocaleDateString()}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          <div className="flex gap-x-4">
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setUserRole(d);
                                  setShowDetails(true);
                                }}
                                className="block py-2  w-fit rounded-xl px-4 bg-na_blue text-left text-sm text-gray-100 "
                              >
                                view
                              </button>
                            </div>
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setUserRole(d);
                                  setShowForms(true);
                                }}
                                className="block py-2 w-fit disabled  rounded-xl px-4 bg-na_red text-left text-sm text-gray-100 "
                              >
                                update
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          <div className="flex gap-x-4">
                            {canAssignUserRole && (
                              <div className="relative">
                                <button
                                  onClick={() => {
                                    setUserRole(d);
                                    setShowUserAccessForm(true);
                                  }}
                                  className="block py-2 truncate w-fit rounded-xl px-4 bg-na_yellow text-left text-sm text-gray-800 "
                                >
                                  Assign Users
                                </button>
                              </div>
                            )}
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setUserRole(d);
                                  setShowAssignForm(true);
                                }}
                                className="block py-2 truncate w-fit rounded-xl px-4 bg-na_blue text-left text-sm text-gray-100 "
                              >
                                Assign Permissions
                              </button>
                            </div>
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setUserRole(d);
                                  setShowAssignForm(true);
                                }}
                                className="block py-2 truncate w-fit rounded-xl px-4 bg-na_red text-left text-sm text-gray-100 "
                              >
                                Revoke Permissions
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <div className="flex justify-center py-10">
                    <p className="text-gray-500">No Data Found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRolesListTable;
