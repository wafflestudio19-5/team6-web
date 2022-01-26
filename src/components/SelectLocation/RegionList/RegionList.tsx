import styles from "./RegionList.module.scss";

const RegionList = ({
  searchingList,
  handleToSignUp,
}: {
  searchingList: string[];
  handleToSignUp: (region: string) => void;
}) => {
  return (
    <div className={styles["region-wrapper"]}>
      {searchingList.map((region, index) => (
        <button
          key={index}
          onClick={() => {
            handleToSignUp(region);
          }}
        >
          <p>{region}</p>
        </button>
      ))}
    </div>
  );
};

export default RegionList;
