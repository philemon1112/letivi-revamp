import React from "react";
import PropTypes from "prop-types";

const getButtonSize = (
  size: "sm" | "base" | "lg" | "xl" | "2xl" | undefined
) => {
  switch (size) {
    case "sm":
    default:
      return "px-[14px] py-[8px] text-[14px] h-[36px]";
    case "base":
      return "px-[14px] py-[10px] text-[14px] h-[40px]";
    case "lg":
      return "px-[18px] py-[10px] text-[16px] h-[44px]";
    case "xl":
      return "px-[20px] py-[12px] text-[16px] h-[48px]";
    case "2xl":
      return "px-[28px] py-[16px] text-[18px] h-[60px]";
  }
};

type ButtonProps = {
  ref?: React.RefObject<HTMLButtonElement | null>;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "info"
    | "warning"
    | "danger"
    | "white"
    | "success";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  monochrome?: boolean;
  outlined?: boolean;
};

export function Button({
  ref,
  type,
  size = "sm",
  loading = false,
  onClick,
  variant = "primary",
  disabled = false,
  children,
  className = "",
  monochrome = false,
  outlined,
  ...rest
}: ButtonProps) {
  const getButtonType = (
    type: string | undefined,
    monochrome: boolean | undefined
  ) => {
    switch (type) {
      case "primary":
      default:
        return monochrome
          ? "bg-na_blue text-na_blue"
          : outlined
          ? "border border-na_blue text-na_blue hover:bg-na_blue hover:text-white"
          : "bg-na_blue text-white";
      case "secondary":
        return monochrome
          ? "bg-na_yellow text-na_red"
          : outlined
          ? "border border-na_yellow text-na_red hover:bg-na_yellow hover:text-white"
          : "bg-na_yellow text-white";
      case "tertiary":
        return monochrome
          ? "bg-na_red text-na_red"
          : outlined
          ? "border border-na_red text-na_red hover:bg-na_red hover:text-white"
          : "bg-na_red text-white";
      case "white":
        return monochrome
          ? "bg-[#F9FAFB] text-[#344054]"
          : outlined
          ? "border border-gray-200 text-gray-600 hover:bg-gray-100"
          : "bg-white border border-[#D0D5DD] text-[#344054]";
      case "danger":
        return monochrome
          ? "bg-[#FEE4E2] text-[#912018]"
          : outlined
          ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          : "bg-[#D92D20] text-white";
      case "warning":
        return monochrome
          ? "bg-[#FFF4E2] text-[#A35C00]"
          : outlined
          ? "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
          : "bg-[#F5A623] text-white";
      case "info":
        return monochrome
          ? "bg-[#E2F0FF] text-[#1E5F9E]"
          : outlined
          ? "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          : "bg-[#1E5F9E] text-white";
      case "success":
        return monochrome
          ? "bg-[#E2F7E8] text-[#0F6C2E]"
          : outlined
          ? "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          : "bg-green-600 text-white";
    }
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
				${className}
				${getButtonSize(size)} 
				transition duration-300
				rounded-[8px] tracking-[-0.02em] 
				${getButtonType(variant, monochrome)}
				font-medium shrink-0 flex items-center justify-center
				${disabled ? "opacity-50 cursor-not-allowed" : ""}
			`}
    >
      {loading ? (
        <svg
          style={{ boxSizing: "content-box" }}
          viewBox="0 0 16 16"
          fill="none"
          data-view-component="true"
          className={`animate-spin w-4 h-4 mx-auto`}
        >
          <circle
            cx={8}
            cy={8}
            r={7}
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M15 8a7.002 7.002 0 00-7-7"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}

// Button.defaultProps = {
// 	size: "sm",
// 	variant: "primary",
// 	monochrome: false,
// 	className: "",
// 	disabled: false,
// 	loading: false,
// };

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "base", "lg", "xl", "2xl"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "info",
    "warning",
    "danger",
    "white",
    "success",
  ]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  monochrome: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
