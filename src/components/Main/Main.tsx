import styles from "./Main.module.scss";
import Home1 from "../../icons/Footer/home-selected.png";
import Home2 from "../../icons/Footer/home-unselected.png";
import User1 from "../../icons/Footer/user-selected.png";
import User2 from "../../icons/Footer/user-unselected.png";
import Set1 from "../../icons/Footer/settings-selected.png";
import Set2 from "../../icons/Footer/settings-unselected.png";
import * as React from "react";
import { useEffect, useState } from "react";
import HomeGoods from "./Home/HomeGoods";
import HomeHeader from "./Home/HomeHeader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MyCarrot from "./MyCarrot/MyCarrot";
import Settings from "./Settings/Settings";
import User from "../../apis/User/User";
import { toShortDivision } from "../Utilities/functions";
import requester from "../../apis/requester";
import { useUserDispatch } from "../../context/user-context";
import { toast } from "react-hot-toast";

const Main = () => {
  const [firstLocation, setFirstLocation] = useState<string>("Loading..");
  const [secondLocation, setSecondLocation] = useState("");
  const [firstVerified, setFirstVerified] = useState<boolean>(false);
  const [secondVerified, setSecondVerified] = useState<boolean>(false);
  const [write, setWrite] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageQuery = params.get("page");
  const setUser = useUserDispatch();

  useEffect(() => {
    User.getMe()
      .then((res) => {
        setUser(res.data);
        setFirstLocation(toShortDivision(res.data.first_location));
        setFirstVerified(res.data.first_location_verified);
        if (!!res.data.second_location) {
          setSecondLocation(toShortDivision(res.data.second_location));
          setSecondVerified(res.data.second_location_verified);
        }
      })
      .catch(() => {
        toast.error("????????? ???????????? ??????");
      });
    pageQuery && setPage(pageQuery);
  }, [location.state?.location_changed]);

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
          {page === "home" && (
            <HomeHeader
              firstLocation={firstLocation}
              setFirstLocation={setFirstLocation}
              secondLocation={secondLocation}
              setSecondLocation={setSecondLocation}
              firstVerified={firstVerified}
              secondVerified={secondVerified}
            />
          )}
          {page === "user" && <p>?????? ??????</p>}
          {page === "settings" && <p>??? ??????</p>}
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
            <p className={styles.footerTag}>???</p>
          </div>
          <div className={styles.footerBox} onClick={changeToUser}>
            {page === "user" ? (
              <img className={styles.footerImg} src={User1} alt="user" />
            ) : (
              <img className={styles.footerImg} src={User2} alt="user" />
            )}
            <p className={styles.footerTag}>?????? ??????</p>
          </div>
          <div className={styles.footerBox} onClick={changeToSettings}>
            {page === "settings" ? (
              <img className={styles.footerImg} src={Set1} alt="settings" />
            ) : (
              <img className={styles.footerImg} src={Set2} alt="settings" />
            )}
            <p className={styles.footerTag}>??? ??????</p>
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
      </div>
    </>
  );
};

export default Main;
