import styles from "./SalesHistory.module.scss";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../../icons/leftArrow.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Onsales from "./Onsales/Onsales";
import Hiddens from "./Hiddens/Hiddens";
import Soldouts from "./Soldouts/Soldouts";
import { productType } from "../../type/types";
import { toast } from "react-hot-toast";
import requester from "../../apis/requester";
import { ProductSimpleWithoutUserDto } from "../../type/dto/product-simple-without-user.dto";
import { ProductStatusAction } from "../../type/enum/product-status-action";
import { ProductDto } from "../../type/dto/product.dto";
import { GetProductDto } from "../../type/dto/for-api/get-product.dto";
import { categoryFormat } from "../Article/Article";
import product from "../../apis/Product/Product";

export type srcPair = {
  id: number;
  src: string;
};

export type ActionTarget =
  | {
      id: number;
      list: ProductSimpleWithoutUserDto[];
      dispatch: Dispatch<SetStateAction<ProductSimpleWithoutUserDto[]>>;
    }
  | undefined;

const SalesHistory = () => {
  const [mode, setMode] = useState(1);
  const [onsaleActions, setOnsaleActions] = useState(false);
  const [soldoutActions, setSoldoutActions] = useState(false);
  const [hiddenActions, setHiddenActions] = useState(false);
  const [actionTarget, setActionTarget] = useState<ActionTarget>(undefined);
  const navigate = useNavigate();

  const changeToModification = async () => {
    const response = await requester.get<GetProductDto>(
      `/products/${actionTarget?.id}/`
    );
    navigate("/write", {
      state: {
        image_urls: response.data.image_urls,
        title: response.data.title,
        category: categoryFormat(response.data.category),
        price: response.data.price,
        negotiable: response.data.negotiable,
        for_age: response.data.for_age,
        content: response.data.content,
        id: actionTarget?.id,
      },
    });
  };

  const handleHiding = () => {
    requester
      .put(`/products/${actionTarget?.id}/status/`, {
        action: ProductStatusAction.HIDE,
      })
      .then((res) => {})
      .catch((e) => console.log(e));
    actionTarget?.dispatch(
      actionTarget?.list.filter((product) => product.id !== actionTarget?.id)
    );
    setOnsaleActions(false);
    setSoldoutActions(false);
    setHiddenActions(false);
  };

  const handleDeletion = () => {
    requester
      .delete(`/products/${actionTarget?.id}/`)
      .then((res) => {
        actionTarget?.dispatch(
          actionTarget?.list.filter(
            (product) => product.id !== actionTarget?.id
          )
        );
        setOnsaleActions(false);
        setSoldoutActions(false);
        setHiddenActions(false);
      })
      .catch((e) => console.log(e));
  };

  const handleBump = () => {
    requester
      .put(`/products/${actionTarget?.id}/status/`, { action: "bump" })
      .then((res) => {
        setOnsaleActions(false);
        setSoldoutActions(false);
        setHiddenActions(false);
      })
      .catch((e) => {
        if (e.response.data.error_code === 203) {
          toast.error("너무 자주 끌어올릴 수 없습니다.");
        } else if (e.response.data.error_code === 201) {
          toast.error("판매 완료된 게시글입니다.");
        }
      });
  };
  const changeToOnsale = () => {
    requester
      .put(`/products/${actionTarget?.id}/status/`, { action: "for sale" })
      .then((res) => {
        actionTarget?.dispatch(
          actionTarget.list.filter((product) => product.id !== actionTarget.id)
        );
      })
      .catch((e) => console.log(e));
    setOnsaleActions(false);
    setSoldoutActions(false);
    setHiddenActions(false);
  };

  return (
    <div className={styles["sales-history-wrapper"]}>
      {mode === 1 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              onsaleActions ? styles.show : ""
            }`}
            onClick={() => setOnsaleActions(false)}
          />
          <div
            className={`${styles["fourBox"]} ${
              onsaleActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText} onClick={changeToModification}>
                게시글 수정
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleBump}>
                끌어올리기
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                숨기기
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setOnsaleActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      {mode === 2 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              soldoutActions ? styles.show : ""
            }`}
            onClick={() => setSoldoutActions(false)}
          />
          <div
            className={`${styles["fourBox"]} ${
              soldoutActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText} onClick={changeToOnsale}>
                판매중으로 변경
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={changeToModification}>
                게시글 수정
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                숨기기
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setSoldoutActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      {mode === 3 && (
        <>
          <div
            className={`${styles["back-shadow"]} ${
              hiddenActions ? styles.show : ""
            }`}
            onClick={() => setHiddenActions(false)}
          />
          <div
            className={`${styles["twoBox"]} ${
              hiddenActions ? styles.show : ""
            }`}
          >
            <div className={styles.upperBox}>
              <div className={styles.blueText} onClick={changeToModification}>
                게시글 수정
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                삭제
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setHiddenActions(false)}
            >
              닫기
            </div>
          </div>
        </>
      )}
      <header>
        <Link to="/main&page=user" className={styles.back}>
          <img src={BackArrow} alt="뒤로" />
        </Link>
        <p>판매내역</p>
      </header>
      <button
        className={
          mode === 1 ? `${styles.onsale} ${styles.selected}` : styles.onsale
        }
        onClick={() => {
          setMode(1);
        }}
      >
        판매중
      </button>
      <button
        className={
          mode === 2
            ? `${styles.completed} ${styles.selected}`
            : styles.completed
        }
        onClick={() => {
          setMode(2);
        }}
      >
        거래완료
      </button>
      <button
        className={
          mode === 3 ? `${styles.hidden} ${styles.selected}` : styles.hidden
        }
        onClick={() => {
          setMode(3);
        }}
      >
        숨김
      </button>
      <section className={styles["body-wrapper"]}>
        {mode === 1 && (
          <Onsales
            setOnsaleActions={setOnsaleActions}
            setActionTarget={setActionTarget}
          />
        )}
        {mode === 2 && (
          <Soldouts
            setSoldoutActions={setSoldoutActions}
            setActionTarget={setActionTarget}
          />
        )}
        {mode === 3 && (
          <Hiddens
            setHiddenActions={setHiddenActions}
            setActionTarget={setActionTarget}
          />
        )}
      </section>
    </div>
  );
};

export default SalesHistory;
