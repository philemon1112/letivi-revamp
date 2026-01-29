"use client";
import {
  getProjectDetails,
  removeProjectCollaborator,
} from "@/services/workspaces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import BaseTemplate from "../../BaseTemplate";
import Skeleton from "@/components/atoms/Skeleton";
import { getApiMedia } from "@/utils/getApiMedia";
import SocialHandles from "@/components/molecules/SocialHandles";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/atoms/Button";
import { toast } from "sonner";
import WorkspaceLoadingTemplate from "../loadingTemplate";
import ProjectGallery from "./projectGallery";
import ProjectAlbumList from "./projectAlbums";
import ProjectCollaborators from "@/components/organisms/WorkspaceModals/projectCollaborators";
import ProjectProfile from "./projectProfile";
import TruncatedDescription from "@/components/molecules/TruncatedDescription";
import Link from "next/link";
import ConfirmDeleteCollaborator from "@/components/organisms/WorkspaceModals/confirmDeleteCollaborator";
import { getCountryNameById } from "@/utils/constants";

interface ProjectDetailsProps {
  params: {
    id: string;
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ params }) => {
  // component logic
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<{
    first_name?: string;
    id?: number;
  } | null>(null);
  const [index, setIndex] = React.useState(1);
  const [showForms, setShowForms] = useState(false);
  const [loading, setLoading] = useState(false);
  const projectId = params?.id;
  const defaultImg = "/assets/Img/default.png";

  const currentUser = useCurrentUser();

  const handleCloseModal = () => {
    setShowForms(false);
  };

  console.log("Project ID:", projectId);
  const {
    data: project,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["ProjectDetails", projectId],
    queryFn: () => {
      return getProjectDetails(projectId);
    },
    select: (response) => {
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });

  const removeMember = async (id: number) => {
    const payload = {
      collaborator_user_id: id,
      project_id: projectId,
    };

    setLoading(true);
    try {
      removeProjectCollaborator(payload);
      setLoading(false);
      toast.success("Collaborator removed successfully");
      setShowDelete(false);
      handleCloseModal();
      await refetch();
    } catch (error) {
      toast.error("An error occurred, try again later");
      setLoading(false);
    }
  };

  return (
    <BaseTemplate withFooter={false}>
      <ProjectCollaborators
        open={showForms}
        handleModal={handleCloseModal}
        project={project}
        refetchProjects={refetch}
      />
      <ConfirmDeleteCollaborator
        name={`${selectedCollaborator?.first_name?.toLowerCase()}`}
        open={showDelete}
        handleModal={handleCloseModal}
        handleDelete={() =>
          selectedCollaborator?.id && removeMember(selectedCollaborator.id)
        }
        loading={loading}
      />
      {isLoading ? (
        <WorkspaceLoadingTemplate />
      ) : (
        <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto hide-scrollbar">
          <div className="max-w-screen-2xl mx-auto px-2 md:px-4">
            <div className="bg-white p-2 flex items-center rounded-2xl mb-2 flex-wrap overflow-x-auto no-scrollbar">
              <nav aria-label="breadcrumb">
                <ol className="flex leading-none text-blue-500 divide-x">
                  <li className="pr-4">
                    <Link
                      href="/feed"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </Link>
                  </li>

                  <li
                    className="inline-flex items-center px-4 text-gray-700"
                    aria-current="page"
                  >
                    <Link
                      href="/profile/workspace?tab=projects"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                    >
                      Workspaces
                    </Link>
                  </li>

                  <li
                    className="inline-flex items-center px-4 text-gray-700"
                    aria-current="page"
                  >
                    <a className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 truncate">
                      {project?.name}
                    </a>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-start md:gap-8">
              <div className="md:col-span-1">
                <ProjectProfile
                  projectData={project || null}
                  refetchProjects={refetch}
                  type={""}
                />
              </div>

              <div className="md:col-span-3">
                <div className="mx-auto max-w-screen-xl">
                  <div className=" px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
                    <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
                      About
                    </h2>
                    <p className="lg:px-4">
                      <TruncatedDescription
                        maxLength={350}
                        description={project?.description ?? ""}
                      />
                    </p>
                  </div>
                </div>

                <div className="mx-auto max-w-screen-xl bg-white !rounded-xl overflow-x-auto mt-5 no-scrollbar">
                  <div className="main flex mx-2 lg:px-4 my-2 rounded-t-xl  gap-4">
                    <button
                      onClick={() => setIndex(1)}
                      className={`${
                        index === 1 && "bg-na_yellow"
                      } px-4 py-2  rounded-md text-sm lg:text-[20px]  font-medium`}
                    >
                      Gallery
                    </button>

                    <button
                      onClick={() => setIndex(2)}
                      className={`${
                        index === 2 && "bg-na_yellow"
                      } px-4 py-2 rounded-md text-sm lg:text-[20px] font-medium`}
                    >
                      Album
                    </button>
                  </div>

                  {index === 1 && (
                    <ProjectGallery projectId={projectId} type={""} />
                  )}
                  {index === 2 && <ProjectAlbumList projectId={projectId} />}
                </div>

                <div className="mx-auto max-w-screen-xl">
                  <div className=" px-2 md:px-4 bg-white py-4 md:py-6 my-4 rounded-xl">
                    <div className="flex justify-between items-center align-bottom">
                      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
                        Collaborators
                      </h2>
                      {project?.user?.id === currentUser?.id && (
                        <Button
                          variant="danger"
                          outlined
                          size="lg"
                          onClick={() => setShowForms(true)}
                        >
                          Add Collaborators
                        </Button>
                      )}
                    </div>
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        {project?.collaborators?.length ? (
                          <div className="grid grid-cols-1 gap-8 mt-4 xl:mt-6 md:grid-cols-2 xl:grid-cols-3">
                            {project?.collaborators.map((user, index) => (
                              <div
                                key={index}
                                className={`flex relative flex-col items-center p-6 md:p-8 transition-colors duration-300 transform ${
                                  user?.id === project?.user?.id
                                    ? "border border-yellow-600 hover:bg-na_yellow"
                                    : "border hover:bg-na_red"
                                } cursor-pointer rounded-xl hover:border-transparent group  dark:border-gray-700 dark:hover:border-transparent`}
                              >
                                {currentUser?.id === project?.user?.id &&
                                  user?.id !== project?.user?.id && (
                                    <div
                                      onClick={() => {
                                        setSelectedCollaborator(user);
                                        setShowDelete(true);
                                      }}
                                      className="absolute right-3 top-2 h-10 w-10 cursor-pointer group-hover:text-white text-na_red hover:animate-bounce"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  )}

                                <img
                                  className="object-cover w-16 h-16 md:w-32 md:h-32 rounded-full ring-4 ring-gray-300"
                                  src={
                                    user?.profile?.picture
                                      ? getApiMedia(user?.profile?.picture)
                                      : defaultImg
                                  }
                                  alt="user profile"
                                />

                                <h1 className="mt-4 text-sm md:text-xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                                  {user?.first_name} {user?.last_name}
                                </h1>
                                <p className="text-gray-400 justify-center text-center">
                                  {user?.profession?.profession || ""} |
                                  <span className="ml-1">
                                    {user?.profile?.country?.length === 2
                                      ? getCountryNameById(
                                          user?.profile?.country?.toLowerCase(),
                                        )
                                      : user?.profile?.country}
                                  </span>
                                </p>

                                <SocialHandles
                                  searchedUser={user?.profession}
                                />
                                {user?.id === project?.user?.id && (
                                  <p className="text-xs md:text-sm text-gray-900 mt-1 dark:text-gray-300">
                                    Admin
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>No Collaborators addded yet</>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseTemplate>
  );
};

export default ProjectDetails;
