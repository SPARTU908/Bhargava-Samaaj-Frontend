import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";
import { searchLifeMember, updateLifeMember } from "../apis/lifemember";
import Navbar from "../components/Navbar/Navbar.jsx";

const requiredFields = [
  "member_name",
  "year",
  "col_y",
  "dob",
  "gotra",
  "kuldevi",
  "gender",
  "add",
  "address1",
  "address_extra",
  "city",
  "pin",
  "contact_no",
  "email",
  "category",
];

const NewRegistration = () => {
  const [lm_no, setLmNo] = useState("");
  const [member, setMember] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSearch = async () => {
    try {
      const data = await searchLifeMember(lm_no);
      setMember({
        ...data,
        gotra: data.gotra || "",
        kuldevi: data.kuldevi || "",
        category: data.category || "",
        gender: data.gender || "",
        email: data.email || "",
        member_name: data.member_name || "",
        city: data.city || "",
        pin: data.pin || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        add: data.add || "",
        address1: data.address1 || "",
        address_extra: data.address_extra || "",
        contact_no: data.contact_no || "",
        col_y: data.col_y || "",
        year: data.year || "",
        card_issue: data.card_issue || "",
      });
      setError("");
      setSuccess("");
      setFormErrors({});
    } catch (err) {
      setError(
        <>
          <div style={{ marginTop: "1rem", lineHeight: "1.6" }}>
            <strong style={{ color: "#d9534f" }}>Member not found.</strong>
            <p>
              Please fill the Life Membership form here:&nbsp;
              <a
                href="https://bhargavasamajglobal.org/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-underline"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#d9534f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Membership Form
                </button>
              </a>
            </p>
          </div>
        </>
      );

      setMember(null);
    }
  };

  const handleChange = (field, value) => {
    setMember((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = {};
    requiredFields.forEach((field) => {
      if (!member[field] || member[field].trim() === "") {
        errors[field] = "This field is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(member).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await updateLifeMember(lm_no, formData);
      setSuccess("Member updated successfully!");
    } catch (err) {
      setError(err.message || "Error updating member.");
    }
  };

  const renderField = (label, field, type = "text", required = false) => (
    <Form.Group as={Col} md={6} className="mb-3" controlId={field}>
      <Form.Label>
        <strong>{label}</strong>{" "}
        {required && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <Form.Control
        type={type}
        value={member[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        isInvalid={!!formErrors[field]}
      />
      <Form.Control.Feedback type="invalid">
        {formErrors[field]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-4">
          {" "}
          Registration for 134<sup>th</sup> Annual Conference at Ujjain
        </h2>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="text"
                value={lm_no}
                onChange={(e) => setLmNo(e.target.value)}
                placeholder="Enter Life Member No."
                className="me-2"
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {error && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert
                variant="danger"
                className="text-center"
                style={{ fontSize: "1.1rem" }}
              >
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {success && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            </Col>
          </Row>
        )}

        {member && (
          <Card className="shadow-lg h-auto">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className="text-center">
                    <Image
                      src={member.photo}
                      rounded
                      fluid
                      alt="Photo Not Uploaded"
                      style={{ maxHeight: "200px", border: "1px solid #ccc" }}
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />
                    <Form.Group controlId="photo" className="mt-3">
                      <Form.Label>Upload New Photo</Form.Label>
                      <Form.Control type="file" onChange={handlePhotoChange} />
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Row>
                      {renderField("Life Membership No", "lm_no")}
                      {renderField(
                        "Title (Mr/Mrs/Miss)",
                        "col_y",
                        "text",
                        true
                      )}
                      {renderField("Member Name", "member_name", "text", true)}
                      {renderField("Year", "year", "text", true)}
                      {renderField("Date of Birth", "dob", "date", true)}
                      {renderField("Gotra", "gotra", "text", true)}
                      {renderField("Kuldevi", "kuldevi", "text", true)}
                      {renderField("Gender", "gender", "text", true)}
                      {renderField("Email", "email", "email", true)}
                      {renderField("Mobile No", "contact_no", "text", true)}
                      {renderField("Address Line 1", "add", "text", true)}
                      {renderField("Address Line 2", "address1", "text", true)}
                      {renderField(
                        "Extra Address Info",
                        "address_extra",
                        "text",
                        true
                      )}
                      {renderField("City", "city", "text", true)}
                      {renderField("PIN Code", "pin", "text", true)}

                      <Form.Group as={Col} md={6} className="mb-3">
                        <Form.Label>
                          <strong>Card Issued</strong>
                        </Form.Label>
                        <Form.Select
                          value={member.card_issue || ""}
                          onChange={(e) =>
                            handleChange("card_issue", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} md={6} className="mb-3">
                        <Form.Label>
                          <strong>Category</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Select
                          value={member.category || ""}
                          onChange={(e) =>
                            handleChange("category", e.target.value)
                          }
                          isInvalid={!!formErrors["category"]}
                        >
                          <option value="">Select</option>
                          <option value="Delegate">Delegate</option>
                          <option value="Parent of Marriageable Candidate">
                            Parent of Marriageable Candidate
                          </option>
                          <option value="Marriageable Candidate">
                            Marriageable Candidate
                          </option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formErrors["category"]}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button type="submit" variant="success">
                    Update Member Info
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default NewRegistration;
