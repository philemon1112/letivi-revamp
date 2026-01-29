"use client";
import React, { useState } from "react";
import Table from "./shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getBusinessWorkspaceList } from "@/services/admin";
import Pagination from "./shared/Pagination";
import { usePermission } from "@/hooks/usePermission";
import { getApiMedia } from "@/utils/getApiMedia";
import { WorkspaceData } from "@/types/common";
import DeleteWorkspace from "./shared/Modal/DeleteWorkspace";
import AccessDeniedModal from "./shared/AcessDeniedModal";

function BusinessListTable() {
  const canDeleteWorkspaces = usePermission("can_delete_workspaces");
  const canViewWorkspaces = usePermission("can_view_workspaces");

  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [showDelete, setShowDelete] = useState(false);
  // Ensure you have the correct import for AdminUser

  const [workspace, setWorkspace] = useState<WorkspaceData | undefined>(
    undefined
  );

  // Default page size
  const pageSize = 10;

  const headers = [
    "Logo",
    "Name",
    "Date Created",
    "Industry",
    "No. of Collaborators",
    "No. of Images",
    "No. of Videos",
    "No. of Posts",
    "",
  ];

  const {
    data: businessList,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["businessList", currentPage],
    queryFn: () =>
      getBusinessWorkspaceList({
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

  if (!canViewWorkspaces) {
    return <AccessDeniedModal permission={"view workspaces"} />;
  }

  return (
    <>
      <DeleteWorkspace
        open={showDelete}
        handleModal={setShowDelete}
        workspace={workspace as WorkspaceData}
        type="Business"
        refetchWorkspaces={refetch}
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
                {businessList && businessList?.data?.length >= 1 ? (
                  <Table
                    headers={headers}
                    pagination={
                      <Pagination
                        currentPage={currentPage}
                        totalPages={businessList.totalPages}
                        totalRecords={businessList.total}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                      />
                    }
                    tableDesc="Business List Table"
                  >
                    {businessList?.data?.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-12  py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          <img
                            src={getApiMedia(d?.business_profile?.logo || "")}
                            className="w-12 h-12 aspect-square rounded-sm"
                            alt=""
                          />
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.name}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {new Date(d?.created_at)?.toLocaleDateString()}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.industry?.name || d?.other_industry}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.total_collaborators}
                        </td>

                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.total_images}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.total_video}
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
                                      href={`${d?.slug}`}
                                      rel="noreferrer noopener"
                                      className="block py-2 px-4 hover:bg-gray-100"
                                    >
                                      View
                                    </a>
                                  </li>
                                </ul>
                                <div className="py-1">
                                  {canDeleteWorkspaces && (
                                    <button
                                      onClick={() => {
                                        setWorkspace(d);
                                        setShowDelete(true);
                                      }}
                                      className="block py-2 px-4 w-full text-left text-sm text-gray-700 hover:bg-gray-100 "
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
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

export default BusinessListTable;
