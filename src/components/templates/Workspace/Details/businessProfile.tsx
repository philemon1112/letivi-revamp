"use client";
import { Button } from "@/components/atoms/Button";
import Share from "@/components/molecules/Share";
import SocialHandles from "@/components/molecules/SocialHandles";
import BusinessForm from "@/components/organisms/WorkspaceModals/businessForm";
import ConfirmDelete from "@/components/organisms/WorkspaceModals/confirmDelete";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteBusinessWorkspace } from "@/services/workspaces";
import { WorkspaceData } from "@/types/common";
import { useRouter } from "next/navigation";
import { getApiMedia } from "@/utils/getApiMedia";
import React, { useState } from "react";
import { toast } from "sonner";
import { getCountryNameById } from "@/utils/constants";
import { useWorkspaceEndorse } from "@/hooks/useWorkspaceEndorse";

function BusinessProfile({
  businessData,
  refetchBusinesses,
  type,
}: {
  businessData: WorkspaceData | null;
  refetchBusinesses: () => void;
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
    workspaceId: businessData?.id?.toString() ?? "",
    type: "business",
    initialFollowState: businessData?.is_endorsed ?? false,
    initialFollowersCount: businessData?.total_followings || 0,
  });

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (businessData?.id !== undefined) {
        const res = await deleteBusinessWorkspace(businessData.id);
      } else {
        throw new Error("Organisation is undefined");
      }
      handleCloseModal();
      toast.success("Organisation Deleted Successfully");
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
      <BusinessForm
        open={showForms}
        handleModal={handleCloseModal}
        business={businessData}
        refetchBusinesses={refetchBusinesses}
      />

      <ConfirmDelete
        name={`${businessData?.name?.toLowerCase()} organisation`}
        open={showDelete}
        handleModal={(open: boolean) => setShowDelete(open)}
        handleDelete={handleDelete}
        loading={loading}
      />
      <div className="bg-white shadow rounded-[20px] mx-1.5 py-8 px-3">
        <div className="group relative mb-2 block h-60 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
          <img
            src={
              businessData?.business_profile?.logo
                ? getApiMedia(businessData?.business_profile?.logo)
                : defaultImg
            }
            alt="profile_image"
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
        </div>

        <div className="text-center">
          <div className="">
            <h2 className="title text-xl md:text-2xl font-bold">
              {businessData?.name}
            </h2>
            <p className="tagline font-semibold text-base md:text-lg capitalize">
              {businessData?.tagline || businessData?.specialize}
            </p>
            <p className="flex items-center justify-center space-x-2 mt-0.5">
              <p className="font-medium text-gray-500 mx-1 truncate">
                {businessData?.industry?.name || businessData?.other_industry}
              </p>
              |
              <p className="ml-1 font-medium text-gray-500 truncate">
                {businessData?.country?.length === 2
                  ? getCountryNameById(businessData?.country?.toLowerCase())
                  : businessData?.country}
              </p>
            </p>

            <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {(businessData?.total_images ?? 0) +
                    (businessData?.total_video ?? 0)}
                </h1>
                <p className="text-gray-400 text-xs"> Media</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold lg:text-2xl ">
                  {businessData?.total_posts || 0}
                </h1>
                <p className="text-gray-400 text-xs"> Posts</p>
              </div>
            </div>

            <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
              {type === "shared" &&
                currentUser?.id !== businessData?.user?.id && (
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
            {currentUser?.id === businessData?.user?.id && (
              <div className="mt-5 justify-center  mx-auto flex items-center gap-4">
                <Button
                  onClick={() => {
                    setShowForms(true);
                  }}
                  variant="primary"
                  size="lg"
                >
                  Edit Organisation
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
                url={businessData?.slug || ""}
                header={`Send Invite via`}
                text={"Or invite with link"}
              />
            )}
          </div>
          <SocialHandles searchedUser={businessData?.business_profile} />
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
