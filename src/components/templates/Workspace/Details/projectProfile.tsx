"use client";
import { Button } from "@/components/atoms/Button";
import Share from "@/components/molecules/Share";
import SocialHandles from "@/components/molecules/SocialHandles";
import ConfirmDelete from "@/components/organisms/WorkspaceModals/confirmDelete";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteProjectWorkspace } from "@/services/workspaces";
import { WorkspaceData } from "@/types/common";
import { useRouter } from "next/navigation";
import { getApiMedia } from "@/utils/getApiMedia";
import React, { useState } from "react";
import { toast } from "sonner";
import ProjectForm from "@/components/organisms/WorkspaceModals/projectForm";
import { getCountryNameById } from "@/utils/constants";
import { useWorkspaceEndorse } from "@/hooks/useWorkspaceEndorse";

function ProjectProfile({
  projectData,
  refetchProjects,
  type,
}: {
  projectData: WorkspaceData | null;
  refetchProjects: () => void;
  type: string;
}) {
  const defaultImg = "/assets/Img/default.png";
  const router = useRouter();
  const [share, setShare] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setShowForms(false);
    setShowDelete(false);
  };

  const currentUser = useCurrentUser();
  const {
    isFollowing,
    followersCount,
    isLoading: isFollowLoading,
    handleFollowToggle,
  } = useWorkspaceEndorse({
    workspaceId: projectData?.id.toString() ?? "",
    type: "project",
    initialFollowState: projectData?.is_endorsed || false,
    initialFollowersCount: projectData?.total_followings || 0,
  });

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (projectData?.id !== undefined) {
        const res = await deleteProjectWorkspace(projectData.id);
      } else {
        throw new Error("Project is undefined");
      }
      handleCloseModal();
      toast.success("Project Deleted Successfully");
      router.push("/profile/workspace");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProjectForm
        open={showForms}
        handleModal={handleCloseModal}
        project={projectData}
        refetchProjects={refetchProjects}
      />

      <ConfirmDelete
        name={`${projectData?.name?.toLowerCase()} project`}
        open={showDelete}
        handleModal={(open: boolean) => setShowDelete(open)}
        handleDelete={handleDelete}
        loading={loading}
      />
      <div className="bg-white shadow rounded-[20px] mx-1.5 py-8 px-3">
        <div className="group relative mb-2 block h-60 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
          <img
            src={
              projectData?.project_profile?.logo
                ? getApiMedia(projectData?.project_profile?.logo)
                : defaultImg
            }
            alt="profile_image"
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
        </div>

        <div className="text-center">
          <div className="">
            <h2 className="title text-xl md:text-2xl font-bold">
              {projectData?.name}
            </h2>
            <p className="tagline font-semibold text-base md:text-lg capitalize">
              {projectData?.tagline || projectData?.specialize}
            </p>
            <p className="flex items-center justify-center mt-0.5 space-x-2">
              <p className="font-medium text-gray-500 mx-1 truncate">
                {projectData?.industry?.name || projectData?.other_industry}
              </p>
              |
              <p className="ml-1 font-medium text-gray-500 truncate">
                {projectData?.country?.length === 2
                  ? getCountryNameById(projectData?.country?.toLowerCase())
                  : projectData?.country}{" "}
              </p>
            </p>

            <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {(projectData?.total_images ?? 0) +
                    (projectData?.total_video ?? 0)}
                </h1>
                <p className="text-gray-400 text-xs"> Media</p>
              </div>

              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {projectData?.total_posts || 0}
                </h1>
                <p className="text-gray-400 text-xs"> Posts</p>
              </div>
            </div>

            <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
              {type === "shared" &&
                currentUser?.id !== projectData?.user?.id && (
                  <Button
                    variant={isFollowing ? "tertiary" : "primary"}
                    size="lg"
                    onClick={handleFollowToggle}
                    disabled={isFollowLoading}
                    loading={isFollowLoading}
                  >
                    {isFollowLoading
                      ? isFollowing
                        ? "Unfollowing..."
                        : "Following..."
                      : isFollowing
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                )}

              <Button
                onClick={() => {
                  setShare(!share);
                }}
                variant="warning"
                outlined
                size="lg"
              >
                Share Profile
              </Button>
            </div>
            {currentUser?.id === projectData?.user?.id && (
              <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
                <Button
                  onClick={() => {
                    setShowForms(true);
                  }}
                  variant="primary"
                  size="lg"
                >
                  Edit project
                </Button>
                <Button
                  onClick={() => {
                    setShowDelete(true);
                  }}
                  variant="danger"
                  outlined
                  size="lg"
                >
                  Delete
                </Button>
              </div>
            )}

            {share && (
              <Share
                handleModal={() => {
                  setShare(!share);
                }}
                url={projectData?.slug || ""}
                header={`Send Invite via`}
                text={"Or invite with link"}
              />
            )}
          </div>
          <SocialHandles searchedUser={projectData?.project_profile} />
        </div>
      </div>
    </div>
  );
}

export default ProjectProfile;
