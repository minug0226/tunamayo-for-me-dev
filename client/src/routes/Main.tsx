import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ModalPopUp from "../components/ModalPopUp";
import { customAxios } from "../lib/customAxios";
import {
  IComment,
  CommentInfoProps,
  ToiletInfoProps,
  IUser,
} from "../lib/interfaces";
import SearchBar from "../components/SearchBar";
import CurrentLocationButton from "../components/CurrentLocationButton";
import NavButton from "../components/NavButton";
import Drawer from "../components/Drawer";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getAllToilets } from "../api";

interface ToiletList {
  id: number;
  title: string;
  latlng: Latlng;
  roadName: string;
}

interface Latlng {
  lat: number;
  lng: number;
}

const Main = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  // const [positions, setPositions] = useState<any[]>([]);
  const [center, setCenter] = useState({
    center: {
      lat: 37.5697,
      lng: 126.982,
    },
    isAllow: false,
  });

  const [loading, setLoading] = useState(true);
  const [modalPopUp, setModalPopUp] = useState(false);
  const [modal, setModal] = useState(false);
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

  const overlayClass = () => {
    if (drawerClose)
      return "animate-overlayHide absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
    else return "absolute top-0 bg-black opacity-40 w-full h-[100vh] z-40";
  };

  const commentRequest = async (toiletId: number) => {
    const request = await customAxios.get(`/toilets/${toiletId}/comments`);
    const { commentList } = request.data;
    const length = commentList.length;
    const ratingList = commentList.map((comment: IComment) => comment.rating);
    const sum = ratingList.reduce((prev: number, curr: number) => {
      return prev + curr;
    }, 0);
    const avg = Math.round((sum / length) * 10) / 10;
    if (isNaN(sum) || isNaN(avg)) setCommentInfo({ length: 0, avg: 0 });
    else setCommentInfo({ length, avg });
  };

  const { isLoading, data } = useQuery<ToiletList[]>(
    "allToilets",
    getAllToilets
  );

  useEffect(() => {
    customAxios.get("/users").then((res) => setUserInfo(res.data.userInfo));
  }, []);

  useEffect(() => {
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
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          console.log(err);
        }
      );
    }
    // 사용자가 위치 동의 허용을 하지 않았을 때
    else {
      setLoading(false);
    }
  }, []);

  const changeCurrentArea = (map: any) => {
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

  // currentArea의 sw 위도 보다 크고, ne 위도 보다 작고, sw 경도보다 크고, ne 경도보다 작은 포지션 포함된 범위.
  // currentPositions에 그 범위를 담는다.
  const includePositions = () => {
    if (data) {
      const newPositions = [...data].filter((m) => {
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
  }, [currentArea, data, center]);

  return (
    <>
      <div className="relative">
        {drawer ? (
          <div onClick={() => drawerAction()} className={overlayClass()}></div>
        ) : null}

        <Map // 지도를 표시할 Container
          center={center.center}
          className="w-full h-[100vh] z-0"
          level={2} // 지도의 확대 레벨
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
          }}
          onClick={() => {
            setModalPopUp(false);
          }}
        >
          <SearchBar data={data} setCenter={setCenter} />
          <NavButton setDrawer={setDrawer} />
          <CurrentLocationButton setCenter={setCenter} />
          {isLoading ? (
            <Loading content="현재 위치 불러 오는 중" />
          ) : (
            <MarkerClusterer
              averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
              minLevel={4} // 클러스터 할 최소 지도 레벨
            >
              {currentPositions.map((position, index) => (
                <MapMarker
                  key={position.id}
                  position={position.latlng} // 마커를 표시할 위치
                  // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  onClick={() => {
                    setModalPopUp(true);
                    setToiletInfo(position);
                    commentRequest(position.id);
                  }}
                  image={{
                    src: "/images/main/marker-icon.png",
                    size: { width: 24, height: 32 },
                  }}
                />
              ))}
            </MarkerClusterer>
          )}
          {center.isAllow && (
            <MapMarker
              key="current-location"
              position={center.center}
              image={{
                src: "/images/main/current-marker.png",
                size: { width: 48, height: 57.78 },
              }}
            />
          )}

          <ModalPopUp
            modalPopUp={modalPopUp}
            commentInfo={commentInfo}
            toiletInfo={toiletInfo}
          />
        </Map>
        {modal && (
          <Modal
            setModal={setModal}
            title="로그인이 필요합니다."
            left="취소"
            right="로그인"
            action={() => navigate("/login")}
          />
        )}
        <Drawer
          drawer={drawer}
          drawerClose={drawerClose}
          userInfo={userInfo}
          setModal={setModal}
        />
      </div>
    </>
  );
};

export default Main;
