import React from "react";

const CurrentLocationLoading = () => {
  return (
    <div className="absolute z-[80] top-[400px] left-[30%] flex">
      <div className="animate-spin w-5 h-5 bg-red-500 mr-4"></div>
      <div>현재 위치 불러오는중 ...</div>
    </div>
  );
};

export default CurrentLocationLoading;
