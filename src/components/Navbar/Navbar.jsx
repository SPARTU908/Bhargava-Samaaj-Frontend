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

  const committees = [
    { label: "समाज कल्याण समिति", file: "1. Samaj Kalyan Samiti.pdf" },
    { label: "शिक्षा समिति", file: "2. Shiksha Samiti.pdf" },
    {
      label: "सेंट्रल प्रॉपर्टी समिति",
      file: "3. Central Property Committee.pdf",
    },
    {
      label: "फाइनेंस एडवाइजरी समिति",
      file: "4. Finance Advisory Committee.pdf",
    },
    { label: "समन्वय समिति", file: "5. Samanvaya Samiti.pdf" },
    {
      label: "अधिवेशन आयोजन अवं प्रबंध समिति",
      file: "6. Adhiveshan Aayojan avam Prabandh Samiti.pdf",
    },
    { label: "विवाह परामर्श समिति", file: "7. Vavah Paramarsh Samiti.pdf" },
    { label: "कन्या विवाह समिति", file: "8. Kanya Vivah Samiti.pdf" },
    { label: "खेल कूद समिति", file: "9. Khel Kood Samiti.pdf" },
    { label: "युवा कार्यक्रम समिति", file: "10. Yuva Karyakrama Samiti .pdf" },
    {
      label: "धार्मिक अवं नैतिक शिक्षा समिति",
      file: "11. Dharmik avam Naitik Shiksha Samiti.pdf",
    },
    {
      label: "संविधान समीक्षा समिति",
      file: "12. Samvidhaan Samiksha Samiti.pdf",
    },
    {
      label: "वेबसाइट अवं जनगर्ण समिति",
      file: "13. Website avam Jangarna Samiti.pdf",
    },
    { label: "तकनिकी शिक्षा समिति", file: "14. Takniki Shiksha Samiti.pdf" },
    {
      label: "कर्रिएर डेवलपमेंट समिति",
      file: "15. Carrier Development Samiti.pdf",
    },
    { label: "उत्तम शिक्षा समिति", file: "16. Uttam Shiksha Samiti.pdf" },
    {
      label: "मान सम्मान अवं पुरस्कार समिति",
      file: "17. Maan Samman avam Puraskar Samiti.pdf",
    },
    { label: "सांस्कृतिक समिति", file: "18. Sankskritik Samiti .pdf" },
    {
      label: "हेरिटेज अवं धरोहर प्रबंध समिति",
      file: "19. Heritage avam Dharohar Prabandh Samiti.pdf",
    },
    {
      label: "भार्गव आश्रम अवं गंगा आश्रम समिति",
      file: "20. Bhargava Ashram avam Ganga Ashram Samiti.pdf",
    },
    {
      label: "भार्गव पत्रिका सलाहकार समिति",
      file: "21. Bhargava Patrika Salahar Samiti.pdf",
    },
    {
      label: "चिकित्सा सहायता सलाहकार समिति",
      file: "22. Chikitsa Sahayata Salahkar Samiti.pdf",
    },
    {
      label: "वरिष्ठ नागरिक अवं पुनः स्थापना समिति",
      file: "23. Varisth Naagrik avam Punah Sthapana Samiti.pdf",
    },
    { label: "कानूनी सलाहकार समिति", file: "24. Kanooni Salahkar Samiti.pdf" },
  ];

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const selectedLang = document.querySelector(".goog-te-combo")?.value;
      if (selectedLang) setLanguage(selectedLang);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

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
      {/* <Image
        src={logo}
        alt="Logo"
        height={48}
        className="d-block mx-auto mt-3"
      /> */}

      <div className="position-relative py-3 bg-white">
        {/* Centered Logo */}
        <div className="text-center">
          <Image
            src={logo}
            alt="Logo"
            height={48}
            role="button"
            onClick={() => handleNavigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Rightmost Blinking Button */}
        <div
          className="position-absolute top-50 end-0 translate-middle-y pe-3"
          style={{ zIndex: 10 }}
        >
          {/* <button
            onClick={() => handleNavigate("/new-registration")}
            className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm blinking-button"
            style={{ whiteSpace: "nowrap" }}
          >
            📝 Conference Registration Form
          </button> */}
        </div>
      </div>

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

                  <NavDropdown
                    drop="end"
                    title="समिति"
                    id="samiti-dd"
                    className="scrollable-dropdown"
                  >
                    {committees.map(({ label, file }) => (
                      <NavDropdown.Item
                        key={label}
                        href={`/pdfs/Samiti/${file}`}
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
                  <NavDropdown.Item
                    as="a"
                    href="/pdfs/Bhargava Sabha Ki Properties.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    प्रॉपर्टीज
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={() => handleNavigate("/magazine")}>
                  भार्गव पत्रिका
                </Nav.Link>
                {/* <Nav.Link onClick={() => handleNavigate("/matrimonial")}>
                  वैवाहिक
                </Nav.Link> */}

                <NavDropdown title="वैवाहिक" id="vaivahik-dd">
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/matrimonial")}
                  >
                    वैवाहिक फ़ॉर्म
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/findyourmatch")}
                  >
                    अपना मैच खोजें
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/vivahmemberregister")}
                  >
                    किसी के लिए सही साथी खोजें
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={() => handleNavigate("/census")}>
                  जनगणना
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/advertisement")}>
                  विज्ञापन
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/membership")}>
                  सदस्यता
                </Nav.Link>
                <Nav.Link onClick={() => handleNavigate("/registration")}>
                  रजिस्ट्रेशन
                </Nav.Link>

                {/* <Nav.Link onClick={() => handleNavigate("/download")}>
                  डाउनलोड
                </Nav.Link> */}

                <NavDropdown title="डाउनलोड" id="download-dropdown">
                  <NavDropdown.Item
                    href="/pdfs/Samaj Kalyan Sahayata Form 2025-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Samaj Kalyan Sahayata Form
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/pdfs/Shiksha Chhatravriti Application Form 2025-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shiksha Chhatravriti Application Form
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/pdfs/Education Loan Documents 30.09.2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Education Loan Document Form
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link onClick={() => handleNavigate("/admin")}>
                  एडमिन लॉगिन
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
