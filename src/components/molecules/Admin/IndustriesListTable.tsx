"use client";
import React, { useState } from "react";
import Table from "./shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getEventWorkspaceList, getIndustryList } from "@/services/admin";
import Pagination from "./shared/Pagination";
import { usePermission } from "@/hooks/usePermission";
import { getApiMedia } from "@/utils/getApiMedia";
import { IndustriesData, WorkspaceData } from "@/types/common";
import DeleteWorkspace from "./shared/Modal/DeleteWorkspace";
import AccessDeniedModal from "./shared/AcessDeniedModal";
import { FiPlus } from "react-icons/fi";
import DeleteIndustry from "./shared/Modal/DeleteIndustry";
import IndustryForm from "./shared/Modal/IndustryForm";

function IndustriesListTable() {
  const canCreateIndustries = usePermission("can_create_industries");

  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showForms, setShowForms] = useState(false);
  // Ensure you have the correct import for AdminUser

  const [industry, setIndustry] = useState<IndustriesData | undefined>(
    undefined
  );

  // Default page size
  const pageSize = 10;

  const headers = ["ID", "Industry Name", ""];

  const {
    data: industryList,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["industryList", currentPage],
    queryFn: () =>
      getIndustryList({
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
    setIndustry(undefined); // Reset industry when modal closes
  };

  return (
    <>
      <DeleteIndustry
        open={showDelete}
        handleModal={setShowDelete}
        industry={industry as IndustriesData}
        refetchIndustries={refetch}
      />

      <IndustryForm
        open={showForms}
        handleModal={handleCloseModal}
        industry={industry as IndustriesData}
        refetchIndustries={refetch}
      />

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-2xl text-black capitalize">
                  Industries
                </h2>
                <p className="text-base text-gray-500">
                  Here are all industries on Letivi
                </p>
              </div>
              {canCreateIndustries && (
                <button
                  type="button"
                  onClick={() => {
                    setIndustry(undefined);
                    setShowForms(true);
                  }}
                  className="flex w-fit items-center justify-center text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none "
                >
                  <FiPlus size={16} color="#ffff" style={{ marginRight: 4 }} />
                  Add Industry
                </button>
              )}
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
                {industryList && industryList?.data?.length >= 1 ? (
                  <Table
                    headers={headers}
                    pagination={
                      <Pagination
                        currentPage={currentPage}
                        totalPages={industryList.totalPages}
                        totalRecords={industryList.total}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                      />
                    }
                    tableDesc="Industries List Table"
                  >
                    {industryList?.data?.map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-12  py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.id}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {d?.name}
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          <div className="flex gap-x-4">
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setIndustry(d);
                                  setShowForms(true);
                                }}
                                className="block py-2  w-fit rounded-xl px-4 bg-na_blue text-left text-sm text-gray-100 "
                              >
                                Update
                              </button>
                            </div>
                            <div className="relative">
                              <button
                                onClick={() => {
                                  // setIndustry(d);
                                  // setShowDelete(true);
                                }}
                                className="block py-2 w-fit disabled cursor-not-allowed  rounded-xl px-4 bg-na_red text-left text-sm text-gray-100 "
                              >
                                Delete
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

export default IndustriesListTable;
