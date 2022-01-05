import styles from "./ProfileBar.module.scss";
import ArrowIcon from "../../../../icons/MyCarrot/right-arrow.png";
import EditIcon from "../../../../icons/MyCarrot/edit.png";
import Test from "../../../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "../../../../apis/requester";

type TUserInfo = {
  nickname: string;
  localPosition: string;
};

const ProfileBar = () => {
  const [myInfo, setMyInfo] = useState<TUserInfo>({
    nickname: "닉네임",
    localPosition: "주소",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const res = await requester.get("/users/me/");
      setMyInfo({
        nickname: res.data.nickname,
        localPosition: res.data.location.split(" ").at(-1),
      });
    } catch (error) {
      console.log("getMe error");
    }
  };

  const handleToEditProfilePage = () => {
    navigate("/profile/edit", { state: { prev: "main" } });
  };

  return (
    <div>
      <Link to="/profile" className={styles["profile-button"]}>
        <div className={styles.imageframe}>
          <img className={styles.image} src={Test} alt="profile image" />
        </div>
        <p className={styles.nickname}>{myInfo.nickname}</p>
        <p className={styles["id-location"]}>{myInfo.localPosition} #id</p>
        <img className={styles.rightarrow} src={ArrowIcon} alt="right arrow" />
      </Link>
      <button className={styles.editbutton} onClick={handleToEditProfilePage}>
        <img className={styles.editicon} src={EditIcon} alt="edit" />
      </button>
    </div>
  );
};

export default ProfileBar;
