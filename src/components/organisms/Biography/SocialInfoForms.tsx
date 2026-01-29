"use client";
import { Button } from "@/components/atoms/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import React, { useState, useEffect } from "react";

function SocialInfoForm() {
  const currentUser = useCurrentUser();
  const { mutate: updateSocials, isPending } = useUpdateUserProfile();

  const [socialInfo, setSocialInfo] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    twitter: "",
    website: "",
    youtube: "",
  });

  // Populate state when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setSocialInfo({
        facebook: currentUser?.profession?.facebook || "",
        instagram: currentUser?.profession?.instagram || "",
        linkedin: currentUser?.profession?.linkedin || "",
        tiktok: currentUser?.profession?.tiktok || "",
        twitter: currentUser?.profession?.twitter || "",
        website: currentUser?.profession?.website || "",
        youtube: currentUser?.profession?.youtube || "",
      });
    }
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocials({
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      gender: currentUser?.gender || "male",
      date_of_birth: currentUser?.date_of_birth || "",
      industry_id: currentUser?.industry?.id || "",
      profession: currentUser?.profession?.profession || "",
      phone: currentUser?.profile?.phone_number || "",
      biography: currentUser?.profile?.bio || "",
      ...socialInfo,
      other_industry: currentUser?.other_industry || "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-2 md:px-4 bg-white py-4 md:py-8 my-3 md:my-4 rounded-xl"
    >
      <h2 className="font-bold text-na_blue sm:text-2xl text-lg lg:px-4">
        Social Links
      </h2>

      <div className="my-1 grid grid-cols-2 lg:grid-cols-3 gap-4 lg:p-4">
        {(Object.keys(socialInfo) as Array<keyof typeof socialInfo>).map(
          (key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="lg:text-base text-sm text-gray-800 font-medium capitalize"
              >
                {key}
              </label>
              <input
                id={key}
                name={key}
                onChange={handleChange}
                value={socialInfo[key]}
                className="p-2 text-gray-600 bg-gray-50 w-full border rounded-lg outline-none"
              />
            </div>
          )
        )}
      </div>

      <div className="flex items-end lg:px-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="ml-auto"
          loading={isPending}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default SocialInfoForm;
