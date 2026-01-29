'use client'

/* eslint-disable */
import React, { useState } from "react";
// import Loader from "../../../Components/UI/Loader";
// import Stage from "./Stage";
import { PrivacyField, SignupPolicy } from "./Fields";
import Loader from "@/components/atoms/Loader";

interface IndexProps {
  steps: any[]; // Replace 'any[]' with the actual type if known
  step: number;
  register: () => void;
  setVisibility: (visibility: boolean) => void;
  setPassword: (password: string) => void;
  password: string;
  loading: boolean;
  visibility: boolean;
}

export default function Index({
  steps,
  step,
  register,
  setVisibility,
  setPassword,
  password,
  loading,
  visibility,
}: IndexProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(true);

  const [togglePasswordType, setTogglePasswordType] = useState("password");
  const [toggleConfirmPasswordType, setToggleConfirmPasswordType] =
    useState("password");

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordType = (val: "password" | "confirm_password") => {
    if (val === "password") {
      if (togglePasswordType === "password") {
        setTogglePasswordType("text");
      } else {
        setTogglePasswordType("password");
      }
    } else if (val === "confirm_password") {
      if (toggleConfirmPasswordType === "password") {
        setToggleConfirmPasswordType("text");
      } else {
        setToggleConfirmPasswordType("password");
      }
    }
  };

  const handlePasswordValidityCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length < 7) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setPassword(e.target.value);
    }
  };

  // const handlePasswordValidation = e => {
  //   if(e.target.value.length)
  // }

  interface RegisterHandlerEvent extends React.FormEvent<HTMLFormElement> {}

  const registerHandler = (e: RegisterHandlerEvent): void => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordChecker(!passwordChecker);
    } else {
      register();
    }
  };

  return (
    <div className="lg:px-[200px]">
      {/* <Stage
        steps={steps}
        step={step}
      /> */}

      <form
        className="mt-10"
        onSubmit={registerHandler}
      >
        <div className="flex justify-between items-center">
          <label
            htmlFor="Password"
            className="text-[#666666]"
          >
            Password*
          </label>
          <div
            onClick={() => handlePasswordType("password")}
            className="mr-4 cursor-pointer"
          >
            <i
              className={`fa ${
                togglePasswordType !== "password" ? "fa-eye" : "fa-eye-slash"
              } text-[#666666]`}
            ></i>
          </div>
        </div>

        <input
          type={togglePasswordType}
          required
          onChange={handlePasswordValidityCheck}
          placeholder="Password"
          id="full_name"
          className="input"
        />
        {!isPasswordValid && (
          <p className="text-red-500 text-xs lg:text-sm mb-3">
            Password must be atleast 7 characters
          </p>
        )}

        <div className="flex justify-between items-center">
          <label
            htmlFor="Password"
            className="text-[#666666]"
          >
            Confirm Password*
          </label>
          <div
            onClick={() => handlePasswordType("confirm_password")}
            className="mr-4 cursor-pointer"
          >
            <i
              className={`fa ${
                toggleConfirmPasswordType !== "password"
                  ? "fa-eye"
                  : "fa-eye-slash"
              } text-[#666666]`}
            ></i>
          </div>
        </div>
        <div>
          <input
            type={toggleConfirmPasswordType}
            placeholder="Confirm password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            id="email"
            className="input"
          />
          {!passwordChecker && (
            <p className="text-red-500 text-xs lg:text-sm ">
              Passwords does not match
            </p>
          )}
        </div>
        <PrivacyField
          setVisibility={setVisibility}
          visibility={visibility}
        />
        <SignupPolicy />
        <button className="bg-na_blue rounded-full p-4 mt-4 mb-16 w-full flex justify-center text-[#ffffff]">
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
