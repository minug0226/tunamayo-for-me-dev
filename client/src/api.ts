import { customAxios } from "./lib/customAxios";

interface ToiletList {
  id: number;
  toiletName: string;
  latitude: number;
  longitude: number;
  roadName: string;
}

export const getAllToilets = () => {
  return customAxios.get(`/toilets`).then((res) => {
    const { toiletList } = res.data;
    const newData = toiletList.map((el: ToiletList) => {
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
