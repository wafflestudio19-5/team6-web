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
import Write from "../../Image/Home/write.png";
import Open from "../../Image/Home/add-1.png";
import Close from "../../Image/Home/add-2.png";
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

  const handleWrite = () => {
    console.log("글쓰는 창으로 push");
  }

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
    <div>
      <div
        className={`${styles.backShadow} ${writeHandle ? styles.show : ""}`}
      />
      {page === "home" && (
        <div className={styles.wrapper}>
          <div className={styles.header}>
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
          </div>
          <div className={styles.goodsList}>
            <MainGoods />
            {writeHandle ? (
              <>
                <img
                  className={styles.closeButton}
                  src={Close}
                  onClick={() => setWriteHandle(false)}
                  alt="닫기"
                />
                <div className={styles.writeBox} onClick={handleWrite}>
                  <p className={styles.writeTag}>중고거래</p>
                  <img className={styles.writeImg} src={Write} />
                </div>
              </>
            ) : (
              <img
                className={styles.openButton}
                src={Open}
                onClick={() => setWriteHandle(true)}
                alt="열기"
              />
            )}
          </div>
          <div className={styles.footer}>
            <div className={styles.footerBox}>
              <img className={styles.footerImg} src={Home1} alt="홈" />
              <p className={styles.footerTag}>홈</p>
            </div>
            <div className={styles.footerBox} onClick={changeToChat}>
              <img className={styles.footerImg} src={Chat2} alt="채팅" />
              <p className={styles.footerTag}>채팅</p>
            </div>
            <div className={styles.footerBox} onClick={changeToUser}>
              <img className={styles.footerImg} src={User2} alt="나의 당근" />
              <p className={styles.footerTag}>나의 당근</p>
            </div>
          </div>
        </div>
      )}
      {page === "chat" && (
        <div className={styles.wrapper}>
          <div className={styles.header}></div>
          <div className={styles.goodsList}></div>
          <div className={styles.footer}>
            <div className={styles.footerBox} onClick={changeToHome}>
              <img className={styles.footerImg} src={Home2} alt="홈" />
              <p className={styles.footerTag}>홈</p>
            </div>
            <div className={styles.footerBox}>
              <img className={styles.footerImg} src={Chat1} alt="채팅" />
              <p className={styles.footerTag}>채팅</p>
            </div>
            <div className={styles.footerBox} onClick={changeToUser}>
              <img className={styles.footerImg} src={User2} alt="나의 당근" />
              <p className={styles.footerTag}>나의 당근</p>
            </div>
          </div>
        </div>
      )}
      {page === "user" && (
        <div className={styles.wrapper}>
          <div className={styles.header}></div>
          <div className={styles.goodsList}></div>
          <div className={styles.footer}>
            <div className={styles.footerBox} onClick={changeToHome}>
              <img className={styles.footerImg} src={Home2} alt="홈" />
              <p className={styles.footerTag}>홈</p>
            </div>
            <div className={styles.footerBox} onClick={changeToChat}>
              <img className={styles.footerImg} src={Chat2} alt="채팅" />
              <p className={styles.footerTag}>채팅</p>
            </div>
            <div className={styles.footerBox}>
              <img className={styles.footerImg} src={User1} alt="나의 당근" />
              <p className={styles.footerTag}>나의 당근</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
