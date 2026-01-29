// components/atoms/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  required?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const InputField = ({
  label,
  type,
  id,
  required,
  inputRef,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-[#666666]">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        ref={inputRef}
        className="input"
      />
    </div>
  );
};

export default InputField;
