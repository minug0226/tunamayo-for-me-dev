import SearchBar from "../components/main/SearchBar";
import NavButton from "../components/main/NavButton";
import Drawer from "../components/main/Drawer";
import CurrentLocationButton from "../components/main/CurrentLocationButton";
import ModalPopUp from "../components/main/ModalPopUp";
import Modal from "../components/common/Modal";
import Loading from "../components/common/Loading";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { pauseGeoLocationApi } from "../slices/callGeoApiSlice";
import { changeCenter } from "../slices/mapCenterSlice";
import { changeLocationAllow } from "../slices/locationAllowSlice";
import { changeCurrentLocation } from "../slices/currentLocationSlice";
import { offSplash } from "../slices/splashSlice";

import { useAllToiletsQuery } from "../api/toilet";
import { useToiletModalInfoQuery } from "../api/comment";

import { CommentInfoProps } from "../types/comment";
import { ToiletInfoProps } from "../types/toilet";
import { ModalPopUpState } from "../types/common";

interface Center {
  lat: number;
  lng: number;
}

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allToilets = useAllToiletsQuery();

  const modal = useSelector<RootState>((state) => state.modal.value);
  const splash = useSelector<RootState>((state) => state.splash.value);
  const center = useSelector<RootState, Center>((state) => state.center.value);
  const callGeoLocationApi = useSelector<RootState>(
    (state) => state.callGeoApi.value
  );
  const currentLocation = useSelector<RootState, Center>(
    (state) => state.currentLocation.value
  );
  const locationAllow = useSelector<RootState>(
    (state) => state.locationAllow.value
  );

  const [drawer, setDrawer] = useState<boolean>(false);
  const [drawerClose, setDrawerClose] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalPopUp, setModalPopUp] = useState<ModalPopUpState>("hidden");
  const [currentPositions, setCurrentPositions] = useState<any[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [toiletId, setToiletId] = useState(0);
  const [currentArea, setCurrentArea] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });
  const [toiletInfo, setToiletInfo] = useState<ToiletInfoProps>({
    title: "",
    roadName: "",
    id: 0,
    latlng: { lat: 37.5566, lng: 126.996 },
  });
  const [commentInfo, setCommentInfo] = useState<CommentInfoProps>({
    length: 0,
    avg: 0,
  });

  const drawerAction = () => {
    setDrawerClose(true);
    setTimeout(() => {
      setDrawer(false);
      setDrawerClose(false);
    }, 500);
  };

  useToiletModalInfoQuery(toiletId, (data) => {
    if (isNaN(data.sum) || isNaN(data.avg))
      setCommentInfo({ length: 0, avg: 0 });
    else setCommentInfo({ length: data.length, avg: data.avg });
  });

  useEffect(() => {
    if (navigator.geolocation && callGeoLocationApi) {
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
          dispatch(changeLocationAllow(true));

          setIsLoading(false);
          dispatch(pauseGeoLocationApi());
        },
        () => {
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const changeCurrentArea = (map: kakao.maps.Map) => {
    setCurrentArea({
      sw: {
        lat: map.getBounds().getSouthWest().getLat(),
        lng: map.getBounds().getSouthWest().getLng(),
      },
      ne: {
        lat: map.getBounds().getNorthEast().getLat(),
        lng: map.getBounds().getNorthEast().getLng(),
      },
    });
  };

  const includePositions = () => {
    if (allToilets.data) {
      const newPositions = [...allToilets.data].filter((m) => {
        return (
          m.latlng.lat >= currentArea.sw.lat &&
          m.latlng.lat < currentArea.ne.lat &&
          m.latlng.lng >= currentArea.sw.lng &&
          m.latlng.lng < currentArea.ne.lng
        );
      });
      setCurrentPositions(newPositions);
    }
  };

  useEffect(() => {
    includePositions();
  }, [currentArea, allToilets.data, center]);

  useEffect(() => {
    if (window.history.length !== 1) dispatch(offSplash());
    else {
      setTimeout(() => {
        dispatch(offSplash());
      }, 3000);
    }
  }, []);

  const overlayClass = () => {
    if (drawerClose)
      return "animate-overlayHide absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
    else return "absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
  };

  return (
    <>
      {splash ? (
        <div className="animate-splashOn bg-tnBlueLight h-[100vh] flex flex-col justify-center items-center">
          <img
            className="w-[194px] h-[233px] mb-[160px] animate-bounce"
            src="/images/common/logo.png"
            alt="logo"
          />
          <img
            className="w-[194px] h-[70px]"
            src="/images/common/typo-logo.svg"
            alt="typo-logo"
          />
        </div>
      ) : (
        <div className="relative">
          <>
            {drawer ? (
              <div
                onClick={() => drawerAction()}
                className={overlayClass()}
              ></div>
            ) : null}

            <Map
              center={center}
              className="w-full h-[100vh] z-0"
              level={2}
              maxLevel={4}
              onCreate={(map) => {
                if (!create) {
                  changeCurrentArea(map);
                }
                setCreate(true);
              }}
              onTileLoaded={(map) => {
                changeCurrentArea(map);
              }}
              onZoomChanged={(map) => {
                changeCurrentArea(map);
              }}
              onDragEnd={(map) => {
                changeCurrentArea(map);
                const position = map.getCenter();
                const lat = position.getLat();
                const lng = position.getLng();
                dispatch(changeCenter({ lat, lng }));
              }}
              onClick={() => {
                if (modalPopUp === "pop-up") {
                  setModalPopUp("pop-down");
                  setTimeout(() => {
                    setModalPopUp("hidden");
                  }, 1000);
                }
              }}
            >
              <>
                <SearchBar />
                <NavButton
                  setDrawer={setDrawer}
                  setModalPopUp={setModalPopUp}
                />
                <CurrentLocationButton />

                {isLoading ? (
                  <Loading content="현재 위치 불러 오는 중" />
                ) : (
                  <MarkerClusterer averageCenter={true} minLevel={4}>
                    {currentPositions.map((position, index) => (
                      <MapMarker
                        key={position.id}
                        position={position.latlng}
                        onClick={() => {
                          setToiletId(position.id);
                          setModalPopUp("pop-up");
                          setToiletInfo(position);
                        }}
                        image={{
                          src: "/images/main/marker-icon.png",
                          size: { width: 24, height: 32 },
                        }}
                      />
                    ))}
                  </MarkerClusterer>
                )}

                {locationAllow && (
                  <MapMarker
                    key="current-location"
                    position={currentLocation}
                    image={{
                      src: "/images/main/current-marker.png",
                      size: { width: 48, height: 57.78 },
                    }}
                  ></MapMarker>
                )}

                <ModalPopUp
                  modalPopUp={modalPopUp}
                  commentInfo={commentInfo}
                  toiletInfo={toiletInfo}
                />
              </>
            </Map>
            {modal && (
              <Modal
                title="로그인이 필요합니다."
                left="취소"
                right="로그인"
                action={() => navigate("/login")}
              />
            )}
            <Drawer drawer={drawer} drawerClose={drawerClose} />
          </>
        </div>
      )}
    </>
  );
};

export default Main;
