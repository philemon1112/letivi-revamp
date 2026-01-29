import React from "react";
// import { Box, Text } from "@chakra-ui/react";

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

interface SelectInputProps {
  label?: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  options: Array<{ value: string; label: string } | string>;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  onChange,
  placeholder,
  value,
  options,
}) => {
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
        {options.map((el, id) => (
          <option value={typeof el === "string" ? el : el.value} key={id}>
            {" "}
            {typeof el === "string" ? el : el.label}{" "}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
};

export const PrivacyField: React.FC<{
  setVisibility: (value: boolean) => void;
  visibility: boolean;
}> = ({ setVisibility, visibility }) => {
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
        defaultValue={String(visibility)}
      >
        <option value="false"> Public </option>
        <option value="true"> Private</option>
      </select>
      <p style={{ color: "#EE1D52", fontSize: "13px" }}>
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
