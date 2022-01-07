import { Dispatch } from "react";
import confirmStyles from "./confirm.module.scss";
import { Checkbox } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

type TKidAgeForm = {
  forAge: number | null;
  setForAge: Dispatch<number | null>;
  setIsKidsModalOpen: Dispatch<boolean>;
};

const SelectKidAge = ({
  forAge,
  setForAge,
  setIsKidsModalOpen,
}: TKidAgeForm) => {
  const ageHandle = (age: number | null) => {
    if (forAge === age) setForAge(null);
    else setForAge(age);
  };
  return (
    <div className={confirmStyles.box}>
      <h1 className={confirmStyles.title}>사용 나이</h1>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 1}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(1)}
        />
        <p className={confirmStyles.age}>0~6개월</p>
      </div>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 2}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(2)}
        />
        <p className={confirmStyles.age}>7~12개월</p>
      </div>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 3}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(3)}
        />
        <p className={confirmStyles.age}>13~24개월</p>
      </div>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 4}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(4)}
        />
        <p className={confirmStyles.age}>3~5세</p>
      </div>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 5}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(5)}
        />
        <p className={confirmStyles.age}>6~8세</p>
      </div>
      <div className={confirmStyles.lineContainer}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={forAge === 6}
          style={{
            color: "#ff8a3d",
            padding: "0px",
            margin: "0 10px 0 10px",
            height: "40px",
          }}
          onChange={() => ageHandle(6)}
        />
        <p className={confirmStyles.age}>9세 이상</p>
      </div>
      <button
        className={confirmStyles.confirmButton}
        onClick={() => setIsKidsModalOpen(false)}
      >
        완료
      </button>
    </div>
  );
};

export default SelectKidAge;
