import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin border-t-transparent"></div>

        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};


