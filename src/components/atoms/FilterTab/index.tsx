import React from "react";

interface FilterTabProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  count: number;
}

const FilterTab = ({
  isActive,
  onClick,
  label,
  count,
}: FilterTabProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-black text-white"
      } px-4 py-2 rounded-full text-sm font-medium`}
    >
      {label} {count}
    </button>
  );
};

export default FilterTab;
