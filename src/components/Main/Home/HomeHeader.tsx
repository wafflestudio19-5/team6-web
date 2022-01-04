import styles from "./HomeHeader.module.scss";
import DownArrow from "../../../icons/Header/down-arrow.png";
import Search from "../../../icons/Header/search.png";
import Category from "../../../icons/Header/category.png";
import Notice from "../../../icons/Header/bell.png";
import { Dispatch, SetStateAction } from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 15ce7d0a2c43bcd70afb1c2d5c06727763b946e7

const HomeHeader = (props: {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}) => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 15ce7d0a2c43bcd70afb1c2d5c06727763b946e7
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
