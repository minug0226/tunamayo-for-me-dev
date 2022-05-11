interface CurrentLocationProps {
  modal: boolean;
}

const CurrentLocationButton = ({ modal }: CurrentLocationProps) => {
  const buttonClass = (modal: boolean) => {
    if (modal)
      return "sticky bottom-[215px] transition-all duration-[1000ms] pr-5 flex";
    else
      return "sticky transition-all duration-[1000ms] bottom-[34px] pr-5 flex";
  };

  return (
    <div className={buttonClass(modal)}>
      <div className="flex-1"></div>
      <div className="w-12 h-12 bg-white shadow-currentLocation rounded-full flex justify-center items-center">
        <img
          src="/images/main/current-location-icon.svg"
          alt="current-location"
        />
      </div>
    </div>
  );
};

export default CurrentLocationButton;
