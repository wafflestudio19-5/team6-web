import styles from "./Account.module.scss";
import backArrow from "../../../icons/leftArrow.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import requester from "../../../apis/requester";
import { TUserInfo } from "../../../type/user";

const Account = (props: { setAccount: Dispatch<SetStateAction<boolean>> }) => {
<<<<<<< HEAD
  const [user, setUser] = useState<TUserInfo | null>(null);
=======
  const [user, setUser] = useState<userType | null>(null);

  const navigate = new Navigator();

>>>>>>> fix: home tab my location
  useEffect(() => {
    requester.get("/users/me/").then((res) => {
      setUser(res.data);
    });
  }, []);
  if (!user) {
    return <div className={styles.wrapper} />;
  }

  const goToEmailChange = () => {};

  const goToPhoneChange = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.subHeader}>
        <div
          className={styles["backArrow-wrapper"]}
          onClick={() => props.setAccount(false)}
        >
          <img className={styles.backArrow} src={backArrow} alt="뒤로가기" />
        </div>
        <div className={styles.pageName}>계정 / 정보 관리</div>
      </div>
      <div className={styles["section-wrapper"]}>
        <div className={styles.section}>
          <div className={styles.title}>계정 정보</div>
          <div className={styles.button}>
            <div className={styles.textArea}>
              이메일
              <div className={styles.contents} onClick={goToEmailChange}>
                {user.email}
              </div>
            </div>
            <div className={styles.changeText}>변경</div>
          </div>
          <div className={styles.button}>
            <div className={styles.textArea}>
              전화번호
              <div className={styles.contents} onClick={goToPhoneChange}>
                {user.email}
              </div>
            </div>
            <div className={styles.changeText}>변경</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
