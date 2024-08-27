import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./PiiToJson.module.scss";
import { PuffLoader } from "react-spinners";

const PiiToJson = forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const [schema, setSchema] = useState(""); // Text area for schema input
  const [response, setResponse] = useState();
  const [Loading, setLoading] = useState(false);

  // Handle input changes for the text and schema
  const handleTextChange = (e) => setText(e.target.value);
  const handleSchemaChange = (e) => setSchema(e.target.value);

  // Submit the form and send the data to the server
  const handleSubmit = async () => {
    let formattedSchema;

    try {
      // Attempt to parse the JSON to ensure it's valid and then format it
      formattedSchema = JSON.stringify(JSON.parse(schema), null, 2);
    } catch (error) {
      console.error("Invalid JSON schema:", error);
      return; // Exit if the JSON schema is not valid
    }

    const body = new FormData();
    body.append("text", text);
    body.append("schema", formattedSchema);

    setLoading(true); // Set loading to true before making the request

    try {
      const res = await axios.post("pii_to_json", body);
      setResponse(res.data);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false); // Set loading to false after the response or error
    }
  };

  // Expose the handleSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className={styles.PiiToJson}>
      <div className={styles.PiiToJsonBox}>
        <div className={`${styles.formGroup} ${styles.PiiToJsonDocument}`}>
          <textarea
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </div>

        <div className={styles.PiiToJsonFormActions}>
          <div className={styles.PiiToJsonPanel}>
            <label>Schema</label>
            <textarea
              placeholder="Enter your schema"
              value={schema}
              onChange={handleSchemaChange}
              className={styles.schemaTextarea}
            ></textarea>
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.PiiToJsonResponse}`}>
        <div className={styles.responseBox}>
          {Loading ? (
            <div className={styles.loaderContainer}>
              <PuffLoader color="lightBlue" loading />
            </div>
          ) : response ? (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          ) : (
            <span className={styles.placeholder}>Response</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default PiiToJson;
