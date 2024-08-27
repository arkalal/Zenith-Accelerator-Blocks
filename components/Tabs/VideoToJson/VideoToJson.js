import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./VideoToJson.module.scss";
import { PuffLoader } from "react-spinners";

const VideoToJson = forwardRef((props, ref) => {
  const [videoFile, setVideoFile] = useState(null); // File input for video
  const [schema, setSchema] = useState(""); // Text area for schema input
  const [response, setResponse] = useState();
  const [Loading, setLoading] = useState(false);

  // Handle input changes for the video file and schema
  const handleVideoFileChange = (e) => setVideoFile(e.target.files[0]);
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
    body.append("video", videoFile);
    body.append("schema", formattedSchema);

    setLoading(true); // Set loading to true before making the request

    try {
      const res = await axios.post("upload_video", body);
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
    <div className={styles.VideoToJson}>
      <div className={styles.VideoToJsonBox}>
        <div className={`${styles.formGroup} ${styles.VideoToJsonDocument}`}>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
        </div>

        <div className={styles.VideoToJsonFormActions}>
          <div className={styles.VideoToJsonPanel}>
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

      <div className={`${styles.formGroup} ${styles.VideoToJsonResponse}`}>
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

export default VideoToJson;
