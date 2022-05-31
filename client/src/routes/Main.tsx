import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import ModalPopUp from "../components/ModalPopUp";
import { customAxios } from "../lib/customAxios";
import { IUser } from "../types/user";
import { IComment, CommentInfoProps } from "../types/comment";
import { ToiletInfoProps } from "../types/toilet";
import SearchBar from "../components/SearchBar";
import CurrentLocationButton from "../components/CurrentLocationButton";
import NavButton from "../components/NavButton";
import Drawer from "../components/Drawer";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAllToiletsQuery } from "../api/toilet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { offSplash } from "../slices/splashSlice";
import { ModalPopUpState } from "../types/common";
import { useUserInfoQuery } from "../api/user";
import { pauseGeoLocationApi } from "../slices/callGeoApiSlice";
import { changeCenter } from "../slices/mapCenterSlice";
import { changeLocationAllow } from "../slices/locationAllowSlice";
import { changeCurrentLocation } from "../slices/currentLocationSlice";
import { useAllCommentsQuery, useToiletModalInfoQuery } from "../api/comment";
import { useQueryClient } from "react-query";

interface Center {
  lat: number;
  lng: number;
}

const Main = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(offSplash());
  //   }, 3000);
  // }, []);
  const queryClient = useQueryClient();
  const modal = useSelector<RootState>((state) => state.modal.value);
  const callGeoLocationApi = useSelector<RootState>(
    (state) => state.callGeoApi.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const splash = useSelector<RootState>((state) => state.splash.value);
  const center = useSelector<RootState, Center>((state) => state.center.value);
  const currentLocation = useSelector<RootState, Center>(
    (state) => state.currentLocation.value
  );
  const locationAllow = useSelector<RootState>(
    (state) => state.locationAllow.value
  );

  // const [center, setCenter] = useState({
  //   center: {
  //     lat: 37.5697,
  //     lng: 126.982,
  //   },
  //   isAllow: false,
  // });

  const [isLoading, setIsLoading] = useState(true);

  const [modalPopUp, setModalPopUp] = useState<ModalPopUpState>("hidden");
  const [create, setCreate] = useState(false);
  const [currentArea, setCurrentArea] = useState({
    sw: { lat: 0, lng: 0 },
    ne: { lat: 0, lng: 0 },
  });
  const [currentPositions, setCurrentPositions] = useState<any[]>([]);
  const [toiletInfo, setToiletInfo] = useState<ToiletInfoProps>({
    title: "",
    roadName: "",
    id: 0,
  });
  const [commentInfo, setCommentInfo] = useState<CommentInfoProps>({
    length: 0,
    avg: 0,
  });
  const [drawer, setDrawer] = useState<boolean>(false);
  const [drawerClose, setDrawerClose] = useState<boolean>(false);
  const drawerAction = () => {
    setDrawerClose(true);
    setTimeout(() => {
      setDrawer(false);
      setDrawerClose(false);
    }, 500);
  };
  const [toiletId, setToiletId] = useState(2014);

  useToiletModalInfoQuery(toiletId, (data) => {
    if (isNaN(data.sum) || isNaN(data.avg))
      setCommentInfo({ length: 0, avg: 0 });
    else setCommentInfo({ length: data.length, avg: data.avg });
  });

  const overlayClass = () => {
    if (drawerClose)
      return "animate-overlayHide absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
    else return "absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
  };

  // const commentRequest = async (toiletId: number) => {
  // const request = await customAxios.get(`/toilets/${toiletId}/comments`);
  // const { commentList } = request.data;
  // queryClient.fetchQuery(["allComments", toiletId]);
  // const commentList = toiletModalInfo?.data?.commentList;
  // const length = commentList?.length;
  // const ratingList = commentList?.map((comment: IComment) => comment.rating);
  // const sum = ratingList?.reduce((prev: number, curr: number) => {
  //   return prev + curr;
  // }, 0);
  // const avg = Math.round((sum / length) * 10) / 10;
  // if (isNaN(sum) || isNaN(avg)) setCommentInfo({ length: 0, avg: 0 });
  // else setCommentInfo({ length, avg });
  // };

  const allToilets = useAllToiletsQuery();
  // const userInfo = useUserInfoQuery();

  // useEffect(() => {
  //   customAxios.get("/users").then((res) => setUserInfo(res.data.userInfo));
  // }, []);

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
          // setCenter((prev) => ({
          //   ...prev,
          //   center: {
          //     lat: position.coords.latitude,
          //     lng: position.coords.longitude,
          //   },
          //   isAllow: true,
          // }));
          setIsLoading(false);
          dispatch(pauseGeoLocationApi());
        },
        (err) => {
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
    // const position = map.getCenter();
    // const lat = position.getLat();
    // const lng = position.getLng();
    // dispatch(changeCenter({ lat, lng }));
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
                {/* setCenter Props, data props 삭제 from SearchBar, CurrentLocationButton */}
                <SearchBar />
                <NavButton setDrawer={setDrawer} />
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
                          // commentRequest(position.id);
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
            <Drawer
              drawer={drawer}
              drawerClose={drawerClose}
              // userInfo={userInfo?.data}
            />
          </>
        </div>
      )}
    </>
  );
};

export default Main;
