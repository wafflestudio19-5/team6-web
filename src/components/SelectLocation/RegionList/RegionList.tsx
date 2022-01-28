import styles from "./RegionList.module.scss";

const RegionList = ({
  searchingList,
  handleCallback,
}: {
  searchingList: string[];
  handleCallback: (region: string) => void;
}) => {
  return (
    <div className={styles["region-wrapper"]}>
      {searchingList.map((region, index) => (
        <button
          key={index}
          onClick={() => {
            handleCallback(region);
          }}
        >
          <p>{region}</p>
        </button>
      ))}
    </div>
  );
};

export default RegionList;
