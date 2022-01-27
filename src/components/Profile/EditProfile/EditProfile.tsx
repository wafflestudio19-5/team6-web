import styles from "./EditProfile.module.scss";
import confStyles from "../../Utilities/confirm.module.scss";
import Button from "@mui/material/Button";
import DefaultImageIcon from "../../../icons/MyCarrot/default-image.png";
import BackArrowIcon from "../../../icons/leftArrow.png";
import CameraIcon from "../../../icons/MyCarrot/camera.png";
import WarningIcon from "../../../icons/MyCarrot/warning.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import requester from "../../../apis/requester";
import { toast } from "react-hot-toast";
import confirmStyles from "../../Utilities/confirm.module.scss";

const EditProfile = () => {
  const [prev, setPrev] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");
  const [imageID, setImageID] = useState<number | null>(null);
  const [prevImage, setPrevImage] = useState<string>("");
  const [nickname, setNickname] = useState<string>("  ");
  const [prevNickname, setPrevNickname] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const regNickname = /^[가-힣A-Za-z0-9]{3,14}$/;

  useEffect(() => {
    location.state?.prev && setPrev(location.state.prev);
    getInfo();
  }, []);

  const getInfo = () => {
    requester
      .get("/users/me/")
      .then((res) => {
        setNickname(res.data.nickname);
        setPrevNickname(res.data.nickname);
        setImage(res.data.image_url);
        setPrevImage(res.data.image_url);
      })
      .catch((error) => {
        toast.error("프로필 가져오기 오류");
      });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };

  const editProfileImage = (url: string) => {
    requester
      .patch("/users/me/", {
        image_url: url,
      })
      .then()
      .catch(() => {
        toast.error("프로필 이미지 수정 오류");
      });
  };

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    } else {
      const formData = new FormData();
      formData.append("images", e.target.files[0]);
      requester
        .post("/images/", formData)
        .then((res) => {
          setImage(res.data.contents[0].url);
          setImageID(res.data.contents[0].id);
          setModalOpen(false);
        })
        .catch(() => {
          toast.error("이미지 업로드 오류");
        });
    }
  };

  const handleToEditProfile = () => {
    requester
      .patch("/users/me/", {
        nickname: nickname,
        image_url: image,
      })
      .then(() => {
        toast("프로필이 변경되었습니다.");
        navigate(`${prev === "main" ? "/main?page=user" : "/profile"}`);
      })
      .catch(() => {
        console.log("edit nickname error");
      });
  };

  const handleToUpload = (e: React.MouseEvent) => {
    imgRef.current?.click();
  };

  const handleToDelete = () => {
    setImage("");
    imageID &&
      requester
        .delete(`/images/${imageID}/`)
        .then(() => {
          setImageID(null);
        })
        .catch(() => {
          toast.error("이미지 삭제 오류");
        });
    setModalOpen(false);
  };

  const handleToGoBack = () => {
    if (image !== prevImage) {
      setConfirmOpen(true);
    } else {
      prev === "main" ? navigate("/main?page=user") : navigate(-1);
    }
  };

  const handleToCancelEditing = () => {
    if (!!imageID) {
      requester
        .delete(`/images/${imageID}/`)
        .then(() => {
          prev === "main" ? navigate("/main?page=user") : navigate(-1);
        })
        .catch(() => {
          toast.error("이미지 삭제 오류");
        });
    } else {
      prev === "main" ? navigate("/main?page=user") : navigate(-1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <button className={styles.back} onClick={handleToGoBack}>
          <img src={BackArrowIcon} alt="뒤로" />
        </button>
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
          onChange={onImgChange}
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
          disabled={
            (image === prevImage && nickname === prevNickname) ||
            !regNickname.test(nickname)
          }
          onClick={handleToEditProfile}
        >
          완료
        </Button>
      </footer>
      <div
        className={`${styles["buttons-wrapper"]} ${
          modalOpen ? styles.show : ""
        }`}
      >
        <button className={styles.select} onClick={handleToUpload}>
          앨범에서 선택
        </button>
        <button className={styles.remove} onClick={handleToDelete}>
          프로필 사진 삭제
        </button>
      </div>
      <div
        className={`${styles["back-shadow"]} ${
          modalOpen || confirmOpen ? styles.show : ""
        }`}
        onClick={() => {
          modalOpen && setModalOpen(false);
          confirmOpen && setConfirmOpen(false);
        }}
      />
      {confirmOpen && (
        <div className={confStyles.box}>
          <div className={styles.contents}>프로필 수정을 취소하시겠습니까?</div>
          <div
            className={confStyles.confirmButton}
            onClick={handleToCancelEditing}
          >
            예
          </div>
          <div
            className={confStyles.cancelButton}
            onClick={() => setConfirmOpen(false)}
          >
            아니오
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
