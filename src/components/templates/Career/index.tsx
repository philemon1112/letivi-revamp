"use client";

import React, { useRef, useState } from "react";
import BaseTemplate from "../BaseTemplate";
import { Button } from "@/components/atoms/Button";
import SelectField from "@/components/molecules/SelectField";
import InputField from "@/components/atoms/InputField";
import TextAreaField from "@/components/molecules/TextAreaField";
import FileInputField from "@/components/molecules/FileInputField";
import { useMutation } from "@tanstack/react-query";
import { career } from "@/services/career";
import { toast } from "sonner";

function Career() {
  const subjectRef = useRef<HTMLSelectElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  const [cv, setcv] = useState(null);
  const [filename, setfilename] = useState("");

  const subjectOptions = [
    { value: "Internship Offer", label: "Internship Offer" },
    { value: "Job Application", label: "Job Application" },
  ];

  // CAREERS MUTATION
  const { isPending, mutateAsync: careerMutation } = useMutation({
    mutationFn: (data: any) => career(data),
    onSuccess: (data) => {
      console.log("success", { data });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("subject", subjectRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("fullname", fullNameRef.current?.value || "");
    formData.append("description", aboutRef.current?.value || "");
    formData.append("cv", cv || "");

    toast.promise(careerMutation(formData), {
      // loading: "Submiting form...",
      success: "Submission Successful",
      error: (error) => `An unexpected error occured`,
    });

    return;
  };

  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2 bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-[20px] p-8 lg:p-[50px] flex  flex-col">
              <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
                Jobs & Internships
              </h1>

              <h1 className="lg:text-2xl text-xs mb-4">
                Letivi offers equal opportunity to candidates irrespective of
                gender, ethnicity and creed in the pursuit of their careers. We
                create an ambience for our employees to optimize their potential
                through continued education and on-boarding training that
                unearths the innate talents of the individual.
              </h1>

              <div className="lg:text-2xl text-xs mb-4">
                Join us, and be part of the creation of history whether as a
                full time employer or as an intern.
              </div>

              <h1 className="lg:text-2xl text-xs  text-center mb-4 font-bold">
                Jobs or Internships
              </h1>

              <div className="lg:w-[900px] w-full mx-auto space-y-4">
                <SelectField
                  label="Subject"
                  options={subjectOptions}
                  selectRef={subjectRef}
                />
                <InputField
                  id="fullname"
                  type="text"
                  label="Full Name"
                  inputRef={fullNameRef}
                />
                <InputField
                  id="email"
                  type="text"
                  label="Email Address"
                  inputRef={emailRef}
                />

                <TextAreaField
                  id="about"
                  label="About"
                  textAreaRef={aboutRef}
                />

                <FileInputField
                  setcv={setcv}
                  filename={filename}
                  setfilename={setfilename}
                />

                <Button
                  variant="primary"
                  size="2xl"
                  className="flex justify-center rounded-lg text-[10px] py-1 px-24 mx-auto mt-4 md:mt-8 max-w-max"
                  type="submit"
                  loading={isPending}
                >
                  {/* {t("common:contact_us")} */}
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default Career;
