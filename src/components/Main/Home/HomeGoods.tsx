import styles from "./HomeGoods.module.scss";
import Close from "../../../Image/Home/add-2.png";
import Write from "../../../Image/Home/write.png";
import Open from "../../../Image/Home/add-1.png";
import { Dispatch, SetStateAction } from "react";

const HomeGoods = (props: {
  writeHandle: boolean;
  setWriteHandle: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleWrite = () => {
    console.log("글쓰는 창으로 push");
  };

  if (props.writeHandle) {
    return (
      <div className={styles.wrapper}>
        <img
          className={styles.closeButton}
          src={Close}
          onClick={() => props.setWriteHandle(false)}
          alt="닫기"
        />
        <div
          className={`${styles.writeBox} ${styles.show}`}
          onClick={handleWrite}
        >
          <p className={styles.writeTag}>중고거래</p>
          <img className={styles.writeImg} src={Write} alt="쓰기" />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.openButton}
        src={Open}
        onClick={() => props.setWriteHandle(true)}
        alt="열기"
      />
      <div className={styles.writeBox}>
        <p className={styles.writeTag}>중고거래</p>
        <img className={styles.writeImg} src={Write} alt="쓰기" />
      </div>
    </div>
  );
};

export default HomeGoods;
