import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./Personalization.module.scss";
import { FaArrowUp } from "react-icons/fa";
import axios from "../../../axios/api";
import { PuffLoader } from "react-spinners";

const Personalization = forwardRef((props, ref) => {
  const [Values, setValues] = useState({ document: "", target: "" });
  const [ResponseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const body = {
      document: "string",
      target_audience: "string",
      examples: [
        {
          document: Values.document,
          target_audience: Values.target,
          personalized_document: "string",
        },
      ],
      model: "gpt-3.5-turbo",
    };

    setLoading(true);

    try {
      const res = await axios.post("blocks/personalize", body);
      setResponseData(res.data.personalized_document);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className={styles.Personalization}>
      <div className={`${styles.formGroup} ${styles.PersonaliseDocument}`}>
        <label>Document Context</label>
        <textarea
          value={Values.document}
          onChange={(e) =>
            setValues({ document: e.target.value, target: Values.target })
          }
          placeholder="Enter here"
        ></textarea>
      </div>

      <div className={styles.PersonaliseTargetAudience}>
        <label>Target Audience</label>
        <div className={styles.PersonTargetBox}>
          <input
            type="text"
            placeholder="Enter audience description here"
            value={Values.target}
            onChange={(e) =>
              setValues({ document: Values.document, target: e.target.value })
            }
          />
          <FaArrowUp className={styles.arrowIcon} />
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.PersonaliseResponse}`}>
        <div className={styles.responseBox}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <PuffLoader color="lightBlue" loading />
            </div>
          ) : ResponseData ? (
            <pre>{ResponseData}</pre>
          ) : (
            <span className={styles.placeholder}>Response</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default Personalization;
