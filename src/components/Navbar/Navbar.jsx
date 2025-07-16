// import React, { useState, useEffect, useRef } from "react";
// import styles from "./Navbar.module.css";
// import logo from "../../assets/full-logo.png";
// import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
// import "react-multi-carousel/lib/styles.css";

// import { useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
//   const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
//   const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
//   const [hamburgerOpen, setHamburgerOpen] = useState(false);
//   const [isMatchDropdownOpen, setIsMatchDropdownOpen] = useState(false);
//   const [isSamitiDropdownOpen, setIsSamitiDropdownOpen] = useState(false);
//   const [language, setLanguage] = useState("hi");

//   const dropdownRef1 = useRef(null);
//   const dropdownRef2 = useRef(null);
//   const dropdownRef3 = useRef(null);
//   const samitiRef = useRef(null);
//   const matchDropdownRef = useRef(null);

//   const handleSamitiToggle = (e) => {
//     e.stopPropagation();
//     setIsSamitiDropdownOpen((prev) => !prev); // Toggle dropdown
//   };

//   const handleOptionClick = (option) => {
//     console.log("Selected Option:", option);
//     setShowDropdown(false); // Optional: close after selection
//   };

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       const selectedLang = document.querySelector(".goog-te-combo")?.value;
//       if (selectedLang) {
//         setLanguage(selectedLang);
//       }
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (
//       dropdownRef1.current && !dropdownRef1.current.contains(event.target) &&
//       dropdownRef2.current && !dropdownRef2.current.contains(event.target) &&
//       dropdownRef3.current && !dropdownRef3.current.contains(event.target) &&
//       samitiRef.current && !samitiRef.current.contains(event.target) &&
//       matchDropdownRef.current && !matchDropdownRef.current.contains(event.target)
//     ) {
//       setIsDropdownOpen1(false);
//       setIsDropdownOpen2(false);
//       setIsDropdownOpen3(false);
//       setIsMatchDropdownOpen(false);
//       setIsSamitiDropdownOpen(false);
//     }
//   };

//   document.addEventListener("click", handleClickOutside);
//   return () => {
//     document.removeEventListener("click", handleClickOutside);
//   };
// }, []);

//   const toggleDropdown1 = () => {
//     setIsDropdownOpen1((prev) => !prev);
//   };
//   const toggleDropdown2 = () => {
//     setIsDropdownOpen2((prev) => !prev);
//   };
//   const toggleDropdown3 = () => {
//     setIsDropdownOpen3((prev) => !prev);
//   };

//   const toggleMatchDropdown = () => setIsMatchDropdownOpen((prev) => !prev);
//   const toggleHamburger = () => setHamburgerOpen((prev) => !prev);

//   const navigate = useNavigate();

//   const handleNavigate = (path) => {
//     navigate(path);
//     setHamburgerOpen(false);
//   };

//   const handleHome = () => {
//     navigate("/home");
//   };
//   const handleAbout = (sectionId) => {
//     navigate("/about");
//     setTimeout(() => {
//       window.location.hash = sectionId;
//     }, 100);
//   };
//   const handleCensus = () => {
//     navigate("/census");
//   };
//   const handleForm = () => {
//     navigate("/download");
//   };
//   const handleMagazine = () => {
//     navigate("/magazine");
//   };
//   const handleMatrimonial = () => {
//     navigate("/matrimonial");
//   };
//   const handleAdvertisement = () => {
//     navigate("/advertisement");
//   };

//   const handleMembership = () => {
//     navigate("/membership");
//   };
//   const handleHaridwar = () => {
//     navigate("/haridwar");
//   };
//   const handleAdmin = () => {
//     navigate("/admin");
//   };
//   const handleRegister = () => {
//     navigate("/vivahmemberregister");
//   };

//   const handleSociety = (sectionId) => {
//     navigate("/society");
//     setTimeout(() => {
//       window.location.hash = sectionId;
//     }, 100);
//   };

//   return (
//     <>
//       <div className={styles.top_bar}>
//         <div className={styles.hamburger} onClick={toggleHamburger}>
//           {hamburgerOpen ? <FaTimes /> : <FaBars />}
//         </div>
//         <img src={logo} alt="" className={styles.logo} />
//       </div>

//       {/* Navbar Section */}
//       <nav
//         className={`${styles.navbar} ${hamburgerOpen ? styles.navOpen : ""}`}
//       >
//         <div className={`${styles.menu} notranslate`} onClick={handleHome}>
//           {language === "en" ? "Home" : "होम"}
//         </div>

//         <div className={styles.dropdown} onClick={toggleDropdown1} ref={dropdownRef1}>
//           <div className={styles.dropbtn}>
//             हमारे बारे में <FaChevronDown className={styles.arrow} />
//           </div>

//           {isDropdownOpen1 && (
//             <div className={styles.dropdownContent}>
//               <div onClick={() => handleAbout("history")}>हमारा इतिहास</div>
//               <div onClick={() => handleAbout("samvidhaan")}>संविधान</div>
//               <div onClick={() => handleAbout("sabhayein")}>स्थानीय सभाएं</div>

//               {/* समिति with nested dropdown */}
//               <div className={styles.subDropdownWrapper}  ref={samitiRef}>
//                 <div
//                   className={styles.subDropdownTrigger}
//                   onClick={handleSamitiToggle}
//                 >
//                   समिति
//                 </div>

//                 {isSamitiDropdownOpen && (
//                   <div className={styles.subDropdown}>
//                     <div onClick={() => handleOptionClick("option1")}>
//                       <a
//                         href="/pdfs/Samiti/1. Samaj Kalyan Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         समाज कल्याण समिति{" "}
//                       </a>
//                     </div>
//                     <div onClick={() => handleOptionClick("option2")}>
//                       <a
//                         href="/pdfs/Samiti/2. Shiksha Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         शिक्षा समिति{" "}
//                       </a>
//                     </div>
//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/3. Central Property Committee.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         सेंट्रल प्रॉपर्टी समिति{" "}
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/4. Finance Advisory Committee.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         फाइनेंस एडवाइजरी समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/5. Samanvaya Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         समन्वय समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/6. Adhiveshan Aayojan avam Prabandh Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         अधिवेशन आयोजन अवं प्रबंध समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/7. Vavah Paramarsh Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         विवाह परामर्श समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/8. Kanya Vivah Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         कन्या विवाह समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/9. Khel Kood Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         खेल कूद समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/10. Yuva Karyakrama Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         युवा कार्यक्रम समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/11. Dharmik avam Naitik Shiksha Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         धार्मिक अवं नैतिक शिक्षा समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/12. Samvidhan Samiksha Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         संविधान समीक्षा समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/13. Website avam Jangarna Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         वेबसाइट अवं जनगर्ण समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/14. Takniki Shiksha Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         तकनिकी शिक्षा समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/15. Carrier Development Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         कर्रिएर डेवलपमेंट समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/16. Uttam Shiksha Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         उत्तम शिक्षा समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/17. Maan Samman avam Puraskar Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         मान सम्मान अवं पुरस्कार समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/18. Sankskritik Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         सांस्कृतिक समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/19. Heritage avam Dharohar Prabandh Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         हेरिटेज अवं धरोहर प्रबंध समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/20. Bhargava Ashram avam Ganga Ashram Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         भार्गव आश्रम अवं गंगा आश्रम समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/21. Bhargava Patrika Salahkar Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         भार्गव पत्रिका सलाहकार समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/22. Chikitsa Sahayata Salahkar Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         चिकित्सा सहायता सलाहकार समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option3")}>
//                       <a
//                         href="/pdfs/Samiti/23. Varisth Naagrik avam Punah Sthapana Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         वरिष्ठ नागरिक अवं पुनः स्थापना समिति
//                       </a>
//                     </div>

//                     <div onClick={() => handleOptionClick("option4")}>
//                       <a
//                         href="/pdfs/Samiti/24. Kanooni Salahkar Samiti.pdf"
//                         className={styles.btn1}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         कानूनी सलाहकार समिति
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div onClick={() => handleAbout("nidhiyan")}>सभा की निधियाँ</div>
//             </div>
//           )}
//         </div>

//         <div className={styles.dropdown} onClick={toggleDropdown2} ref={dropdownRef2}>
//           <div className={styles.dropbtn}>
//             हमारा समाज
//             <FaChevronDown className={styles.arrow} />
//           </div>
//           {isDropdownOpen2 && (
//             <div className={styles.dropdownContent}>
//               <div onClick={() => handleSociety("ancestors")}>हमारे पूर्वज</div>
//               <div onClick={() => handleSociety("greatMen")}>
//                 हमारे महापुरुष
//               </div>
//               <div onClick={() => handleSociety("genealogy")}>वंशावली</div>
//               <div onClick={() => handleSociety("holyPlace")}>
//                 हमारा तीर्थ स्थल
//               </div>
//               <div onClick={() => handleSociety("values")}>हमारे संस्कार</div>
//               <div onClick={() => handleSociety("festivals")}>
//                 हमारे त्योहार
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={styles.dropdown} onClick={toggleDropdown3} ref={dropdownRef3}>
//           <div className={styles.dropbtn}>
//             संपत्तियाँ
//             <FaChevronDown className={styles.arrow} />
//           </div>
//           {isDropdownOpen3 && (
//             <div className={styles.dropdownContent}>
//               <div onClick={handleHaridwar}>हरिद्वार </div>
//             </div>
//           )}
//         </div>

//         <div className={styles.menu} onClick={handleMagazine}>
//           भार्गव पत्रिका
//         </div>

//         <div className={styles.menu} onClick={handleMatrimonial}>
//           {" "}
//           वैवाहिक
//         </div>
//         <div className={styles.menu} onClick={handleCensus}>
//           जनगणना
//         </div>
//         <div className={styles.menu} onClick={handleAdvertisement}>
//           विज्ञापन
//         </div>

//         <div className={styles.menu} onClick={handleMembership}>
//           सदस्यता
//         </div>
//         <div className={styles.menu} onClick={handleForm}>
//           फ़ॉर्म डाउनलोड करें
//         </div>
//         <div className={styles.dropdown} onClick={toggleMatchDropdown} ref={matchDropdownRef}>
//           <div className={styles.dropbtn}>
//             Find a Match <FaChevronDown className={styles.arrow} />
//           </div>
//           {isMatchDropdownOpen && (
//             <div className={styles.dropdownContent}>
//               <div onClick={() => handleNavigate("/findyourmatch")}>
//                 Find Your Perfect Match
//               </div>
//               <div onClick={() => handleNavigate("/vivahmemberregister")}>
//                 Find a Match for Your Loved One
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={styles.menu} onClick={handleAdmin}>
//           Admin Login
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import logo from "../../assets/full-logo.png";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [language, setLanguage] = useState("hi");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  /* Detect Google‑Translate language switch */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const selectedLang = document.querySelector(".goog-te-combo")?.value;
      if (selectedLang) setLanguage(selectedLang);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  /** Helpers **/
  const handleNavigate = (path) => {
    navigate(path);
    setShowOffcanvas(false);
  };

  const handleAboutSection = (id) => {
    navigate("/about");
    setTimeout(() => (window.location.hash = id), 100);
  };
  const handleSocietySection = (id) => {
    navigate("/society");
    setTimeout(() => (window.location.hash = id), 100);
  };

  return (
    <>
      <Image
        src={logo}
        alt="Logo"
        height={40}
        className="d-block mx-auto mt-3"
      />
      <BootstrapNavbar
        bg="light"
        expand="lg"
        sticky="top"
        className="shadow-sm py-2 "
      >
        <Container fluid>
          <BootstrapNavbar.Brand
            role="button"
            onClick={() => handleNavigate("/home")}
          ></BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShowOffcanvas(true)}
          />

          <BootstrapNavbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column flex-lg-row justify-content-lg-between w-100 px-lg-5">
                <Nav.Link onClick={() => handleNavigate("/home")}>
                  {language === "en" ? "Home" : "होम"}
                </Nav.Link>

                {/* ---------------- हमारे बारे में ---------------- */}
                <NavDropdown title="हमारे बारे में" id="about-dd">
                  <NavDropdown.Item
                    onClick={() => handleAboutSection("history")}
                  >
                    हमारा इतिहास
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleAboutSection("samvidhaan")}
                  >
                    संविधान
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleAboutSection("sabhayein")}
                  >
                    स्थानीय सभाएं
                  </NavDropdown.Item>

                  {/* Nested Samiti dropdown */}
                  <NavDropdown drop="end" title="समिति" id="samiti-dd">
                    {[
                      "समाज कल्याण समिति",
                      "शिक्षा समिति",
                      "सेंट्रल प्रॉपर्टी समिति",
                      "फाइनेंस एडवाइजरी समिति",
                      "समन्वय समिति",
                      "अधिवेशन आयोजन अवं प्रबंध समिति",
                      "विवाह परामर्श समिति",
                      "कन्या विवाह समिति",
                      "खेल कूद समिति",
                      "युवा कार्यक्रम समिति",
                      "धार्मिक अवं नैतिक शिक्षा समिति",
                      "संविधान समीक्षा समिति",
                      "वेबसाइट अवं जनगर्ण समिति",
                      "तकनिकी शिक्षा समिति",
                      "कर्रिएर डेवलपमेंट समिति",
                      "उत्तम शिक्षा समिति",
                      "मान सम्मान अवं पुरस्कार समिति",
                      "सांस्कृतिक समिति",
                      "हेरिटेज अवं धरोहर प्रबंध समिति",
                      "भार्गव आश्रम अवं गंगा आश्रम समिति",
                      "भार्गव पत्रिका सलाहकार समिति",
                      "चिकित्सा सहायता सलाहकार समिति",
                      "वरिष्ठ नागरिक अवं पुनः स्थापना समिति",
                      "कानूनी सलाहकार समिति",
                    ].map((label, i) => (
                      <NavDropdown.Item
                        key={label}
                        href={`/pdfs/Samiti/${i + 1}. ${label.replace(
                          /\s+/g,
                          " "
                        )}.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>

                  <NavDropdown.Item
                    onClick={() => handleAboutSection("nidhiyan")}
                  >
                    सभा की निधियाँ
                  </NavDropdown.Item>
                </NavDropdown>

                {/* ---------------- हमारा समाज ---------------- */}
                <NavDropdown title="हमारा समाज" id="society-dd">
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("ancestors")}
                  >
                    हमारे पूर्वज
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("greatMen")}
                  >
                    हमारे महापुरुष
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("genealogy")}
                  >
                    वंशावली
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("holyPlace")}
                  >
                    हमारा तीर्थ स्थल
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("values")}
                  >
                    हमारे संस्कार
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleSocietySection("festivals")}
                  >
                    हमारे त्योहार
                  </NavDropdown.Item>
                </NavDropdown>

                {/* संपत्तियाँ */}
                <NavDropdown title="संपत्तियाँ" id="property-dd">
                  <NavDropdown.Item onClick={() => handleNavigate("/haridwar")}>
                    हरिद्वार
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={() => handleNavigate("/magazine")}>
                  भार्गव पत्रिका
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/matrimonial")}>
                  वैवाहिक
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/census")}>
                  जनगणना
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/advertisement")}>
                  विज्ञापन
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/membership")}>
                  सदस्यता
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/download")}>
                  फ़ॉर्म डाउनलोड करें
                </Nav.Link>

                {/* Find a Match */}
                <NavDropdown title="Find a Match" id="match-dd">
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/findyourmatch")}
                  >
                    Find Your Perfect Match
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/vivahmemberregister")}
                  >
                    Find a Match for Your Loved One
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={() => handleNavigate("/admin")}>
                  Admin Login
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </BootstrapNavbar.Offcanvas>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
