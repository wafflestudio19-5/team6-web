import styles from "./MyCarrot.module.scss";
import ProfileBar from "./ProfileBar/ProfileBar";
import HistoryButtons from "./HistoryButtons/HistoryButtons"

const MyCarrot = () => {
  return (
    <div className={styles["mycarrot-wrapper"]}>
      <div className={styles["profile-wrapper"]}>
          <ProfileBar />
          <HistoryButtons />
      </div>
      <div className={styles.settings}></div>
    </div>
  );
};

export default MyCarrot;
