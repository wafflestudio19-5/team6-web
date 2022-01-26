import styles from "./SelectLocation.module.scss";
import { regionData } from "../../Region";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import BackArrow from "../../icons/leftArrow.png";
import Spinner from "../../icons/SelectLocation/spinner-circle.gif";
import SearchIcon from "../../icons/SelectLocation/search.png";
import CancelIcon from "../../icons/SelectLocation/cancel.png";
import CurrentIcon from "../../icons/SelectLocation/current.png";
import SearchResultIcon from "../../icons/SelectLocation/search-result.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_ID } from "../../KakaoLogin/OAuth";
import RegionList from "./RegionList/RegionList";

const SelectLocation = () => {
  const [searchingRegion, setSearchingRegion] = useState<string>("");
  const [searchingList, setSearchingList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<string>("NO_INPUT");

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const regionQuery = params.get("region");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (regionQuery !== null) {
      if (regionQuery !== "") {
        const regionList = regionData.filter(
          (region) => region.match(regionQuery) !== null
        );
        regionList.length !== 0
          ? setSearchState("REGIONS_EXIST")
          : setSearchState("NOT_EXIST");
        setSearchingList(regionList);
      } else {
        setSearchState("NO_INPUT");
        setSearchingList([]);
      }
      setSearchingRegion(regionQuery);
    } else {
      getLocal();
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\s\uFEFF\xA0]+/gi;
    const searchWord = e.target.value.replace(regex, ""); // 맨 앞 띄어쓰기만 제거
    if (searchWord === "") {
      navigate(`/test?region=${searchWord}`);
      setSearchState("NO_INPUT");
      setSearchingList([]);
    } else {
      navigate(`/test?region=${searchWord}`);
      const regionList = regionData.filter(
        (region) => region.match(searchWord) !== null
      );
      regionList.length !== 0
        ? setSearchState("REGIONS_EXIST")
        : setSearchState("NOT_EXIST");
      setSearchingList(regionList);
    }
    setSearchingRegion(searchWord);
  };

  const clearInput = () => {
    navigate(`/test?region=`);
    setSearchState("NO_INPUT");
    setSearchingRegion("");
    setSearchingList([]);
    inputRef.current?.focus();
  };

  const getLocal = () => {
    if (navigator.geolocation) {
      clearInput();
      setLoading(true);
      setSearchState("GET_LOCATION");
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
        {searchState === "GET_LOCATION" &&
          (loading ? (
            <img className={styles.spinner} src={Spinner} alt="로딩중" />
          ) : (
            <>
              <p className={styles.text}>현재 위치 조회 결과</p>
              <RegionList searchingList={searchingList} />
            </>
          ))}
        {searchState === "REGIONS_EXIST" && (
          <>
            <p className={styles.text}>{`'${searchingRegion}' 검색결과`}</p>
            <RegionList searchingList={searchingList} />
          </>
        )}
        {searchState === "NOT_EXIST" && (
          <>
            <p className={styles.text}>{`'${searchingRegion}' 검색결과`}</p>
            <img
              className={styles["no-result"]}
              src={SearchResultIcon}
              alt="검색 결과"
            />
            <p className={styles["no-result-text-one"]}>
              검색 결과가 없습니다.
              <br />
              동네 이름을 다시 확인해주세요!
            </p>
          </>
        )}
        {searchState === "NO_INPUT" && (
          <p className={styles["no-result-text-one"]}>검색어를 입력하세요.</p>
        )}
      </div>
    </div>
  );
};

export default SelectLocation;
