"use client";

import React from "react";
import styles from "./Content.module.scss";
import { connect } from "react-redux";
import QuestionAnswer from "../Tabs/QuestionAnswer/QuestionAnswer";
import DocumentSummary from "../Tabs/DocumentSummary/DocumentSummary";
import SentimentAnalysis from "../Tabs/SentimentAnalysis/SentimentAnalysis";
import Personalization from "../Tabs/Personalization/Personalization";
import EntityExtraction from "../Tabs/EntityExtraction/EntityExtraction";
import PDFExtraction from "../Tabs/PDFExtraction/PDFExtraction";
import AudioTranscription from "../Tabs/AudioTranscription/AudioTranscription";
import TextToJson from "../Tabs/TextToJson/TextToJson";
import ImageToJson from "../Tabs/ImageToJson/ImageToJson";
import VideoToJson from "../Tabs/VideoToJson/VideoToJson";
import FileToJson from "../Tabs/FileToJson/FileToJson";
import AudioToJson from "../Tabs/AudioToJson/AudioToJson";
import PiiToJson from "../Tabs/PiiToJson/PiiToJson";

const Content = ({ selectedOption }) => {
  let handleSubmit;

  const renderContent = () => {
    switch (selectedOption) {
      case "Question & Answer":
        return <QuestionAnswer />;
      case "Document Summary":
        return (
          <DocumentSummary ref={(el) => (handleSubmit = el?.handleSubmit)} />
        );
      case "Sentiment Analysis":
        return (
          <SentimentAnalysis ref={(el) => (handleSubmit = el?.handleSubmit)} />
        );
      case "Personalization":
        return (
          <Personalization ref={(el) => (handleSubmit = el?.handleSubmit)} />
        );
      case "Entity Extraction":
        return (
          <EntityExtraction ref={(el) => (handleSubmit = el?.handleSubmit)} />
        );
      case "Text to JSON":
        return <TextToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;
      case "Image to JSON": // New case for Image to JSON
        return <ImageToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;
      case "PII to JSON":
        return <PiiToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;
      case "Audio to JSON":
        return <AudioToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;
      case "File to JSON":
        return <FileToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;
      case "Video to JSON":
        return <VideoToJson ref={(el) => (handleSubmit = el?.handleSubmit)} />;

      case "PDF Extraction":
        return <PDFExtraction />;
      case "Audio Transcription":
        return <AudioTranscription />;
      default:
        return <QuestionAnswer />;
    }
  };

  const handleButtonClick = () => {
    if (handleSubmit) handleSubmit();
  };

  return (
    <div className={styles.Content}>
      <div className={styles.ContentBlocks}>
        <h2>{selectedOption}</h2>
        {(selectedOption === "Document Summary" ||
          selectedOption === "Sentiment Analysis" ||
          selectedOption === "Personalization" ||
          selectedOption === "Entity Extraction" ||
          selectedOption === "Text to JSON" ||
          selectedOption === "Image to JSON" ||
          selectedOption === "PII to JSON" ||
          selectedOption === "Audio to JSON" ||
          selectedOption === "File to JSON" ||
          selectedOption === "Video to JSON") && ( // Add this condition
          <button className={styles.submitBtn} onClick={handleButtonClick}>
            Submit
          </button>
        )}
      </div>

      <div className={styles.ContentBox}>{renderContent()}</div>
    </div>
  );
};

const mapStateToProps = ({ gradient }) => {
  return {
    selectedOption: gradient.selectedOption,
  };
};

export default connect(mapStateToProps, null)(Content);
