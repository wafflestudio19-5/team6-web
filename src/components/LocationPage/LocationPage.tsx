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
      toast.error("GPS??? ???????????? ????????????");
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
      console.log("??????");
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
        toast("??????????????? ?????????????????????.");
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
          <img src={BackArrow} alt="??????" />
        </button>
        <p>?????? ????????????</p>
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
        <img src={currentLocationIcon} alt="?????? ??????" />
      </button>
      <p
        className={`${styles.warning} ${
          !loading && localPosition !== currentPosition && styles.show
        }`}
      >
        ????????????! ?????? ????????? <b>{toShortDivision(currentPosition)}?????????.</b>
      </p>
      <div
        className={`${styles.subwrapper} ${
          !loading && localPosition !== currentPosition && styles.lower
        }`}
      >
        {loading && (
          <p className={styles.locationtext}>?????? ????????? ?????? ????????????.</p>
        )}
        {!loading &&
          (localPosition === currentPosition ? (
            <p className={styles.locationtext}>
              ?????? ????????? ??? ????????? ????????? <b>'{localPosition}'</b> ?????? ?????????.
            </p>
          ) : (
            <p className={styles.locationtext}>
              ?????? ??? ????????? ???????????? ?????? <b>'{localPosition}'</b>?????????
              ??????????????? ??? ??? ?????????. ?????? ????????? ??????????????????.
            </p>
          ))}
        <button
          className={styles.signup}
          disabled={localPosition !== currentPosition}
          onClick={handleToVerifyLocation}
        >
          <b>???????????? ????????????</b>
        </button>
      </div>
    </div>
  );
};

export default LocationPage;
