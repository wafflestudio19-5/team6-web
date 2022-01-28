import styles from "./Settings.module.scss";
import styles2 from "./Withdrawal.module.scss";
import backArrow from "../../../icons/leftArrow.png";
import {
  ChangeEventHandler,
  CSSProperties,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import Select, {
  GroupBase,
  OptionsOrGroups,
  SingleValue,
  StylesConfig,
} from "react-select";
import requester from "../../../apis/requester";
import { useNavigate } from "react-router-dom";

type OptionType = {
  value: string;
  label: string;
  text: string;
  linkTitle: string;
  link: string;
};

const options: OptionsOrGroups<OptionType, GroupBase<OptionType>> = [
  {
    value: "0",
    label: "선택해주세요.",
    text: "",
    linkTitle: "",
    link: "",
  },
  {
    value: "1",
    label: "너무 많이 이용해요",
    text: "그렇다면 저와 함께 조금 덜 사용하는 방법을 고민해봐요. 이렇게 떠나시면 너무 슬픈걸요. 계정 삭제 대신 모든 알림을 끄고 잠시 쉬어보는 건 어떠세요?",
    linkTitle: "",
    link: "",
  },
  {
    value: "2",
    label: "사고 싶은 물품이 없어요",
    text: "혹시 사고싶은 물품을 검색해보셨나요? 카테고리를 설정해 다시 검색해보세요.",
    linkTitle: "지금 검색하러 가기",
    link: "/search",
  },
  {
    value: "3",
    label: "물품이 안팔려요",
    text: "판매를 잘할 수 있는 노하우를 몇 가지 알려드릴게요! 먼저, 가격을 합리적으로 설정해보세요. 당근마켓에서 유사한 물건을 검색해보는 것도 도움이 된답니다. 물건에 대한 정보를 상세하게 올리는 것도 중요해요. 잘 보이도록 다양한 각도에서 찍은 사진을 올리고, 설명을 자세하게 적어보세요!",
    linkTitle: "",
    link: "",
  },
  {
    value: "4",
    label: "비매너 사용자를 만났어요",
    text: "대신 사과드리고 싶어요. 죄송합니다. 좋지 않은 경험은 저희에게도 책임이 있어요. 신고하기를 통해서 꼭 알려주세요.",
    linkTitle: "",
    link: "",
  },
  {
    value: "5",
    label: "새 계정을 만들고 싶어요",
    text: "혹시 이사했거나 전화번호가 바뀌었나요? 내 게시글 전부를 이사한 동네로 한 번에 이동할 수도 있고, 다시 가입하지 않아도 전화번호를 바꿀 수 있어요.",
    linkTitle: "",
    link: "",
  },
  {
    value: "6",
    label: "기타",
    text: "말씀해주신 소중한 의견을 반영하여 더 따뜻한 서비스를 만들어 가도록 노력할게요. 언제나 이 자리에서 기다리고 있을게요. 언제든지 돌아와 주세요. 지금까지 함께여서 진심으로 행복했어요.",
    linkTitle: "",
    link: "",
  },
];

const customStyles: StylesConfig<OptionType | GroupBase<OptionType>, false> = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected ? "lavenderblush" : "white",
  }),
};

const Withdrawal = (props: {
  setWithdrawal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selected, setSelected] = useState(options[0]);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSelect = (
    option: SingleValue<OptionType | GroupBase<OptionType>>
  ) => {
    if (option) {
      setSelected(option);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setReason(e.target.value);
  };

  const handleWithdraw = async () => {
    try {
      await requester.delete("/users/me/");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {}
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.subHeader}>
        <div
          className={styles["backArrow-wrapper"]}
          onClick={() => props.setWithdrawal(false)}
        >
          <img className={styles.backArrow} src={backArrow} alt="뒤로가기" />
        </div>
        <div className={styles.pageName}>탈퇴하기</div>
      </div>
      <div className={styles2.wrapper}>
        <h3 className={styles2.title}>'유저 이름'님 탈퇴를 원하시나요?</h3>
        <p className={styles2.contents}>
          계정을 삭제하면 매너온도, 게시글, 관심, 채팅 등 모든 활동 정보가
          삭제됩니다. 계정 삭제 후 7일간 다시 가입할 수 없어요.
        </p>
        <h3 className={styles2.title}>계정을 삭제하려는 이유를 알려주세요.</h3>
        <Select
          className={styles2.dropdown}
          styles={customStyles}
          value={selected}
          options={options}
          onChange={(option) => handleSelect(option)}
        />
        {(selected as OptionType).value === "6" && (
          <input
            className={styles2.input}
            value={reason}
            onChange={handleChange}
            placeholder="계정을 삭제하려는 이유를 알려주세요."
          />
        )}
        {(selected as OptionType).text !== "" && (
          <p className={styles2.contents}>{(selected as OptionType).text}</p>
        )}
        {(selected as OptionType).link !== "" && (
          <a className={styles2.link} href={(selected as OptionType).link}>
            {(selected as OptionType).linkTitle}
          </a>
        )}
        {(selected as OptionType).value !== "0" && (
          <div className={styles2.buttons}>
            <div
              className={styles2.cancel}
              onClick={() => props.setWithdrawal(false)}
            >
              취소
            </div>
            {(selected as OptionType).value === "6" && !reason ? (
              <div className={`${styles2.submit} ${styles2.blocked}`}>제출</div>
            ) : (
              <div className={styles2.submit} onClick={handleWithdraw}>
                제출
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;
