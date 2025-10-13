import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";
import { registerMagazineForm } from "../apis/magazine";
import Navbar from "../components/Navbar/Navbar";
import qrcode from "../assets/qrcode.jpg";

const MagazineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    city: "",
    pin: "",
    contact: "",
    email: "",
    transactionId: "",
  });

  const [signature, setSignature] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setResponseMsg(null);

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => data.append(key, value));
  if (signature) {
    data.append('signature', signature);
  }

  const result = await registerMagazineForm(data);
  setSubmitting(false);
  setResponseMsg(result);

  if (result.success) {
 
    setFormData({
      name: '',
      dob: '',
      address: '',
      city: '',
      pin: '',
      contact: '',
      email: '',
      transactionId: '',
    });
    setSignature(null);

 
    const fileInput = document.querySelector('input[name="signature"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }
};


  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="mb-4 text-center">भार्गव पत्रिका की सदस्यता</h2>

        <Row>
          {/* Left Side - Information Section */}
          <Col md={6}>
            <Card className="mb-4 bg-light border-0">
              <Card.Body>
                <p>
                  <strong>शुल्क :</strong> <u>‘धरोहर जमा राशि’</u> :{" "}
                  <strong>रुपये 1,500/-</strong> (Refundable)
                </p>
                <ul>
                  <li>
                    पत्रिका में वृध्दि के बढ़ोतरी होने पर सदस्यों से अतिरिक्त
                    राशि भेजने के लिए अनुरोध किया जाएगा।
                  </li>
                  <li>
                    सदस्य जब चाहें अपनी धरोहर जमा राशि को वापस ले सकते हैं।
                  </li>
                  <li>उसी अनुपात में उन्हें पत्रिका की प्रति भेजी जाएगी।</li>
                  <li>
                    ‘भार्गव पत्रिका’ का प्रकाशन प्रत्येक{" "}
                    <strong>25-26 तारीख</strong> तक किया जाएगा।
                  </li>
                  <li>
                    जो सदस्य पत्रिका को कम दर पर{" "}
                    <strong>subsidized rate</strong> पर प्राप्त करना चाहते हैं,
                    उन्हें सदस्य बनना होगा।
                  </li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">
                सभा का खाता विवरण
              </Card.Header>
              <Card.Body>
                <p>
                  <strong>Bank A/c Name:</strong> AKHIL BHARTIYA BHARGAVA SABHA
                </p>
                <p>
                  <strong>Bank A/c Number:</strong> 90442010053572
                </p>
                <p>
                  <strong>Bank Name:</strong> CANARA BANK, NEHRU PLACE, NEW
                  DELHI
                </p>
                <p>
                  <strong>IFSC:</strong> CNRB0000390
                </p>
                <p>
                  <strong>MICR Code:</strong> 110015016
                </p>
              </Card.Body>
            </Card>
            <Card className="mb-4 text-center">
              <Card.Header className="bg-secondary text-white">
                UPI / QR कोड द्वारा भुगतान करें
              </Card.Header>
              <Card.Body>
                <p>QR कोड को स्कैन करके ₹1,500/- का भुगतान करें</p>
                <img
                  src={qrcode}// adjust this path as needed
                  alt="Payment QR Code"
                  style={{
                    maxWidth: "200px",
                    width: "100%",
                    height: "auto",
                    margin: "0 auto",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Form Section */}
          <Col md={6}>
            {responseMsg && (
              <Alert variant={responseMsg.success ? "success" : "danger"}>
                {responseMsg.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>DOB<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pin Code<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact No.<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Transaction ID<span style={{ color: "red" }}>*</span></Form.Label>
                    <Form.Control
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Upload Signature<span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="signature"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="success" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" /> Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MagazineForm;
