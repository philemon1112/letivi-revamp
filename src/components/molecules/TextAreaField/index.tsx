import React from "react";

interface TextAreaFieldProps {
  label: string;
  id: string;
  required?: boolean;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const TextAreaField = ({
  label,
  id,
  required,
  textAreaRef,
}: TextAreaFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-[#666666]">
        {label}
      </label>
      <textarea
        id={id}
        rows={10}
        required={required}
        ref={textAreaRef}
        className="input"
      ></textarea>
    </div>
  );
};

export default TextAreaField;
