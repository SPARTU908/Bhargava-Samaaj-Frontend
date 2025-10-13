import { useState, useMemo } from "react";
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
import {
  searchLifeMember,
  updateLifeMember,
  createLifeMember,
} from "../apis/lifemember";
import Navbar from "../components/Navbar/Navbar.jsx";
import { FaEdit, FaCheck } from "react-icons/fa";

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
  const [isCreating, setIsCreating] = useState(false);

  const photoPreview = useMemo(() => {
    if (photo) {
      return URL.createObjectURL(photo);
    } else if (member?.photo) {
      return member.photo;
    }
    return null;
  }, [photo, member]);

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
        photo: data.photo,
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
        <div style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <strong style={{ color: "#d9534f" }}>Member not found.</strong>
          <br />
          Please fill out the form to register.
        </div>
      );

      const blankMember = {
        lm_no: lm_no,
        year: "",
        col_y: "",
        member_name: "",
        card_issue: "",
        add: "",
        dob: "",
        address1: "",
        address_extra: "",
        city: "",
        pin: "",
        contact_no: "",
        email: "",
        gotra: "",
        kuldevi: "",
        gender: "",
        category: "",
        photo: "",
      };

      setMember(blankMember);
      setOriginalMember(blankMember);
      setIsCreating(true);
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
    setShowConfirm(false);
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(member).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    if (photo) {
      formData.append("photo", photo);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      if (isCreating) {
        await createLifeMember(member, photo);
        setSuccess("Member created successfully!");
      } else {
        await updateLifeMember(lm_no, member, photo);
        setSuccess("Member updated successfully!");
      }

      setMember({
        lm_no: "",
        year: "",
        col_y: "",
        member_name: "",
        card_issue: "",
        add: "",
        dob: "",
        address1: "",
        address_extra: "",
        city: "",
        pin: "",
        contact_no: "",
        email: "",
        gotra: "",
        kuldevi: "",
        gender: "",
        category: "",
        photo: "",
      });

      setOriginalMember(member);
      setEditingFields({});
      setPhoto(null);
      setError("");
    } catch (err) {
      console.error("Error during submission:", err);
      setError(err.message || "Error submitting form.");
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

    setShowConfirm(true);
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
            variant="outline-secondary"
            size="sm"
            onClick={() => toggleEdit(field)}
            style={{
              marginLeft: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.85rem",
              padding: "4px 8px",
            }}
            aria-label={isEditing ? "Save field" : "Edit field"}
          >
            {isEditing ? <FaCheck color="green" /> : <FaEdit />}
            {isEditing ? "Save" : "Edit"}
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

        {/* <p>
          <strong>Respected ABBS Member,</strong>
        </p>
        <p>Greetings of the Day</p>
        <p>
          The form for Online Registration for the upcoming Adhiveshan at Ujjain
          on the 20th, 21st and 22nd of December has been uploaded on the
          Website. You may register on the website depending on your plans to
          attend the Adhiveshan.
        </p>
        <p>
          The Registration Charges are Rs.50 per person for Online Registration
          and Rs.100 per person for the On Spot Registration at the Adhiveshan
          Venue.
        </p>
        <p>The charge for each form for On Spot Registration will be Rs.10</p>

        <p>Upload the slip of payment in online form.</p>
        <p>For any query, please contact at ABBS Office number-9521276842</p> */}

        <Card className="p-4 shadow-sm border-0 bg-light h-auto">
          <Card.Body>
            <p className="fw-bold text-primary fs-5 mb-2">
              Respected ABBS Member,
            </p>
            <p className="mb-4">🙏 Greetings of the Day!</p>

            <p className="mb-3">
              The form for <strong>Online Registration</strong> for the upcoming
              <em> Adhiveshan at Ujjain </em> on the
              <strong>
                {" "}
                20<sup>th</sup>, 21<sup>st</sup>, and 22<sup>nd</sup> of
                December{" "}
              </strong>
              has been uploaded on the website. <br />
              You may register depending on your plans to attend the Adhiveshan.
            </p>

            <div className="mb-3 p-3 bg-white rounded border">
              <h5 className="text-decoration-underline text-secondary mb-3">
                🧾 Registration Charges:
              </h5>
              <ul className="mb-0 ps-3">
                The Registration Charges are Rs.50 per person for Online
                Registration and Rs.100 per person for the On Spot Registration
                at the Adhiveshan Venue.
                <li>
                  The charge for each form for On Spot Registration will be
                  Rs.10
                </li>
              </ul>
            </div>
            <p className="mb-0">
              For any queries, contact the ABBS Office at:{" "}
              <strong className="text-dark">9251276842</strong>
            </p>
          </Card.Body>
        </Card>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            {/* <Form
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
            </Form> */}

            <Form
              className="d-flex flex-column mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Form.Label className="mb-2  fw-semibold">
                Enter your ABBS Life Membership Number:
              </Form.Label>
              <div className="d-flex">
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
              </div>
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
                  {/* <Col md={4} className="text-center">
                    {photo || member?.photo ? (
                      <>
                        <Image
                          src={photoPreview}
                          rounded
                          fluid
                          alt="Member Photo"
                          style={{
                            maxHeight: "200px",
                            border: "1px solid #ccc",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg";
                          }}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ccc",
                          borderRadius: "0.25rem",
                          backgroundColor: "#f8f9fa",
                          fontSize: "1rem",
                          color: "#888",
                        }}
                      >
                        Photo Not Uploaded
                      </div>
                    )}

                    <Form.Group controlId="photo" className="mt-3">
                      <Form.Label>Upload New Photo</Form.Label>
                      <Form.Control type="file" onChange={handlePhotoChange} />
                    </Form.Group>
                  </Col> */}
                  <Col md={4} className="text-center">
                    <div
                      style={{
                        width: "220px",
                        height: "220px",
                        margin: "0 auto",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        backgroundColor: "#f9f9f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Member Photo"
                          fluid
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg";
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            color: "#999",
                            fontSize: "1.1rem",
                            textAlign: "center",
                          }}
                        >
                          <p style={{ margin: 0 }}>Photo Not Uploaded</p>
                        </div>
                      )}
                    </div>

                    <Form.Group controlId="photo" className="mt-3">
                      <Form.Label
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          marginBottom: "0.5rem",
                          display: "block",
                        }}
                      >
                        Upload New Photo
                      </Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{
                          padding: "0.4rem",
                          borderRadius: "5px",
                          border: "1px solid #ced4da",
                          cursor: "pointer",
                        }}
                      />
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

                          {/* 🔽 This is the edit/save button */}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => toggleEdit("category")}
                            style={{
                              marginLeft: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              fontSize: "0.85rem",
                              padding: "4px 8px",
                            }}
                            aria-label={
                              editingFields["category"]
                                ? "Save category"
                                : "Edit category"
                            }
                          >
                            {editingFields["category"] ? (
                              <>
                                <FaCheck color="green" />
                                Save
                              </>
                            ) : (
                              <>
                                <FaEdit />
                                Edit
                              </>
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
