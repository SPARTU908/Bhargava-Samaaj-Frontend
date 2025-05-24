import Navbar from "../components/Navbar/Navbar";
import styles from "./About.module.css";
import history from "../assets/history.png";
import samvidhaan from "../assets/samvidhaan.png";
import sabha from "../assets/sabhayein.png";
import samiti from "../assets/samiti.png";
import executive from "../assets/executive.png";
import React, { useEffect } from "react";

const About = () => {
   useEffect(() => {
      // Get the hash from the URL and scroll to the element with that id
      const hash = window.location.hash;
  
      if (hash) {
        const section = document.getElementById(hash.slice(1)); // Remove the '#' from the hash
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [window.location.hash]);
  return (
    <>
      <Navbar />
      {/* Hmare Etihaas */}
      <div id="history" className={styles.container}>
        <div className={styles.heading}> इतिहास</div>
        <div>
          <img src={history} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
              href="/pdfs/Sabha/History-1989-2014.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              हमारे इतिहास के बारे में पढ़े
            </a>
          </button>
        </div>
      </div>

      {/* Samvidhaan */}
      <div id="samvidhaan" className={styles.container}>
        <div  className={styles.heading}>संविधान</div>
        <div>
          <img src={samvidhaan} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
             href="/pdfs/Sabha/Samvidhaan.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
            हमारे संविधान के बारे में पढ़े
            </a>
          </button>
        </div>
      </div>

      {/* esthaniya sabhayein */}
      <div id="sabhayein" className={styles.container}>
        <div className={styles.heading}>स्थानीय सभाएं</div>
        <div>
          <img src={sabha} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
              href="/pdfs/Sabha/Localsabha.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
            स्थानीय सभाएं के बारे में जाने
            </a>
          </button>
        </div>
      </div>

      {/* Samiti */}
      <div id="samiti" className={styles.container}>
        <div className={styles.heading}>समिति </div>
        <div>
          <img src={samiti} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
              href="/pdfs/Sabha/updated-samiti.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
            हमारे समितियों के बारे में जानें
            </a>
          </button>
        </div>
      </div>

      {/* nidhiyan */}

      <div id="nidhiyan" className={styles.container}>
        <div className={styles.heading}>सभा की निधियाँ </div>
        <div>
          <img src={samiti} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
              href="/pdfs/Sabha/nidhiyan.pdf"
             
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
            सभा की निधियाँ के बारे में जानें
            </a>
          </button>
        </div>
      </div>

      {/* executive body */}
      <div id="executive" className={styles.container}>
        <div className={styles.heading}>कार्यकारी निकाय </div>
        <div>
          <img src={executive} alt="" className={styles.history} />
        </div>
        <div className={styles.btn}>
          <button className={styles.button}>
            <a
              href="/pdfs/Sabha/Executive-body.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
            कार्यकारी निकाय के बारे में जानें
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
