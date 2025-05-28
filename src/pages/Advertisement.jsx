import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Advertisement.module.css";


const Advertisement = () => {
  return (
    <>
      <Navbar />
      <div className={styles.heading}>Coming Soon!</div>
      
    </>
  );
};

export default Advertisement;
