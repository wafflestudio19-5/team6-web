import styles from "./Profile.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Test from "../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import MannerTemperature from "./MannerTemperature/MannerTemperature";
import ProfileButtons from "./ProfileButtons/ProfileButtons";

const Profile = () => {
  const navigate = useNavigate();

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
        <p className={styles.nickname}>닉네임</p>
        <p className={styles["id-location"]}>#id</p>
        <button className={styles.edit} onClick={handleToEditProfilePage}>
          프로필 수정
        </button>
        <MannerTemperature />
        <section>인증 내역</section>
        <ProfileButtons />
      </div>
    </div>
  );
};

export default Profile;
