import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar/Navbar';
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <Navbar />
      {/* <Container className="my-5">
        <h2 className="text-center mb-5">Please Choose a Registration Form</h2>
        <Row className="justify-content-center g-4">
          <Col md={5}>
            <Card
              onClick={() => handleNavigate('/award-form')}
              className="registration-card award-card text-white"
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center p-5">
                <Card.Title className="fs-4 fw-bold mb-3">
                  🏅 Puruskar & <br/> Maan Samman Form <br/> 2024–2025
                </Card.Title>
                <Card.Text>
                
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card
              onClick={() => handleNavigate('/new-registration')}
              className="registration-card conference-card text-white"
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center p-5">
                <Card.Title className="fs-4 fw-bold mb-3">
                  🏛️ Registration for 134<sup>th</sup> Annual Conference at Ujjain
                </Card.Title>
                <Card.Text>
                  Register now to attend the 134<sup>th</sup> Annual Conference being held in Ujjain.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Registration;
