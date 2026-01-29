"use client";
import { Button } from "@/components/atoms/Button";
import Stepper from "@/components/molecules/Stepper";
import Link from "next/link";
import React, { useState } from "react";
import {
  monthsList,
  PrivacyField,
  SelectInput,
  SignupPolicy,
  daysList,
  getYears,
} from "@/components/molecules/Fields";

interface RegStep3Props {
  steps: string[]; // Array of strings representing the steps in the signup flow
  step: number; // The current step index
  nextPageHandler: () => void; // Function to handle going to the next step
  setPassword: (password: string) => void; // Function to set the password state
  password: string; // Current password state
  loading: boolean; // Loading state
  setVisibility: (visibility: boolean) => void; // Function to set the visibility state
  visibility: boolean; // Current visibility state
  register: () => void; // Function to handle registration
}

const RegStep3 = ({
  steps,
  step,
  register,
  setVisibility,
  setPassword,
  password,
  loading,
  visibility,
}: RegStep3Props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(true);

  const [togglePasswordType, setTogglePasswordType] = useState("password");
  const [toggleConfirmPasswordType, setToggleConfirmPasswordType] =
    useState("password");

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordType = (val: string) => {
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

  // VALIDATE ENTERED PASSWORD
  const handlePasswordValidityCheck = (e: { target: { value: string } }) => {
    if (e.target.value.length < 7) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setPassword(e.target.value);
    }
  };

  const registerHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordChecker(!passwordChecker);
    } else {
      register();
    }
  };

  return (
    <div className="lg:px-[200px]">
      <Stepper steps={steps} step={step} />

      <div className="mt-6">
        <form onSubmit={registerHandler}>
          <div className="flex justify-between items-center">
            <label htmlFor="Password" className="text-[#666666]">
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
            <label htmlFor="Password" className="text-[#666666]">
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

          <PrivacyField setVisibility={setVisibility} visibility={visibility} />
          <SignupPolicy />

          <Button
            variant="primary"
            size="2xl"
            className="bg-na_blue rounded-full flex justify-center p-4 mt-4 mb-16 w-full text-[#ffffff]"
            type="submit"
            loading={loading}
          >
            {/* {t("common:contact_us")} */}
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegStep3;
