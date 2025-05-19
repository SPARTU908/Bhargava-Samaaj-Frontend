import React from "react";
import Navbar from "../components/Navbar/Navbar";

import styles from "./Magazine.module.css";
import PdfGallery from "../components/PdfGallery/PdfGallery";

const Magazine = () => {
  return (
    <>
      <Navbar />
      <>
        <div className={styles.container}> 
          <div className={styles.heading}>भार्गव पत्रिका - अखिल भारतीय भार्गव सभा का मुखपत्र</div>
          <PdfGallery/>
        </div>
        
      </>
     
    </>
  );
};

export default Magazine;
