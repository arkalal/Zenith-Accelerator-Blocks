import React from "react";
import styles from "./PDFExtraction.module.scss";

const PDFExtraction = () => {
  return (
    <div className={styles.PDFExtraction}>
      <div className={styles.PDFExtractionFileBox}>
        <div className={styles.PDFExtractionAddFile}>
          <label>Add file</label>

          <div className={styles.dragFile}>
            <span>Drag and drop or</span>
            <input type="file" />
          </div>
          <span>Must be a PDF no larger than 10 MiB.</span>
        </div>

        <div className={styles.formActions}>
          <button>Submit</button>
        </div>
      </div>

      <div className={styles.PDFExtractionResponse}>
        <label>Response</label>
        <div></div>
      </div>
    </div>
  );
};

export default PDFExtraction;
