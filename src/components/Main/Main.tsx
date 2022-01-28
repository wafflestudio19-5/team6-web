import styles from "./Main.module.scss";
import Home1 from "../../icons/Footer/home-selected.png";
import Home2 from "../../icons/Footer/home-unselected.png";
import User1 from "../../icons/Footer/user-selected.png";
import User2 from "../../icons/Footer/user-unselected.png";
import Set1 from "../../icons/Footer/settings-selected.png";
import Set2 from "../../icons/Footer/settings-unselected.png";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import HomeGoods from "./Home/HomeGoods";
import HomeHeader from "./Home/HomeHeader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MyCarrot from "./MyCarrot/MyCarrot";
import Settings from "./Settings/Settings";
import requester from "../../apis/requester";
import { useUserDispatch } from "../../context/user-context";
import { toast } from "react-hot-toast";

const Main = () => {
  const [write, setWrite] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState("home");
  const [firstSocialLoginModal, setFirstSocialLoginModal] =
    useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);
  const timerRef = useRef(5);

  const navigate = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const pageQuery = params.get("page");

  const setUser = useUserDispatch();

  useEffect(() => {
    requester
      .get("/users/me/")
      .then((res) => {
        if (res.data.kakao_status === "INVALID") {
          setFirstSocialLoginModal(true);
          const interval = setInterval(() => {
            timerRef.current -= 1;
            setTimer(timerRef.current);
            if (timerRef.current === 0) {
              clearInterval(interval);
              navigate("/required-information", {
                state: {
                  prev: "first-social-login",
                },
              });
            }
          }, 1000);
        }
      })
      .catch(() => {
        toast.error("프로필 가져오기 오류");
      });
    pageQuery && setPage(pageQuery);
  }, []);

  const changeToHome = () => {
    navigate("/main?page=home", { replace: true });
    setPage("home");
  };

  const changeToUser = () => {
    navigate("/main?page=user", { replace: true });
    setPage("user");
  };

  const changeToSettings = () => {
    navigate("/main?page=settings", { replace: true });
    setPage("settings");
  };

  return (
    <>
      {localStorage.getItem("token") === null && (
        <Navigate replace to="/login" />
      )}
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {page === "home" && <HomeHeader />}
          {page === "user" && <p>나의 당근</p>}
          {page === "settings" && <p>앱 설정</p>}
        </div>
        <div>{page === "user" && <MyCarrot />}</div>
        <div className={styles.contents}>
          {page === "home" && (
            <HomeGoods writeHandle={write} setWriteHandle={setWrite} />
          )}
          {page === "user" && <MyCarrot />}
          {page === "settings" && (
            <Settings confirm={confirm} setConfirm={setConfirm} />
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerBox} onClick={changeToHome}>
            {page === "home" ? (
              <img className={styles.footerImg} src={Home1} alt="home" />
            ) : (
              <img className={styles.footerImg} src={Home2} alt="home" />
            )}
            <p className={styles.footerTag}>홈</p>
          </div>
          <div className={styles.footerBox} onClick={changeToUser}>
            {page === "user" ? (
              <img className={styles.footerImg} src={User1} alt="user" />
            ) : (
              <img className={styles.footerImg} src={User2} alt="user" />
            )}
            <p className={styles.footerTag}>나의 당근</p>
          </div>
          <div className={styles.footerBox} onClick={changeToSettings}>
            {page === "settings" ? (
              <img className={styles.footerImg} src={Set1} alt="settings" />
            ) : (
              <img className={styles.footerImg} src={Set2} alt="settings" />
            )}
            <p className={styles.footerTag}>앱 설정</p>
          </div>
        </div>
        <div
          className={`${styles.backShadow} ${write ? styles.show : ""}`}
          onClick={() => setWrite(false)}
        />
        <div
          className={`${styles.backShadow} ${confirm ? styles.show : ""}`}
          onClick={() => setConfirm(false)}
        />
        <div
          className={`${styles["social-login-shadow"]} ${
            firstSocialLoginModal && styles["social-shadow-show"]
          }`}
        />
        {firstSocialLoginModal && (
          <div className={styles["first-social-login"]}>
            <p>서비스 이용 전에 아래 정보들을 입력해야 합니다.</p>
            <p className={styles.needed}>· 휴대폰 번호</p>
            <p className={styles.needed}>· 이메일</p>
            <p className={styles.needed}>· 거주 동네</p>
            <p>{timer}초 후에 정보 입력 페이지로 이동합니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
