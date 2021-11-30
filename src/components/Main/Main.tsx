import styles from "./Main.module.scss";
import Home1 from "../../Image/Footer/home-selected.png";
import Home2 from "../../Image/Footer/home-unselected.png";
import Chat1 from "../../Image/Footer/chat-selected.png";
import Chat2 from "../../Image/Footer/chat-unselected.png";
import User1 from "../../Image/Footer/user-selected.png";
import User2 from "../../Image/Footer/user-unselected.png";
import { useEffect, useState } from "react";
import HomeGoods from "./Home/HomeGoods";
import HomeHeader from "./Home/HomeHeader";
import { Navigate } from "react-router-dom";
import * as React from "react";

const Main = () => {
  const [location, setLocation] = useState("301동");
  const [writeHandle, setWriteHandle] = useState(false);
  const [page, setPage] = useState("home");

  const changeToHome = () => {
    setPage("home");
  };

  const changeToChat = () => {
    setPage("chat");
  };

  const changeToUser = () => {
    setPage("user");
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
          {page === "chat" && <></>}
          {page === "user" && <></>}
        </div>
        <div className={styles.contents}>
          {page === "home" && (
            <HomeGoods
              writeHandle={writeHandle}
              setWriteHandle={setWriteHandle}
            />
          )}
          {page === "chat" && <></>}
          {page === "user" && <></>}
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
          <div className={styles.footerBox} onClick={changeToChat}>
            {page === "chat" ? (
              <img className={styles.footerImg} src={Chat1} alt="chat" />
            ) : (
              <img className={styles.footerImg} src={Chat2} alt="chat" />
            )}
            <p className={styles.footerTag}>채팅</p>
          </div>
          <div className={styles.footerBox} onClick={changeToUser}>
            {page === "user" ? (
              <img className={styles.footerImg} src={User1} alt="user" />
            ) : (
              <img className={styles.footerImg} src={User2} alt="user" />
            )}
            <p className={styles.footerTag}>나의 당근</p>
          </div>
        </div>
        <div
            className={`${styles.backShadow} ${writeHandle ? styles.show : ""}`} onClick={()=>setWriteHandle(false)}
        />
      </div>
    </>
  );
};

export default Main;
