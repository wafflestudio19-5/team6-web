import styles from "./MyCarrot.module.scss";
import icon1 from "../../../icons/MyCarrot/location.png";
import icon2 from "../../../icons/MyCarrot/current_location.png";
import icon3 from "../../../icons/MyCarrot/tag.png";
import icon4 from "../../../icons/MyCarrot/book.png";
import icon5 from "../../../icons/MyCarrot/four_square.png";
import icon6 from "../../../icons/MyCarrot/category.png";
import ProfileBar from "./ProfileBar/ProfileBar";
import HistoryButtons from "./HistoryButtons/HistoryButtons";
import { useNavigate } from "react-router-dom";
import { requester } from "../../../apis/requester";
import { useEffect, useState } from "react";
import { TUserInfo } from "../../../type/user";

const MyCarrot = () => {
  const [myInfo, setMyInfo] = useState<TUserInfo>({
    name: "",
    nickname: "",
    email: "",
    location: "",
    range_of_location: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await requester.get("/users/me/");
      setMyInfo(res.data);
    } catch (error) {
      console.log("getMe error");
    }
  };

  const LinkToEditLocationLevel = () => {
    navigate("/set-location-level", {
      state: {
        level: myInfo.range_of_location,
        localPosition: myInfo.location,
      },
    });
  };

  const LinkToEditLocation = () => {
    navigate("/set-location", {
      state: { prev: "edit" },
    });
  };
  return (
    <div className={styles["mycarrot-wrapper"]}>
      <div className={styles["profile-wrapper"]}>
        <ProfileBar myInfo={myInfo} />
        <HistoryButtons />
      </div>
      <div className={styles.settings}>
        <button onClick={LinkToEditLocationLevel}>
          <img src={icon1} alt="location" />
          <p>내 동네 설정</p>
        </button>
        <button onClick={LinkToEditLocation}>
          <img src={icon2} alt="current location" />
          <p>동네 인증하기</p>
        </button>
        <button
          onClick={() => {
            console.log("알림 키워드 등록");
          }}
        >
          <img src={icon3} alt="tag" />
          <p>알림 키워드 등록</p>
        </button>
        <button
          onClick={() => {
            console.log(myInfo);
          }}
        >
          <img src={icon6} alt="toggle switch" />
          <p>관심 카테고리 설정</p>
        </button>
        <button
          onClick={() => {
            console.log("모아보기");
          }}
        >
          <img src={icon5} alt="모아보기" />
          <p>모아보기</p>
        </button>
        <button
          onClick={() => {
            console.log("당근 가계부");
          }}
        >
          <img src={icon4} alt="moneybook" />
          <p>당근 가계부</p>
        </button>
      </div>
    </div>
  );
};

export default MyCarrot;
