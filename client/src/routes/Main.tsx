import { Map, MapMarker } from "react-kakao-maps-sdk";

const Main = () => {
  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        className="w-[100%] h-[100vh] relative z-0"
      >
        <input className="absolute w-[50%] h-10 z-10 bg-transparent border border-tnRed top-0 left-[20%]" />

        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>
  );
};

export default Main;
