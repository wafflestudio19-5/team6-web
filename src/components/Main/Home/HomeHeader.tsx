import styles from "./HomeHeader.module.scss";
import DownArrow from "../../../icons/Header/down-arrow.png";
import Search from "../../../icons/Header/search.png";
import Category from "../../../icons/Header/category.png";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../../apis/User/User";
import { toShortDivision } from "../../Utilities/functions";
import { toast } from "react-hot-toast";
import Notice from "../../../icons/Header/bell.png";
import requester from "../../../apis/requester";
import { GetMeDto } from "../../../type/dto/for-api/get-me.dto";
import { useUserState } from "../../../context/user-context";

const HomeHeader = (props: {
  firstLocation: string;
  setFirstLocation: Dispatch<SetStateAction<string>>;
  secondLocation: string;
  setSecondLocation: Dispatch<SetStateAction<string>>;
  firstVerified: boolean;
  secondVerified: boolean;
}) => {
  const [changeLoc, setChangeLoc] = useState<boolean>(false);
  const [location, setLocation] = useState("");
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    requester.get<GetMeDto>("users/me/").then((res) => {
      if (res.data.first_location) {
        setLocation(toShortDivision(res.data.first_location));
      }
    });
    if (localStorage.getItem("region") === "second") setIsFirst(false);
  }, []);
  const user = useUserState();

  const handleLocation = () => {
    setChangeLoc(true);
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleCategory = () => {
    console.log("카테고리 선책창으로 push");
  };

  const changeLocation = (isActive: boolean, number: number) => {
    if (!isActive) {
      setChangeLoc(false);
      if (number === 1) localStorage.setItem("region", "first");
      else localStorage.setItem("region", "second");
      User.patchMyLocation("alter").then((res) => {
        props.setFirstLocation(toShortDivision(res.data.first_location));
        if (!!res.data.second_location)
          props.setSecondLocation(toShortDivision(res.data.second_location));
        window.location.replace("/main");
      });
    }
  };

  const onClickSetLocation = () => {
    navigate("/set-location");
  };

  if (!user) {
    return <div className={styles.wrapper} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.locationBox} onClick={handleLocation}>
        <p className={styles.location}>
          {isFirst ? props.firstLocation : props.secondLocation}
        </p>
        <img
          className={changeLoc ? styles.locationUpArrow : styles.locationArrow}
          src={DownArrow}
          alt="화살표"
        />
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
      </div>
      <div
        className={`${styles.backShadow} ${changeLoc ? styles.show : ""}`}
        onClick={() => setChangeLoc(false)}
      />
      <div className={changeLoc ? styles.bubble : styles.noBubble}>
        <div
          className={isFirst ? styles.activeLocation : styles.inactiveLocation}
          onClick={() => changeLocation(isFirst, 1)}
        >
          {props.firstLocation}
        </div>
        <div
          className={isFirst ? styles.inactiveLocation : styles.activeLocation}
          onClick={() => changeLocation(!isFirst, 2)}
        >
          {props.secondLocation}
        </div>
        <div className={styles.setLocation} onClick={onClickSetLocation}>
          내 동네 설정하기
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
