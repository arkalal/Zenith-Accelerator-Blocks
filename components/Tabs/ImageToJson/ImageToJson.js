import React, { useState, useImperativeHandle, forwardRef } from "react";
import axios from "../../../axios/api2"; // Using the provided axios instance
import styles from "./ImageToJson.module.scss";
import { PuffLoader } from "react-spinners";

const ImageToJson = forwardRef((props, ref) => {
  const [imageUrl, setImageUrl] = useState(""); // Input for image URL
  const [schema, setSchema] = useState(""); // Text area for schema input
  const [response, setResponse] = useState();
  const [Loading, setLoading] = useState(false);

  // Handle input changes for the image URL and schema
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleSchemaChange = (e) => setSchema(e.target.value);

  console.log("imageUrl", imageUrl);

  // Submit the form and send the data to the server
  const handleSubmit = async () => {
    let formattedSchema;
    setLoading(true);

    try {
      // Attempt to parse the JSON to ensure it's valid and then format it
      formattedSchema = JSON.stringify(JSON.parse(schema), null, 2);
    } catch (error) {
      console.error("Invalid JSON schema:", error);
      return; // Exit if the JSON schema is not valid
    }

    const body = new FormData();
    body.append("image_url", imageUrl); // Pass the image URL
    body.append("schema", formattedSchema);

    try {
      const res = await axios.post("image_to_json", body);
      setLoading(false);
      setResponse(res.data);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  // Expose the handleSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className={styles.ImageToJson}>
      <div className={styles.ImageToJsonBox}>
        <div className={`${styles.formGroup} ${styles.ImageToJsonDocument}`}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>

        <div className={styles.ImageToJsonFormActions}>
          <div className={styles.ImageToJsonPanel}>
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

      <div className={`${styles.formGroup} ${styles.ImageToJsonResponse}`}>
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

export default ImageToJson;
