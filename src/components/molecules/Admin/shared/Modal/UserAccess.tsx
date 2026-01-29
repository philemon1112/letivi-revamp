"use client";
import Modal from "@/components/molecules/Modal";
import { AssignUserToRole, getSearchUsersList } from "@/services/admin";
import { UserData } from "@/types/admin";
import { UserRolesData } from "@/types/common";
import { getApiMedia } from "@/utils/getApiMedia";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const UserAccess = ({
  userRole,
  open,
  handleModal,
  refetchUserRoles,
}: {
  userRole: UserRolesData;
  open: boolean;
  handleModal: (open: boolean) => void;
  refetchUserRoles: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [searchParam, setsearchParam] = useState("");
  const [user, setTeamMemberId] = useState("");
  const [userName, setTeamMemberName] = useState("");

  const addTeamMember = (item: any) => {
    setTeamMemberId(item.id);
    setsearchParam(""); // we then clear the search results
    setTeamMemberName(item?.first_name + " " + item?.last_name);
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

  const handleAssignRole = async () => {
    setLoading(true);
    try {
      const form = {
        role_id: userRole?.id,
        user_id: user,
      };
      const { data } = await AssignUserToRole(form);
      toast.success("User assigned Successfully");
      setTeamMemberId("");
      setTeamMemberName("");
      refetchUserRoles;
      handleModal(false);
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={open}
      onAction={handleAssignRole}
      cancelButton={"Cancel"}
      actionButtonVariant="primary"
      actionButton={"Confirm"}
      actionLoading={loading}
      overlay="dark"
      onCloseAction={() => handleModal(false)}
    >
      <h1 className="text-center font-medium text-lg lg:text-2xl capitalize mb-4">
        Give User {userRole?.name} Access
      </h1>
      <div className="mx-auto">
        <h1 className="mb-2 lg:text-base ">Search User</h1>
        <input
          value={userName}
          onChange={(e) => {
            handleSearch();
            setTeamMemberName(e.target.value);
            setsearchParam(e.target.value);
          }}
          placeholder="Search a team member to add"
          name="industry"
          className="bg-transparent border p-4 text-gray-500 outline-none rounded-[10px] w-full mb-2"
        />
      </div>
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
            <div className="text-na_red text-center py-2">No result found</div>
          )}
        </div>
      )}
      <br />
    </Modal>
  );
};

export default UserAccess;
