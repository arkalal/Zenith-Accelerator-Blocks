"use client";

import React from "react";
import styles from "./Sidebar.module.scss";
import * as dispatcher from "../../redux/store/dispatchers";
import { connect } from "react-redux";
import { BsChatLeftDots, BsEmojiNeutral } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbBoxAlignTopFilled, TbJson } from "react-icons/tb";
import { MdImage } from "react-icons/md"; // Add this for Image to JSON

const Sidebar = ({ selectedOption, dispatchSelectedOption }) => {
  const handleSelection = (option) => {
    dispatchSelectedOption(option);
  };

  const menuItems = [
    { label: "Question & Answer", icon: <BsChatLeftDots /> },
    { label: "Document Summary", icon: <IoDocumentTextOutline /> },
    { label: "Sentiment Analysis", icon: <BsEmojiNeutral /> },
    { label: "Personalization", icon: <FaUser /> },
    { label: "Entity Extraction", icon: <TbBoxAlignTopFilled /> },
    { label: "Text to JSON", icon: <TbJson /> },
    { label: "Image to JSON", icon: <MdImage /> }, // New item for Image to JSON
    { label: "PII to JSON", icon: <TbJson /> },
    { label: "Audio to JSON", icon: <TbJson /> },
    { label: "File to JSON", icon: <TbJson /> },
    { label: "Video to JSON", icon: <TbJson /> },
  ];

  return (
    <div className={styles.Sidebar}>
      <div className={styles.SidebarOption}>
        <div className={styles.SidebarBtns}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={selectedOption === item.label ? styles.active : ""}
              onClick={() => handleSelection(item.label)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ gradient }) => ({
  selectedOption: gradient.selectedOption,
});

export default connect(mapStateToProps, dispatcher)(Sidebar);
