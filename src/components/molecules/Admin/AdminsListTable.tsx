"use client";
import React, { useState } from "react";
import Table from "./shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsersList } from "@/services/admin";
import Pagination from "./shared/Pagination";
import { usePermission } from "@/hooks/usePermission";
import DeActivateUser from "./shared/Modal/DeactivateUser";
import { AdminUser } from "@/types/admin";
import ActivateUser from "./shared/Modal/ActivateUser";
import RevokeUserRole from "./shared/Modal/RevokeUserRole";
import DeleteUser from "./shared/Modal/DeleteUser";
import ResendUserVerification from "./shared/Modal/ResendVerification";

function AdminsListTable() {
  const canRevokeRole = usePermission("can_revoke_role_from_user");

  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showRevoke, setShowRevoke] = useState(false);
  // Ensure you have the correct import for AdminUser

  const [user, setUser] = useState<AdminUser | undefined>(undefined);
  const [resendVerification, setShowResendVerification] = useState(false);
  const [showDeActivateUser, setShowDeActivateUser] = useState(false);
  const [showActivateUser, setShowActivateUser] = useState(false);
  // Default page size
  const pageSize = 10;

  const headers = [
    "User Name",
    "Joined Date",
    "Email",
    "Profession",
    "Gender",
    "Private",
    "Role",
    "",
  ];

  const {
    data: adminList,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["adminList", currentPage],
    queryFn: () =>
      getAdminUsersList({
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

  return (
    <>
      <DeActivateUser
        open={showDeActivateUser}
        handleModal={setShowDeActivateUser}
        user={user as AdminUser}
        refetchUsers={refetch}
      />
      <ActivateUser
        open={showActivateUser}
        handleModal={setShowActivateUser}
        user={user as AdminUser}
        refetchUsers={refetch}
      />
      <RevokeUserRole
        open={showRevoke}
        handleModal={setShowRevoke}
        user={user as AdminUser}
        refetchUsers={refetch}
      />
      <DeleteUser
        open={showDelete}
        handleModal={setShowDelete}
        user={user as AdminUser}
        refetchUsers={refetch}
      />
      <ResendUserVerification
        open={resendVerification}
        handleModal={setShowResendVerification}
        user={user as AdminUser}
        refetchUsers={refetch}
      />

      <div className="flex flex-col">
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
                {adminList && adminList?.data?.length >= 1 ? (
                  <Table
                    headers={headers}
                    pagination={
                      <Pagination
                        currentPage={currentPage}
                        totalPages={adminList.totalPages}
                        totalRecords={adminList.total}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                      />
                    }
                    tableDesc="Users Table"
                  >
                    {adminList?.data?.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-12  py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.first_name} {d?.last_name}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {new Date(d?.created_at)?.toLocaleDateString()}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.email}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.profession?.profession}
                        </td>

                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.gender}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.private === 0 ? "No" : "yes"}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.user_role?.name}
                        </td>

                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActions((prev) => !prev);
                                setSelected(d?.id);
                              }}
                              className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 "
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                              </svg>
                            </button>
                            {selected === d?.id && (
                              <div
                                className={`${
                                  !showActions && "hidden"
                                } z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute top-10 right-0`}
                              >
                                <ul
                                  className=" text-sm text-gray-700 "
                                  aria-labelledby="apple-imac-27-dropdown-button"
                                >
                                  <li>
                                    <a
                                      target="_blank"
                                      href={`${d?.profile?.profile}`}
                                      rel="noreferrer noopener"
                                      className="block py-2 px-4 hover:bg-gray-100"
                                    >
                                      View
                                    </a>
                                  </li>
                                  {d?.is_email_verified === false && (
                                    <li>
                                      <button
                                        onClick={() => {
                                          setUser(d);
                                          setShowResendVerification(true);
                                        }}
                                        className="block py-2 px-4 hover:bg-gray-100 truncate"
                                      >
                                        Resend Verification email
                                      </button>
                                    </li>
                                  )}
                                </ul>
                                {d?.is_blocked === 1 && (
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        setUser(d);
                                        setShowDelete(true);
                                      }}
                                      className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 "
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                                {canRevokeRole && (
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        setUser(d);
                                        setShowRevoke(true);
                                      }}
                                      className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 "
                                    >
                                      Revoke Role
                                    </button>
                                  </div>
                                )}
                                <div className="">
                                  <button
                                    onClick={() => {
                                      setUser(d);
                                      if (d?.status === 1) {
                                        setShowDeActivateUser(true);
                                      } else {
                                        setShowActivateUser(true);
                                      }
                                    }}
                                    className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 "
                                  >
                                    {d?.status === 1
                                      ? "Deactivate "
                                      : "Activate"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Table>
                ) : (
                  <h4>empty state</h4>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminsListTable;
