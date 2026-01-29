import AdminsListTable from "@/components/molecules/Admin/AdminsListTable";
import React from "react";

function Administrators() {
  return (
    <div className="">
      <section className="bg-white sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-fit md:w-1/2">
            <h2 className="font-semibold text-2xl text-black capitalize">
              Letivi Administrators
            </h2>
            <p className="text-base text-gray-500">
              Users with Administrator Access{" "}
            </p>
          </div>
        </div>
        <AdminsListTable />
      </section>
    </div>
  );
}

export default Administrators;
