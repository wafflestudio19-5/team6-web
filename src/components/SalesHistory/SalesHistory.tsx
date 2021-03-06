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
          toast.error("?????? ?????? ???????????? ??? ????????????.");
        } else if (e.response.data.error_code === 201) {
          toast.error("?????? ????????? ??????????????????.");
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
                ????????? ??????
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleBump}>
                ???????????????
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                ?????????
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                ??????
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setOnsaleActions(false)}
            >
              ??????
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
                ??????????????? ??????
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={changeToModification}>
                ????????? ??????
              </div>
              <div className={styles.line} />
              <div className={styles.blueText} onClick={handleHiding}>
                ?????????
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                ??????
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setSoldoutActions(false)}
            >
              ??????
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
                ????????? ??????
              </div>
              <div className={styles.line} />
              <div className={styles.redText} onClick={handleDeletion}>
                ??????
              </div>
            </div>
            <div
              className={styles.lowerBox}
              onClick={() => setHiddenActions(false)}
            >
              ??????
            </div>
          </div>
        </>
      )}
      <header>
        <Link to="/main&page=user" className={styles.back}>
          <img src={BackArrow} alt="??????" />
        </Link>
        <p>????????????</p>
      </header>
      <button
        className={
          mode === 1 ? `${styles.onsale} ${styles.selected}` : styles.onsale
        }
        onClick={() => {
          setMode(1);
        }}
      >
        ?????????
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
        ????????????
      </button>
      <button
        className={
          mode === 3 ? `${styles.hidden} ${styles.selected}` : styles.hidden
        }
        onClick={() => {
          setMode(3);
        }}
      >
        ??????
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
