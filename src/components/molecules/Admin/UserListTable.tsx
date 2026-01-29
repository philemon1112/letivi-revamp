"use client";
import { getAllUsersList, getSearchUsersList } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Table from "./shared/Table";
import Pagination from "./shared/Pagination";
import Link from "next/link";
import { UserData } from "@/types/admin";
import ResendUserVerification from "./shared/Modal/ResendVerification";
import DeleteUser from "./shared/Modal/DeleteUser";
import ActivateUser from "./shared/Modal/ActivateUser";
import DeActivateUser from "./shared/Modal/DeactivateUser";
import Search from "./shared/Search";
import { FiPlus } from "react-icons/fi";
import { usePermission } from "@/hooks/usePermission";

function UserListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [showDelete, setShowDelete] = useState(false);
  // Ensure you have the correct import for AdminUser

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [resendVerification, setShowResendVerification] = useState(false);
  const [showDeActivateUser, setShowDeActivateUser] = useState(false);
  const [showActivateUser, setShowActivateUser] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const canCreateUser = usePermission("can_create_user");
  const canDeleteUser = usePermission("can_delete_user");
  const canDeactivateUser = usePermission("can_deactivate_user");

  const [showPrivacyDropDown, setShowPrivacyDropDown] = useState(false);
  // Default page size
  const pageSize = 10;
  const headers = [
    "User Name",
    "Joined Date",
    "Email",
    "Profession",
    "Gender",
    "Private",
    "Email Verified",
    "Number of Posts",
    "",
  ];

  const filterOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "public",
      name: "Public",
    },
    {
      id: "private",
      name: "Private",
    },
  ];

  const {
    data: userList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["allUserList", currentPage, searchTerm, currentFilter],
    queryFn: async () => {
      const response = searchTerm
        ? await getSearchUsersList({
            query: searchTerm,
          })
        : await getAllUsersList({
            page: currentPage,
            limit: pageSize,
            filter: currentFilter === "all" ? "" : currentFilter,
          });

      console.log("API Response for page:", currentPage, response); // Log current page
      return response;
    },
    select: (response) => {
      const transformed = {
        data: response?.data,
        total: response?.pagination?.total,
        totalPages: response?.pagination?.last_page,
      };
      return transformed;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isFetching && userList) {
      console.log("Updated userList:", userList);
    }
  }, [userList, isFetching]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // setCurrentPage(1); // Reset to page 1 when searching
    console.log("search", term);

    // make search request
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePrivacyChange = (val: string) => {
    setCurrentFilter(val);
    setShowPrivacyDropDown(false);
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <Search
              placeholder="Search users"
              loading={isLoading}
              onSearch={(term) => handleSearch(term)}
            />
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            {/* add item  */}
            {canCreateUser && (
              <Link href="/admin/users/create">
                <button
                  type="button"
                  className="flex items-center justify-center text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
                >
                  <FiPlus size={16} color="#ffff" style={{ marginRight: 4 }} />
                  Add User
                </button>
              </Link>
            )}
            {/* actions  */}
            <div className="flex items-center space-x-3 w-full md:w-auto relative">
              {/* filter by privacy */}
              <button
                onClick={() => setShowPrivacyDropDown((prev) => !prev)}
                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-4 w-4 mr-2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Filter by: {currentFilter || "Privacy"}
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>

              <div
                className={`${
                  !showPrivacyDropDown && "hidden"
                } z-10  w-48 p-3 bg-white rounded-lg shadow absolute top-10 right-0`}
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                  Select privacy
                </h6>
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="filterDropdownButton"
                >
                  {filterOptions.map((item: any) => (
                    <li
                      key={item?.id}
                      className="flex items-center hover:bg-sky-400"
                      onClick={() => {
                        handlePrivacyChange(`${item?.id}`);
                      }}
                    >
                      <label className="ml-2 text-sm font-medium text-gray-900  ">
                        {item?.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="inline-block min-w-full align-middle ">
            {isLoading ? (
              <div className="flex justify-center  py-10">
                <img
                  src={"/assets/Img/mobile.png"}
                  width={60}
                  height={60}
                  alt="loader"
                  className="animate-spin mx-auto"
                />
              </div>
            ) : (
              <>
                {userList && userList?.data?.length >= 1 ? (
                  <Table
                    headers={headers}
                    pagination={
                      <Pagination
                        currentPage={currentPage}
                        totalPages={userList.totalPages ?? 1}
                        totalRecords={userList.total ?? userList?.data?.length}
                        pageSize={pageSize ?? 1}
                        onPageChange={handlePageChange}
                      />
                    }
                    tableDesc="Users Table"
                  >
                    {userList?.data?.map((d, i) => (
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
                          {d?.is_email_verified ? "Yes" : "No"}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.total_posts}
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

      <DeActivateUser
        open={showDeActivateUser}
        handleModal={setShowDeActivateUser}
        user={user as UserData}
        refetchUsers={refetch}
      />
      <ActivateUser
        open={showActivateUser}
        handleModal={setShowActivateUser}
        user={user as UserData}
        refetchUsers={refetch}
      />

      <DeleteUser
        open={showDelete}
        handleModal={setShowDelete}
        user={user as UserData}
        refetchUsers={refetch}
      />
      <ResendUserVerification
        open={resendVerification}
        handleModal={setShowResendVerification}
        user={user as UserData}
        refetchUsers={refetch}
      />
    </div>
  );
}

export default UserListTable;
