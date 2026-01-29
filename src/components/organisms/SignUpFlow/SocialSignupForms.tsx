"use client";
import { Button } from "@/components/atoms/Button";
import AppLogo from "@/components/molecules/AppLogo";
import Stepper from "@/components/molecules/Stepper";
import { getIndustries, signupUser } from "@/services/signup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  monthsList,
  PrivacyField,
  SelectInput,
  SignupPolicy,
  daysList,
  getYears,
} from "@/components/molecules/Fields";
import CountryDropdown from "@/components/molecules/CountryDropdown";
import { toast } from "sonner";

function SocialSignupForms() {
  const router = useRouter();
  const initialState = {
    gender: "",
    profession: "",
    industry: "",
    other_industry: "",
    country: "Ghana",
    date_of_birth: "",
    privacy: false,
    signup_mode: null,
    // apple_auth_token: "",
    first_name: "",
    last_name: "",
    email: "",
    meta: {
      token: "",
    },
  };
  const initial_dob = {
    day: "",
    month: "",
    year: "",
  };
  const steps = ["Enter your email address", "Provide your basic info"];

  const [formData, setFormData] = useState(initialState);
  const [dob, setDob] = useState(initial_dob);
  const [loading, setLoading] = useState(false);

  const [otherIndustry, setOtherIndustry] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const {
    data: industries,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["Industry"],
    queryFn: async () => await getIndustries(),
  });

  // SIGN UP USER
  const {
    isPending: signupPending,
    isError,
    mutateAsync: signupUserMutation,
  } = useMutation({
    mutationFn: (data: any) => signupUser(data),
    onSuccess: () => {
      toast.success("Account created successfully");
      setLoading(false);
      router.push("/login");
    },
    onError: (error: any) => {
      if (
        error?.response.data?.status === 300 ||
        error?.response.data?.message?.toLowerCase() === "server error"
      ) {
        toast.success("Account created successfully");
        setLoading(false);
        router.push("/login");
      } else {
        console.log("error:", { error });
        toast.error(error?.response?.data?.message ?? "Signup Failed.");
      }
    },
  });

  const submitForms = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // router.push("/signup/step2");
    e.preventDefault();
    setLoading(true);
    const monthNumber = monthsList.indexOf(dob.month) + 1; // get equivalent month number using array index
    const login_provider = JSON.parse(
      localStorage.getItem("login_provider") || '""'
    );
    const user_access_token = JSON.parse(
      localStorage.getItem("user_access_token") || '""'
    );
    // const apple_user = JSON.parse(localStorage.getItem("apple_user") || "");

    formData.date_of_birth = `${dob.year}-${
      monthNumber >= 10 ? monthNumber : `0${monthNumber}`
    }-${
      parseInt(dob.day, 10) >= 10
        ? parseInt(dob.day, 10)
        : `0${parseInt(dob.day, 10)}`
    }`;
    formData.privacy = visibility;
    formData.signup_mode = login_provider;

    if (login_provider === "google") {
      formData.meta.token = user_access_token;
    } else if (login_provider === "apple") {
      // formData.apple_auth_token = apple_user.id_token;
      // formData.first_name = apple_user.first_name;
      // formData.last_name = apple_user.last_name;
      // formData.email = apple_user.email;
    }

    signupUserMutation(formData);
  };
  return (
    <div className="na_bg2 auth min-h-screen flex justify-center items-center p-4 lg:p-[115px] ">
      <div className="bg-white shadow-2xl  rounded-[20px] pt-6 lg:max-w-[1200px] w-full">
        <div className="w-full relative">
          <div className="absolute top-2 left-5">
            <button onClick={() => router.back()}>
              <img
                src={"/assets/Svg/left_arrow.svg"}
                alt="back_arrow"
                className="lg:h-10 lg:w-10 w-8 h-8 "
              />
            </button>
          </div>
          <center className="mb-5">
            <AppLogo responsive={false} image={false} />
          </center>
        </div>
        <div className="lg:px-[200px] px-5">
          <Stepper steps={steps} step={1} />

          <div className="mt-4">
            <form onSubmit={submitForms}>
              {/* INDUSTRY */}
              <div className="grid grid-cols-12 lg:lg:gap-10 items-center">
                {otherIndustry ? (
                  <div className="lg:col-span-5 col-span-12">
                    <label htmlFor="industry" className="text-[#666666]">
                      Other Industry*
                    </label>
                    <input
                      type="text"
                      placeholder="Type your industry"
                      id="industry"
                      required
                      onChange={(e: any) => {
                        setFormData({
                          ...formData,
                          industry: e.target.value,
                        });
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
                        onChange={(e: any) => {
                          setFormData({
                            ...formData,
                            other_industry: e.target.value,
                          });
                        }}
                      >
                        <img
                          src={"/assets/Svg/dropdown_select.svg"}
                          alt=""
                          aria-label="dropdown-select"
                        />
                      </label>
                      <select
                        required
                        onChange={(e) => {
                          if (e.target.value === "others") {
                            setOtherIndustry(true);
                            setFormData({ ...formData, industry: "" });
                          } else {
                            setFormData({
                              ...formData,
                              industry: e.target.value,
                            });
                          }
                        }}
                        name="industry"
                        id="industry"
                        className="input"
                      >
                        <option value="">-- Select --</option>

                        {industries?.map((item: any) => {
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

                {/* PROFESSION */}
                <div className="lg:col-span-7 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Profession*
                  </label>
                  <input
                    type="text"
                    placeholder="Type your Profession"
                    id="profession"
                    value={formData.profession}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, profession: e.target.value });
                    }}
                    className="input"
                  />
                </div>
              </div>

              {/* GENDER AND COUNTRY */}
              <div className="grid grid-cols-12 lg:gap-10 items-center">
                {/* GENDER */}
                <div className="lg:col-span-5 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Gender*
                  </label>
                  <div className="relative">
                    <div className="absolute z-[-1] top-6 right-4">
                      <img
                        src={"/assets/Svg/dropdown_select.svg"}
                        alt=""
                        aria-label="dropdown select"
                      />
                    </div>
                    <select
                      // placeholder={"Day"}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      name="profession"
                      id="profession"
                      className="input"
                      defaultValue={formData.gender}
                    >
                      <option value="">-- Select --</option>
                      <option value="male"> Male </option>
                      <option value="female"> Female</option>
                      <option value="other"> Other </option>
                    </select>
                  </div>
                </div>

                {/* COUNTRY */}
                <div className="lg:col-span-7 col-span-12">
                  <label htmlFor="profession" className="text-[#666666]">
                    Country*
                  </label>
                  <div>
                    <CountryDropdown
                      id="UNIQUE_ID"
                      inputClass="input"
                      preferredCountries={["gh"]}
                      value=""
                      onChange={(value: string) =>
                        setFormData({
                          ...formData,
                          country: value,
                        })
                      }
                    ></CountryDropdown>
                  </div>
                </div>
              </div>

              {/* DATE OF BIRTH */}
              <div className="mt-4">
                <label className="text-[#666666]">Date of birth*</label>
                <div className="grid gap-5 grid-cols-3">
                  <SelectInput
                    placeholder={"Day"}
                    options={daysList}
                    value={dob.day}
                    name={"day"}
                    onChange={(day) => setDob({ ...dob, day })}
                    label={""}
                  />
                  <SelectInput
                    options={monthsList}
                    value={dob.month}
                    placeholder={"Month"}
                    name={"month"}
                    onChange={(month) => setDob({ ...dob, month })}
                    label={""}
                  />
                  <SelectInput
                    options={getYears(1920)}
                    placeholder={"Year"}
                    value={dob.year}
                    name={"year"}
                    onChange={(year) => setDob({ ...dob, year })}
                    label={""}
                  />
                </div>

                <PrivacyField
                  setVisibility={setVisibility}
                  visibility={visibility}
                />
              </div>

              <Button
                variant="primary"
                size="2xl"
                className="bg-na_blue rounded-full flex justify-center p-4 mt-4 mb-16 w-full text-[#ffffff]"
                type="submit"
                loading={signupPending}
                disabled={signupPending}
                // loading={loading}
              >
                {/* {t("common:contact_us")} */}
                Next
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialSignupForms;
