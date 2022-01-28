import styles from "./ProfileBar.module.scss";
import ArrowIcon from "../../../../icons/MyCarrot/right-arrow.png";
import EditIcon from "../../../../icons/MyCarrot/edit.png";
import Test from "../../../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import { toShortDivision } from "../../../Utilities/functions";

const ProfileBar = ({
  image,
  name,
  nickname,
  division,
}: {
  image: string;
  name: string;
  nickname: string;
  division: string;
}) => {
  const navigate = useNavigate();

  const handleToEditProfilePage = () => {
    navigate("/profile/edit", { state: { prev: "main" } });
  };

  return (
    <div>
      <Link to={`/profile/${name}`} className={styles["profile-button"]}>
        <div className={styles.imageframe}>
          <img
            className={styles.image}
            src={image ? image : Test}
            alt="profile image"
          />
        </div>
        <p className={styles.nickname}>{nickname}</p>
        <p className={styles["id-location"]}>{toShortDivision(division)}</p>
        <img className={styles.rightarrow} src={ArrowIcon} alt="right arrow" />
      </Link>
      <button className={styles.editbutton} onClick={handleToEditProfilePage}>
        <img className={styles.editicon} src={EditIcon} alt="edit" />
      </button>
    </div>
  );
};

export default ProfileBar;
