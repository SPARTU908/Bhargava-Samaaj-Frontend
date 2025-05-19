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

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setHamburgerOpen(false); // close menu on navigation (mobile)
  };

  const handleHome = () => {
    navigate("/home");
  };
  const handleAbout = () => {
    navigate("/about");
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
  const handleSociety = (sectionId) => {
    navigate("/society");
   setTimeout(() => {
    window.location.hash = sectionId;
  }, 100);  // Adjust timeout if needed to ensure the page is loaded first
};
  return (
    <>
      <div className={styles.top_bar}>
        <img src={logo} alt="" className={styles.logo} />
        <div id="google_translate_element" className={styles.translate}></div>
        <div className={styles.hamburger} onClick={toggleHamburger}>
          {hamburgerOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Navbar Section */}
      <nav
        className={`${styles.navbar} ${hamburgerOpen ? styles.navOpen : ""}`}
      >
        <div className={styles.menu} onClick={handleHome}>
          होम
        </div>
        {/* <div>About Us</div>
         */}
        {/* <div className={styles.dropdown} onClick={toggleDropdown1}>
          <div className={styles.dropbtn} >
            हमारे बारे में <FaChevronDown className={styles.arrow} />
          </div>
          {isDropdownOpen1 && (
            <div className={styles.dropdownContent}>
              <div ><a
              href="/pdfs/Sabha/History-1989-2014.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            ></a>हमारा इतिहास</div>
              <div onClick={handleAbout}>संविधान</div>
              <div onClick={handleAbout}>स्थानीय सभाएं</div>
              <div onClick={handleAbout}>समिति</div>
              <div onClick={handleAbout}>अखिल भारतीय सदस्य सूची</div>
              <div onClick={handleAbout}>सभा की निधियाँ</div>
              <div onClick={handleAbout}>कार्यकारी निकाय</div>
            </div>
          )}
        </div> */}
        <div className={styles.dropdown} onClick={toggleDropdown1}>
          <div className={styles.dropbtn}>
            हमारे बारे में <FaChevronDown className={styles.arrow} />
          </div>
          {isDropdownOpen1 && (
            <div className={styles.dropdownContent}>
              <div>
                <a
                  href="/pdfs/Sabha/History-1989-2014.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  हमारा इतिहास
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Samvidhaan.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  संविधान
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Localsabha.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  स्थानीय सभाएं
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Samiti.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  समिति
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Member-list.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  अखिल भारतीय सदस्य सूची
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Sabhayein.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  सभा की निधियाँ
                </a>
              </div>
              <div>
                <a
                  href="/pdfs/Sabha/Executive-body.pdf"
                  className={styles.btn1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  कार्यकारी निकाय
                </a>
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
        {/* <Link to="/bhargava-patrika" className={styles.menu}>Bhargava Patrika</Link> */}
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
      </nav>
    </>
  );
};

export default Navbar;
