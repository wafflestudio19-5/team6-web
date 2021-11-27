import styles from "./HomeHeader.module.scss";
import DownArrow from "../../../Image/Header/down-arrow.png";
import Search from "../../../Image/Header/search.png";
import Category from "../../../Image/Header/category.png";
import Notice from "../../../Image/Header/bell.png";
import {Dispatch, SetStateAction} from "react";

const HomeHeader = (props: {location:string, setLocation:Dispatch<SetStateAction<string>>}) => {
  const handleLocation = () => {
    console.log("위치 재지정하는 팝업");
  };

  const handleSearch = () => {
    console.log("검색창으로 push");
  };

  const handleCategory = () => {
    console.log("카테고리 선책창으로 push");
  };

  const handleNotice = () => {
    console.log("알림창으로 push");
  };
  return (
    <>
      <div className={styles.locationBox} onClick={handleLocation}>
        <p className={styles.location}>{props.location}</p>
        <img className={styles.locationArrow} src={DownArrow} alt="화살표" />
      </div>
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
    </>
  );
};

export default HomeHeader;
