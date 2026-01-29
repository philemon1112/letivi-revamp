import Skeleton from "@/components/atoms/Skeleton";
import React from "react";

function WorkspaceLoadingTemplate() {
  return (
    <div>
      <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto hide-scrollbar">
        <div className="max-w-screen-2xl mx-auto px-2 md:px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-8 mt-3">
            <div className="md:col-span-1">
              <Skeleton height={300} width={100} />
              <br />
              <Skeleton height={50} width={100} />
            </div>
            <div className="md:col-span-3">
              <Skeleton height={200} width={100} />
              <br />
              <Skeleton height={350} width={100} />
              <br />
              <Skeleton height={450} width={100} />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceLoadingTemplate;
