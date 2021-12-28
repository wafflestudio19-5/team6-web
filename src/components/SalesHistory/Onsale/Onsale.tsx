import styles from "./Onsale.module.scss";

const Onsale = () => {
  return (
    <div className={styles.empty}>
      <p>판매중인 게시물이 없어요.</p>
    </div>
  );
};

export default Onsale;
