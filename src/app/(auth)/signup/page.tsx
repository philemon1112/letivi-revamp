"use client";

import React, { useState } from "react";
import axios from "axios";
import RegStep1 from "./components/Reg_Step1";
import RegStep2 from "./components/Reg_Step2";
import RegStep3 from "./components/Reg_Step3";
import { endpoints as apiEndpoints } from "../../../utils/endpoints";
import SignUpFlow from "@/components/organisms/SignUpFlow";
import left_arrow from "../../../../public/assets/Svg/left_arrow.svg";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import SwipeableViews from "react-swipeable-views";
// import axios from "../../../../services/axios-utils";
import { useEffect } from "react";
import SuccessReg from "./components/SuccessReg";
// import { Center, Box } from "@chakra-ui/react";
import { monthsList } from "./components/Fields";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AppLogo from "@/components/molecules/AppLogo";
import { toast } from "sonner";
// import axios from "../../../../utils/axios";

const endpoints = {
  google: "/social_auth/signup_with_google/",
  notion_africa: apiEndpoints.register,
};

const steps = [
  "Enter your email address",
  "Provide your basic info",
  "Create your password",
];

export default function Signup() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [index, setIndex] = useState(0);
  const [getIndustry, setGetIndustry] = useState([]);
  const [industry, setIndustry] = useState(null);
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
  const [dob, setDob] = useState(null);
  const [marital_status, setMarital_status] = useState("");
  const [provider, setProvider] = useState("notion_africa");
  const [sub, setSub] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otherIndustry, setOtherIndustry] = useState(false);
  const [otherIndustryData, setOtherIndustryData] = useState("");
  const [invite, setInviteLink] = useState(false);
  // const { inviteLink } = useSelector((state) => {
  //   return state.explore;
  // });
  const isDefaultProvider = provider === "notion_africa";

  const fetchIndustry = () => {
    axios
      .get("/industries/all")
      .then((res) => {
        setGetIndustry(res?.data?.data?.industries);
      })
      .catch((err) => {});
  };

  const apiKey = "letivi-2023-v1";
  const apiUrl = "https://api.staging.letivi.com/api/v1/users/signup";
  const apiSecret = "s0meR3ndomP@$$Word";

  const register = () => {
    setLoading(true);
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

    // .post(endpoints[provider], formData)
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`, userData, {
        headers: {
          "x-api-key": apiKey,
          "x-api-secret": apiSecret,
        },
      })
      .then((res) => {
        setLoading(false);
        // dispatch({ type: "GET_INVITE_LINK", payload: "" });
        setShowSuccess(true);
        setIndex(3);
      })
      .catch((err) => {
        if (err.response.status === 300) {
          // Redirect to new page
          setLoading(false);
          // dispatch({ type: "GET_INVITE_LINK", payload: "" });
          setShowSuccess(true);
          setIndex(3);
        } else {
          // Handle other errors
          setLoading(false);
          toast.error(err.response.data.message ?? "signup failed.");
        }
      });
  };

  // const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const link = queryParams.get("invite-link") || "";
    // dispatch({ type: "GET_INVITE_LINK", payload: link || "" });
    // setInviteLink(link || inviteLink);
    fetchIndustry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previousPageHandler = () => {
    if (index === 0) {
      router.push("/");
      return;
    }
    setIndex(index - 1);
  };
  const nextPageHandler = () => {
    if (index === 1 && !isDefaultProvider) {
      return register();
    }
    setIndex(index + 1);
  };

  return (
    <SignUpFlow />
    // <div className="bg-gray-100 na_bg2 auth min-h-screen flex justify-center items-center p-4 lg:p-[115px] ">
    //   <div className="bg-white shadow-2xl  rounded-[20px] pt-6 lg:max-w-[1200px] w-full">
    //     <div
    //       className="relative w-full"
    //       // pos={"relative"}
    //       // w={"full"}
    //     >
    //       <div
    //         className="absolute top-2 left-5"
    //         // pos={"absolute"}
    //         // top={2}
    //         // left={5}
    //       >
    //         <button onClick={previousPageHandler}>
    //           {index !== 3 && (
    //             <Image
    //               src={left_arrow}
    //               alt=""
    //               className="lg:h-10 lg:w-10 w-8 h-8 "
    //             />
    //           )}
    //         </button>
    //       </div>
    //       <div className="mb-5">
    //         <AppLogo />
    //       </div>
    //     </div>
    //     {/* <div className="px-5" px={5}> */}
    //     {index === 0 && (
    //       <RegStep1
    //         steps={steps}
    //         step={index}
    //         nextPageHandler={nextPageHandler}
    //         setEmail={setEmail}
    //         setFirst_name={setFirst_name}
    //         setLast_name={setLast_name}
    //         email={email}
    //         first_name={first_name}
    //         last_name={last_name}
    //         setProvider={setProvider}
    //         setSub={setSub}
    //       />
    //     )}
    //     {index === 1 && (
    //       <RegStep2
    //         isDefaultProvider={isDefaultProvider}
    //         loading={loading}
    //         steps={steps}
    //         step={index}
    //         nextPageHandler={nextPageHandler}
    //         getIndustry={getIndustry}
    //         setIndustry={setIndustry}
    //         setProfession={setProfession}
    //         setGender={setGender}
    //         setCountry={setCountry}
    //         setDob={setDob}
    //         setMarital_status={setMarital_status}
    //         setOtherIndustry={setOtherIndustry}
    //         otherIndustry={otherIndustry}
    //         industry={industry}
    //         day={day}
    //         month={month}
    //         year={year}
    //         setYear={setYear}
    //         setMonth={setMonth}
    //         setDay={setDay}
    //         marital_status={marital_status}
    //         profession={profession}
    //         gender={gender}
    //         setVisibility={setVisibility}
    //         visibility={visibility}
    //       />
    //     )}
    //     {index === 2 && (
    //       <RegStep3
    //         steps={steps}
    //         step={index}
    //         nextPageHandler={nextPageHandler}
    //         setVisibility={setVisibility}
    //         setPassword={setPassword}
    //         register={register}
    //         password={password}
    //         loading={loading}
    //         visibility={visibility}
    //       />
    //     )}
    //     {showSuccess && (
    //       <SuccessReg
    //         name={first_name}
    //         email={email}
    //         isDefaultProvider={isDefaultProvider}
    //         provider={provider}
    //       />
    //     )}
    //   </div>
    // </div>
  );
}
