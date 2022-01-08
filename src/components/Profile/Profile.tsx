import styles from "./Profile.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Test from "../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import MannerTemperature from "./MannerTemperature/MannerTemperature";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import requester from "../../apis/requester";
import { useEffect, useState } from "react";
import { TUserInfo } from "../../type/user";

const Profile = () => {
  const [myInfo, setMyInfo] = useState<TUserInfo>();
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

  const handleToEditProfilePage = () => {
    navigate("./edit", { state: { prev: "profile" } });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to="/main" state={{ page: "user" }} className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>프로필</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <div className={styles.imageframe}>
          <img className={styles.image} src={Test} alt="profile image" />
        </div>
        <p className={styles.nickname}>{`${
          myInfo ? myInfo.nickname : "닉네임"
        }`}</p>
        <p className={styles["id-location"]}>{`#${
          myInfo ? myInfo.name : "id"
        }`}</p>
        <button className={styles.edit} onClick={handleToEditProfilePage}>
          프로필 수정
        </button>
        <MannerTemperature />
        <ProfileButtons />
      </div>
    </div>
  );
};

export default Profile;
