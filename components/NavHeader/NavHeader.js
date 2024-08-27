import React from "react";
import styles from "./NavHeader.module.scss";
import Image from "next/image";
import blueScaleGenLogo from "../../assets/images/logo_blue.png";

const NavHeader = () => {
  return (
    <div className={styles.NavHeader}>
      <Image
        src={process.env.ZENITHCLIENT_LOGO}
        alt="ScaleGenAI"
        className={styles.navImg}
        width={50}
        height={50}
      />
      <h3>/ Accelarator Blocks</h3>
    </div>
  );
};

export default NavHeader;
