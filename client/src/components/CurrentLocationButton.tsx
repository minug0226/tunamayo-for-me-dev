import { Dispatch, SetStateAction, useState } from "react";
import Loading from "./Loading";

interface Center {
  lat: number;
  lng: number;
}

interface CenterState {
  center: Center;
  isAllow: boolean;
}

interface CurrentLocationButtonProps {
  setCenter: Dispatch<SetStateAction<CenterState>>;
}

const CurrentLocationButton = ({ setCenter }: CurrentLocationButtonProps) => {
  const [clickState, setClickState] = useState(false);

  const getCurrentLocation = async () => {
    setClickState(true);
    if (navigator.geolocation) {
      // GeoLocation을 사용해서 사용자의 위치를 얻어온다.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isAllow: true,
          }));
          setClickState(false);
        },
        (err) => {
          console.log(err);
          setClickState(false);
        }
      );
    }
    // 사용자가 위치 동의 허용을 하지 않았을 때
    else {
      setCenter((prev) => ({
        ...prev,
        isAllow: false,
      }));
      console.log("-");
    }
  };

  return (
    <>
      <div
        onClick={getCurrentLocation}
        className="absolute left-[21px] top-[135px] pr-5 flex cursor-pointer itmes-center"
      >
        <div className="w-11 h-11 bg-white shadow-navButton rounded-full flex justify-center items-center mr-5">
          <img
            className="w-5 h-5"
            src="/images/main/current-location-icon.svg"
            alt="current-location"
          />
        </div>
      </div>
      {clickState && <Loading content="현재 위치 불러오는 중..." />}
    </>
  );
};

export default CurrentLocationButton;
