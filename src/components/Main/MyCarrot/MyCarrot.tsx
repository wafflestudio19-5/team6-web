import styles from "./MyCarrot.module.scss";
import ProfileBar from "./ProfileBar/ProfileBar";

const MyCarrot = () => {
  return (
    <div className={styles["mycarrot-wrapper"]}>
      <div className={styles["profile-wrapper"]}>
          <ProfileBar />
      </div>
      <div className={styles.settings}></div>
    </div>
  );
};

export default MyCarrot;
