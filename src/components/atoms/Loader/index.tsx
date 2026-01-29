import React from "react";

function Loader() {
  return (
    <div className="mx-auto flex justify-center items-center text-center">
      <div className="h-8 w-8 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-white border-l-na_blue animate-spin"></div>
    </div>
  );
}

export default Loader;