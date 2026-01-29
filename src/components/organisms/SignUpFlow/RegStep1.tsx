"use client";

import { Button } from "@/components/atoms/Button";
import Stepper from "@/components/molecules/Stepper";
import { validateEmail } from "@/services/signup";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import SocialSignUp from "./SocialSignUp";

interface RegStep1Props {
  steps: string[]; // Array of strings representing the steps in the signup flow
  step: number; // The current step index
  nextPageHandler: () => void; // Function to handle going to the next step
  setEmail: (email: string) => void; // Function to set the email state
  setFirst_name: (first_name: string) => void; // Function to set the first name state
  setLast_name: (last_name: string) => void; // Function to set the last name state
  email: string; // Current email state
  first_name: string; // Current first name state
  last_name: string; // Current last name state
  setProvider: (provider: string) => void; // Function to set the provider state
  setSub: (sub: string) => void; // Function to set the sub state
  inviter_id?: number;
  index: number;
}

const RegStep1 = ({
  steps,
  step,
  nextPageHandler,
  setEmail,
  setFirst_name,
  setLast_name,
  last_name,
  first_name,
  email,
  setProvider,
  setSub,
  inviter_id,
}: RegStep1Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  // const nextHandler = async () => {

  //     let isEmailExist;

  //     // await axios
  //     //   .post(endpoints.validateEmail, {
  //     //     email,
  //     //   })
  //     //   .then((res) => {
  //     //     setLoading(false);
  //     //     // ;
  //     //     isEmailExist = false;
  //     //     setError(false);
  //     //   })
  //     //   .catch((err) => {
  //     //     setLoading(false);
  //     //     setMessage(err.response.data.message);
  //     //     isEmailExist = true;
  //     //     setError(true);
  //     //   });
  //     if (!isEmailExist) {
  //         nextPageHandler();
  //     }
  //   };

  // VALIDATE EMAIL
  const {
    isPending,
    isError,
    mutateAsync: verifyEmailMutation,
  } = useMutation({
    mutationFn: (data: any) => validateEmail(data),
    onSuccess: () => {
      nextPageHandler();
    },
    onError: (error: any) => {
      setErrorMessage(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    },
  });

  const proceed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // nextHandler();
    // nextPageHandler();
    const data = {
      email: email,
    };
    verifyEmailMutation(data);
  };

  return (
    <div className="lg:px-[200px]">
      <div className="mb-5">
        <h1 className="text-center font-medium lg:text-2xl text-base mt-2">
          Create an account and gain full access
        </h1>
        <div className="text-center">
          Already have an account?
          <Link className="text-na_blue ml-1" href="/login">
            Log in
          </Link>
        </div>
      </div>

      {/* <Stage steps={steps} step={step} /> */}
      <Stepper steps={steps} step={step} />
      <SocialSignUp
      // setLast_name={setLast_name}
      // setProvider={setProvider}
      // verifier={verifier}
      // setFirst_name={setFirst_name}
      // setEmail={setEmail}
      />

      <div className="flex my-4 mx-5 items-center">
        <div className="flex-1 h-px bg-[#bdbdbd] mr-2"></div>
        <p className="text-gray-600 px-3 py-1">OR</p>
        <div className="flex-1 h-px bg-[#bdbdbd] ml-2"></div>
      </div>

      <div className="mt-6">
        {/* <form> */}
        <form onSubmit={proceed}>
          <label htmlFor="first_name" className="text-[#666666]">
            {/* <FormattedMessage
              id={"app.Text.first-name"}
              defaultMessage={"  First Name*"}
            /> */}
            First Name*
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            id="first_name"
            value={first_name}
            required
            onChange={(e) => {
              setFirst_name(e.target.value);
            }}
            className="input"
          />
          <label htmlFor="last_name" className="text-[#666666]">
            Last Name*
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            id="last_name"
            value={last_name}
            required
            onChange={(e) => {
              setLast_name(e.target.value);
            }}
            className="input"
          />
          <label htmlFor="email" className="mt-4 text-[#666666]">
            {`What's`} your email?*
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email adderess"
            id="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
          />

          {isError && <h1 className="text-red-500"> {errorMessage} </h1>}

          <Button
            variant="primary"
            size="2xl"
            className="bg-na_blue rounded-full flex justify-center p-4 mt-4 mb-16 w-full text-[#ffffff]"
            type="submit"
            loading={isPending}
          >
            {/* {t("common:contact_us")} */}
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegStep1;
