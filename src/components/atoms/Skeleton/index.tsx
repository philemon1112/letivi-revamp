import { twMerge } from "tailwind-merge";

type SkeletonProps = {
  width?: number;
  height?: number;
  className?: string;
  useWidthPercentage?: boolean;
};

export default function Skeleton({
  width = Math.random() * 60 + 50,
  height = 20,
  className,
  useWidthPercentage = true,
}: SkeletonProps) {
  return (
    <div
      style={{
        // random width with minimum 50%
        width: useWidthPercentage ? `${width}%` : width,
        height: height,
      }}
      className={twMerge(
        "flex flex-row items-center animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x",
        `${className}`
      )}
    />
  );
}

// Skeleton.defaultProps = {
// 	width: Math.random() * 60 + 50,
// 	height: 20,
// };
