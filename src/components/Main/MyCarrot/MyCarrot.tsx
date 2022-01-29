import styles from "./MyCarrot.module.scss";
import icon1 from "../../../icons/MyCarrot/location.png";
import icon2 from "../../../icons/MyCarrot/current_location.png";
import icon6 from "../../../icons/MyCarrot/category.png";
import ProfileBar from "./ProfileBar/ProfileBar";
import HistoryButtons from "./HistoryButtons/HistoryButtons";
import { useNavigate } from "react-router-dom";
import requester from "../../../apis/requester";
import { useEffect, useState } from "react";
import { TUserInfo, TUserInfoV2 } from "../../../type/user";
import { toShortDivision } from "../../Utilities/functions";
import InterestCategory from "./InterestCategory/InterestCategory";

const MyCarrot = () => {
  const [activeLocation, setActiveLocation] = useState<string>("");
  const [myInfo, setMyInfo] = useState<TUserInfoV2>({
    first_location: "",
    first_location_verified: false,
    first_range_of_location: "LEVEL_ONE",
    is_first_location_active: true,
    second_location: "",
    second_location_verified: false,
    second_range_of_location: "LEVEL_ONE",
    name: "",
    nickname: "",
    image_url: "",
    is_active: true,
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await requester.get("/users/me/");
      setMyInfo(res.data);
      res.data.is_first_location_active
        ? setActiveLocation(res.data.first_location)
        : setActiveLocation(res.data.second_location);
    } catch (error) {
      console.log("getMe error");
    }
  };

  const LinkToEditLocationLevel = () => {
    navigate("/set-location");
  };

  const LinkToEditLocation = () => {
    navigate("/verify-location", {
      state: { prev: "edit" },
    });
  };
  const handleCategory = () => {
    navigate("/set-category");
  };
  return (
    <>
      <div className={styles["mycarrot-wrapper"]}>
        <div className={styles["profile-wrapper"]}>
          <ProfileBar
            image={myInfo.image_url}
            name={myInfo.name}
            nickname={myInfo.nickname}
            division={toShortDivision(activeLocation)}
          />
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
          <button onClick={handleCategory}>
            <img src={icon6} alt="toggle switch" />
            <p>관심 카테고리 설정</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyCarrot;
