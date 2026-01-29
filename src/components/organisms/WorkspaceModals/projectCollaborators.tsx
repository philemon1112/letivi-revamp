"use client";
import Modal from "@/components/molecules/Modal";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getSearchUsersList } from "@/services/admin";
import { filterUsers } from "@/services/professional";
import { addProjectCollaborators } from "@/services/workspaces";
import { UserData } from "@/types/admin";
import { WorkspaceData } from "@/types/common";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const ProjectCollaborators = ({
  project,
  open,
  handleModal,
  refetchProjects,
}: {
  project?: WorkspaceData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchProjects: () => void;
}) => {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [teamMemberId, setTeamMemberId] = useState([currentUser?.id]);
  const [teamMember, setTeamMember] = useState<UserData[]>([]);
  const [userName, setTeamMemberName] = useState("");
  const defaultImg = "/assets/Img/default.png";
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

  const { data: searchResult, isLoading: fetching } = useQuery({
    queryKey: ["filterUserList", searchParam],
    queryFn: () =>
      filterUsers({
        query: searchParam,
      }),
    select: (response: any) => {
      return response?.data;
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const validTeamMembers = teamMemberId.filter(
        (id) => id !== null && id !== undefined
      );
      const form = {
        project_id: project?.id,
        collaborators: validTeamMembers,
      };

      const res = await addProjectCollaborators(form);

      toast.success("Collaborators Added Successfully");

      refetchProjects();
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
      handleModal(false);
      setLoading(false);
      setSearchParam("");
      setTeamMemberId([currentUser?.id]); // Reset to only the current user
      setTeamMember([]);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleSubmit}
      cancelButton="Cancel"
      size="2xl"
      actionButton="Done"
      actionButtonVariant="primary"
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-xl capitalize mb-2">
        Add Collaborators
      </h1>

      <div>
        <input
          value={userName}
          onChange={(e) => {
            setTeamMemberName(e.target.value);
            setSearchParam(e.target.value);
          }}
          placeholder="Search a user to add as collaborator"
          className="bg-white border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-4"
        />

        {searchParam?.length > 0 && (
          <div className="border max-h-40 mb-3 overflow-y-auto">
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
                      {item?.picture ? (
                        <img
                          src={getApiMedia(item?.picture || "")}
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
          <div className="border my-2">
            <ul className="space-x-1 flex gap-y-2 flex-wrap p-2">
              {teamMember.map((item: UserData, idx: number) => {
                return (
                  <span
                    key={idx}
                    role="alert"
                    className="inline-flex items-center bg-gray-100 text-gray-700 border border-gray-500 text-xs font-medium mr-2 px-1.5 rounded-full py-1"
                  >
                    {item?.picture ? (
                      <img
                        src={getApiMedia(item?.picture)}
                        alt="Rounded avatar"
                        className="w-4 h-4 mr-1 rounded-full"
                      />
                    ) : (
                      <img
                        src={defaultImg}
                        alt="Rounded avatar"
                        className="w-4 h-4 mr-1 rounded-full"
                      />
                    )}
                    {item?.first_name}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        removeTeamMember(idx);
                      }}
                      className="inline-flex items-center p-0.5 ml-1 text-sm  bg-transparent rounded-full hover:bg-gray-200 "
                      data-dismiss="alert"
                    >
                      <img
                        src={"/assets/Svg/cancel.svg"}
                        alt=""
                        className="ml-1 h-5 w-5 cursor-pointer "
                      />
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProjectCollaborators;
