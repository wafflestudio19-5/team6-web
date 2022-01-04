import styles from "./EditProfile.module.scss";
import Button from "@mui/material/Button";
import DefaultImageIcon from "../../../icons/MyCarrot/default-image.png";
import BackArrowIcon from "../../../icons/leftArrow.png";
import CameraIcon from "../../../icons/MyCarrot/camera.png";
import { Link, useLocation } from "react-router-dom";
import { ChangeEventHandler, useEffect, useState } from "react";

const EditProfile = () => {
  const [prev, setPrev] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const location = useLocation();

  useEffect(() => {
    location.state.prev && setPrev(location.state.prev);
    location.state = null;
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link
          to={prev === "main" ? "/main" : "/profile"}
          state={prev === "main" ? { page: "user" } : null}
          className={styles.back}
        >
          <img src={BackArrowIcon} alt="뒤로" />
        </Link>
        <p>프로필 수정</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <div className={styles["image-frame"]}>
          <img src={DefaultImageIcon} alt="profile image" />
        </div>
        <button
          onClick={() => {
            console.log("업데이트 버튼");
          }}
        >
          <img src={CameraIcon} alt="update" />
        </button>
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <footer>
        <Button
          className={styles["complete-button"]}
          variant="contained"
          color="warning"
        >
          완료
        </Button>
      </footer>
    </div>
  );
};

export default EditProfile;
