import React from "react";

function PostLoadingShimmer() {
  return (
    <div>
      <div className="md:w-[400px] w-[150px] md:h-[400px] h-[100px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x"></div>
      <div className="md:w-[400px] w-[150px] md:h-[200px] h-[200px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x"></div>
      <div className="md:w-[400px] w-[150px] md:h-[300px] h-[200px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x"></div>
      <div className="md:w-[400px] w-[150px] md:h-[400px] h-[180px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x"></div>
      <div className="md:w-[400px] w-[150px] md:h-[600px] h-[140px] break-inside-avoid mb-4 relative group animate-pulse justify-center bg-gray-200 rounded-md animate-gradient-x"></div>
    </div>
  );
}

export default PostLoadingShimmer;
