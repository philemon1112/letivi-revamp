import { fetchUserQualifications } from "@/services/biography";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function UserQualifications({ userData }: { userData: any }) {
  const { data: qualifications, isLoading } = useQuery({
    queryKey: ["SharedUserQualificationsList"],
    queryFn: async () => {
      if (!userData?.id) throw new Error("User ID is undefined");
      return await fetchUserQualifications(userData.id);
    },
  });

  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Qualifications
      </h2>

      <div className="px-2 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualifications?.data.map((qualification, index) => (
            <div key={index} className="py-2">
              <blockquote className="flex h-full flex-col rounded-xl justify-between bg-gray-50 p-3 shadow-xs sm:p-2 lg:p-4">
                <div>
                  <div className="mt-1">
                    <p className="text-lg font-semiBold text-na_red sm:text-base">
                      {qualification?.qualification}
                    </p>
                  </div>
                </div>

                <footer className="mt-1 text-sm font-medium text-gray-700 sm:mt-2">
                  &mdash; {qualification?.education}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
        {!isLoading && qualifications?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>

            <p className="text-sm sm:text-base">
              No Qualifications Added by User
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserQualifications;
