"use client";
import React, { useRef } from "react";
import BaseTemplate from "../BaseTemplate";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/molecules/SelectField";
import TextAreaField from "@/components/molecules/TextAreaField";
import { Button } from "@/components/atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "@/services/contact";
import { toast } from "sonner";

function Contact() {
  const subjectRef = useRef<HTMLSelectElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const subjectOptions = [
    { value: "Support Us", label: "Support Us" },
    { value: "Partnership", label: "Partner with Us" },
    { value: "Contact Us", label: "Contact Us" },
    { value: "Others", label: "Others" },
  ];

  // CONTACT US MUTATION
  const { isPending, mutateAsync: contactUsMutation } = useMutation({
    mutationFn: (data: any) => contactUs(data),
    onSuccess: (data) => {
      console.log("success", { data });
      toast.success("Email sent successfully.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("subject", subjectRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("fullname", fullNameRef.current?.value || "");
    formData.append("organisation", organizationRef.current?.value || "");
    formData.append("phone", phoneRef.current?.value || "");
    formData.append("message", messageRef.current?.value || "");

    contactUsMutation(formData);
  };

  return (
    <BaseTemplate>
      <div className="bg-gray-100 na_bg2 bg-fixed about min-h-screen flex justify-center items-center py-10  lg:p-[115px] ">
        <div className="bg-white bg-opacity-80 rounded-[20px] p-6 max-w-[1400px]">
          <div className="bg-white rounded-[20px] p-8 lg:p-[50px] flex  flex-col">
            <h1 className="lg:text-4xl text-2xl text-center font-semibold  my-10">
              Contact Us
            </h1>

            <h1 className="lg:text-2xl text-xs  text-center mb-4 font-bold">
              Enquiry Form
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="lg:w-[900px] w-full mx-auto space-y-4">
                <SelectField
                  label="Subject"
                  options={subjectOptions}
                  selectRef={subjectRef}
                />
                <InputField
                  id="fullname"
                  type="text"
                  label="Your Name"
                  inputRef={fullNameRef}
                />
                <InputField
                  id="email"
                  type="text"
                  label="Your Email"
                  inputRef={emailRef}
                />
                <InputField
                  id="organisation"
                  type="text"
                  label="Your Organisation"
                  inputRef={organizationRef}
                />
                <InputField
                  id="phone"
                  type="text"
                  label="Your Phone"
                  inputRef={phoneRef}
                />

                <TextAreaField
                  id="message"
                  label="Message"
                  textAreaRef={messageRef}
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
            </form>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default Contact;
