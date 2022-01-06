import styles from "./ProfileBar.module.scss";
import ArrowIcon from "../../../../icons/MyCarrot/right-arrow.png";
import EditIcon from "../../../../icons/MyCarrot/edit.png";
import Test from "../../../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import { TUserInfo } from "../../../../type/user";

const ProfileBar = (props: { myInfo: TUserInfo }) => {
  const navigate = useNavigate();

  const toShort = (location: any) => {
    return location.split(" ").at(-1);
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
        <p className={styles.nickname}>{props.myInfo.nickname}</p>
        <p className={styles["id-location"]}>
          {toShort(props.myInfo.location)}
        </p>
        <img className={styles.rightarrow} src={ArrowIcon} alt="right arrow" />
      </Link>
      <button className={styles.editbutton} onClick={handleToEditProfilePage}>
        <img className={styles.editicon} src={EditIcon} alt="edit" />
      </button>
    </div>
  );
};

export default ProfileBar;
