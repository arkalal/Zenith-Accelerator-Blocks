import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./TextToJson.module.scss";
import { PuffLoader } from "react-spinners";

const TextToJson = forwardRef((props, ref) => {
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
      const res = await axios.post("text_to_json", body);
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
    <div className={styles.TextToJson}>
      <div className={styles.TextToJsonBox}>
        <div className={`${styles.formGroup} ${styles.TextToJsonDocument}`}>
          <textarea
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </div>

        <div className={styles.TextToJsonFormActions}>
          <div className={styles.TextToJsonPanel}>
            <label>Schema</label>
            <textarea
              placeholder="Enter your schema"
              value={schema}
              onChange={handleSchemaChange}
              className={styles.schemaTextarea} // Apply a custom class for styling if needed
            ></textarea>
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.TextToJsonResponse}`}>
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

export default TextToJson;
