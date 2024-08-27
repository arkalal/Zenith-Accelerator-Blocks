import React from "react";
import styles from "./AudioTranscription.module.scss";

const AudioTranscription = () => {
  return (
    <div className={styles.AudioTranscription}>
      <div className={styles.AudioTranscriptionFileBox}>
        <div className={styles.AudioTranscriptionAddFile}>
          <label>Add file</label>

          <div className={styles.dragFile}>
            <span>Drag and drop or</span>
            <input type="file" />
          </div>
          <span>Must be an audio file no larger than 150 MiB.</span>
        </div>

        <div className={styles.formActions}>
          <button>Submit</button>
        </div>
      </div>

      <div className={styles.AudioTranscriptionResponse}>
        <label>Response</label>
        <div></div>
      </div>
    </div>
  );
};

export default AudioTranscription;
