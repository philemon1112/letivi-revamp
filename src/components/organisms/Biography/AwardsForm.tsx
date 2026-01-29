"use client";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { fetchUserAwards, updateProfessionalInfo } from "@/services/biography";
import { Award, ProfessionalFormData } from "@/types/biography";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "sonner";

function AwardsForm() {
  const currentUser = useCurrentUser();
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: awardsData, refetch } = useQuery({
    queryKey: ["awardsList"],
    queryFn: async () => {
      if (!currentUser?.id) throw new Error("User ID is undefined");
      return await fetchUserAwards(currentUser.id);
    },
  });

  useEffect(() => {
    if (awardsData?.data) {
      setAwards(awardsData.data);
    }
  }, [awardsData]);

  const handleChange = (index: number, field: keyof Award, value: string) => {
    setAwards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddAward = () => {
    setAwards([
      ...awards,
      {
        award: "",
        country: "",
        id: 0,
        created_at: "",
        updated_at: "",
      },
    ]);
  };

  const handleRemoveAward = (index: number) => {
    setAwards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload: ProfessionalFormData = {
      awards,
      nominations: null,
      organizations: null,
      qualifications: null,
      work_experience: 0,
    };

    setLoading(true);
    const res = await updateProfessionalInfo(payload);
    if (res) {
      toast.success("Awards Updated Successfully");
      refetch();
    }
    setLoading(false);
  };

  return (
    <div className="px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Awards List
      </h2>
      {awards.length === 0 ? (
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
            You haven’t added any Awards yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Click the button below to add your first one.
          </p>
        </div>
      ) : (
        <>
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex justify-between border-b mb-2 items-end"
            >
              <div className="w-full pb-2 md:pb-4 grid grid-cols-2 gap-4 lg:p-4">
                <div className="w-full">
                  <label className="lg:text-base text-sm text-gray-800 font-medium">
                    Award
                  </label>
                  <input
                    value={award.award}
                    onChange={(e) =>
                      handleChange(index, "award", e.target.value)
                    }
                    className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                  />
                </div>
                <div className="w-full">
                  <label className="lg:text-base text-sm text-gray-800 font-medium">
                    Issuing Institution
                  </label>
                  <input
                    value={award.country}
                    onChange={(e) =>
                      handleChange(index, "country", e.target.value)
                    }
                    className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
                  />
                </div>
              </div>
              <Trash
                size={24}
                className="my-6 mx-4 cursor-pointer"
                onClick={() => handleRemoveAward(index)}
              />
            </div>
          ))}
        </>
      )}

      <div className="flex flex-col gap-y-2 sm:flex-row justify-between lg:px-4">
        <Button variant="secondary" size="lg" onClick={handleAddAward}>
          <IoAddCircle size={24} className="mr-2" /> Add Award
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

export default AwardsForm;
