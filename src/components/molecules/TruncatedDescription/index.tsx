import React, { useState, useEffect } from "react";
import MobileBottomContentBar from "../BottomNavBar";
import DesktopSideContentBar from "../SideNavConten";

interface TruncatedDescriptionProps {
  description: string;
  title?: string;
  customStyles?: string;
  maxLength: number;
  showDrawer?: boolean;
  invert?: boolean;
}

const TruncatedDescription = ({
  description,
  title,
  customStyles,
  maxLength,
  showDrawer = false,
  invert = false,
}: TruncatedDescriptionProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [openDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDescription = () => {
    if (showDrawer) {
      setShowDrawer(!openDrawer);
    } else {
      setShowFullDescription(!showFullDescription);
    }
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <pre className={customStyles}>
        {showFullDescription
          ? description
          : truncateDescription(description, maxLength)}
        {!showFullDescription && description?.length > maxLength && (
          <button className="text-na_blue ml-2" onClick={toggleDescription}>
            Read More
          </button>
        )}
        {showFullDescription && description?.length > maxLength && (
          <button className="text-na_blue ml-2" onClick={toggleDescription}>
            Read Less
          </button>
        )}
      </pre>

      <>
        {isMobile ? (
          <MobileBottomContentBar setOpen={setShowDrawer} open={openDrawer}>
            <div className="flex flex-col">
              <div className=" p-4 sm:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {invert ? description : title}
                </h3>
                <pre className="mt-2 text-sm text-gray-800">
                  {invert ? title : description}
                </pre>
              </div>
            </div>
          </MobileBottomContentBar>
        ) : (
          <DesktopSideContentBar setOpen={setShowDrawer} open={openDrawer}>
            <div className="flex flex-col">
              <div className=" p-4 sm:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {invert ? description : title}
                </h3>
                <pre className="mt-2 text-sm text-gray-800">
                  {invert ? title : description}
                </pre>
              </div>
            </div>
          </DesktopSideContentBar>
        )}
      </>
    </div>
  );
};

export default TruncatedDescription;
