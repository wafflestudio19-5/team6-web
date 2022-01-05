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

const MyCarrot = () => {
  const navigate = useNavigate();

  const LinkToEditLocation = () => {
    navigate("/setlocation", {
      state: { prev: "edit" },
    });
  };
  return (
    <div className={styles["mycarrot-wrapper"]}>
      <div className={styles["profile-wrapper"]}>
        <ProfileBar />
        <HistoryButtons />
      </div>
      <div className={styles.settings}>
        <button
          onClick={() => {
            console.log("내 동네 설정");
          }}
        >
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
            console.log("관심 카테고리 설정");
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
