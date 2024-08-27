import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./DocumentSummary.module.scss";
import { FaPlus, FaTrash } from "react-icons/fa6";
import axios from "../../../axios/api";
import { PuffLoader } from "react-spinners";

const DocumentSummary = forwardRef((props, ref) => {
  const [values, setValues] = useState({ document: "", length: "short" });
  const [responseData, setResponseData] = useState(null);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddExample = () => {
    setExamples([
      ...examples,
      { id: examples.length + 1, document: "", summary: "" },
    ]);
  };

  const handleRemoveExample = (id) => {
    setExamples(examples.filter((example) => example.id !== id));
  };

  const handleExampleChange = (id, field, value) => {
    const newExamples = examples.map((example) => {
      if (example.id === id) {
        return { ...example, [field]: value };
      }
      return example;
    });
    setExamples(newExamples);
  };

  const handleSubmit = async () => {
    const body = {
      document: values.document,
      examples: examples.map((example) => ({
        document: example.document,
        summary: example.summary,
      })),
      length: values.length,
      model: "gpt-3.5-turbo",
    };

    setLoading(true);

    try {
      const res = await axios.post("blocks/summarize", body);
      setResponseData(res.data.summary);
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
    <div className={styles.DocumentSummary}>
      <div className={`${styles.formGroup} ${styles.DocSummaryDocument}`}>
        <label>Document Context</label>
        <textarea
          onChange={(e) => setValues({ ...values, document: e.target.value })}
          placeholder="Enter here"
          value={values.document}
        ></textarea>
      </div>

      <div className={`${styles.formGroup} ${styles.DocSummaryLength}`}>
        <label>Summary Length</label>
        <div className={styles.lengthOptions}>
          <button
            className={values.length === "short" ? styles.active : ""}
            onClick={() => setValues({ ...values, length: "short" })}
          >
            Short
          </button>
          <button
            className={values.length === "long" ? styles.active : ""}
            onClick={() => setValues({ ...values, length: "long" })}
          >
            Long
          </button>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.DocSummaryTraining}`}>
        <div className={styles.DocSummaryTrainingBtn}>
          <label>Training Examples</label>
          <FaPlus className={styles.plusExample} onClick={handleAddExample} />
        </div>

        {examples.map((example) => (
          <div key={example.id} className={styles.DocSummaryNewExample}>
            <div className={styles.exampleFields}>
              <div className={styles.newExampleDoc}>
                <label>Document Context</label>
                <textarea
                  placeholder="Enter here"
                  value={example.document}
                  onChange={(e) =>
                    handleExampleChange(example.id, "document", e.target.value)
                  }
                ></textarea>
              </div>
              <div className={styles.newExampleSummary}>
                <label>Summary</label>
                <textarea
                  placeholder="Enter here"
                  value={example.summary}
                  onChange={(e) =>
                    handleExampleChange(example.id, "summary", e.target.value)
                  }
                ></textarea>
              </div>
              <FaTrash
                onClick={() => handleRemoveExample(example.id)}
                className={styles.newExampleTrash}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.formGroup} ${styles.DocSummaryResponse}`}>
        <div className={styles.responseBox}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <PuffLoader color="lightBlue" loading />
            </div>
          ) : responseData ? (
            <pre>{responseData}</pre>
          ) : (
            <span className={styles.placeholder}>Response</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default DocumentSummary;
