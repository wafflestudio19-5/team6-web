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
    if (isFirst && props.firstVerified)
      localStorage.setItem("verified", "true");
    else if (isFirst && !props.firstVerified)
      localStorage.setItem("verified", "false");
    else if (!isFirst && props.secondVerified)
      localStorage.setItem("verified", "true");
    else if (!isFirst && !props.secondVerified)
      localStorage.setItem("verified", "false");
  }, []);
  const user = useUserState();

  const handleLocation = () => {
    if (!!props.secondLocation) setChangeLoc(true);
    else navigate("/set-location");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleCategory = () => {
    console.log("???????????? ??????????????? push");
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
        toast("?????? ????????? ??????????????????!", {
          style: {
            borderRadius: "4px",
            background: "black",
            padding: "6px",
            color: "#fff",
            font: "-moz-initial",
          },
          position: "bottom-center",
        });
        navigate("/main&page=home", { state: { location_changed: true } });
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
          alt="?????????"
        />
      </div>
      <div className={styles.headerImages}>
        <img
          className={styles.headerImg}
          src={Search}
          onClick={handleSearch}
          alt="??????"
        />
        <img
          className={styles.headerImg}
          src={Category}
          onClick={handleCategory}
          alt="????????????"
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
          ??? ?????? ????????????
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
