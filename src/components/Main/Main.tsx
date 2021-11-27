import styles from "./Main.module.scss";
import Home1 from "../../Image/Footer/home-selected.png";
import Home2 from "../../Image/Footer/home-unselected.png";
import Chat1 from "../../Image/Footer/chat-selected.png";
import Chat2 from "../../Image/Footer/chat-unselected.png";
import User1 from "../../Image/Footer/user-selected.png";
import User2 from "../../Image/Footer/user-unselected.png";
import DownArrow from "../../Image/Header/down-arrow.png";
import Search from "../../Image/Header/search.png";
import Category from "../../Image/Header/category.png";
import Notice from "../../Image/Header/bell.png";
import { useEffect, useState } from "react";
import MainGoods from "./MainGoods";

const Main = () => {
  const [location, setLocation] = useState("");
  const [writeHandle, setWriteHandle] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    setLocation("301동");
  });

  const handleLocation = () => {
    console.log("위치 재지정하는 팝업");
  };

  const handleSearch = () => {
    console.log("검색창으로 push");
  };

  const handleCategory = () => {
    console.log("카테고리 선책창으로 push");
  };

  const handleNotice = () => {
    console.log("알림창으로 push");
  };

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
      <div
        className={`${styles.backShadow} ${writeHandle ? styles.show : ""}`}
      />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {page === "home" && (
            <>
              <div className={styles.locationBox} onClick={handleLocation}>
                <p className={styles.location}>{location}</p>
                <img
                  className={styles.locationArrow}
                  src={DownArrow}
                  alt="화살표"
                />
              </div>
              <img
                className={styles.headerImg}
                src={Search}
                onClick={handleSearch}
                alt="검색"
              />
              <img
                className={styles.headerImg}
                src={Category}
                onClick={handleCategory}
                alt="카테고리"
              />
              <img
                className={styles.headerImg}
                src={Notice}
                onClick={handleNotice}
                alt="알림"
              />
            </>
          )}
          {page === "chat" && <></>}
          {page === "user" && <></>}
        </div>
        <div className={styles.contents}>
          {page === "home" && (
            <MainGoods
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
      </div>
    </>
  );
};

export default Main;
