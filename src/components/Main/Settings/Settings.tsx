import styles from "./Settings.module.scss";
import confirmStyles from "../../Utilities/confirm.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import Account from "./Account";
import Withdrawal from "./Withdrawal";

const Settings = (props: {
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [account, setAccount] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    props.setConfirm(false);
  };

  const changeToAccount = () => {
    setAccount(true);
  };

  const changeToWithdrawal = () => {
    setWithdrawal(true);
  };

  if (account) {
    return <Account setAccount={setAccount} />;
  }

  if (withdrawal) {
    return <Withdrawal setWithdrawal={setWithdrawal} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["section-wrapper"]}>
        <div className={styles.section}>
          <div className={styles.title}>사용자 설정</div>
          <div className={styles.button} onClick={changeToAccount}>
            계정 / 정보 관리
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>기타 설정</div>
          <div className={styles.button} onClick={() => props.setConfirm(true)}>
            로그아웃
          </div>
          <div className={styles.button} onClick={changeToWithdrawal}>
            탈퇴하기
          </div>
        </div>
      </div>
      {props.confirm && (
        <div className={confirmStyles.box}>
          <div className={confirmStyles.title}>로그아웃</div>
          <div className={confirmStyles.contents}>
            정말 로그아웃 하시겠나요?
          </div>
          <div className={confirmStyles.confirmButton} onClick={logout}>
            로그아웃
          </div>
          <div
            className={confirmStyles.cancelButton}
            onClick={() => props.setConfirm(false)}
          >
            닫기
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
