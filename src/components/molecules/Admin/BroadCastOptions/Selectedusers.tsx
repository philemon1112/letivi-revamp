"use client";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getSearchUsersList, sendEmailBroadcast } from "@/services/admin";
import { UserData } from "@/types/admin";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

function SelectedUsers() {
  const currentUser = useCurrentUser();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParam, setsearchParam] = useState("");
  const [teamMemberId, setTeamMemberId] = useState([currentUser?.id]);
  const [teamMember, setTeamMember] = useState<UserData[]>([]);
  const [userName, setTeamMemberName] = useState("");

  const addTeamMember = (item: UserData) => {
    const isMemberAdded = teamMemberId.includes(item.id);
    if (!isMemberAdded) {
      setTeamMemberId([...teamMemberId, item.id]);
      setTeamMember([...teamMember, item]);
    }
  };

  const removeTeamMember = (id: number) => {
    const result = teamMember.filter((_, idx) => idx !== id);
    setTeamMember(result);
  };

  const handleSearch = () => {};

  const { data: searchResult, isLoading: fetching } = useQuery({
    queryKey: ["searchedUserList", searchParam],
    queryFn: () =>
      getSearchUsersList({
        query: searchParam,
      }),
    select: (response: any) => {
      return response?.data;
    },
  });

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const form = {
        filter: "selected_user",
        subject: subject,
        message: message,
        meta: {
          users_id: teamMemberId.filter((id): id is number => id !== undefined),
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
          <h1 className="text-lg md:text-2xl font-bold">Search User</h1>

          <h1 className="mb-2  lg:text-base ">
            Search a user to add to the email broadcast list
          </h1>

          <input
            value={userName}
            onChange={(e) => {
              handleSearch();
              setTeamMemberName(e.target.value);
              setsearchParam(e.target.value);
            }}
            placeholder="Search a user"
            className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
          />

          {searchParam?.length > 0 && (
            <div className="border max-h-40 overflow-y-auto">
              {searchResult?.length > 0 && (
                <ul className="space-y-2">
                  {searchResult?.map((item: UserData, idx: string) => {
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          addTeamMember(item);
                        }}
                        className="p-2 flex items-center hover:bg-slate-400"
                      >
                        {item?.profile?.picture ? (
                          <img
                            src={getApiMedia(item?.profile?.picture || "")}
                            className=" object-cover h-10 w-10 rounded-full mr-2 "
                            alt=""
                          />
                        ) : (
                          <div className="rounded-full border border-blue-500 w-10  h-10 flex justify-center items-center mr-2">
                            {item?.first_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {item.first_name} {item.last_name}
                      </li>
                    );
                  })}
                </ul>
              )}
              {searchResult?.length === 0 && (
                <div className="text-na_red text-center py-2">
                  No result found
                </div>
              )}
            </div>
          )}

          {teamMember.length > 0 && (
            <div className="border">
              <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
                {teamMember.map((item: UserData, idx: number) => {
                  return (
                    <li
                      key={idx}
                      className="p-1 text-xs flex  items-center bg-na_blue rounded-lg text-white"
                    >
                      <p>{item?.first_name}</p>{" "}
                      <div>
                        <img
                          onClick={() => {
                            removeTeamMember(idx);
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
        </div>
        <div className="mx-auto w-full max-w-lg ">
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-2">
                Send a Message to Selected Users on letivi
              </h2>
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

export default SelectedUsers;
