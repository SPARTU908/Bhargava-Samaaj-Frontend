import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Magazine.module.css";
import PdfGallery from "../components/PdfGallery/PdfGallery";
import { Link } from "react-router-dom";

const Magazine = () => {
  return (
    <>
      <Navbar />
      <>
        <div className={styles.container}>
      

          <div className={styles.pdfSection}>
            <p className={styles.pdfSentence}>
              भार्गव पत्रिका की सदस्यता प्राप्त करने के लिए कृपया
              <Link to="/patrika-form" className={styles.inlineButton}>
                इस फॉर्म
              </Link>
              को भरें।
            </p>
          </div>
          <div className={styles.heading}>
            भार्गव पत्रिका - अखिल भारतीय भार्गव सभा का मुखपत्र
          </div>
          <PdfGallery />
        </div>
      </>
    </>
  );
};

export default Magazine;
