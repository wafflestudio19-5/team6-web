import styles from "./CompletedSales.module.scss";

const CompletedSales = () => {

    return (
        <div className={styles.empty}>
            <p>거래완료 게시물이 없어요.</p>
        </div>
    );
}

export default CompletedSales;