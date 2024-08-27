import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./AudioToJson.module.scss";
import { PuffLoader } from "react-spinners";

const AudioToJson = forwardRef((props, ref) => {
  const [audioFile, setAudioFile] = useState(null); // File input for audio
  const [schema, setSchema] = useState(""); // Text area for schema input
  const [response, setResponse] = useState();
  const [Loading, setLoading] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState("transcribe"); // Default to transcribe

  // Handle input changes for the audio file and schema
  const handleAudioFileChange = (e) => setAudioFile(e.target.files[0]);
  const handleSchemaChange = (e) => setSchema(e.target.value);

  const handleEndpointChange = (endpoint) => {
    setApiEndpoint(endpoint);
  };

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
    body.append("file", audioFile);
    body.append("schema", formattedSchema);

    setLoading(true); // Set loading to true before making the request

    try {
      const res = await axios.post(apiEndpoint, body);
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
    <div className={styles.AudioToJson}>
      <div className={styles.AudioToJsonBox}>
        <div className={`${styles.formGroup} ${styles.AudioToJsonDocument}`}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioFileChange}
          />
        </div>

        <div className={styles.AudioToJsonFormActions}>
          <div className={styles.AudioToJsonPanel}>
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

      <div className={styles.AudioToJsonButtons}>
        <button
          onClick={() => handleEndpointChange("transcribe")}
          className={apiEndpoint === "transcribe" ? styles.active : ""}
        >
          Transcribe
        </button>
        <button
          onClick={() => handleEndpointChange("translate")}
          className={apiEndpoint === "translate" ? styles.active : ""}
        >
          Translate
        </button>
      </div>

      <div className={`${styles.formGroup} ${styles.AudioToJsonResponse}`}>
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

export default AudioToJson;
