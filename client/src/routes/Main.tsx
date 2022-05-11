import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import ModalPopUp from "../components/ModalPopUp";
import { customAxios } from "../lib/customAxios";
import { IComment, CommentInfoProps, ToiletInfoProps } from "../lib/interfaces";
import SearchBar from "../components/SearchBar";
import CurrentLocationButton from "../components/CurrentLocationButton";

const Main = () => {
  const [positions, setPositions] = useState<any[]>([]);
  const [center, setCenter] = useState({
    lat: 37.5697,
    lng: 126.982,
  });
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

  // 5,000개의 데이터 저장. --> 전체 positions
  useEffect(() => {
    customAxios.get(`/toilets`).then((res) => {
      const { toiletList } = res.data;
      const newData = toiletList.map((el: any) => {
        return {
          id: el.id,
          title: el.toiletName,
          latlng: { lat: el.latitude, lng: el.longitude },
          roadName: el.roadName,
        };
      });
      setPositions(newData);
    });
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
    const newPositions = [...positions].filter((m) => {
      return (
        m.latlng.lat >= currentArea.sw.lat &&
        m.latlng.lat < currentArea.ne.lat &&
        m.latlng.lng >= currentArea.sw.lng &&
        m.latlng.lng < currentArea.ne.lng
      );
    });
    setCurrentPositions(newPositions);
  };

  useEffect(() => {
    includePositions();
  }, [currentArea, positions, center]);

  return (
    <>
      <div className="relative">
        <Map // 지도를 표시할 Container
          center={center}
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
          onClick={() => setModal(false)}
        >
          <SearchBar positions={positions} setCenter={setCenter} />
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
                  setModal(true);
                  setToiletInfo(position);
                  commentRequest(position.id);
                }}
              />
            ))}
          </MarkerClusterer>
          <CurrentLocationButton modal={modal} />
          <ModalPopUp
            modal={modal}
            commentInfo={commentInfo}
            toiletInfo={toiletInfo}
          />
        </Map>
      </div>
    </>
  );
};

export default Main;
