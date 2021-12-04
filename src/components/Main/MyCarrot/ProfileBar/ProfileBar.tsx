import styles from "./Profile.module.scss";
import ArrowIcon from "../../../../icons/MyCarrot/right-arrow.png";
import EditIcon from "../../../../icons/MyCarrot/edit.png";
import { SyntheticEvent } from "react";

const ProfileBar = () => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    // e.target.onerror = null;
  };

  return (
    <div>
      <button
        className={styles["profile-button"]}
        onClick={() => {
          console.log("프로필 버튼 클릭");
        }}
      >
        <div className={styles.imageframe}>
          <img
            className={styles.image}
            onError={handleImageError}
            alt="profile image"
          />
        </div>
        <p className={styles.nickname}>닉네임</p>
        <p className={styles["id-location"]}>주소 #id</p>
          <img className={styles.rightarrow} src={ArrowIcon} alt="right arrow"/>
      </button>
        <button className={styles.editbutton} onClick={()=>{console.log("편집 버튼 클릭");}}>
            <img className={styles.editicon} src={EditIcon} alt="edit"/>
        </button>
    </div>
  );
};

export default ProfileBar;
