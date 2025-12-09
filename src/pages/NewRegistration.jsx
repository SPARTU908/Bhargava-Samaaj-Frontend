import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Image,
  Toast,
  Modal,
} from "react-bootstrap";
import { FaEdit, FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar.jsx";
import {
  searchLifeMember,
  createLifeMember,
  updateLifeMember,
} from "../apis/lifemember.js";

const EMPTY_MEMBER = {
  LM_NO: "",
  Title: "",
  Member_Name: "",
  S_O_D_O_W_O: "",
  Year: "",
  Date_of_Birth: "",
  Gotra: "",
  Kuldevi: "",
  gender: "",
  Email: "",
  Contact_No: "",
  Address: "",
  City: "",
  Pin: "",
  Card_Issued: "",
  category: "",
};

const MemberForm = React.memo(
  ({
    member,
    isEditing,
    formErrors,
    submitting,
    photoPreview,
    handlePhotoChange,
    setIsEditing,
    handleSubmit,
    updateMemberData,
  }) => {
    const renderEditableField = useCallback(
      (
        label,
        field,
        type = "text",
        placeholder = null,
        required = false,
        options = null
      ) => {
        const value = member?.[field] || "";

        return (
          <Form.Group as={Col} md={6} className="mb-3" controlId={field}>
            <Form.Label>
              <strong>{label}</strong>{" "}
              {required && <span style={{ color: "red" }}>*</span>}
            </Form.Label>

            {isEditing ? (
              options ? (
                <Form.Select
                  value={value}
                  onChange={(e) => updateMemberData(field, e.target.value)}
                  isInvalid={!!formErrors[field]}
                >
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
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => updateMemberData(field, e.target.value)}
                  isInvalid={!!formErrors[field]}
                />
              )
            ) : (
              <div
                style={{
                  padding: "0.375rem 0.75rem",
                  border: "1px solid #ced4da",
                  borderRadius: "0.25rem",
                  backgroundColor: "#e9ecef",
                }}
              >
                {value || <i className="text-muted">Not set</i>}
              </div>
            )}

            {formErrors[field] && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {formErrors[field]}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        );
      },
      [member, formErrors, isEditing, updateMemberData]
    );

    return (
      <Form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button
            variant={isEditing ? "success" : "outline-primary"}
            onClick={() => setIsEditing(!isEditing)}
            type="button"
          >
            {isEditing ? (
              <>
                <FaCheck className="me-2" /> Save
              </>
            ) : (
              <>
                <FaEdit className="me-2" /> Edit
              </>
            )}
          </Button>
        </div>

        <Row>
          {/* {renderEditableField(
            "ABBS Life Membership No",
            "LM_NO",
            "text",
            null,
            false
          )} */}
          {renderEditableField("Title", "Title", "text", "Mr/Mrs/Miss", true)}
          {renderEditableField(
            "Member Name",
            "Member_Name",
            "text",
            null,
            true
          )}
          {renderEditableField(
            "S/O,D/O,W/O",
            "S_O_D_O_W_O",
            "text",
            "S/O Mr.ABC",
            true
          )}
          {renderEditableField(
            "ABBS Membership Card Issued Year",
            "Year",
            "text",
            null,
            false
          )}
          {renderEditableField(
            "Date of Birth",
            "Date_of_Birth",
            "date",
            null,
            true
          )}
          {renderEditableField("Gotra", "Gotra", "text", null, true)}
          {renderEditableField("Kuldevi", "Kuldevi", "text", null, true)}
          {renderEditableField("Gender", "gender", "select", null, true, [
            "Male",
            "Female",
          ])}
          {renderEditableField("Email", "Email", "email", null, true)}
          {renderEditableField("Mobile No", "Contact_No", "text", null, true)}
          {renderEditableField("Address", "Address", "text", null, true)}
          {renderEditableField("City", "City", "text", null, true)}
          {renderEditableField("PIN Code", "Pin", "text", null, true)}
          {renderEditableField(
            "Card Issued",
            "Card_Issued",
            "select",
            null,
            true,
            ["Yes", "No"]
          )}
          {renderEditableField("Category", "category", "select", null, true, [
            "Delegate",
            "Parent of Marriageable Candidate",
            "Marriageable Candidate",
          ])}

          {/* 📸 Photo Upload */}
          <Form.Group as={Col} md={6} className="mb-3" controlId="photo">
            <Form.Label>
              <strong>Photo Upload</strong>
            </Form.Label>
            {isEditing && (
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            )}
            {photoPreview && (
              <Image
                src={photoPreview}
                alt="Member Photo"
                fluid
                className="mt-2"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </Form.Group>
        </Row>

        <div className="text-center mt-4">
          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    );
  }
);

const NewRegistration = () => {
  const [isAbbsMember, setIsAbbsMember] = useState(true);
  const [LM_NO, setLmNo] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async () => {
    setError("");
    setMember(null);
    setPhotoPreview(null);
    try {
      const data = await searchLifeMember(LM_NO.trim());
      setMember(data);
      if (data.photo) {
        const photoUrl = data.photo.startsWith("http")
          ? data.photo
          : `https://bhargava-samaaj.blr1.digitaloceanspaces.com/registration/${data.photo}`;
        setPhotoPreview(photoUrl);
      }
    } catch (error) {
      setError(
        error.message || "No member found with this Life Membership Number"
      );
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
      setPhotoFile(file);
    }
  };

  const updateMemberData = useCallback((field, value) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = () => {
    const requiredFields = [
      "Title",
      "Member_Name",
      "S_O_D_O_W_O",
      "Date_of_Birth",
      "Gotra",
      "Kuldevi",
      "gender",
      "Email",
      "Contact_No",
      "Address",
      "City",
      "Pin",
      "Card_Issued",
      "category",
    ];
    const errors = {};
    requiredFields.forEach((f) => {
      if (!member?.[f]) errors[f] = "This field is required.";
    });

    if (member.Email && !/\S+@\S+\.\S+/.test(member.Email)) {
    errors.Email = "Email is invalid";
  } else if (!member.Email) {
    errors.Email = "Email is required";
  } 


  const mobile = member?.Contact_No?.trim();
  if (!mobile) {
    errors.Contact_No = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.Contact_No = "Enter a valid 10-digit mobile number.";
  }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    try {
      if (isAbbsMember) {
        await updateLifeMember(member.LM_NO, member, photoFile);
      } else {
        await createLifeMember(member, photoFile);
      }
      setShowToast(true);
      setMember(null);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (err) {
      alert(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* <Container className="py-3">
        <div className="text-center mb-2">
          <h4 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
            Online Registration for 134<sup>th</sup> Annual Conference at Ujjain
            ( 20th, 21st, 22nd December 2025)
            </h4>
        </div>
        <p className="text-center mb-4 fw-semibold text-danger">
          ⚠️ Last Date for Online Registration:{" "}
          <strong>
            7<sup>th</sup> December 2025
          </strong>
        </p>

        <Card.Body>
          <div
            className="mb-3 p-3 bg-white rounded border"
            style={{ marginTop: "-15px" }}
          >
            <h5 className="text-decoration-underline text-secondary mb-2">
              🧾 Registration Charges:
            </h5>
            <div className="d-flex justify-content-between align-items-start">
              <div className="me-3" style={{ flex: 1 }}>
                <ul className="mb-0 ps-3">
                  <li>
                    ★ Online Registration: Rs. 50 per person (Rs. 50/- will be
                    charged while collecting your card during the Ujjain
                    Conference.)
                  </li>
                  <li>
                    ★ On-Spot Registration at the Adhiveshan Venue: Rs. 100 per
                    person
                  </li>
                </ul>
              </div>

              <div style={{ flex: 1, textAlign: "right" }}>
                <p >★ Charge per form for On-Spot Registration: Rs. 10</p>
                <p className="mb-0">
                  ★ For any queries, contact the ABBS Office at:{" "}
                  <strong className="text-dark">9251276842</strong>
                </p>
              </div>
            </div>
          </div>
        </Card.Body>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <Button
            variant={isAbbsMember ? "primary" : "outline-primary"}
            onClick={() => {
              setIsAbbsMember(true);
              setMember(null);
              setError("");
            }}
          >
            ABBS Life Member
          </Button>
          <Button
            variant={!isAbbsMember ? "primary" : "outline-primary"}
            onClick={() => {
              setIsAbbsMember(false);
              setIsEditing(true);
              setMember(EMPTY_MEMBER);
            }}
          >
            Non-ABBS Life Member
          </Button>
        </div>

        {isAbbsMember ? (
          <>
            <Row className="justify-content-center mb-4">
              <Col md={6}>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <div className="bg-warning bg-opacity-25 border-start border-4 border-warning p-2 mb-3 rounded">
                    <strong>Important Note:</strong> While searching through
                    Membership Number, do not include the year — simply enter
                    the membership number only to find your details.
                  </div>
                  <Form.Label className="mb-2  fw-semibold">
                    To Register for Conference-
                    <br />
                    Enter your ABBS Life Membership Number:
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={LM_NO}
                      onChange={(e) => setLmNo(e.target.value)}
                      placeholder="Enter Life Member No."
                      className="me-2"
                      autoFocus
                    />
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}
            {member && (
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card className="p-4">
                    <MemberForm
                      member={member}
                      isEditing={isEditing}
                      formErrors={formErrors}
                      submitting={submitting}
                      photoPreview={photoPreview}
                      handlePhotoChange={handlePhotoChange}
                      setIsEditing={setIsEditing}
                      handleSubmit={handleSubmit}
                      updateMemberData={updateMemberData}
                    />
                  </Card>
                </Col>
              </Row>
            )}
          </>
        ) : (
          <Row className="justify-content-center mb-4">
            <Col md={8}>
              <Card className="p-4">
                <MemberForm
                  member={member}
                  isEditing={isEditing}
                  formErrors={formErrors}
                  submitting={submitting}
                  photoPreview={photoPreview}
                  handlePhotoChange={handlePhotoChange}
                  setIsEditing={setIsEditing}
                  handleSubmit={handleSubmit}
                  updateMemberData={updateMemberData}
                />
              </Card>
            </Col>
          </Row>
        )}

        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className="position-fixed top-50 start-50 translate-middle shadow-lg border-0"
          style={{
            zIndex: 1055,
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
            minWidth: "350px",
            textAlign: "center",
            padding: "1rem 1.5rem",
            borderRadius: "0.5rem",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          🎉 Registration Form submitted successfully!
        </Toast>
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
              I want to edit my information.
            </Button>
            <Button variant="primary" onClick={confirmSubmit}>
              Yes, Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container> */}
      <Container>
        Registration Closed
      </Container>
    </>
  );
};

export default NewRegistration;
