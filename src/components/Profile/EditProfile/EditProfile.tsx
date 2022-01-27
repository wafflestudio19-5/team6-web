import styles from "./EditProfile.module.scss";
import Button from "@mui/material/Button";
import DefaultImageIcon from "../../../icons/MyCarrot/default-image.png";
import BackArrowIcon from "../../../icons/leftArrow.png";
import CameraIcon from "../../../icons/MyCarrot/camera.png";
import WarningIcon from "../../../icons/MyCarrot/warning.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import requester from "../../../apis/requester";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const [prev, setPrev] = useState<string | null>(null);
  const [image, setImage] = useState<string>(DefaultImageIcon);
  const [nickname, setNickname] = useState<string>("  ");
  const [prevNickname, setPrevNickname] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const regNickname = /^[가-힣A-Za-z0-9]{3,14}$/;

  useEffect(() => {
    location.state.prev && setPrev(location.state.prev);
    location.state = null;
    getNickname();
  }, []);

  const getNickname = async () => {
    try {
      const res = await requester.get("/users/me/");
      setNickname(res.data.nickname);
      setPrevNickname(res.data.nickname);
      setImage(res.data.image_url);
    } catch (error) {
      console.log("getMe error");
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };

  const handleToEditNickname = () => {
    requester
      .patch("/users/me/", {
        nickname: nickname,
      })
      .then(() => {
        toast("닉네임이 변경되었습니다.");
        navigate(`${prev === "main" ? "/main" : "/profile"}`, {
          state: prev === "main" ? { page: "user" } : null,
        });
      })
      .catch(() => {
        console.log("edit nickname error");
      });
  };

  const handleImg = (e: React.MouseEvent) => {
    imgRef.current?.click();
  };

  const handleToUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalOpen(false);
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
          <img src={image ? image : DefaultImageIcon} alt="profile image" />
        </div>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <img src={CameraIcon} alt="update" />
        </button>
        <input name="nickname" value={nickname} onChange={onChange} />
        <input
          className={styles["image-input"]}
          type="file"
          accept="image/*"
          ref={imgRef}
          onChange={handleToUpload}
        />
        {!regNickname.test(nickname) && (
          <div className={styles.warning}>
            <img src={WarningIcon} alt="warning" />
            <p>띄어쓰기 없이 3~14자의 한글, 영문, 숫자만 가능해요.</p>
          </div>
        )}
      </div>
      <footer>
        <Button
          className={styles["complete-button"]}
          variant="contained"
          color="warning"
          disabled={nickname === prevNickname || !regNickname.test(nickname)}
          onClick={handleToEditNickname}
        >
          완료
        </Button>
      </footer>
      <div
        className={`${styles["buttons-wrapper"]} ${
          modalOpen ? styles.show : ""
        }`}
      >
        <button className={styles.select} onClick={handleImg}>
          앨범에서 선택
        </button>
        <button className={styles.remove}>프로필 사진 삭제</button>
      </div>
      <div
        className={`${styles["back-shadow"]} ${modalOpen ? styles.show : ""}`}
        onClick={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default EditProfile;
