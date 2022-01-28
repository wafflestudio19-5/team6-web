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

const HomeHeader = (props: {
  activeLocation: string;
  setActiveLocation: Dispatch<SetStateAction<string>>;
  inactiveLocation: string;
  setInactiveLocation: Dispatch<SetStateAction<string>>;
}) => {
  const [changeLoc, setChangeLoc] = useState<boolean>(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    requester.get<GetMeDto>("users/me/").then((res) => {
      if (res.data.first_location) {
        setLocation(toShortDivision(res.data.first_location));
      }
    });
  }, []);

  const handleLocation = () => {
    setChangeLoc(true);
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleCategory = () => {
    console.log("카테고리 선책창으로 push");
  };

  const changeLocation = (isActive: boolean) => {
    if (!isActive) {
      setChangeLoc(false);
      User.patchMyLocation("alter").then((res) => {
        props.setActiveLocation(toShortDivision(res.data.first_location));
        if (!!res.data.second_location)
          props.setInactiveLocation(toShortDivision(res.data.second_location));
        window.location.replace("/main");
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.locationBox} onClick={handleLocation}>
        <p className={styles.location}>{props.activeLocation}</p>
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
          className={styles.activeLocation}
          onClick={() => changeLocation(true)}
        >
          {props.activeLocation}
        </div>
        <div
          className={styles.inactiveLocation}
          onClick={() => changeLocation(false)}
        >
          {props.inactiveLocation}
        </div>
        <div className={styles.setLocation}>내 동네 설정하기</div>
      </div>
    </div>
  );
  /*
=======
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
>>>>>>> e1123aa0dcb32159f7503ef85847317c4eeabf84 */
};

export default HomeHeader;
