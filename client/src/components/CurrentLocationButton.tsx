const CurrentLocationButton = () => {
  return (
    <div className="absolute left-[21px] top-[135px] pr-5 flex">
      <div className="w-11 h-11 bg-white shadow-navButton rounded-full flex justify-center items-center">
        <img
          className="w-5 h-5"
          src="/images/main/current-location-icon.svg"
          alt="current-location"
        />
      </div>
    </div>
  );
};

export default CurrentLocationButton;
