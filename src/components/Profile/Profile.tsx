import styles from "./Profile.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Test from "../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate } from "react-router-dom";
import MannerTemperature from "./MannerTemperature/MannerTemperature";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import requester from "../../apis/requester";
import { useEffect, useState } from "react";
import { TUserInfoV2 } from "../../type/user";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [products, setProducts] = useState<number>(0);
  const [myInfo, setMyInfo] = useState<TUserInfoV2>({
    first_location: "",
    first_location_verified: false,
    first_range_of_location: "LEVEL_ONE",
    is_first_location_active: true,
    second_location: "",
    second_location_verified: false,
    second_range_of_location: "LEVEL_ONE",
    name: "",
    nickname: "",
    image_url: "",
    is_active: true,
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    requester
      .get("/users/me/")
      .then((res) => {
        setMyInfo(res.data);
        requester
          .get(
            `/users/${res.data.name}/products/?pageNumber=0&pageSize=10&status=all`
          )
          .then((res) => {
            setProducts(res.data.total_elements);
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleToEditProfilePage = () => {
    navigate("./edit", { state: { prev: "profile" } });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <Link to="/main?page=user" className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>프로필</p>
      </header>
      <div className={styles["body-wrapper"]}>
        <div className={styles.imageframe}>
          <img
            className={styles.image}
            src={myInfo?.image_url ? myInfo?.image_url : Test}
            alt="profile image"
          />
        </div>
        <p className={styles.nickname}>{`${myInfo ? myInfo.nickname : ""}`}</p>
        <p className={styles["id-location"]}>{`#${
          myInfo ? myInfo.name : ""
        }`}</p>
        <button className={styles.edit} onClick={handleToEditProfilePage}>
          프로필 수정
        </button>
        <MannerTemperature />
        <ProfileButtons products={products} />
      </div>
    </div>
  );
};

export default Profile;
