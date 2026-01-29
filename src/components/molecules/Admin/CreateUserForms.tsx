"use client";
import Loader from "@/components/atoms/Loader";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PrivacyField, SelectInput } from "../Fields";
import { getIndustries } from "@/services/signup";
import { useQuery } from "@tanstack/react-query";
import { IndustriesData } from "@/types/common";
import { createUser, sendInvite, validateUserEmail } from "@/services/admin";
import { toast } from "sonner";
import { usePermission } from "@/hooks/usePermission";
import AccessDeniedModal from "./shared/AcessDeniedModal";
import CountryDropdown from "../CountryDropdown";

function CreateUserForms() {
  const router = useRouter();
  const canCreateUser = usePermission("can_create_user");
  const initial_dob = {
    day: "",
    month: "",
    year: "",
  };

  const [getIndustry, setGetIndustry] = useState([]);
  const [industry_id, setIndustry] = useState(null);
  const [otherIndustry, setOtherIndustry] = useState<boolean | null>(null);
  const [otherIndustryData, setOtherIndustryData] = useState(null);
  const [email, setEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("Ghana (Gaana)");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [provider, setProvider] = useState("notion_africa");
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [invitingUser, setInvitingUser] = useState(false);
  const [dob, setDob] = useState(initial_dob);

  const {
    data: industries,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["Industry"],
    queryFn: async () => await getIndustries(),
  });

  function getYears(startYear: number) {
    var currentYear = new Date().getFullYear() - 13,
      years = [];
    startYear = startYear || 1920;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }

  const daysList = Array.from({ length: 31 }).map((_, index) =>
    (index + 1).toString()
  );
  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const verifyEmail = async (userEmail: string) => {
    try {
      const { data } = await validateUserEmail(userEmail);
      if (data?.message === "Email already taken. Use a different email") {
        setIsEmailExist(true);
        console.log("data", data);
      } else {
        setIsEmailExist(false);
      }
    } catch (error) {
      console.log("error", error);
      setIsEmailExist(true);
    }
  };

  const handleSendInvite = async () => {
    await verifyEmail(inviteEmail);

    if (!isEmailExist) return;
    setInvitingUser(true);
    try {
      const { data } = await sendInvite(inviteEmail);
      toast.success("Invite sent succesfully");
    } catch (error) {
      setInvitingUser(true);
      toast.error("Error sending invite");
    }
    setInvitingUser(false);
  };

  const handleRegisterUser = async () => {
    await verifyEmail(email);

    if (isEmailExist) return;
    setCreatingUser(true);

    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    const userData = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      date_of_birth: `${year}-${
        monthNumber >= 10 ? monthNumber : `0${monthNumber}`
      }-${parseInt(day) >= 10 ? day : `0${day}`}`,
      privacy: visibility,
      profession: profession,
      country: country,
      industry_id: !otherIndustry ? industry_id : "",
      other_industry: otherIndustry ? otherIndustryData : "",
      email: email,
      signup_mode: "email",
      meta: {},
    };

    try {
      const { data } = await createUser(userData);
      toast.success("User registered successfully");
      router.push("/admin/users");
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setCreatingUser(false);
    }
  };

  if (!canCreateUser) {
    return <AccessDeniedModal permission={"create a user account"} />;
  }
  return (
    <div className="grid md:grid-cols-7 gap-5">
      <div className="col-span-4">
        <div className="p-5 bg-white rounded-md">
          <h3 className="xl text-center font-semibold">Register a user</h3>
          <div className="mt-6">
            <div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="text-[#666666]">
                    First Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user first name"
                    value={first_name}
                    required
                    onChange={(e) => {
                      setFirst_name(e.target.value);
                    }}
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="text-[#666666]">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter user last name"
                    id="last_name"
                    value={last_name}
                    required
                    onChange={(e) => {
                      setLast_name(e.target.value);
                    }}
                    className="input"
                  />
                </div>
              </div>

              <label htmlFor="email" className="mt-4 text-[#666666]">
                {`User's`} email?
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter user email address"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
              />

              {error && <h1 className="text-red-500"> {message} </h1>}

              {otherIndustry ? (
                <div className="lg:col-span-5 col-span-12">
                  <label htmlFor="industry" className="text-[#666666]">
                    Other Industry*
                  </label>
                  <input
                    type="text"
                    placeholder="Type your industry"
                    id="industry"
                    onChange={(e: any) => {
                      setOtherIndustryData(e.target.value);
                    }}
                    className="input"
                  />
                </div>
              ) : (
                <div className="lg:col-span-5 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Industry*
                  </label>
                  <div className="relative">
                    <label
                      className="absolute z-[-1] top-6 right-4"
                      htmlFor="industry"
                      // required={otherIndustry ? true : false}
                      onChange={(e: any) =>
                        setOtherIndustryData(e.target.value)
                      }
                    >
                      <img
                        src={"/assets/Svg/dropdown_select.svg"}
                        alt=""
                        aria-label="dropdown-select"
                      />
                    </label>
                    <select
                      required
                      onChange={(e: any) => {
                        setIndustry(e.target.value);
                        if (e.target.value === "others") {
                          setOtherIndustry(true);
                        }
                      }}
                      name="industry"
                      id="industry"
                      className="input"
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
                </div>
              )}

              <div className="lg:col-span-7 col-span-12">
                <label htmlFor="profession" className="text-[#666666]">
                  Profession*
                </label>
                <input
                  type="text"
                  placeholder="Type user's Profession"
                  id="profession"
                  value={profession}
                  required
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}
                  className="input"
                />
              </div>
              <div className="grid grid-cols-12 lg:gap-10 items-center">
                <div className="lg:col-span-5 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Gender*
                  </label>
                  <div className="relative">
                    <div className="absolute z-[-1] top-6 right-4">
                      <img src={"/assets/Svg/dropdown_select.svg"} alt="" />
                    </div>
                    <select
                      required
                      onChange={(e) => setGender(e.target.value)}
                      name="profession"
                      id="profession"
                      className="input"
                      defaultValue={gender}
                    >
                      <option value="">-- Select --</option>
                      <option value="male"> Male </option>
                      <option value="female"> Female</option>
                      <option value="other"> Other </option>
                    </select>
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Country*
                  </label>
                  <div>
                    <CountryDropdown
                      id="user-country"
                      preferredCountries={["gh"]}
                      className="input mt-4"
                      value={country}
                      onChange={(value: React.SetStateAction<string>) =>
                        setCountry(value)
                      }
                    />
                    {/* <CountryDropdown
                      id="UNIQUE_ID"
                      className="input mt-4"
                      preferredCountries={["gh"]}
                      value=""
                      handleChange={(e: any) => setCountry(e.target.value)}
                    ></CountryDropdown> */}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-[#666666]">Date of birth*</label>
                <div className="grid gap-5 grid-cols-3">
                  <SelectInput
                    label=""
                    placeholder={"Day"}
                    options={daysList}
                    value={dob.day}
                    name={"day"}
                    onChange={(day) => setDay(day)}
                  />
                  <SelectInput
                    options={monthsList}
                    value={dob.month}
                    placeholder={"Month"}
                    name={"month"}
                    onChange={(month) => setMonth(month)}
                    label={""}
                  />
                  <SelectInput
                    label=""
                    options={getYears(1920).map(String)}
                    placeholder={"Year"}
                    value={dob.year}
                    name={"year"}
                    onChange={(year) => setYear(year)}
                  />
                </div>
              </div>

              <PrivacyField
                setVisibility={setVisibility}
                visibility={visibility}
              />
              <button
                className="bg-na_blue rounded-full p-4 mt-4 mb-16 w-full flex justify-center text-[#ffffff]"
                onClick={handleRegisterUser}
              >
                {creatingUser || loading ? <Loader /> : "Create User"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 ">
        <div className="p-5 bg-white rounded-md">
          <h3 className="xl text-center font-semibold">
            Send an invite to a non user
          </h3>
          <div className="mt-6">
            <label htmlFor="email" className="mt-4 text-[#666666]">
              {`User's`} email?*
            </label>
            <input
              type="email"
              value={inviteEmail}
              placeholder="Enter user email address"
              id="email"
              required
              onChange={(e) => {
                setInviteEmail(e.target.value);
              }}
              className="input"
            />

            {error && <h1 className="text-red-500"> {message} </h1>}

            <button
              className="bg-yellow-500 rounded-full p-4 mt-4 mb-16 w-full flex justify-center text-[#ffffff]"
              onClick={handleSendInvite}
            >
              {invitingUser || loading ? <Loader /> : "Send Invite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserForms;
