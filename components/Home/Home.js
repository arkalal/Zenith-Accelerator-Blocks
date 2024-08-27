import React from "react";
import styles from "./Home.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import ReduxProvider from "../../redux/ReduxProvider";
import NavHeader from "../NavHeader/NavHeader";

const Home = () => {
  return (
    <div className={styles.Home}>
      <NavHeader />

      <div className={styles.homePage}>
        <ReduxProvider>
          <Sidebar />
        </ReduxProvider>

        <ReduxProvider>
          <Content />
        </ReduxProvider>
      </div>
    </div>
  );
};

export default Home;
