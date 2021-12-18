import styles from "./Main.module.scss";
import Home1 from "../../icons/Footer/home-selected.png";
import Home2 from "../../icons/Footer/home-unselected.png";
import User1 from "../../icons/Footer/user-selected.png";
import User2 from "../../icons/Footer/user-unselected.png";
import Set1 from "../../icons/Footer/settings-selected.png";
import Set2 from "../../icons/Footer/settings-unselected.png";
import { useEffect, useState } from "react";
import HomeGoods from "./Home/HomeGoods";
import HomeHeader from "./Home/HomeHeader";
import { Navigate } from "react-router-dom";
import * as React from "react";
import MyCarrot from "./MyCarrot/MyCarrot";
import Settings from "./Settings/Settings";

const Main = () => {
  const [location, setLocation] = useState("301동");
  const [write, setWrite] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState("home");

  const changeToHome = () => {
    setPage("home");
  };

  const changeToUser = () => {
    setPage("user");
  };

  const changeToSettings = () => {
    setPage("settings");
  };

  if (location === "") {
    return <div />;
  }

  return (
    <>
      {localStorage.getItem("token") === null && (
        <Navigate replace to="/login" />
      )}
      <div className={styles.test}></div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {page === "home" && (
            <HomeHeader location={location} setLocation={setLocation} />
          )}
          {page === "user" && <p>나의 당근</p>}
          {page === "settings" && <p>앱 설정</p>}
        </div>
        <div className={styles.contents}>
          {page === "home" && (
            <HomeGoods
              writeHandle={write}
              setWriteHandle={setWrite}
            />
          )}
          {page === "user" &&  <MyCarrot />}
          {page === "settings" && <Settings confirm={confirm} setConfirm={setConfirm}/>}
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
            className={`${styles.backShadow} ${write ? styles.show : ""}`} onClick={()=>setWrite(false)}
        />
        <div
            className={`${styles.backShadow} ${confirm ? styles.show : ""}`} onClick={()=>setConfirm(false)}
        />
      </div>
    </>
  );
};

export default Main;
