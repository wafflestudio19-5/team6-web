import styles from "./RegionList.module.scss";

const RegionList = ({ searchingList }: { searchingList: string[] }) => {
  const onClick = (region: string) => {
    console.log(region);
  };
  return (
    <div className={styles["region-wrapper"]}>
      {searchingList.map((region, index) => (
        <button
          key={index}
          onClick={() => {
            onClick(region);
          }}
        >
          <p>{region}</p>
        </button>
      ))}
    </div>
  );
};

export default RegionList;
