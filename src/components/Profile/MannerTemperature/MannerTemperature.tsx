import styles from "./MannerTemperature.module.scss";
import { toShortDivision } from "../../Utilities/functions";

const MannerTemperature = ({
  activeLocation,
  verified,
}: {
  activeLocation: string;
  verified: boolean;
}) => {
  return (
    <div className={styles["manner-wrapper"]}>
      <p>
        <b>{toShortDivision(activeLocation)}</b>에서 거래하고 있어요.
      </p>
      {verified ? (
        <p>동네 인증을 완료했어요!</p>
      ) : (
        <p>동네 인증하지 않은 사용자입니다.</p>
      )}
    </div>
  );
};

export default MannerTemperature;
