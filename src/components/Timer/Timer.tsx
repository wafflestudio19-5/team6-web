import styles from "./Timer.module.scss";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const [timer, setTimer] = useState<number>(5);
  const timerRef = useRef(5);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles["back-shadow"]} />
      <div className={styles["first-social-login"]}>
        <p>서비스 이용 전에 아래 정보들을 입력해야 합니다.</p>
        <p className={styles.needed}>· 휴대폰 번호</p>
        <p className={styles.needed}>· 이메일</p>
        <p className={styles.needed}>· 거주 동네</p>
        <p>{timer}초 후에 정보 등록 페이지로 이동합니다.</p>
      </div>
    </div>
  );
};

export default Timer;
