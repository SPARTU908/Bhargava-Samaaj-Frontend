import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Advertisement.module.css";
import img1 from "../assets/advertisement.jpg";

const Advertisement = () => {
  return (
    <>
      <Navbar />
      <div className={styles.heading}>विज्ञापन</div>
      <div className={styles.advertisement}>
        <div>
          <img src={img1} alt="" className={styles.img} />
        </div>
        <div>
          <img src={img1} alt="" className={styles.img} />
        </div>
      </div>
    </>
  );
};

export default Advertisement;
