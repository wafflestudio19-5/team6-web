import styles from "./LocationPage.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Loading from "../../icons/Signup/icons8-spinner.gif";
import currentLocationIcon from "../../icons/Signup/current.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import requester, { user } from "../../apis/requester";
import { toast } from "react-hot-toast";
import { CLIENT_ID } from "../../KakaoLogin/OAuth";
import { toShortDivision } from "../Utilities/functions";

declare global {
  interface Window {
    kakao: any;
  }
}

const LocationPage = () => {
  const [lat, setLat] = useState<number>(37.460103);
  const [lon, setLon] = useState<number>(126.951873);
  const [prev, setPrev] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [localPosition, setLocalPosition] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPrev(location.state.prev);
    getMyInfo();
    getLocation();
  }, []);

  const getMyInfo = () => {
    requester
      .get("/users/me/")
      .then((res) => {
        setLocalPosition(
          res.data.is_first_location_active
            ? res.data.first_location
            : res.data.second_location
        );
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const getLocation = () => {
    setLoading(true);
    setCurrentPosition("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLoading(false);
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          getLocal(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      toast.error("GPS를 지원하지 않습니다");
      return;
    }
  };

  const getLocal = async (latitude: number, longitude: number) => {
    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${CLIENT_ID}`,
          },
        }
      );
      setCurrentPosition(res.data.documents[1].address_name);
    } catch (error) {
      console.log("에러");
    }
  };

  const handleToGoBack = () => {
    prev !== "" ? navigate("/main?page=user") : navigate(-1);
  };

  const handleToVerifyLocation = () => {
    requester({
      url: "/users/me/location/",
      method: "PATCH",
      data: "verify",
      headers: { "Content-Type": "text/plain" },
    })
      .then((res) => {
        console.log(res.data);
        toast("동네인증이 완료되었습니다.");
        navigate("/main?page=user");
      })
      .catch(() => {
        console.log("verify location error");
      });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <button className={styles.back} onClick={handleToGoBack}>
          <img src={BackArrow} alt="뒤로" />
        </button>
        <p>동네 인증하기</p>
      </header>
      <div className={styles.mapwrapper}>
        <Map
          center={{
            lat: lat,
            lng: lon,
          }}
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          <MapMarker position={{ lat: lat, lng: lon }} />
        </Map>
        {loading && (
          <div className={styles.loading}>
            <img src={Loading} />
          </div>
        )}
      </div>
      <button className={styles.currentLocation} onClick={getLocation}>
        <img src={currentLocationIcon} alt="현재 위치" />
      </button>
      <p
        className={`${styles.warning} ${
          !loading && localPosition !== currentPosition && styles.show
        }`}
      >
        잠깐만요! 현재 위치가 <b>{toShortDivision(currentPosition)}이에요.</b>
      </p>
      <div
        className={`${styles.subwrapper} ${
          !loading && localPosition !== currentPosition && styles.lower
        }`}
      >
        {loading && (
          <p className={styles.locationtext}>현재 위치를 찾는 중입니다.</p>
        )}
        {!loading &&
          (localPosition === currentPosition ? (
            <p className={styles.locationtext}>
              현재 위치가 내 동네로 설정한 <b>'{localPosition}'</b> 내에 있어요.
            </p>
          ) : (
            <p className={styles.locationtext}>
              현재 내 동네로 설정되어 있는 <b>'{localPosition}'</b>에서만
              동네인증을 할 수 있어요. 현재 위치를 확인해주세요.
            </p>
          ))}
        <button
          className={styles.signup}
          disabled={localPosition !== currentPosition}
          onClick={handleToVerifyLocation}
        >
          <b>동네인증 완료하기</b>
        </button>
      </div>
    </div>
  );
};

export default LocationPage;
