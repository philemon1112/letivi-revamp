import React from "react";

interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  selectRef: React.RefObject<HTMLSelectElement | null>;
}

const SelectField = ({ label, options, selectRef }: SelectFieldProps) => {
  return (
    <div className="lg:col-span-5 col-span-12">
      <label htmlFor="profession" className="text-[#666666]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute top-6 right-4">
          <img src="/assets/Svg/dropdown_select.svg" alt="" />
        </div>
        <select
          required
          ref={selectRef}
          name="subject"
          id="subject"
          className="input"
        >
          <option value="">-- Select --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
