// import Navbar from "../components/Navbar/Navbar";
// import styles from "./About.module.css";
// import history from "../assets/history.png";
// import samvidhaan from "../assets/samvidhaan.png";
// import samiti from "../assets/samiti.png";
// import React, { useEffect } from "react";

// const About = () => {
//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const section = document.getElementById(hash.slice(1));
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, [window.location.hash]);
//   return (
//     <>
//       <Navbar />
//       {/* Hmare Etihaas */}
//       <div id="history" className={styles.container}>
//         <div className={styles.heading}> इतिहास</div>
//         <div>
//           <img src={history} alt="" className={styles.history} />
//         </div>
//         <div className={styles.btn}>
//           <button className={styles.button}>
//             <a
//               href="/pdfs/Sabha/History-1989-2014.pdf"
//               className={styles.btn1}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               हमारे इतिहास के बारे में पढ़े
//             </a>
//           </button>
//         </div>
//       </div>

//       {/* Samvidhaan */}
//       <div id="samvidhaan" className={styles.container}>
//         <div className={styles.heading}>संविधान</div>
//         <div>
//           <img src={samvidhaan} alt="" className={styles.history} />
//         </div>
//         <div className={styles.btn}>
//           <button className={styles.button}>
//             <a
//               href="/pdfs/Sabha/Samvidhaan.pdf"
//               className={styles.btn1}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               हमारे संविधान के बारे में पढ़े
//             </a>
//           </button>
//         </div>
//       </div>

//       {/* esthaniya sabhayein */}
//       <div id="sabhayein" className={styles.container}>
//         <div className={styles.heading}>स्थानीय सभाएं</div>
//          <div>
//           <img src={samiti} alt="" className={styles.history} />
//         </div>
//         <div className={styles.btn}>
//           <button className={styles.button}>
//             <a
//               href="/pdfs/Sabha/Localsabha.pdf"
//               className={styles.btn1}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               हमारे समितियों के बारे में जानें
//             </a>
//           </button>
//         </div>
//       </div>

//       {/* Samiti */}
//       {/* <div id="samiti" className={styles.container}>
//         <div className={styles.heading}>समिति </div>
//         <div>
//           <img src={samiti} alt="" className={styles.history} />
//         </div>
//         <div className={styles.btn}>
//           <button className={styles.button}>
//             <a
//               href="/pdfs/Sabha/updated-samiti.pdf"
//               className={styles.btn1}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               हमारे समितियों के बारे में जानें
//             </a>
//           </button>
//         </div>
//       </div> */}

//       {/* nidhiyan */}

//       <div id="nidhiyan" className={styles.container}>
//         <div className={styles.heading}>सभा की निधियाँ </div>
//         <div>
//           <img src={samiti} alt="" className={styles.history} />
//         </div>
//         <div className={styles.btn}>
//           <button className={styles.button}>
//             <a
//               href="/pdfs/Sabha/nidhiyan.pdf"
//               className={styles.btn1}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               सभा की निधियाँ के बारे में जानें
//             </a>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default About;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import history from "../assets/history.png";
import samvidhaan from "../assets/samvidhaan.png";
import samiti from "../assets/samiti.png";

const About = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.getElementById(hash.slice(1));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [window.location.hash]);

  const sections = [
    {
      id: "history",
      title: "इतिहास",
      image: history,
      pdf: "/pdfs/Sabha/History-1989-2014.pdf",
      buttonText: "हमारे इतिहास के बारे में पढ़े",
    },
    {
      id: "samvidhaan",
      title: "संविधान",
      image: samvidhaan,
      pdf: "/pdfs/Sabha/Samvidhaan.pdf",
      buttonText: "हमारे संविधान के बारे में पढ़े",
    },
    {
      id: "sabhayein",
      title: "स्थानीय सभाएं",
      image: samiti,
      pdf: "/pdfs/Sabha/Localsabha.pdf",
      buttonText: "हमारे समितियों के बारे में जानें",
    },
    {
      id: "nidhiyan",
      title: "सभा की निधियाँ",
      image: samiti,
      pdf: "/pdfs/Sabha/nidhiyan.pdf",
      buttonText: "सभा की निधियाँ के बारे में जानें",
    },
  ];

  const btnStyle = {
    backgroundColor: "#eb5a20",
    color: "white",
    border: "none",
  };

  return (
    <>
      <Navbar />
      {sections.map((section) => (
        <Container
          key={section.id}
          id={section.id}
          className="my-5 d-flex flex-column align-items-center"
        >
          <h2 className="text-center" style={{ fontSize: "30px", color: "#eb5a20", marginBottom: "20px" }}>
            {section.title}
          </h2>

          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
              <Image
                src={section.image}
                alt={section.title}
                fluid
                style={{ border: "4px solid black", maxWidth: "380px" }}
              />
            </Col>
          </Row>

          <Row className="mt-3 justify-content-center">
            <Col xs="auto">
              <Button
                style={btnStyle}
                href={section.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.buttonText}
              </Button>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default About;
