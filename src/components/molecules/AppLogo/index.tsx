import React from "react";
import Image from "next/image";

interface APPLOGO {
  responsive: boolean;
  image: boolean;
}
function AppLogo({ responsive, image }: APPLOGO) {
  return (
    <div>
      <img
        src="/assets/Img/left_icon_logo.jpg"
        alt="nothing"
        className={`${responsive ? "hidden" : "block"} h-10 w-auto`}
      />
      {responsive && (
        <>
          <div className="flex md:hidden justify-between space-x-2 items-center">
            <Image
              height={10}
              width={10}
              alt="nothing"
              src="/assets/Img/mobile.png"
            />
            <h2 className="font-semibold md:hidden text-2xl logo-text">
              {" "}
              Letivi
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default AppLogo;
