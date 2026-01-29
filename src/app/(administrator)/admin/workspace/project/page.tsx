import EventListTable from "@/components/molecules/Admin/EventListTable";
import ProjectListTable from "@/components/molecules/Admin/ProjectListTable";
import React from "react";

function ProjectWorkspace() {
  return (
    <div className="">
      <section className="bg-white sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-fit md:w-1/2">
            <h2 className="font-semibold text-2xl text-black capitalize">
              Project Workspaces
            </h2>
            <p className="text-base text-gray-500">
              List of all project Workspaces on letivi
            </p>
          </div>
        </div>
        <ProjectListTable />
      </section>
    </div>
  );
}

export default ProjectWorkspace;
