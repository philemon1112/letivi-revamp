"use client";
import AwardsForm from "@/components/organisms/Biography/AwardsForm";
import BasicInfoForm from "@/components/organisms/Biography/BasicInfoForms";
import BioForms from "@/components/organisms/Biography/BioForms";
import NominationsForm from "@/components/organisms/Biography/NominationsForm";
import ProfessionalInfoForm from "@/components/organisms/Biography/ProfessionalInfoForm";
import ProjectsForm from "@/components/organisms/Biography/ProjectsForm";
import QualificationsForm from "@/components/organisms/Biography/QualificationsForm";
import SocialInfoForm from "@/components/organisms/Biography/SocialInfoForms";

function PersonalDetails() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <BioForms />
      <BasicInfoForm />
      <SocialInfoForm />
      <ProfessionalInfoForm />
      <AwardsForm />
      <NominationsForm />
      <QualificationsForm />
      <ProjectsForm />
    </div>
  );
}

export default PersonalDetails;
