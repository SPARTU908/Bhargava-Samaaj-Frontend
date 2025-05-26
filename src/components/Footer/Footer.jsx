import React from "react";
import styles from "./Footer.module.css";
import logo2 from "../../assets/samaajlogo.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerLogo}>
          <img src={logo2} width={150} height={150} className={styles.logo} />
        </div>
        <div className={styles.footercol2}>
          <div className={styles.social}>Social Media</div>
          <div className={styles.socialIcons}>
            <div>
              <CiFacebook />
            </div>
            <div>
              <FaInstagram />
            </div>
            <div>
              <FaTwitter />
            </div>
          </div>
        </div>
        <div className={styles.footercol3}>
          <div className={styles.contact}>Contact Details</div>
          <div className={styles.phone}>Phone no:9414076842</div>
          <div className={styles.address}>
            401, 3rd Floor,Empire Apartment Mehroli,<br />Gurgaon Road,Sultanpur,New Delhi-30
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
