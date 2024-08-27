import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./FileToJson.module.scss";
import { PuffLoader } from "react-spinners";

const FileToJson = forwardRef((props, ref) => {
  const [file, setFile] = useState(null); // File input for document
  const [schema, setSchema] = useState(""); // Text area for schema input
  const [response, setResponse] = useState();
  const [Loading, setLoading] = useState(false);

  // Handle input changes for the file and schema
  const handleFileChange = (e) => setFile(e.target.files[0]);
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
    body.append("file", file);
    body.append("schema", formattedSchema);

    setLoading(true); // Set loading to true before making the request

    try {
      const res = await axios.post("upload_files", body);
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
    <div className={styles.FileToJson}>
      <div className={styles.FileToJsonBox}>
        <div className={`${styles.formGroup} ${styles.FileToJsonDocument}`}>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className={styles.FileToJsonFormActions}>
          <div className={styles.FileToJsonPanel}>
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

      <div className={`${styles.formGroup} ${styles.FileToJsonResponse}`}>
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

export default FileToJson;
