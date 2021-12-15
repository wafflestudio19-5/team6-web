import styles from "./WriteArticle.module.scss";
import closeButton from "../../../icons/closebutton.png";
import imageUploadButton from "../../../icons/imageUpload.png";
import sentence from "../../../icons/addProperty.png";
import setting from "../../../icons/settingSlider.png";

const WriteArticle = () => {
  return (
    <>
      <div className={styles.writePageWrapper}>
        <div className={styles.header}>
          <img className={styles.closeButton} src={closeButton} alt="닫기" />
          <h1 className={styles.title}>중고거래 글쓰기</h1>
          <p className={styles.finish}>완료</p>
        </div>
        <div className={styles.footer}>
          <img className={styles.sentence} src={sentence} alt="자주쓰는 문구" />
          <p className={styles.usually}>자주쓰는 문구</p>
          <img
            className={styles.neighborhood}
            src={setting}
            alt="보여줄 동네"
          />
          <p className={styles.show}>보여줄 동네 설정</p>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.imageUpload}
              src={imageUploadButton}
              alt="이미지 업로드"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteArticle;
