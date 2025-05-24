import React from 'react'
import styles from "./Footer.module.css";
import logo2 from "../../assets/Bhargava-Samaaj-Logo.jpeg";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
<div className={styles.footer}>
        <div className={styles.footerLogo}>
          <img src={logo2} width={100} height={100} className={styles.logo}/>
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
          <div className={styles.phone}>Phone no:987654321</div>
          <div className={styles.address}>
            Head-Office: F-72, Ambedkar Nagar, Delhi
          </div>
        </div>
      </div>

    </>
    
  )
}

export default Footer