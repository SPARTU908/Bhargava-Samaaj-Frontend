import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
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
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

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
  const [originalMember, setOriginalMember] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [editingFields, setEditingFields] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false); 


  const handleSearch = async () => {
    if (!lm_no.trim()) {
      setError("Please enter a Life Member No.");
      setMember(null);
      setOriginalMember(null);
      setSuccess("");
      return;
    }

    try {
      const data = await searchLifeMember(lm_no);
      const normalized = {
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
        photo: data.photo || "/placeholder.jpg",
        lm_no: data.lm_no || lm_no,
      };
      setMember(normalized);
      setOriginalMember(normalized);
      setError("");
      setSuccess("");
      setFormErrors({});
      setEditingFields({});
      setPhoto(null);
    } catch (err) {
      setError(
        <>
          <div style={{ marginTop: "1rem", lineHeight: "1.6" }}>
            <strong style={{ color: "#d9534f" }}>Member not found.</strong>
            {/* <p>
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
            </p> */}
          </div>
        </>
      );
      setMember(null);
      setOriginalMember(null);
      setSuccess("");
      setFormErrors({});
      setEditingFields({});
      setPhoto(null);
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


  const toggleEdit = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

   
    if (!editingFields[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

 
  const validate = () => {
    const errors = {};
    requiredFields.forEach((field) => {
      if (!member[field] || member[field].toString().trim() === "") {
        errors[field] = "This field is required";
      } else {
        
        if (field === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(member[field])) {
            errors[field] = "Invalid email address";
          }
        }
        if (field === "contact_no") {
          const phoneRegex = /^[0-9]{10,15}$/;
          if (!phoneRegex.test(member[field])) {
            errors[field] = "Invalid contact number";
          }
        }
        if (field === "pin") {
          if (!/^\d{6}$/.test(member[field])) {
            errors[field] = "PIN code must be 6 digits";
          }
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if any field changed vs original
  const isChanged = () => {
    if (photo) return true;
    return Object.entries(member).some(([key, value]) => {
      return value !== originalMember[key];
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const confirmSubmit = async () => {
  setShowConfirm(false); // Hide modal
  setSubmitting(true);

  const formData = new FormData();
  Object.entries(member).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  if (photo) {
    formData.append("photo", photo);
     console.log("Photo appended:", photo.name);
  }

  try {
    await updateLifeMember(lm_no, formData);
    setSuccess("Member updated successfully!");
    setOriginalMember(member);
    setEditingFields({});
    setPhoto(null);
  } catch (err) {
    setError(err.message || "Error updating member.");
  } finally {
    setSubmitting(false);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!member) {
    setError("Please search a member first.");
    return;
  }

  if (!validate()) {
    setError("Please fix the errors before submitting.");
    return;
  }

  if (!isChanged()) {
    setError("No changes to update.");
    return;
  }

  setShowConfirm(true); // Show modal FIRST
};

  
  
  const renderEditableField = (
    label,
    field,
    type = "text",
    options = null,
    required = false
  ) => {
    const isEditing = editingFields[field];
    const value = member?.[field] ?? "";

    const commonInputProps = {
      value: value,
      onChange: (e) => handleChange(field, e.target.value),
      onBlur: () => toggleEdit(field),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          toggleEdit(field);
        } else if (e.key === "Escape") {
          e.preventDefault();
          // Reset value on escape
          handleChange(field, originalMember[field] || "");
          toggleEdit(field);
        }
      },
      isInvalid: !!formErrors[field],
      autoFocus: true,
    };

    return (
      <Form.Group
        as={Col}
        md={6}
        className="mb-3"
        key={field}
        controlId={field}
      >
        <Form.Label>
          <strong>{label}</strong>{" "}
          {required && <span style={{ color: "red" }}>*</span>}
        </Form.Label>
        <div className="d-flex align-items-center">
          {isEditing ? (
            options ? (
              <Form.Select {...commonInputProps}>
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                type={type}
                {...commonInputProps}
                style={{ flexGrow: 1 }}
              />
            )
          ) : (
            <div
              style={{
                flexGrow: 1,
                padding: "0.375rem 0.75rem",
                border: "1px solid #ced4da",
                borderRadius: "0.25rem",
                backgroundColor: "#e9ecef",
                cursor: "default",
                userSelect: "none",
              }}
            >
              {value || <i className="text-muted"></i>}
            </div>
          )}
          <Button
            variant="link"
            size="sm"
            onClick={() => toggleEdit(field)}
            style={{ marginLeft: "0.5rem" }}
            aria-label={isEditing ? "Stop editing" : "Edit field"}
          >
            {isEditing ? <FaCheck color="green" /> : <FaEdit />}
          </Button>
        </div>
        {formErrors[field] && (
          <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
            {formErrors[field]}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-4">
          Registration for 134<sup>th</sup> Annual Conference at Ujjain
        </h2>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Form.Control
                type="text"
                value={lm_no}
                onChange={(e) => setLmNo(e.target.value)}
                placeholder="Enter Life Member No."
                className="me-2"
                autoFocus
              />
              <Button variant="primary" type="submit">
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
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : member.photo || "/placeholder.jpg"
                      }
                      rounded
                      fluid
                      alt="Member Photo"
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
                      {renderEditableField(
                        "Life Membership No",
                        "lm_no",
                        "text",
                        null,
                        false
                      )}
                      {renderEditableField(
                        "Title (Mr/Mrs/Miss)",
                        "col_y",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Member Name",
                        "member_name",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField("Year", "year", "text", null, true)}
                      {renderEditableField(
                        "Date of Birth",
                        "dob",
                        "date",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Gotra",
                        "gotra",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Kuldevi",
                        "kuldevi",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Gender",
                        "gender",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Email",
                        "email",
                        "email",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Mobile No",
                        "contact_no",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Address Line 1",
                        "add",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Address Line 2",
                        "address1",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Extra Address Info",
                        "address_extra",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField("City", "city", "text", null, true)}
                      {renderEditableField(
                        "PIN Code",
                        "pin",
                        "text",
                        null,
                        true
                      )}

                      {/* card_issue select */}
                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="card_issue"
                      >
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

                      {/* category select with inline edit */}
                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="category"
                      >
                        <Form.Label>
                          <strong>Category</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <div className="d-flex align-items-center">
                          {editingFields["category"] ? (
                            <Form.Select
                              value={member.category || ""}
                              onChange={(e) =>
                                handleChange("category", e.target.value)
                              }
                              onBlur={() => toggleEdit("category")}
                              isInvalid={!!formErrors["category"]}
                              autoFocus
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
                          ) : (
                            <div
                              style={{
                                flexGrow: 1,
                                padding: "0.375rem 0.75rem",
                                border: "1px solid #ced4da",
                                borderRadius: "0.25rem",
                                backgroundColor: "#e9ecef",
                                cursor: "default",
                                userSelect: "none",
                              }}
                            >
                              {member.category || (
                                <i className="text-muted">Not set</i>
                              )}
                            </div>
                          )}

                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => toggleEdit("category")}
                            style={{ marginLeft: "0.5rem" }}
                            aria-label={
                              editingFields["category"]
                                ? "Stop editing"
                                : "Edit field"
                            }
                          >
                            {editingFields["category"] ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaEdit />
                            )}
                          </Button>
                        </div>
                        {formErrors["category"] && (
                          <Form.Control.Feedback
                            type="invalid"
                            style={{ display: "block" }}
                          >
                            {formErrors["category"]}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    // disabled={!isChanged()}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure the information is correct and you want to submit the
          form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            I want to edit my information
          </Button>
          <Button
            variant="primary"
            onClick={confirmSubmit}
            disabled={submitting}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewRegistration;
