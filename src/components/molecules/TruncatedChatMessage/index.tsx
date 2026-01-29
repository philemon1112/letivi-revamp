import React, { useState } from "react";

interface TruncatedDescriptionProps {
  description: string;
  customStyles?: string;
  maxLength: number;
  buttonDisabled?: boolean;
  buttonColor?: string;
}

const TruncatedMessage = ({
  description,
  customStyles,
  maxLength,
  buttonDisabled,
  buttonColor,
}: TruncatedDescriptionProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (text: string, limit: number) => {
    if (!text) {
      return "";
    }
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  return (
    <div>
      <p className={customStyles}>
        {showFullDescription
          ? description
          : truncateDescription(description, maxLength)}
        {buttonDisabled !== true && (
          <>
            {!showFullDescription && description?.length > maxLength && (
              <button
                className={`${
                  buttonColor ? buttonColor : "text-white"
                } ml-2 font-medoi`}
                onClick={toggleDescription}
              >
                Read More
              </button>
            )}
            {showFullDescription && description?.length > maxLength && (
              <button
                className={`${
                  buttonColor ? buttonColor : "text-white"
                } ml-2 font-extraBold`}
                onClick={toggleDescription}
              >
                Read Less
              </button>
            )}
          </>
        )}
      </p>
    </div>
  );
};

export default TruncatedMessage;
