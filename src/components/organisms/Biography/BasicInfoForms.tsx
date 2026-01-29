"use client";
import { Button } from "@/components/atoms/Button";
import CountryDropdown from "@/components/molecules/CountryDropdown";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { getIndustries } from "@/services/signup";
import { IndustriesData } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

function BasicInfoForm() {
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();
  const currentUser = useCurrentUser();
  const [basicInfo, setBasicInfo] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    date_of_birth: "",
    industry_id: "",
    other_industry: "",
    profession: "",
    phone: "",
    country: "",
    biography: "",
  });
  // Populate state when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setBasicInfo((prev) => ({
        ...prev,
        first_name: currentUser?.first_name || "",
        last_name: currentUser?.last_name || "",
        gender: currentUser?.gender || "male",
        date_of_birth: currentUser?.date_of_birth || "",
        industry_id: currentUser?.industry?.id || "",
        profession: currentUser?.profession?.profession || "",
        phone: currentUser?.profile?.phone_number || "",
        biography: currentUser?.profile?.bio || "",
        country: currentUser?.profile?.country || "",
      }));
    }
  }, [currentUser]);

  const {
    data: industries,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["Industry"],
    queryFn: async () => await getIndustries(),
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      linkedin: currentUser?.profession?.linkedin || "",
      facebook: currentUser?.profession?.facebook || "",
      twitter: currentUser?.profession?.twitter || "",
      instagram: currentUser?.profession?.instagram || "",
      youtube: currentUser?.profession?.youtube || "",
      website: currentUser?.profession?.website || "",
      tiktok: currentUser?.profession?.tiktok || "",
      ...basicInfo,
    });
  };

  // Calculate Age from date_of_birth
  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age > 0 ? `${age} yrs` : "0 yrs";
  };

  return (
    <div className=" px-2 md:px-4 bg-white py-4 md:py-10 my-4 rounded-xl">
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Personal Details
      </h2>

      <div className="my-1 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:p-4">
        {/* First Name */}
        <div>
          <div className="mb-2 flex justify-between items-center">
            <label
              htmlFor="firstname"
              className="lg:text-base text-sm text-gray-800 font-medium"
            >
              First Name
            </label>
          </div>
          <input
            name="first_name"
            onChange={handleChange}
            value={basicInfo?.first_name}
            className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
          />
        </div>
        <div>
          <div className="mb-2 w-full flex justify-between items-center">
            <label
              htmlFor="lastname"
              className="lg:text-base text-sm text-gray-800 font-medium"
            >
              Last Name
            </label>
          </div>
          <input
            name="last_name"
            onChange={handleChange}
            value={basicInfo?.last_name}
            className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
          />
        </div>
        {/* Gender */}
        <div>
          <div className="mb-2 w-full flex justify-between items-center">
            <label className="lg:text-base text-sm text-gray-800 font-medium">
              Gender
            </label>
          </div>
          <select
            name="gender"
            value={basicInfo.gender}
            onChange={handleChange}
            className="p-2 bg-gray-50 text-gray-600 w-full border rounded-lg outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth with Age Display */}
        <div>
          <label className="lg:text-base text-sm text-gray-800 font-medium">
            Date of Birth{" "}
            <span className="text-na_blue">
              ({calculateAge(basicInfo?.date_of_birth)})
            </span>{" "}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="date"
              name="date_of_birth"
              value={basicInfo.date_of_birth}
              onChange={handleChange}
              className="p-2 w-full bg-gray-100 border rounded-md outline-none"
            />
          </div>
        </div>

        {/* Industry */}
        <div>
          <div className=" w-full flex justify-between items-center">
            <label className="lg:text-base text-sm text-gray-800 font-medium">
              Industry
            </label>
          </div>
          <select
            value={basicInfo.industry_id}
            onChange={handleChange}
            name="industry"
            id="industry"
            className="p-2 bg-gray-50 text-gray-600 w-full rounded-lg  border outline-none"
          >
            <option value="">-- Select --</option>

            {industries?.map((item: IndustriesData) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
            <option value="others"> OTHER </option>
          </select>
        </div>

        {/* Profession */}
        <div>
          <div className="w-full">
            <label className="lg:text-base text-sm text-gray-800 font-medium">
              Profession
            </label>
          </div>
          <input
            type="text"
            name="profession"
            value={basicInfo.profession}
            onChange={handleChange}
            className="p-2 bg-gray-50 text-gray-600 w-full rounded-lg border outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <div className="w-full">
            <label className="lg:text-base text-sm text-gray-800 font-medium">
              Phone
            </label>
          </div>
          <input
            type="tel"
            name="phone"
            value={basicInfo.phone}
            onChange={handleChange}
            className="p-2 bg-gray-50 text-gray-600 w-full rounded-lg border outline-none"
          />
        </div>

        <div>
          <div className="w-full">
            <label className="lg:text-base text-sm text-gray-800 font-medium">
              Country
            </label>
          </div>
          <CountryDropdown
            id="UNIQUE_ID"
            preferredCountries={["us"]}
            value={basicInfo.country}
            className=""
            onChange={(country: string) =>
              setBasicInfo((prev) => ({ ...prev, country }))
            }
          />
        </div>

        {/* Biography */}
        <div className="lg:col-span-2 hidden">
          <label className="font-bold">Biography</label>
          <textarea
            name="biography"
            value={basicInfo.biography}
            onChange={handleChange}
            rows={5}
            className="p-2 bg-gray-50 text-gray-600 rounded-lg w-full border outline-none"
          />
        </div>
      </div>

      <div className="flex items-end lg:px-4">
        <Button
          variant="primary"
          size="lg"
          className="ml-auto"
          disabled={isUpdating}
          loading={isUpdating}
          onClick={handleSubmit}
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

export default BasicInfoForm;
