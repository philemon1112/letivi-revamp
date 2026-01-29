"use client";
import { WorkspaceData } from "@/types/common";
import { Workspace } from "@/types/workspaces";
import { getApiMedia } from "@/utils/getApiMedia";
import { getUserFromLocalStorage } from "@/utils/getUserFromLocalStorage";
import Link from "next/link";
import React, { useState } from "react";

function Settings() {
  const [step, setStep] = useState(0);
  const authUser = getUserFromLocalStorage();

  return (
    <div className="py-6 bg-gray-50 rounded-xl">
      <div className="max-w-7xl m-auto  px-4">
        <div className="max-w-xl">
          <h1 className="font-semibold text-xl text-gray-800">Settings</h1>
          <p className="text-gray-500 text-base mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            morbi pulvinar venenatis non.
          </p>
        </div>

        <div className="flex items-center text-sm font-medium text-gray-800 cursor-pointer my-6">
          <span
            rel="noopener noreferrer"
            onClick={() => setStep(0)}
            className={`px-2 md:px-6 py-1 md:py-3 border-b-2 truncate ${
              step === 0 ? "border-na_blue text-na_blue" : "border-gray-30"
            }`}
          >
            Profile
          </span>
          <span
            rel="noopener noreferrer"
            onClick={() => setStep(1)}
            className={`px-2 md:px-6 py-1 md:py-3 border-b-2 truncate ${
              step === 1 ? "border-na_blue text-na_blue" : "border-gray-30"
            }`}
          >
            Roles and Permissions
          </span>
          <span
            rel="noopener noreferrer"
            onClick={() => setStep(2)}
            className={`px-2 md:px-6 py-1 md:py-3 border-b-2 truncate ${
              step === 2 ? "border-na_blue text-na_blue" : "border-gray-30"
            }`}
          >
            Account Summary
          </span>
        </div>

        <div className="my-6">
          {step === 0 && (
            <>
              <section className="">
                <div className="mx-auto">
                  <div className="p-6 bg-white  border-gray-100 rounded-lg  dark:bg-gray-900 dark:border-gray-900">
                    <div className="pb-6 border-b border-gray-100 dark:border-gray-700 ">
                      <h2 className="text-xl font-bold text-gray-800 md:text-3xl dark:text-gray-300">
                        Basic Info
                      </h2>
                      <p className="text-xs font-medium text-gray-500">
                        Lorem ipsum dor amet set ispicuous
                      </p>
                    </div>
                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                          <div className="w-full p-3 md:w-1/3">
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                              Name
                            </p>
                          </div>
                          <div className="w-full p-3 md:w-1/3">
                            <input
                              value={authUser?.first_name}
                              className="w-full dark:bg-gray-800 dark:border-gray-800 px-4 dark:placeholder-gray-500 dark:text-gray-400 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                              type="text"
                              placeholder="Adam"
                            />
                          </div>
                          <div className="w-full p-3 md:w-1/3">
                            <input
                              value={authUser?.last_name}
                              className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                              type="text"
                              placeholder="Smith"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                          <div className="w-full p-3 md:w-1/3">
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                              Email address
                            </p>
                          </div>
                          <div className="w-full p-3 md:flex-1">
                            <input
                              value={authUser?.email}
                              className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                              type="email"
                              placeholder="adam@gmail.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                          <div className="w-full p-3 md:w-1/3">
                            <p className="text-base font-semibold text-gray-700 dark:text-gray-400">
                              Country
                            </p>
                          </div>
                          <div className="w-full p-3 md:flex-1">
                            <input
                              value={authUser?.profile?.country}
                              className="w-full px-4 py-2.5 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-500 dark:text-gray-400  text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                              type="email"
                              placeholder="adam@gmail.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                          <div className="w-full p-3 md:w-1/3">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                              Role
                            </p>
                          </div>
                          <div className="w-full p-3 md:flex-1">
                            <input
                              value={authUser?.user_role?.name}
                              className="w-full px-4 dark:bg-gray-800 dark:placeholder-gray-500 dark:text-gray-400  dark:border-gray-700 py-2.5 text-base text-gray-900 rounded-lg font-normal border border-gray-200"
                              type="text"
                              placeholder="Web Designer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-6 border-b border-gray-100 dark:border-gray-800">
                      <div className="w-full md:w-9/12">
                        <div className="flex flex-wrap -m-3">
                          <div className="w-full p-3 md:w-1/3">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                              Photo
                            </p>
                          </div>
                          <div className="w-full p-3 md:w-auto">
                            <img
                              src={getApiMedia(
                                authUser?.profile?.picture || ""
                              )}
                              alt=""
                              className="object-cover w-24 h-24 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {step === 1 && (
            <div className="bg-white p-4 rounded-xl">
              <fieldset>
                {authUser?.user_permissions?.map(
                  (permission: {
                    id: React.Key | null | undefined;
                    name: string;
                  }) => (
                    <div
                      key={permission?.id}
                      className="flex items-center mb-4"
                    >
                      <input
                        checked
                        id="checkbox-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-1"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        You {permission?.name?.replaceAll("_", " ")}
                      </label>
                    </div>
                  )
                )}
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className=" p-2 md:p-6 sm:p-12 bg-white text-gray-800 ">
              <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                <img
                  src={getApiMedia(authUser?.profile?.picture || "")}
                  alt=""
                  className="self-center flex-shrink-0 aspect-square w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-300"
                />
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-center md:text-left">
                    {authUser?.first_name} {authUser?.last_name}
                  </h4>
                  <p className="text-gray-600">
                    Sed non nibh iaculis, posuere diam vitae, consectetur neque.{" "}
                  </p>
                  <div className="my-0.5 flex justify-around">
                    <div className="p-4">
                      <span className="font-semibold">Total Posts: </span>{" "}
                      {authUser?.total_posts}
                    </div>
                    <div className="p-4">
                      <span className="font-semibold">Total Images: </span>{" "}
                      {authUser?.total_public_post_images +
                        authUser?.total_private_post_images}
                    </div>
                    <div className="p-4">
                      <span className="font-semibold">Total Videos: </span>{" "}
                      {authUser?.total_public_post_images +
                        authUser?.total_private_post_images}
                    </div>
                  </div>
                </div>
              </div>

              {/* businesses you are apart of */}
              {authUser?.businesses_membership?.length > 0 && (
                <div className="my-3 md:my-8 rounded-xl border border-gray-300 overflow-hidden max-w-4xl">
                  <div className="px-4 py-5 md:p-6">
                    <div className="max-w-3xl">
                      <h1 className="font-semibold text-lg text-gray-800">
                        Businesses you are apart of
                      </h1>
                      <p className="text-gray-500 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>

                      <div className="mt-8 flow-root">
                        <div className="-my-5">
                          {authUser?.businesses_membership?.map(
                            (business: WorkspaceData) => (
                              <div key={business?.id} className="py-5">
                                <div className="flex items-center">
                                  <div className="relative flex-shrink">
                                    <img
                                      src={getApiMedia(
                                        business?.business_profile?.logo || ""
                                      )}
                                      className="bg-cover h-12 w-12 rounded-lg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-gray-800 font-bold text-base">
                                      {business?.name}
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-gray-500">
                                      {business?.industry?.name ||
                                        business?.other_industry ||
                                        "N/A"}
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <Link href={`${business?.slug}`}>
                                      <h2 className="text-na_blue underline cursor-pointer truncate">
                                        Visit{" "}
                                      </h2>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects */}

              {authUser?.projects_membership?.length > 0 && (
                <div className="my-3 md:my-8 rounded-xl border border-gray-300 overflow-hidden max-w-4xl">
                  <div className="px-4 py-5 md:p-6">
                    <div className="max-w-3xl">
                      <h1 className="font-semibold text-lg text-gray-800">
                        Projects you are apart of
                      </h1>
                      <p className="text-gray-500 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>

                      <div className="mt-8 flow-root">
                        <div className="-my-5">
                          {authUser?.projects_membership?.map(
                            (project: Workspace) => (
                              <div key={project?.id} className="py-5">
                                <div className="flex items-center">
                                  <div className="relative flex-shrink">
                                    <img
                                      src={getApiMedia(
                                        project?.project_profile?.logo || ""
                                      )}
                                      className="bg-cover h-12 w-12 rounded-lg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-gray-800 font-bold text-base">
                                      {project?.name}
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-gray-500">
                                      {project?.industry?.name ||
                                        project?.other_industry ||
                                        "N/A"}
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <Link href={`${project?.slug}`}>
                                      <h2 className="text-na_blue underline cursor-pointer truncate">
                                        Visit{" "}
                                      </h2>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Events */}
              {authUser?.events_membership?.length > 0 && (
                <div className="my-3 md:my-8 rounded-xl border border-gray-300 overflow-hidden max-w-4xl">
                  <div className="px-4 py-5 md:p-6">
                    <div className="max-w-3xl">
                      <h1 className="font-semibold text-lg text-gray-800">
                        Events you are apart of
                      </h1>
                      <p className="text-gray-500 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>

                      <div className="mt-8 flow-root">
                        <div className="-my-5">
                          {authUser?.events_membership?.map(
                            (event: WorkspaceData) => (
                              <div key={event?.id} className="py-5">
                                <div className="flex items-center">
                                  <div className="relative flex-shrink">
                                    <img
                                      src={getApiMedia(
                                        event?.event_profile?.logo || ""
                                      )}
                                      className="bg-cover h-12 w-12 rounded-lg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-gray-800 font-bold text-base">
                                      {event?.name}
                                    </p>
                                    <p className="mt-0.5 text-sm font-medium text-gray-500">
                                      {event?.industry?.name ||
                                        event?.other_industry ||
                                        "N/A"}
                                    </p>
                                  </div>
                                  <div className="ml-auto">
                                    <Link href={`${event?.slug}`}>
                                      <h2 className="text-na_blue underline cursor-pointer truncate">
                                        Visit{" "}
                                      </h2>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
