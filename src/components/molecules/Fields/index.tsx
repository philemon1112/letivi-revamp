import React from "react";

interface SelectInputProps {
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string | number;
  //   options: (string | { value: string; label: string })[];
  options: number[] | string[];
}

interface PrivacyFieldProps {
  setVisibility: (visibility: boolean) => void;
  visibility: boolean;
}

export function getYears(startYear: number) {
  var currentYear = new Date().getFullYear() - 13,
    years = [];
  startYear = startYear || 1920;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export const daysList = Array.from({ length: 31 }).map((_, index) => index + 1);
export const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SelectInput = ({
  label,
  name,
  onChange,
  placeholder,
  value,
  options,
}: SelectInputProps) => {
  return (
    <React.Fragment>
      {label && (
        <label htmlFor={name} className="text-[#666666]">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        required
        onChange={(e) => onChange(e.target.value)}
        className="input"
        defaultValue={value}
      >
        <option value="">{placeholder}</option>
        {options.map((option, id) => (
          <option value={option} key={id}>
            {option}
          </option>
        ))}
        {/* {options.map((option, id) => (
          <option value={option.value || option} key={id}>
            {option.label || option}
          </option>
        ))} */}
      </select>
    </React.Fragment>
  );
};

export const PrivacyField = ({
  setVisibility,
  visibility,
}: PrivacyFieldProps) => {
  return (
    <div>
      <label htmlFor="Privacy" className="text-[#666666]">
        Privacy
      </label>
      <select
        name="Privacy"
        id="Privacy"
        required
        onChange={(e) => setVisibility(e.target.value === "true")}
        className="input"
        value={String(visibility)}
      >
        <option value="false"> Public </option>
        <option value="true"> Private</option>
      </select>
      <p className="text-[#EE1D52] text-[13px]">
        {visibility
          ? "Private means visible to only me"
          : "Public means visible to everyone"}
      </p>
    </div>
  );
};

export const SignupPolicy = () => {
  return (
    <p className="text-center lg:text-base text-xs mt-4">
      By continuing, you agree to the
      <a href="src/Components/Auth#" className="text-na_blue mx-1">
        Terms
      </a>
      of use and
      <a href="src/Components/Auth#" className="text-na_blue mx-1">
        Privacy Policy
      </a>
      .
    </p>
  );
};
