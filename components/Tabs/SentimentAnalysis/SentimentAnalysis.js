import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./SentimentAnalysis.module.scss";
import { FaPlus, FaTrash } from "react-icons/fa6";
import axios from "../../../axios/api";
import { PuffLoader } from "react-spinners";

const SentimentAnalysis = forwardRef((props, ref) => {
  const [Value, setValue] = useState("");
  const [ResponseData, setResponseData] = useState(null);
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddExample = () => {
    setExamples([
      ...examples,
      { id: examples.length + 1, document: "", sentiment: "" },
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
      document: Value,
      examples: examples.map((example) => ({
        document: example.document,
        sentiment: example.sentiment,
      })),
      model: "gpt-3.5-turbo",
    };

    setLoading(true);

    try {
      const res = await axios.post("blocks/analyze-sentiment", body);
      setResponseData(res.data.sentiment);
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
    <div className={styles.SentimentAnalysis}>
      <div className={`${styles.formGroup} ${styles.SentAnalysDocument}`}>
        <label>Document Context</label>
        <textarea
          value={Value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter here"
        ></textarea>
      </div>

      <div className={`${styles.formGroup} ${styles.SentAnalysTraining}`}>
        <div className={styles.SentAnalysTrainingBtn}>
          <label>Training Examples</label>
          <FaPlus className={styles.plusExample} onClick={handleAddExample} />
        </div>

        {examples.map((example) => (
          <div key={example.id} className={styles.SentAnalysNewExample}>
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
              <div className={styles.newExampleSentiment}>
                <label>Sentiment</label>
                <textarea
                  placeholder="Enter here"
                  value={example.sentiment}
                  onChange={(e) =>
                    handleExampleChange(example.id, "sentiment", e.target.value)
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

      <div className={`${styles.formGroup} ${styles.SentAnalysResponse}`}>
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

export default SentimentAnalysis;
