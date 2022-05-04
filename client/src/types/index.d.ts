import * as kakaoMaps from "react-kakao-maps-sdk";

declare module "react-kakao-maps-sdk" {
  interface MapMarkerProps {
    children?: React.ReactNode;
  }
  interface MapProps {
    children?: React.ReactNode;
  }
}
