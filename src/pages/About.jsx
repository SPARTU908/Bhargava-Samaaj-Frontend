import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import history from "../assets/history.png";
import samvidhaan from "../assets/samvidhaan.png";
import samiti1 from "../assets/samiti1.png";
import samiti from "../assets/New Samiti.PNG";
import shiksha from "../assets/shiksha samiti new.PNG";

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
      image: samiti1,
      pdf: "/pdfs/Sabha/Localsabha.pdf",
      buttonText: "स्थानीय सभाएं के बारे में जानें",
    },
    {
      id: "nidhiyan",
      title: "समाज कल्याण निधि",
      image: samiti,
      pdf: "/pdfs/Samiti/1. Samiti Kalyan Samiti 25-26.pdf",
      buttonText: "समाज कल्याण निधि के बारे में जानें",
    },
    {
      id: "nidhiyan2",
      title: "शिक्षा निधि",
      image: shiksha,
      pdf: "/pdfs/Samiti/2. Shiksha Samiti 25-26.pdf",
      buttonText: "शिक्षा निधि के बारे में जानें",
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
