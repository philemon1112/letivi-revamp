import React, { Fragment } from "react";
// import Stage from "./Stage";
import dropdown_select from "../../../../../public/assets/Svg/dropdown_select.svg";
import {
  monthsList,
  PrivacyField,
  SelectInput,
  SignupPolicy,
  daysList,
  getYears,
} from "./Fields";
import Image from "next/image";
import Loader from "@/components/atoms/Loader";
interface Industry {
  id: string;
  name: string;
}

interface Props {
  nextPageHandler: () => void;
  getIndustry: Industry[];
  setIndustry: (value: string) => void;
  setProfession: (value: string) => void;
  setGender: (value: string) => void;
  setCountry: (value: string) => void;
  setMarital_status: (value: string) => void;
  setOtherIndustryData: (value: string) => void;
  setOtherIndustry: (value: boolean) => void;
  otherIndustry: boolean;
  day: string;
  month: string;
  year: string;
  setDay: (value: string) => void;
  setMonth: (value: string) => void;
  setYear: (value: string) => void;
  gender: string;
  loading: boolean;
  industry: string;
  isDefaultProvider: boolean;
  profession: string;
  marital_status: string;
  setVisibility: (value: boolean) => void;
  visibility: boolean;
}

export default function Index({
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
}: Props) {
  const nextHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    nextPageHandler();
  };
  const proceed = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    nextHandler(e);
  };

  return (
    <div className="lg:px-[200px]">
      {/* <Stage
        showLastStep={isDefaultProvider}
        steps={steps}
        step={step}
      /> */}
      <form
        className="mt-10 w-full"
        onSubmit={proceed}
      >
        <div className="grid grid-cols-12 lg:lg:gap-10 items-center">
          {otherIndustry ? (
            <div className="lg:col-span-5 col-span-12">
              <label
                htmlFor="industry"
                className="text-[#666666]"
              >
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
              <label
                htmlFor="profession"
                className="text-[#666666]"
              >
                Industry*
              </label>
              <div className="relative">
                <label
                  className="absolute z-[-1] top-6 right-4"
                  htmlFor="industry"
              
                >
                  <Image
                    src={dropdown_select}
                    alt=""
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

                  {getIndustry.map((item) => {
                    return (
                      <option
                        value={item.id}
                        key={item.id}
                      >
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
            <label
              htmlFor="profession"
              className="text-[#666666]"
            >
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
        <div className="grid grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-5 col-span-12">
            <label
              htmlFor="profession"
              className="text-[#666666]"
            >
              Gender*
            </label>
            <div className="relative">
              <div className="absolute z-[-1] top-6 right-4">
                <Image
                  src={dropdown_select}
                  alt=""
                />
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
            <label
              htmlFor="profession"
              className="text-[#666666]"
            >
              Country*
            </label>
            {/* <div>
              <CountryDropdown
                id="UNIQUE_ID"
                className="input mt-4"
                preferredCountries={["gh"]}
                value=""
                handleChange={(e) => setCountry(e.target.value)}
              ></CountryDropdown>
            </div> */}
          </div>
        </div>
        {/*<div className="grid grid-cols-12 lg:gap-10 items-center">*/}
        {/*  <div className="lg:col-span-5 col-span-12">*/}
        {/*    <label htmlFor="dob" className="text-[#666666]">*/}
        {/*      Date of birth*/}
        {/*    </label>*/}
        {/*<input*/}
        {/*  type="date"*/}
        {/*  name="dob"*/}
        {/*  id="dob"*/}
        {/*  value={""}*/}
        {/*  required*/}
        {/*  className="input"*/}
        {/*/>*/}
        {/*  </div>*/}
        {/*  <div className="lg:col-span-7 col-span-12">*/}
        {/*    <label htmlFor="marital_status" className="text-[#666666]">*/}
        {/*      Relationship*/}
        {/*    </label>*/}
        {/*    <div className="relative">*/}
        {/*      <div className="absolute z-[-1] top-6 right-4">*/}
        {/*        <img src={dropdown_select} alt="" />*/}
        {/*      </div>*/}
        {/*      <select*/}
        {/*        name="marital_status"*/}
        {/*        id="marital_status"*/}
        {/*        required*/}
        {/*        onChange={(e) => setMarital_status(e.target.value)}*/}
        {/*        className="input"*/}
        {/*        defaultValue={marital_status}*/}
        {/*      >*/}
        {/*        <option value="">-- Select --</option>*/}
        {/*        <option value="single"> Single </option>*/}
        {/*        <option value="married">Married</option>*/}
        {/*        <option value="divorced">Divorced</option>*/}
        {/*        <option value="other">Other</option>*/}
        {/*      </select>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/* <Box mt={4}>
          <label className="text-[#666666]">Date of birth*</label>
          <SimpleGrid
            spacing={5}
            columns={3}
          >
            <SelectInput
              placeholder={"Day"}
              options={daysList}
              value={day}
              name={"day"}
              onChange={setDay}
            />
            <SelectInput
              options={monthsList}
              value={month}
              placeholder={"Month"}
              name={"month"}
              onChange={setMonth}
            />
            <SelectInput
              options={getYears()}
              placeholder={"Year"}
              value={year}
              name={"year"}
              onChange={setYear}
            />
          </SimpleGrid>
        </Box>
        {!isDefaultProvider && (
          <Fragment>
            <PrivacyField
              setVisibility={setVisibility}
              visibility={visibility}
            />
            <SignupPolicy />
          </Fragment>
        )} */}
        <button className="bg-na_blue rounded-full p-4 mt-4 mb-16 w-full flex justify-center text-[#ffffff]">
          {loading ? <Loader /> : isDefaultProvider ? "Next" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
