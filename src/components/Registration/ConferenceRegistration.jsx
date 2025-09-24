import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Image,
  Card,
} from "react-bootstrap";
import { registerUser } from "../../apis/registration";
import barcode from "../../assets/qrcode.jpg";

import "./ConferenceRegistration.css";
import Navbar from "../Navbar/Navbar";

const ConferenceRegistration = () => {
  const [formData, setFormData] = useState({
    abbsMembershipNo: "",
    name: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    pincode: "",
    mobileNo: "",
    email: "",
    category: "",
  });

  const photoInputRef = React.useRef(null);
  const paymentSlipInputRef = React.useRef(null);

  const [paymentSlip, setPaymentSlip] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;
    const today = new Date().toISOString().split("T")[0];

  

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    } else if (formData.dob > today) {
      errors.dob = "Date of birth cannot be in the future";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(formData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.mobileNo.trim()) {
      errors.mobileNo = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNo)) {
      errors.mobileNo = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!photo) {
      errors.photo = "Photo is required";
    } else if (!["image/jpeg", "image/png", "image/jpg"].includes(photo.type)) {
      errors.photo = "Only JPG, JPEG, PNG files allowed";
    } else if (photo.size > 2 * 1024 * 1024) {
      errors.photo = "Photo size must be under 2MB";
    }

    if (!paymentSlip) {
      errors.paymentSlip = "Payment slip is required";
    } else if (
      !["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
        paymentSlip.type
      )
    ) {
      errors.paymentSlip = "Only JPG, JPEG, PNG or PDF files allowed";
    } else if (paymentSlip.size > 5 * 1024 * 1024) {
      errors.paymentSlip = "Payment slip must be under 5MB";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePaymentSlipChange = (e) => setPaymentSlip(e.target.files[0]);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const isValid = validateForm();
    if (!isValid) return;

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    formDataToSend.append("paymentSlip", paymentSlip);
    formDataToSend.append("photo", photo);

    try {
      const res = await registerUser(formDataToSend);
      if (res?.data?.message) {
        setMessage(res.data.message);
        setFormData({
          abbsMembershipNo: "",
          name: "",
          gender: "",
          dob: "",
          address: "",
          city: "",
          pincode: "",
          mobileNo: "",
          email: "",
          category: "",
        });
        setPaymentSlip(null);
        setPhoto(null);
        setFormErrors({});

        if (photoInputRef.current) photoInputRef.current.value = "";
        if (paymentSlipInputRef.current) paymentSlipInputRef.current.value = "";
      } else {
        setError(res?.response?.data?.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px 15px",
          textAlign: "center",
          borderBottom: "1px solid #dee2e6",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontWeight: "600",
            color: "#003366",
          }}
        >
          Registration for 134<sup>th</sup> Annual Conference at Ujjain
        </h2>
        <p style={{ fontSize: "16px", marginTop: "10px", color: "#555" }}>
          Please fill in the details carefully and upload valid documents.
        </p>
      </div>

      <Container className="my-5">
        <Row className="justify-content-center align-items-center">
          {/* Left side: Barcode image */}
          <Col
            xs={12}
            md={4}
            className="mb-4 mb-md-0 d-flex justify-content-center"
          >
            <Card
              className="left-card shadow-sm p-3 h-auto"
              style={{ maxWidth: "320px" }}
            >
              <Card.Body>
                {/* Message content */}
                <div
                  style={{
                    marginBottom: "20px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  <p>
                    <strong>Respected ABBS Member,</strong>
                  </p>
                  <p>Greetings of the Day</p>
                  <p>
                    The form for Online Registration for the upcoming Adhiveshan
                    at Ujjain on the 20th, 21st and 22nd of December has been
                    uploaded on the Website. You may register on the website
                    depending on your plans to attend the Adhiveshan.
                  </p>
                  <p>
                    The Registration Charges are Rs.50 per person for Online
                    Registration and Rs.100 per person for the On Spot
                    Registration at the Adhiveshan Venue.
                  </p>
                  <p>The charge for each form for On Spot Registration will be Rs.10</p>

                  <p>Upload the slip of payment in online form.</p>
                  <p>For any query, please contact at ABBS Office number-9521276842</p>
                </div>

                {/* Barcode image */}
                <div className="text-center">
                  <Card.Title className="mb-3">Scan This Barcode</Card.Title>
                  <Image
                    src={barcode} // Replace with your barcode image path
                    alt="Barcode"
                    fluid
                    rounded
                    style={{ maxHeight: "auto", margin: "0 auto" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right side: Registration form */}
          <Col xs={12} md={8}>
            <Card className="right-card shadow-sm p-4 h-auto">
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        ABBS Membership No
                        </Form.Label>
                       <Form.Control
                        type="text"
                        name="abbsMembershipNo"
                        value={formData.abbsMembershipNo}
                        onChange={handleChange}
                       
                        placeholder="Enter membership number"
                        isInvalid={!!formErrors.abbsMembershipNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.abbsMembershipNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                        isInvalid={!!formErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Gender<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        isInvalid={!!formErrors.gender}
                      >
                        <option value="">-- Select Gender --</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Date of Birth<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        isInvalid={!!formErrors.dob}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Address<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter your address"
                    isInvalid={!!formErrors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        City<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        isInvalid={!!formErrors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Pincode<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        placeholder="Pincode"
                        isInvalid={!!formErrors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Mobile No<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                        placeholder="Mobile number"
                        isInvalid={!!formErrors.mobileNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.mobileNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email address"
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Category<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        isInvalid={!!formErrors.category}
                      >
                        <option value="">-- Select Category --</option>
                        <option>Delegate</option>
                        <option>Parent of Marriageable Candidate</option>
                        <option>Marriageable Candidate</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formErrors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Upload Your Photo<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlePhotoChange}
                    required
                    isInvalid={!!formErrors.photo}
                    ref={photoInputRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.photo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Upload Payment Slip<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="paymentSlip"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePaymentSlipChange}
                    required
                    isInvalid={!!formErrors.paymentSlip}
                    ref={paymentSlipInputRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.paymentSlip}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Submit Form
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ConferenceRegistration;
