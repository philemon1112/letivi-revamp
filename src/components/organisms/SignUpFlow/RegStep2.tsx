import { Button } from "@/components/atoms/Button";
import Stepper from "@/components/molecules/Stepper";
import Link from "next/link";
import React from "react";
import {
  monthsList,
  PrivacyField,
  SelectInput,
  SignupPolicy,
  daysList,
  getYears,
} from "@/components/molecules/Fields";
import CountryDropdown from "@/components/molecules/CountryDropdown";

interface RegStep2Props {
  steps: string[]; // Array of strings representing the steps in the signup flow
  step: number; // The current step index
  nextPageHandler: () => void; // Function to handle going to the next step
  getIndustry: any[] | undefined | void; // Array of objects representing industry options
  setIndustry: (industry: string) => void; // Function to set the industry state
  setProfession: (profession: string) => void; // Function to set the profession state
  setGender: (gender: string) => void; // Function to set the gender state
  setCountry: (country: string) => void; // Function to set the country state
  setMarital_status: (marital_status: string) => void; // Function to set the marital status state
  setOtherIndustryData: (data: string) => void; // Function to set the other industry data state
  setOtherIndustry: (value: boolean) => void; // Function to set the other industry state
  otherIndustry: boolean; // Boolean representing whether the user selected "other" industry
  day: string; // Current day state
  month: string; // Current month state
  year: string; // Current year state
  setDay: (day: string) => void; // Function to set the day state
  setDob: (day: string) => void; // Function to set the day state
  setMonth: (month: string) => void; // Function to set the month state
  setYear: (year: string) => void; // Function to set the year state
  gender: string; // Current gender state
  loading: boolean; // Boolean representing whether data is loading
  industry: string | null; // Current industry state
  isDefaultProvider: boolean; // Boolean representing whether the provider is default
  profession: string; // Current profession state
  marital_status: string; // Current marital status state
  setVisibility: (visibility: boolean) => void; // Function to set the visibility state
  visibility: boolean; // Boolean representing visibility state
}

const RegStep2 = ({
  steps,
  step,
  nextPageHandler,
  getIndustry,
  setIndustry,
  setProfession,
  setGender,
  setCountry,
  setMarital_status,
  setOtherIndustryData,
  setOtherIndustry,
  otherIndustry,
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
  gender,
  loading,
  industry,
  isDefaultProvider,
  profession,
  marital_status,
  setVisibility,
  visibility,
}: RegStep2Props) => {
  const proceed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextPageHandler();
  };

  return (
    <div className="lg:px-[200px]">
      <Stepper steps={steps} step={step} />

      <div className="mt-6">
        <form onSubmit={proceed}>
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
                  onChange={(e) => {
                    setIndustry(e.target.value);
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

                    {getIndustry?.map((item) => {
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
                value={profession}
                required
                onChange={(e) => {
                  setProfession(e.target.value);
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
                  onChange={(value: string) => setCountry(value)}
                />
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
                value={day}
                name={"day"}
                onChange={setDay}
                label={""}
              />
              <SelectInput
                options={monthsList}
                value={month}
                placeholder={"Month"}
                name={"month"}
                onChange={setMonth}
                label={""}
              />
              <SelectInput
                options={getYears(1920)}
                placeholder={"Year"}
                value={year}
                name={"year"}
                onChange={setYear}
                label={""}
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="2xl"
            className="bg-na_blue rounded-full flex justify-center p-4 mt-4 mb-16 w-full text-[#ffffff]"
            type="submit"
            // loading={loading}
          >
            {/* {t("common:contact_us")} */}
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegStep2;
