import Loading from "../common/Loading";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCenter } from "../../slices/mapCenterSlice";
import { changeLocationAllow } from "../../slices/locationAllowSlice";
import { changeCurrentLocation } from "../../slices/currentLocationSlice";

const CurrentLocationButton = () => {
  const dispatch = useDispatch();
  const [clickState, setClickState] = useState(false);

  const getCurrentLocation = async () => {
    setClickState(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            changeCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
          dispatch(
            changeCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
          setClickState(false);
        },
        () => {
          setClickState(false);
        }
      );
    } else {
      dispatch(changeLocationAllow(false));
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
