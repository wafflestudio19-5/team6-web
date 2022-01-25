import styles from "./SelectLocation.module.scss";
import { regionData } from "../../Region";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import BackArrow from "../../icons/leftArrow.png";
import Spinner from "../../icons/SelectLocation/spinner-circle.gif";
import SearchIcon from "../../icons/SelectLocation/search.png";
import CancelIcon from "../../icons/SelectLocation/cancel.png";
import CurrentIcon from "../../icons/SelectLocation/current.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_ID } from "../../KakaoLogin/OAuth";

const SelectLocation = () => {
  const [searchingRegion, setSearchingRegion] = useState<string>("");
  const [searchingList, setSearchingList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const regionQuery = params.get("region");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (regionQuery) {
      setSearchingRegion(regionQuery);
      setSearchingList(
        regionData.filter((region) => region.match(regionQuery) !== null)
      );
    }
  }, [regionQuery]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchingList(
      regionData.filter((region) => region.match(searchingRegion) !== null)
    );
    console.log(searchingList);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    navigate(`/test?region=${e.target.value}`);
    setSearchingRegion(e.target.value);
    setSearchingList(
      regionData.filter((region) => region.match(e.target.value) !== null)
    );
  };

  const clearInput = () => {
    setSearchingRegion("");
    setSearchingList([]);
    inputRef.current?.focus();
  };

  const getLocal = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${CLIENT_ID}`,
                },
              }
            )
            .then((res) => {
              setSearchingList(
                regionData.filter(
                  (region) =>
                    region.match(res.data.documents[1].address_name) !== null
                )
              );
              setLoading(false);
            })
            .catch(() => {
              console.log("카카오 로컬 에러");
            });
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
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to="/main" className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={searchingRegion}
            onChange={onChange}
            placeholder="내 동네 이름(동,읍,면)으로 검색"
          />
          <img src={SearchIcon} className={styles.search} alt="검색" />
          <img
            src={CancelIcon}
            className={`${styles.cancel} ${
              searchingRegion.length !== 0 && styles.show
            }`}
            onClick={clearInput}
            alt="지우기"
          />
        </form>
      </header>
      <div className={styles["body-wrapper"]}>
        <button className={styles["current-location"]} onClick={getLocal}>
          <img src={CurrentIcon} alt="현재 위치" />
          <span>현재 위치로 찾기</span>
        </button>
        <p className={styles.text}>{`'${searchingRegion}' 검색결과`}</p>
        {!loading && (
          <div className={styles["region-wrapper"]}>
            {searchingList.map((region, index) => (
              <button key={index}>
                <p>{region}</p>
              </button>
            ))}
          </div>
        )}
        {loading && (
          <img className={styles.spinner} src={Spinner} alt="로딩중" />
        )}
      </div>
    </div>
  );
};

export default SelectLocation;
