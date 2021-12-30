import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "300px",
      }}
    />
  );
};

export default MapContainer;
