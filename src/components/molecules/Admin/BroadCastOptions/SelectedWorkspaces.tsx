"use client";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  searchBusinesses,
  searchEvents,
  searchProjects,
  sendEmailBroadcast,
} from "@/services/admin";
import { WorkspaceData } from "@/types/common";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

function SelectedWorkspaces() {
  const currentUser = useCurrentUser();
  const [type, setType] = useState("business");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessSearchParam, setBusinessSearchParam] = useState("");
  const [eventSearchParam, setEventSearchParam] = useState("");
  const [projectSearchParam, setProjectSearchParam] = useState("");
  const [businessId, setBusinessId] = useState([currentUser?.id]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<WorkspaceData[]>(
    []
  );
  const [eventId, setEventId] = useState([currentUser?.id]);
  const [selectedEvents, setSelectedEvents] = useState<WorkspaceData[]>([]);
  const [projectId, setProjectId] = useState([currentUser?.id]);
  const [selectedProjects, setSelectedProjects] = useState<WorkspaceData[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [eventName, setEventName] = useState("");
  const [projectName, setProjectName] = useState("");

  const addBusiness = (item: WorkspaceData) => {
    const isMemberAdded = businessId?.includes(item.id);
    if (!isMemberAdded) {
      setBusinessId([...businessId, item?.id]);
      setSelectedBusinesses([...selectedBusinesses, item]);
    }
  };

  const removeBusiness = (id: number) => {
    const result = selectedBusinesses.filter((_, idx) => idx !== id);
    setSelectedBusinesses(result);
  };

  const addEvent = (item: WorkspaceData) => {
    const isMemberAdded = eventId?.includes(item.id);
    if (!isMemberAdded) {
      setEventId([...eventId, item?.id]);
      setSelectedEvents([...selectedEvents, item]);
    }
  };

  const removeEvent = (id: number) => {
    const result = selectedEvents.filter((_, idx) => idx !== id);
    setSelectedEvents(result);
  };

  const addProject = (item: WorkspaceData) => {
    const isMemberAdded = projectId?.includes(item.id);
    if (!isMemberAdded) {
      setProjectId([...projectId, item?.id]);
      setSelectedProjects([...selectedProjects, item]);
    }
  };

  const removeProject = (id: number) => {
    const result = selectedProjects.filter((_, idx) => idx !== id);
    setSelectedProjects(result);
  };

  const { data: businessSearchResults } = useQuery({
    queryKey: ["searchedBusinessList", businessSearchParam],
    queryFn: () => searchBusinesses(businessSearchParam),
    enabled: businessSearchParam?.length > 0,
    select: (response: any) => {
      return response?.data;
    },
  });

  const { data: eventSearchResults } = useQuery({
    queryKey: ["searchedEventList", eventSearchParam],
    queryFn: () => searchEvents(eventSearchParam),
    enabled: eventSearchParam?.length > 0,
    select: (response: any) => {
      return response?.data;
    },
  });

  const { data: projectSearchResults } = useQuery({
    queryKey: ["searchedProjectList", projectSearchParam],
    queryFn: () => searchProjects(projectSearchParam),
    enabled: projectSearchParam?.length > 0,
    select: (response: any) => {
      return response?.data;
    },
  });

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const form = {
        filter: type,
        subject: subject,
        message: message,
        meta: {
          ...(type === "business" && {
            business_id: businessId
              .filter((id): id is number => id !== undefined)
              .map(String),
          }),
          ...(type === "event" && {
            event_ids: eventId
              .filter((id): id is number => id !== undefined)
              .map(String),
          }),
          ...(type === "project" && {
            project_ids: projectId
              .filter((id): id is number => id !== undefined)
              .map(String),
          }),
        },
      };
      const { data } = await sendEmailBroadcast(form);
      toast.success("Message sent Successfully");
    } catch (error: any) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-6 bg-white text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 ">
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-lg md:text-2xl font-bold">Search {type}</h1>

          <h1 className="mb-2  lg:text-base ">
            Search a {type} to add to the email broadcast list
          </h1>

          {type === "business" && (
            <>
              <input
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setBusinessSearchParam(e.target.value);
                }}
                placeholder="Search business workspace"
                className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
              />

              {businessSearchParam?.length > 0 && (
                <div className="border max-h-40 overflow-y-auto">
                  {businessSearchResults?.length > 0 && (
                    <ul className="space-y-2">
                      {businessSearchResults?.map(
                        (item: WorkspaceData, idx: string) => {
                          return (
                            <li
                              key={idx}
                              onClick={() => {
                                addBusiness(item);
                              }}
                              className="p-2 flex items-center hover:bg-slate-100 cursor-pointer"
                            >
                              <div className="flex ">
                                <div className="relative flex-shrink">
                                  <img
                                    src={getApiMedia(
                                      item?.business_profile?.logo || ""
                                    )}
                                    className="bg-cover h-12 w-12 rounded-lg"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <p className="text-gray-800 font-bold text-base">
                                    {item?.name}
                                  </p>
                                  <p className="mt-0.5 text-sm font-medium text-gray-500">
                                    {item?.industry?.name ||
                                      item?.other_industry ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  {businessSearchResults?.length === 0 && (
                    <div className="text-na_red text-center py-2">
                      No businesses found
                    </div>
                  )}
                </div>
              )}

              {selectedBusinesses?.length > 0 && (
                <div className="border">
                  <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                    {selectedBusinesses?.map(
                      (item: WorkspaceData, idx: number) => {
                        return (
                          <li
                            key={idx}
                            className="p-1 text-xs flex  items-center bg-na_blue rounded-lg text-white"
                          >
                            <p>{item?.name}</p>{" "}
                            <div>
                              <img
                                onClick={() => {
                                  removeBusiness(idx);
                                }}
                                src={"/assets/Svg/cancel.svg"}
                                alt=""
                                className="ml-1 h-5 w-5 cursor-pointer"
                              />
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </>
          )}

          {type === "event" && (
            <>
              <input
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                  setEventSearchParam(e.target.value);
                }}
                placeholder="Search events workspace"
                className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
              />

              {eventSearchParam?.length > 0 && (
                <div className="border max-h-40 overflow-y-auto">
                  {eventSearchResults?.length > 0 && (
                    <ul className="space-y-2">
                      {eventSearchResults?.map(
                        (item: WorkspaceData, idx: string) => {
                          return (
                            <li
                              key={idx}
                              onClick={() => {
                                addEvent(item);
                              }}
                              className="p-2 flex items-center hover:bg-slate-100 cursor-pointer"
                            >
                              <div className="flex ">
                                <div className="relative flex-shrink">
                                  <img
                                    src={getApiMedia(
                                      item?.event_profile?.logo || ""
                                    )}
                                    className="bg-cover h-12 w-12 rounded-lg"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <p className="text-gray-800 font-bold text-base">
                                    {item?.name}
                                  </p>
                                  <p className="mt-0.5 text-sm font-medium text-gray-500">
                                    {item?.industry?.name ||
                                      item?.other_industry ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  {eventSearchResults?.length === 0 && (
                    <div className="text-na_red text-center py-2">
                      No Events found
                    </div>
                  )}
                </div>
              )}

              {selectedEvents.length > 0 && (
                <div className="border">
                  <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                    {selectedEvents.map((item: WorkspaceData, idx: number) => {
                      return (
                        <li
                          key={idx}
                          className="p-1 text-xs flex  items-center bg-na_blue rounded-lg text-white"
                        >
                          <p>{item?.name}</p>{" "}
                          <div>
                            <img
                              onClick={() => {
                                removeEvent(idx);
                              }}
                              src={"/assets/Svg/cancel.svg"}
                              alt=""
                              className="ml-1 h-5 w-5 cursor-pointer"
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}

          {type === "project" && (
            <>
              <input
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  setProjectSearchParam(e.target.value);
                }}
                placeholder="Search projects workspace"
                className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
              />

              {projectSearchParam?.length > 0 && (
                <div className="border max-h-40 overflow-y-auto">
                  {projectSearchResults?.length > 0 && (
                    <ul className="space-y-2">
                      {projectSearchResults?.map(
                        (item: WorkspaceData, idx: string) => {
                          return (
                            <li
                              key={idx}
                              onClick={() => {
                                addProject(item);
                              }}
                              className="p-2 flex items-center hover:bg-slate-100 cursor-pointer"
                            >
                              <div className="flex ">
                                <div className="relative flex-shrink">
                                  <img
                                    src={getApiMedia(
                                      item?.project_profile?.logo || ""
                                    )}
                                    className="bg-cover h-12 w-12 rounded-lg"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <p className="text-gray-800 font-bold text-base">
                                    {item?.name}
                                  </p>
                                  <p className="mt-0.5 text-sm font-medium text-gray-500">
                                    {item?.industry?.name ||
                                      item?.other_industry ||
                                      "N/A"}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )}
                  {projectSearchResults?.length === 0 && (
                    <div className="text-na_red text-center py-2">
                      No projects found
                    </div>
                  )}
                </div>
              )}

              {selectedProjects.length > 0 && (
                <div className="border">
                  <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                    {selectedProjects.map(
                      (item: WorkspaceData, idx: number) => {
                        return (
                          <li
                            key={idx}
                            className="p-1 text-xs flex  items-center bg-na_blue rounded-lg text-white"
                          >
                            <p>{item?.name}</p>{" "}
                            <div>
                              <img
                                onClick={() => {
                                  removeProject(idx);
                                }}
                                src={"/assets/Svg/cancel.svg"}
                                alt=""
                                className="ml-1 h-5 w-5 cursor-pointer"
                              />
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mx-auto w-full max-w-lg ">
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-2">
                Send a Message to Selected Workspaces on letivi
              </h2>
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Select Type
              </label>
              <select
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-md border mb-3 border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
              >
                <option value="">-- Select --</option>
                <option value="business">Business</option>
                <option value="event">Events</option>
                <option value="project">Projects</option>
              </select>

              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Subject
              </label>

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Enter your subject"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                name="message"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-na_blue focus:shadow-md"
              />
            </div>

            <Button
              loading={loading}
              disabled={!subject || !message}
              variant="primary"
              size="lg"
              onClick={handleSendMessage}
            >
              Submit Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectedWorkspaces;
