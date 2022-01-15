import styles from "./HomeHeader.module.scss";
import DownArrow from "../../../icons/Header/down-arrow.png";
import Search from "../../../icons/Header/search.png";
import Category from "../../../icons/Header/category.png";
import Notice from "../../../icons/Header/bell.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requester from "../../../apis/requester";
import { userType } from "../../../type/types";

const HomeHeader = (props: {}) => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    requester.get("users/me/").then((res) => {
      const splitResult = res.data.location.split(" ");
      setLocation(splitResult[splitResult.length - 1]);
    });
  }, []);

  const handleLocation = () => {
    console.log("위치 재지정하는 팝업");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleCategory = () => {
    console.log("카테고리 선책창으로 push");
  };

  const handleNotice = () => {
    console.log("알림창으로 push");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.locationBox} onClick={handleLocation}>
        <p className={styles.location}>{location}</p>
        <img className={styles.locationArrow} src={DownArrow} alt="화살표" />
      </div>
      <div className={styles.headerImages}>
        <img
          className={styles.headerImg}
          src={Search}
          onClick={handleSearch}
          alt="검색"
        />
        <img
          className={styles.headerImg}
          src={Category}
          onClick={handleCategory}
          alt="카테고리"
        />
        <img
          className={styles.headerImg}
          src={Notice}
          onClick={handleNotice}
          alt="알림"
        />
      </div>
    </div>
  );
};

export default HomeHeader;
