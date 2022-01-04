import confirmStyles from "../confirm.module.scss";
import { Dispatch } from "react";

type TConfirmForm = {
  title: string;
  category: number;
  content: string;
  setIsConfirmOpen: Dispatch<boolean>;
};

const ConfirmModal = ({
  title,
  category,
  content,
  setIsConfirmOpen,
}: TConfirmForm) => {
  return (
    <div className={confirmStyles.box}>
      <p className={confirmStyles.contents}>
        {!title && "제목"}
        {!title && (!category || !content) && ", "}
        {!category && "카테고리"}
        {!category && !content && ", "}
        {!content && "내용"}
        {!!content && !category ? "는 " : "은 "}
        필수 입력 항목이에요.
      </p>
      <button
        className={confirmStyles.confirmButton}
        onClick={() => setIsConfirmOpen(false)}
      >
        확인
      </button>
    </div>
  );
};

export default ConfirmModal;
