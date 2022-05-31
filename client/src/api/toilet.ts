import { useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";
import { MapToiletList } from "../types/map";
import { ToiletList } from "../types/toilet";

// 모든 화장실 리스트 가져오기
const getAllToilets = async () => {
  return customAxios.get(`/toilets`).then((res) => {
    const { toiletList } = res.data;
    const newData = toiletList.map((el: MapToiletList) => {
      return {
        id: el.id,
        title: el.toiletName,
        latlng: { lat: el.latitude, lng: el.longitude },
        roadName: el.roadName,
      };
    });
    return newData;
  });
};

export const useAllToiletsQuery = () =>
  useQuery<ToiletList[]>("allToilets", getAllToilets);

// 특정 화장실 상세 정보 가져오기
const getToiletById = (toiletId: number) => {
  return customAxios.get(`toilets/${toiletId}`);
};

export const useToiletQuery = (toiletId: number) =>
  useQuery(["toilet", toiletId], () => getToiletById(toiletId), {
    select: (res) => res.data.toiletInfo,
  });
