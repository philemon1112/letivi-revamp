"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePermission } from "@/hooks/usePermission";
import { getDashboardStats } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import LoadingCard from "./LoadingCard";
import AccessDeniedModal from "./shared/AcessDeniedModal";

function StatisticsSection() {
  const canViewDashboard = usePermission("can_view_dashbioard");
  const currentUser = useCurrentUser();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["dashboardStatistics"],
    queryFn: async () => await getDashboardStats(),

    select: (data) => {
      return data.data;
    },
  });

  const workspaceTotal =
    (data?.total_businesses ?? 0) +
    (data?.total_events ?? 0) +
    (data?.total_projects ?? 0);

  const businessPercentage = Math.round(
    ((data?.total_businesses ?? 0) / workspaceTotal) * 100
  );
  const eventsPercentage = Math.round(
    ((data?.total_events ?? 0) / workspaceTotal) * 100
  );
  const projectsPercentage = Math.round(
    ((data?.total_projects ?? 0) / workspaceTotal) * 100
  );

  if (!canViewDashboard) {
    return <AccessDeniedModal permission={"view the dashboard"} />;
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="border border-gray-200 bg-white rounded-xl">
            <div className="px-5 py-4">
              <div className="text-gray-600 text-[0.75rem] font-medium uppercase">
                Total Users
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-xl">
                  {data?.total_users ?? "N/A"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 bg-white rounded-xl">
            <div className="px-5 py-4">
              <div className="text-gray-600 text-[0.75rem] font-medium uppercase">
                Online Users
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-xl">
                  {data?.total_users_online ?? "N/A"}
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 bg-white rounded-xl">
            <div className="px-5 py-4">
              <div className="text-gray-600 text-[0.75rem] font-medium uppercase">
                Private Users
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-xl">
                  {data?.total_private_users ?? "N/A"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 bg-white rounded-xl">
            <div className="px-5 py-4">
              <div className="text-gray-600 text-[0.75rem] font-medium uppercase">
                Public Users
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-xl">
                  {data?.total_public_users ?? "N/A"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" mx-auto max-w-8xl md:my-8 my-4">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-9">
          <div className="overflow-hidden bg-white border border-gray-200 divide-y divide-gray-200 lg:col-span-3 rounded-xl">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base font-bold text-gray-900">
                    Hey {currentUser?.first_name} 👋,
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    Here&apos;s what&apos;s happening with Letivi today
                  </p>
                </div>

                <span className="m-2 px-2.5 py-0.5 truncate bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-medium text-blue-600">
                  Coming soon
                </span>
              </div>

              <div className="grid grid-cols-2 mt-6 xl:mt-12 gap-x-8">
                <div>
                  <p className="text-2xl font-bold text-gray-900">83</p>
                  <p className="mt-1 text-sm text-gray-500 font-mediume">
                    Total Posts
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">$5,994</p>
                  <p className="mt-1 text-sm text-gray-500 font-mediume">
                    Revenue Generated
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-2.5 w-2.5 text-indigo-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3"></circle>
                </svg>
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-bold">8 new posts</span> has been made
                </p>
              </div>
            </div>

            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-2.5 w-2.5 text-indigo-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3"></circle>
                </svg>
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-bold">7 new users</span> has joined
                  Letivi
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white border border-gray-200 lg:col-span-6 rounded-xl">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <p className="text-base font-bold text-gray-900">Workspaces</p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Business
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {data?.total_businesses}
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                    <div
                      style={{ width: `${businessPercentage}%` }}
                      className={`absolute inset-y-0 left-0 bg-na_blue rounded-full w-[${
                        (data?.total_businesses ?? 0) / workspaceTotal
                      }%]`}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Events</p>
                    <p className="text-sm font-medium text-gray-900">
                      {data?.total_events}
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                    <div
                      style={{ width: `${eventsPercentage}%` }}
                      className={`absolute inset-y-0 left-0 bg-na_blue rounded-full w-[${
                        (data?.total_events ?? 0) / workspaceTotal
                      }%]`}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Projects
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {data?.total_projects}
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                    <div
                      style={{ width: `${projectsPercentage}%` }}
                      className={`absolute inset-y-0 left-0 bg-na_blue rounded-full w-[${
                        (data?.total_projects ?? 0) / workspaceTotal
                      }%]`}
                    ></div>
                  </div>
                </div>

                <div className="hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Twitter</p>
                    <p className="text-sm font-medium text-gray-900">21,893</p>
                  </div>
                  <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                    <div className="absolute inset-y-0 left-0 bg-na_blue rounded-full w-[15%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsSection;
