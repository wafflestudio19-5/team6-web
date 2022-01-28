import styles from "./KakaoPage.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/SelectLocation/spinner-circle.gif";
import { useEffect } from "react";
import { REDIRECT_URI } from "./OAuth";

const KakaoPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    socialLogin(code);
  }, []);

  const socialLogin = (auth: string | null) => {
    axios({
      method: "GET",
      url: `https://carrotserver.shop/oauth/kakao/?code=${auth}&redirect_uri=${REDIRECT_URI}`,
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.access_token;
        localStorage.setItem("token", ACCESS_TOKEN);
        navigate("/main?page=home");
      })
      .catch((error) => {
        console.log("소셜로그인 에러", error);
        window.alert("로그인에 실패하였습니다.");
        navigate("/login");
      });
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.spinner} src={Spinner} alt="로딩중" />
    </div>
  );
};

export default KakaoPage;
