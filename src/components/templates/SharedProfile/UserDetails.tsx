import UserAwards from "@/components/organisms/SharedProfile/UserAwards";
import UserBiography from "@/components/organisms/SharedProfile/UserBiography";
import UserNominations from "@/components/organisms/SharedProfile/UserNominations";
import UserOrganizations from "@/components/organisms/SharedProfile/UserOrganisations";
import UserProjects from "@/components/organisms/SharedProfile/UserProjects";
import UserQualifications from "@/components/organisms/SharedProfile/UserQualifications";
import React from "react";

function UserDetails({ userData }: { userData: any }) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <UserBiography userData={userData?.data} />
      <UserOrganizations userData={userData?.data} />
      <UserAwards userData={userData?.data} />
      <UserNominations userData={userData?.data} />
      <UserQualifications userData={userData?.data} />
      <UserProjects userData={userData?.data} />
    </div>
  );
}

export default UserDetails;
