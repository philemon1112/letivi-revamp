"use client";

import React, { useState } from "react";
import RegStep1 from "./RegStep1";
import AppLogo from "@/components/molecules/AppLogo";
import { useRouter } from "next/navigation";
import RegStep2 from "./RegStep2";
import RegStep3 from "./RegStep3";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signupUser, getIndustries } from "@/services/signup";
import { monthsList } from "@/components/molecules/Fields";
import SuccessReg from "./SuccessReg";

const SignUpFlow = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [index, setIndex] = useState(0);
  const [getIndustry, setGetIndustry] = useState([]);
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("Ghana (Gaana)");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [provider, setProvider] = useState("notion_africa");
  const [sub, setSub] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otherIndustry, setOtherIndustry] = useState(false);
  const [otherIndustryData, setOtherIndustryData] = useState("");
  const [invite, setInviteLink] = useState(false);
  const isDefaultProvider = provider === "notion_africa";

  // FETCH INDUSTRIES
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
      // nextPageHandler();
      setIndex(3);
      setShowSuccess(true);
      console.log("Account created successfully");
    },
  });

  const steps = [
    "Enter your email address",
    "Provide your basic info",
    "Create your password",
  ];

  const previousPageHandler = () => {
    if (index === 0) {
      router.push("/");
      return;
    }
    setIndex(index - 1);
  };

  const nextPageHandler = () => {
    // if (index === 1 && !isDefaultProvider) {
    //   return register();
    // }
    setIndex(index + 1);
  };

  const register = () => {
    const monthNumber = monthsList.indexOf(month) + 1;

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
      industry_id: !otherIndustry ? industry : null,
      other_industry: otherIndustry ? otherIndustryData : "",
      email: email,
      signup_mode: "email",
      meta: {
        password: "",
        confirm_password: "",
      },
    };

    if (isDefaultProvider) {
      userData.meta.password = password;
      userData.meta.confirm_password = password;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));

    signupUserMutation(userData);
  };

  return (
    <div className="bg-gray-100 na_bg2 auth min-h-screen flex justify-center items-center p-4 lg:p-[115px] ">
      <div className="bg-white shadow-2xl  rounded-[20px] pt-6 lg:max-w-[1200px] w-full">
        <div className="w-full relative">
          <div className="absolute top-2 left-5">
            <button onClick={previousPageHandler}>
              {index !== 3 && (
                <img
                  src={"/assets/Svg/left_arrow.svg"}
                  alt="back_arrow"
                  className="lg:h-10 lg:w-10 w-8 h-8 "
                />
              )}
            </button>
          </div>
          <center className="mb-5">
            <AppLogo responsive={false} image={false} />
          </center>
        </div>
        <div className="px-5">
          {index === 0 && (
            <RegStep1
              steps={steps}
              step={index}
              nextPageHandler={nextPageHandler}
              setEmail={setEmail}
              setFirst_name={setFirst_name}
              setLast_name={setLast_name}
              email={email}
              first_name={first_name}
              last_name={last_name}
              setProvider={setProvider}
              setSub={setSub}
              index={0}
            />
          )}
          {index === 1 && (
            <RegStep2
              isDefaultProvider={isDefaultProvider}
              loading={loading}
              steps={steps}
              step={index}
              nextPageHandler={nextPageHandler}
              getIndustry={industries}
              setIndustry={setIndustry}
              setProfession={setProfession}
              setGender={setGender}
              setCountry={setCountry}
              setDob={setDob}
              setMarital_status={setMarital_status}
              setOtherIndustry={setOtherIndustry}
              otherIndustry={otherIndustry}
              industry={industry}
              day={day}
              month={month}
              year={year}
              setYear={setYear}
              setMonth={setMonth}
              setDay={setDay}
              marital_status={marital_status}
              profession={profession}
              gender={gender}
              setVisibility={setVisibility}
              visibility={visibility}
              setOtherIndustryData={function (data: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {index === 2 && (
            <RegStep3
              steps={steps}
              step={index}
              nextPageHandler={nextPageHandler}
              setVisibility={setVisibility}
              setPassword={setPassword}
              register={register}
              password={password}
              loading={signupPending}
              visibility={visibility}
            />
          )}
          {showSuccess && (
            <SuccessReg
              name={first_name}
              email={email}
              isDefaultProvider={isDefaultProvider}
              provider={provider}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpFlow;
