import styles from "./LocationPage.module.scss";
import MapContainer from "./MapContainer/MapContainer";

const LocationPage = () => {
  return (
    <div className={styles.wrapper}>
      <p>카카오 지도</p>
      <div className={styles.mapwrapper}>
        <MapContainer />
      </div>
    </div>
  );
};

export default LocationPage;
