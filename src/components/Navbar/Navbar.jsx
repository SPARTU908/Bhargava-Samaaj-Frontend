import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/full-logo.png";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "react-multi-carousel/lib/styles.css";

import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [language, setLanguage] = useState("hi");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const selectedLang = document.querySelector(".goog-te-combo")?.value;
      if (selectedLang) {
        setLanguage(selectedLang);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1((prev) => !prev);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prev) => !prev);
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3((prev) => !prev);
  };
  const toggleHamburger = () => setHamburgerOpen((prev) => !prev);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setHamburgerOpen(false);
  };

const handleHome = () => {
    navigate("/home");
  };  
  const handleAbout = (sectionId) => {
    navigate("/about");
    setTimeout(() => {
      window.location.hash = sectionId;
    }, 100);
  };
  const handleCensus = () => {
    navigate("/census");
  };
  const handleForm = () => {
    navigate("/download");
  };
  const handleMagazine = () => {
    navigate("/magazine");
  };
  const handleMatrimonial = () => {
    navigate("/matrimonial");
  };
  const handleAdvertisement = () => {
    navigate("/advertisement");
  };

  const handleMembership = () => {
    navigate("/membership");
  };
  const handleHaridwar = () => {
    navigate("/haridwar");
  };
  const handleAdmin = () =>{
    navigate("/admin")
  }
  const handleSociety = (sectionId) => {
    navigate("/society");
    setTimeout(() => {
      window.location.hash = sectionId;
    }, 100);
  };
  return (
    <>
      <div className={styles.top_bar}>
        <div id="google_translate_element"></div>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.hamburger} onClick={toggleHamburger}>
          {hamburgerOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Navbar Section */}
      <nav
        className={`${styles.navbar} ${hamburgerOpen ? styles.navOpen : ""}`}
      >
        <div className={`${styles.menu} notranslate`} onClick={handleHome}>
          {language === "en" ? "Home" : "होम"}
        </div>

        <div className={styles.dropdown} onClick={toggleDropdown1}>
          <div className={styles.dropbtn}>
            हमारे बारे में <FaChevronDown className={styles.arrow} />
          </div>
          {isDropdownOpen1 && (
            <div className={styles.dropdownContent}>
              <div onClick={() => handleAbout("history")}>हमारा इतिहास</div>
              <div onClick={() => handleAbout("samvidhaan")}>संविधान</div>
              <div onClick={() => handleAbout("sabhayein")}>स्थानीय सभाएं</div>
              <div onClick={() => handleAbout("samiti")}>समिति</div>
              <div onClick={() => handleAbout("nidhiyan")}>सभा की निधियाँ</div>
              <div onClick={() => handleAbout("executive")}>
                कार्यकारी निकाय
              </div>
            </div>
          )}
        </div>

        <div className={styles.dropdown} onClick={toggleDropdown2}>
          <div className={styles.dropbtn}>
            हमारा समाज
            <FaChevronDown className={styles.arrow} />
          </div>
          {isDropdownOpen2 && (
            <div className={styles.dropdownContent}>
              <div onClick={() => handleSociety("ancestors")}>हमारे पूर्वज</div>
              <div onClick={() => handleSociety("greatMen")}>
                हमारे महापुरुष
              </div>
              <div onClick={() => handleSociety("genealogy")}>वंशावली</div>
              <div onClick={() => handleSociety("holyPlace")}>
                हमारा तीर्थ स्थल
              </div>
              <div onClick={() => handleSociety("values")}>हमारे संस्कार</div>
              <div onClick={() => handleSociety("festivals")}>
                हमारे त्योहार
              </div>
            </div>
          )}
        </div>
        <div className={styles.dropdown} onClick={toggleDropdown3}>
          <div className={styles.dropbtn}>
            संपत्तियाँ
            <FaChevronDown className={styles.arrow} />
          </div>
          {isDropdownOpen3 && (
            <div className={styles.dropdownContent}>
              <div onClick={handleHaridwar}>हरिद्वार </div>
            </div>
          )}
        </div>

        <div className={styles.menu} onClick={handleMagazine}>
          भार्गव पत्रिका
        </div>

        <div className={styles.menu} onClick={handleMatrimonial}>
          {" "}
          वैवाहिक
        </div>
        <div className={styles.menu} onClick={handleCensus}>
          जनगणना
        </div>
        <div className={styles.menu} onClick={handleAdvertisement}>
          विज्ञापन
        </div>

        <div className={styles.menu} onClick={handleMembership}>
          सदस्यता
        </div>
        <div className={styles.menu} onClick={handleForm}>
          फ़ॉर्म डाउनलोड करें
        </div>
         <div className={styles.menu} onClick={handleAdmin}>
          Admin Login
        </div>
      </nav>
    </>
  );
};

export default Navbar;
