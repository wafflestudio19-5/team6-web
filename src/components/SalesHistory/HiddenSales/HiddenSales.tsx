import styles from "./HiddenSales.module.scss";

const HiddenSales = () => {

    return (
        <div className={styles.empty}>
            <p>숨기기 한 게시글이 없어요.</p>
        </div>
    );
}

export default HiddenSales;