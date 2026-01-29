"use client";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  fetchUserOrganizations,
  updateProfessionalInfo,
} from "@/services/biography";
import { Organization, ProfessionalFormData } from "@/types/biography";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "sonner";

function ProfessionalInfoForm() {
  const currentUser = useCurrentUser();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: organisationData, refetch } = useQuery({
    queryKey: ["OrganizationList"],
    queryFn: async () => {
      if (currentUser?.id === undefined) {
        throw new Error("User ID is undefined");
      }
      return await fetchUserOrganizations(currentUser.id);
    },
  });

  useEffect(() => {
    if (organisationData?.data) {
      setOrganizations(organisationData.data);
    }
  }, [organisationData]);

  const handleChange = (
    index: number,
    field: keyof Organization,
    value: string
  ) => {
    setOrganizations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddOrganization = () => {
    setOrganizations([
      ...organizations,
      {
        organization: "",
        role: "",
        country: "",
        work_experience: "",
        id: 0,
        created_at: "",
        updated_at: "",
      },
    ]);
  };

  const handleRemoveOrganization = (index: number) => {
    setOrganizations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload: ProfessionalFormData = {
      organizations,
      awards: null,
      nominations: null,
      qualifications: null,
      work_experience: 0,
    };

    setLoading(true);
    const res = await updateProfessionalInfo(payload);
    if (res) {
      toast.success("Organisational Info Updated");
      refetch();
    }
    setLoading(false);
  };

  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Organisational Details
      </h2>
      {organizations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>

          <p className="text-sm sm:text-base">
            You haven’t added any Organisations yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Click the button below to add your first one.
          </p>
        </div>
      ) : (
        organizations.map((org, index) => (
          <div
            key={index}
            className="flex justify-between border-b mb-2 items-start"
          >
            <div className="pb-2 md:pb-4 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:p-4">
              <div className="lg:col-span-3">
                <label className="lg:text-base text-sm text-gray-800 font-medium">
                  Organisation
                </label>
                <input
                  value={org.organization}
                  onChange={(e) =>
                    handleChange(index, "organization", e.target.value)
                  }
                  className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                />
              </div>
              <div className="w-full">
                <label className="lg:text-base text-sm text-gray-800 font-medium">
                  Role
                </label>
                <input
                  value={org.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                  className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="lg:text-base text-sm text-gray-800 font-medium">
                  Country
                </label>
                <input
                  value={org.country}
                  onChange={(e) =>
                    handleChange(index, "country", e.target.value)
                  }
                  className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="lg:text-base text-sm text-gray-800 font-medium">
                  Work <span className="inline sm:hidden">Exp (years)</span>{" "}
                  <span className="hidden sm:inline">Experience (years)</span>
                </label>
                <input
                  value={org.work_experience}
                  onChange={(e) =>
                    handleChange(index, "work_experience", e.target.value)
                  }
                  className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                />
              </div>
            </div>
            <Trash
              size={24}
              className="my-6 mx-4 cursor-pointer hidden sm:inline"
              onClick={() => handleRemoveOrganization(index)}
            />
            <Trash
              size={44}
              className="my-6 mx-4 cursor-pointer inline sm:hidden"
              onClick={() => handleRemoveOrganization(index)}
            />
          </div>
        ))
      )}

      <div className="flex flex-col gap-y-2 sm:flex-row justify-between lg:px-4">
        <Button variant="secondary" size="lg" onClick={handleAddOrganization}>
          <IoAddCircle size={24} className="mr-2" /> Add Organisation
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="ml-auto"
          onClick={handleSubmit}
          loading={loading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default ProfessionalInfoForm;
