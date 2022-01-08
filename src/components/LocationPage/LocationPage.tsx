import styles from "./LocationPage.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Loading from "../../icons/Signup/icons8-spinner.gif";
import currentLocationIcon from "../../icons/Signup/current.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import { user } from "../../apis/requester";

declare global {
  interface Window {
    kakao: any;
  }
}

type TSignupForm = {
  username: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  email: string;
  location: string;
};

const LocationPage = () => {
  const [lat, setLat] = useState<number>(37.460103);
  const [lon, setLon] = useState<number>(126.951873);
  const [prev, setPrev] = useState<string>("");
  const [signupForm, setSignupForm] = useState<TSignupForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [localPosition, setLocalPosition] = useState<string>("");
  const [specificPosition, setSpecificPosition] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setPrev(location.state.prev);
      location.state.prev === "signup" &&
        setSignupForm(location.state.signupForm);
      location.state.prev === "edit" &&
        !localStorage.getItem("token") &&
        navigate("/login");
      location.state = null;
    } else {
      navigate("/login");
    }
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);
    setLocalPosition("");
    setSpecificPosition("");
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
      alert("GPS를 지원하지 않습니다");
      return;
    }
  };

  const getLocal = async (latitude: number, longitude: number) => {
    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: "KakaoAK 68d70ae34f86a01071c5f8f5d972c593",
          },
        }
      );
      setLocalPosition(res.data.documents[1].address_name);
      setSpecificPosition(res.data.documents[1].region_3depth_name);
    } catch (error) {
      console.log("에러");
    }
  };

  const handleToGoBack = () => {
    prev === "signup"
      ? navigate("/signup", {
          state: { inputs: signupForm },
        })
      : navigate("/main", {
          state: { page: "user" },
        });
  };

  const handleToSignUp = async () => {
    try {
      console.log(localPosition);
      const res1 = await user.post("/users/", {
        ...signupForm,
        name: signupForm?.username,
        location: localPosition,
      });
      const res2 = await user.post("/users/signin/", {
        name: signupForm?.username,
        password: signupForm?.password,
      });
      localStorage.setItem("token", res2.data.access_token);
      navigate("/main");
    } catch (error) {
      console.log("회원가입 실패");
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <button className={styles.back} onClick={handleToGoBack}>
          <img src={BackArrow} alt="뒤로" />
        </button>
        <p>동네 설정하기</p>
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
      <div className={styles.subwrapper}>
        {!!localPosition ? (
          <p className={styles.locationtext}>
            현재 위치가 <b>'{localPosition}'</b> 내에 있습니다.
          </p>
        ) : (
          <p className={styles.locationtext}>현재 위치를 찾는 중입니다.</p>
        )}
        <button
          className={styles.signup}
          disabled={!localPosition}
          onClick={handleToSignUp}
        >
          <b>{!!specificPosition ? specificPosition : "이 동네"}</b>에서
          {prev === "signup" ? " 회원가입" : " 거래하기"}
        </button>
      </div>
    </div>
  );
};

export default LocationPage;
