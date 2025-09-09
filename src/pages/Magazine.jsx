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
         <div className={styles.pdfSection}>
          <h2 className={styles.pdfTitle}>भार्गव पत्रिका की सदस्यता प्राप्त करने के लिए कृपया नीचे दिए गए फॉर्म को भरें |</h2>
          <a
            href="/pdfs/Patrika-Membership-Form.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.pdfLink}
          >
            PDF खोलें / डाउनलोड करें
          </a>
        </div>
          <div className={styles.heading}>भार्गव पत्रिका - अखिल भारतीय भार्गव सभा का मुखपत्र</div>
          <PdfGallery/>
        </div>
        
      </>
     
    </>
  );
};

export default Magazine;
