import styles from "./Profile.module.scss";
import BackArrow from "../../icons/leftArrow.png";
import Test from "../../icons/MyCarrot/default-profile-image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import MannerTemperature from "./MannerTemperature/MannerTemperature";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import requester from "../../apis/requester";
import { useEffect, useState } from "react";
import { TUserInfoV2 } from "../../type/user";
import { toast } from "react-hot-toast";
import { productType } from "../../type/types";
import SalesArticle from "./Sales/SalesArticle/SalesArticle";

const Profile = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [products, setProducts] = useState<number>(0);
  const [previewList, setPreviewList] = useState<productType[] | null>([]);
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

  const { name } = useParams() as { name: string };
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    requester
      .get(`/users/${name}/`)
      .then((res) => {
        setMyInfo(res.data);
        requester
          .get(
            `/users/${res.data.name}/products/?pageNumber=0&pageSize=4&status=all`
          )
          .then((res) => {
            setProducts(res.data.total_elements);
            setPreviewList(res.data.content);
            requester
              .get("/users/me/")
              .then((res2) => {
                res2.data.name === name && setIsMe(true);
              })
              .catch(() => toast.error("get me error"));
          })
          .catch(() => {
            toast.error("판매상품목록 가져오기 오류");
          });
      })
      .catch(() => {
        navigate(-1);
        toast.error("프로필 가져오기 오류");
      });
  };

  const handleToEditProfilePage = () => {
    navigate("/profile/edit", { state: { prev: "profile" } });
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
        <div className={styles["image-frame"]}>
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
        {isMe && (
          <button className={styles.edit} onClick={handleToEditProfilePage}>
            프로필 수정
          </button>
        )}
        <MannerTemperature
          activeLocation={
            myInfo.is_first_location_active
              ? myInfo.first_location
              : myInfo.second_location
          }
          verified={
            myInfo.is_first_location_active
              ? myInfo.first_location_verified
              : myInfo.second_location_verified
          }
        />
        <ProfileButtons name={myInfo.name} products={products} />
        <div className={styles.preview}>
          {previewList?.map((article) => (
            <SalesArticle
              key={article.id}
              article={article}
              prev={`/profile/${name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
