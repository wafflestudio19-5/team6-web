import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoPage = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const kakaoLogin = (auth: string | null) => {
    axios({
      method: "GET",
      url: `http://{host+port}/oauth/kakao/?code=${auth}`,
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.access_token;
        localStorage.setItem("token", ACCESS_TOKEN);
        navigate("/main");
      })
      .catch((error) => {
        console.log("소셜로그인 에러", error);
        window.alert("로그인에 실패하였습니다.");
        navigate("/login");
      });
  };

  const onClick = () => {
    kakaoLogin(code);
  };

  return (
    <div>
      <button onClick={onClick}>코드 읽어봐</button>
    </div>
  );
};

export default KakaoPage;
