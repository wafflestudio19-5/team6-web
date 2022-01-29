import styles from "../Phrase/Phrase.module.scss";
import { TextareaAutosize } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import grayCross from "../../../../../icons/grayCross.png";
import requester from "../../../../../apis/requester";

const Phrase = (props: {
  setValue: Dispatch<SetStateAction<string>>;
  setIsPhraseOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [content, setContent] = useState<string>("");
  const [phrases, setPhrases] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    requester
      .get("users/me/phrases/")
      .then((res) => setPhrases(res.data.phrases));
    if (deleted) setDeleted(false);
  }, [content, deleted]);

  const onClickAdd = () => {
    requester
      .post("users/me/phrases/", { phrase: content })
      .then((res) => setContent(""));
  };

  const onClickDelete = (phrase: string) => {
    requester.delete(`users/me/phrases/${phrases.indexOf(phrase)}/`);
    setDeleted(true);
  };

  const onClickPhrase = (phrases: string) => {
    props.setValue((prevState) => {
      if (!prevState) return phrases;
      else return prevState + "\n" + phrases;
    });
    props.setIsPhraseOpen(false);
  };
  return (
    <>
      <div className={styles.box}>
        <div className={styles.header}>
          <span className={styles.sentence}>
            게시글에 쓰고 싶은 문구를 선택해주세요.
          </span>
        </div>
        <div className={styles.footer}>
          <TextareaAutosize
            maxRows={1}
            value={content}
            className={styles.inputPhrase}
            placeholder={"문구를 입력해주세요."}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={styles.addButton} onClick={onClickAdd}>
            추가
          </button>
        </div>
        <div className={styles.contents}>
          {phrases.map((phrase) => {
            return (
              <div className={styles.phraseContainer}>
                <TextareaAutosize
                  readOnly
                  value={phrase}
                  className={styles.phrase}
                  onClick={() => onClickPhrase(phrase)}
                />
                <img
                  src={grayCross}
                  alt={"삭제"}
                  className={styles.deleteButton}
                  onClick={() => onClickDelete(phrase)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Phrase;
