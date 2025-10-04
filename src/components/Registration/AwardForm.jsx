import { useState } from "react";
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

import Navbar from "../Navbar/Navbar";
import "./AwardForm.css";
import { submitAwardForm } from "../../apis/awardForm";

const AwardForm = () => {
  const [formData, setFormData] = useState({
    code1: "",
    code2: "",
    code3: "",
    name: "",
    dob: "",
    mobile: "",
    email: "",
    address: "",
    pin: "",
    academicQualification: "",
    occupation: "",
    father: "",
    mother: "",
    spouse: "",
    spousedob: "",
    spouseOccupation: "",
    proposerName: "",
    proposerEmail: "",
    proposerMobile: "",
    proposerAddress: "",
  });
  const [errors, setErrors] = useState({});

  const totalPages = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  const [files, setFiles] = useState({
    photo: null,
    document1: null,
    document2: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };
  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "code1",
      "name",
      "dob",
      "mobile",
      "email",
      "address",
      "pin",
      "academicQualification",
      "father",
      "mother",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (!files.photo) {
      newErrors.photo = "Photograph is required";
    }

    if (!files.document1) {
      newErrors.document1 = "At least one achievement document is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    console.log("Current formData:", formData);
    console.log("Current files:", files);

    const validationErrors = validateForm();
    console.log("validationErrors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed - aborting submit");
      return;
    }

    console.log("Validation passed, building FormData");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
      console.log(`Appended field ${key}:`, formData[key]);
    }
    if (files.photo) {
      data.append("photo", files.photo);
      console.log("Appended file photo:", files.photo.name || files.photo);
    }
    if (files.document1) {
      data.append("document1", files.document1);
      console.log(
        "Appended file document1:",
        files.document1.name || files.document1
      );
    }
    if (files.document2) {
      data.append("document2", files.document2);
      console.log(
        "Appended file document2:",
        files.document2.name || files.document2
      );
    }

    console.log("Sending API request with FormData");

    try {
      const res = await submitAwardForm(data);
      console.log("API response:", res);

      if (res?.data?.message) {
        console.log("Submission succeeded:", res.data.message);
        setStatus({
          loading: false,
          message: res.data.message,
          error: false,
        });
        // Reset
        setFormData({
          code1: "",
          code2: "",
          code3: "",
          name: "",
          dob: "",
          mobile: "",
          email: "",
          address: "",
          pin: "",
          academicQualification: "",
          occupation: "",
          father: "",
          mother: "",
          spouse: "",
          spouseOccupation: "",
          spousedob: "",
          proposerName: "",
          proposerEmail: "",
          proposerMobile: "",
          proposerAddress: "",
        });
        setFiles({ photo: null, document1: null, document2: null });
        setErrors({});
      } else {
        console.log("API did not return expected message:", res.data);
        setStatus({
          loading: false,
          message: res?.data?.error || "Something went wrong.",
          error: true,
        });
      }
    } catch (err) {
      console.error("Error during submission:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
      }
      setStatus({
        loading: false,
        message:
          err?.response?.data?.message || "Server error. Please try again.",
        error: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="my-5">
        <Row>
          {/* Left Side: Image Viewer */}
          <Col lg={5} className="mb-4">
            <Card className="shadow-sm p-3 h-auto">
              <h5 className="text-center mb-3">Awards List & Details</h5>

              <div className="text-center mb-2">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  ⟨ Prev
                </button>
                <span style={{ margin: "0 15px" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next ⟩
                </button>
              </div>

              <div className="text-center mb-3">
                <button onClick={zoomOut}>-</button>
                <button onClick={zoomIn} style={{ marginLeft: 10 }}>
                  +
                </button>
              </div>

              <div
                style={{
                  border: "1px solid #ccc",
                  maxHeight: "70vh",
                  overflow: "auto",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <img
                  src={`/award/page${currentPage}.jpg`}
                  alt={`Page ${currentPage}`}
                  style={{
                    width: `${zoom * 100}%`,
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Card>
          </Col>

          {/* Right Side: Form */}
          <Col lg={7}>
            <Card className="p-4 shadow-sm h-auto">
              <h3 className="text-center mb-4" style={{ color: "#003366" }}>
                Application Form For Awards And Maan Samman <br />
                <small>(1st Nov 2024 - 31st Oct 2025)</small>
              </h3>

              {status.message && (
                <Alert variant={status.error ? "danger" : "success"}>
                  {status.message}
                </Alert>
              )}

              <Form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                noValidate
              >
                {/* Section: Nominee Codes */}
                <h5 className="text-secondary mb-3">Preference for award</h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        1. Code No. <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="code1"
                        value={formData.code1}
                        onChange={handleChange}
                        isInvalid={!!errors.code1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.code1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>2. Code No.</Form.Label>
                      <Form.Control
                        name="code2"
                        value={formData.code2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Award applied for special Achievemnets 3. Code No.{" "}
                      </Form.Label>
                      <Form.Control
                        name="code3"
                        value={formData.code3}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Section: Personal Info */}
                <h5 className="text-secondary mt-4 mb-3">
                  Applicant's details
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Full Name <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Date of Birth <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        isInvalid={!!errors.dob}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Mobile<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        isInvalid={!!errors.mobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Address <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        PIN<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        isInvalid={!!errors.pin}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pin}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Academic Qualification{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="academicQualification"
                        value={formData.academicQualification}
                        onChange={handleChange}
                        isInvalid={!!errors.academicQualification}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.academicQualification}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Occupation</Form.Label>
                      <Form.Control
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Father's Name <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="father"
                        value={formData.father}
                        onChange={handleChange}
                        isInvalid={!!errors.father}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.father}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Mother's Name <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="mother"
                        value={formData.mother}
                        onChange={handleChange}
                        isInvalid={!!errors.mother}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mother}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Spouse's Name</Form.Label>
                      <Form.Control
                        name="spouse"
                        value={formData.spouse}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Spouse DOB 
                      </Form.Label>
                      <Form.Control
                      type="date"
                        name="spousedob"
                        value={formData.spousedob}
                        onChange={handleChange}
                        isInvalid={!!errors.spousedob}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.spousedob}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Spouse Occupation 
                      </Form.Label>
                      <Form.Control
                        name="spouseOccupation"
                        value={formData.spouseOccupation}
                        onChange={handleChange}
                        isInvalid={!!errors.spouseOccupation}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.spouseOccupation}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                </Row>

                {/* Section: Proposer Info */}
                <h5 className="text-secondary mt-4 mb-3">
                  If the application is not submitted by the applicant
                  himself/herself, details of proposer —
                </h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Proposer Name</Form.Label>
                      <Form.Control
                        name="proposerName"
                        value={formData.proposerName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Proposer Email</Form.Label>
                      <Form.Control
                        name="proposerEmail"
                        value={formData.proposerEmail}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Proposer Mobile</Form.Label>
                      <Form.Control
                        name="proposerMobile"
                        value={formData.proposerMobile}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Proposer Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="proposerAddress"
                    value={formData.proposerAddress}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Section: Document Upload */}
                <h5 className="text-secondary mt-4 mb-3">Upload Files</h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Recent Colour Photograph{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        isInvalid={!!errors.photo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.photo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Upload documents of your achievements{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="file"
                        name="document1"
                        onChange={handleFileChange}
                        isInvalid={!!errors.document1}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.document1}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Upload documents of your achievements{" "}
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="document2"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={status.loading}
                  >
                    {status.loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>{" "}
        {/* ✅ Missing Row close tag */}
      </Container>
    </>
  );
};

export default AwardForm;
