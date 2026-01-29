import React from "react";

interface StepProps {
  number: number;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean; // New prop to indicate whether the step is completed
}

const Step = ({ number, label, isActive, isCompleted }: StepProps) => {
  return (
    <li className="shrink basis-0 flex-1 group text-center">
      <div className=" min-w-7 w-full ml-[50%] min-h-7 inline-flex items-center text-xs align-middle">
        <span
          className={`${
            isActive || isCompleted  ? "bg-na_blue" : "bg-[#9e9e9e]"
          } size-6  text-white font-m flex justify-center items-center flex-shrink-0 rounded-full`}
        >
          {isCompleted ? ( // Conditionally render the SVG if the step is completed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            number
          )}
        </span>
        <div className="ms-2 w-full h-px flex-1 bg-[#bdbdbd] group-last:hidden"></div>
      </div>
      <div className="mt-3">
        <span className="block text-sm font-light text-gray-800">{label}</span>
      </div>
    </li>
  );
};

export default Step;
