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
import { Toast, ToastContainer } from "react-bootstrap";

const NewRegistration = () => {
  const [LM_NO, setLmNo] = useState("");
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
  const [showToast, setShowToast] = useState(false);

  const requiredFields = [
    "LM_NO",
    "Year",
    "Title",
    "Member_Name",
    "Card_Issued",
    "S_O_D_O_W_O",
    "Date_of_Birth",
    "Address",
    "City",
    "Pin",
    "Contact_No",
    "Email",
    "Gotra",
    "Kuldevi",
    "gender",
    "category",
    "photo",
  ];

  const photoPreview = useMemo(() => {
    if (photo) {
      return URL.createObjectURL(photo);
    } else if (member?.photo) {
      return member.photo;
    }
    return null;
  }, [photo, member]);

  const handleSearch = async () => {
    if (!LM_NO.trim()) {
      setError("Please enter a Life Member No.");
      setMember(null);
      setOriginalMember(null);
      setSuccess("");
      return;
    }

    try {
      const data = await searchLifeMember(LM_NO);
      const normalized = {
        ...data,
        Gotra: data.Gotra || "",
        Kuldevi: data.Kuldevi || "",
        category: data.category || "",
        gender: data.gender || "",
        Email: data.Email || "",
        Member_Name: data.Member_Name || "",
        City: data.City || "",
        Pin: data.Pin || "",
        Date_of_Birth: data.Date_of_Birth
          ? data.Date_of_Birth.split("T")[0]
          : "",
        Address: data.Address || "",
        Contact_No: data.Contact_No || "",
        Title: data.Title || "",
        Year: data.Year || "",
        Card_Issued: data.Card_Issued || "",
        photo: data.photo,
        LM_NO: data.LM_NO || LM_NO,
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
        LM_NO: LM_NO,
        Year: "",
        Title: "",
        Member_Name: "",
        Card_Issued: "",
        S_O_D_O_W_O: "",
        Date_of_Birth: "",
        Address: "",
        City: "",
        Pin: "",
        Contact_No: "",
        Email: "",
        Gotra: "",
        Kuldevi: "",
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
    console.log("🔍 Starting validation...");
    console.log("🧾 Member object:", member);

    const errors = {};

    requiredFields.forEach((field) => {
      const value = member[field];
      console.log(`🔎 Checking "${field}" →`, value);
      if (field === "photo") {
        if (!photo && !member.photo) {
          errors.photo = "Photo is required";
        }
        return;
      }

      if (!value || value.toString().trim() === "") {
        console.warn(`⚠️ "${field}" is missing or empty`);
        errors[field] = "This field is required";
      } else {
        if (field === "Email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field] = "Invalid email address";
          }
        }

        if (field === "Contact_No") {
          const phoneRegex = /^[0-9]{10,15}$/;
          if (!phoneRegex.test(value)) {
            errors[field] = "Invalid contact number";
          }
        }

        if (field === "Pin") {
          if (!/^\d{6}$/.test(value)) {
            errors[field] = "PIN code must be 6 digits";
          }
        }
      }
    });

    console.log("✅ Validation finished. Errors found:", errors);
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

    try {
      if (isCreating) {
        await createLifeMember(member, photo);
        setSuccess("Form Submitted Successfully!");
      } else {
        await updateLifeMember(LM_NO, member, photo);
        setSuccess("Form Updated Successfully!");
      }

      setShowToast(true); // ✅ Show the toast

      setMember({
        LM_NO: "",
        Year: "",
        Title: "",
        Member_Name: "",
        Card_Issued: "",
        S_O_D_O_W_O: "",
        Date_of_Birth: "",
        Address: "",
        City: "",
        Pin: "",
        Contact_No: "",
        Email: "",
        Gotra: "",
        Kuldevi: "",
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
    console.log("🔎 member before validation:", member);

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
    required = false,
    placeholder = ""
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
                placeholder={placeholder}
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
        <p className="text-center mb-4 fw-semibold text-danger">
          ⚠️ Last Date for Online Registration:{" "}
          <strong>
            7<sup>th</sup> December 2025
          </strong>
        </p>
        <Card className="p-4 shadow-sm border-0 bg-light h-auto">
          <Card.Body>
            <p className="mb-3">
              <strong>Online Registration</strong> for the upcoming
              <em> Adhiveshan at Ujjain </em> on the
              <strong>
                {" "}
                20<sup>th</sup>, 21<sup>st</sup>, and 22<sup>nd</sup> of
                December.
              </strong>
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
            <Form
              className="d-flex flex-column mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
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

        {/* {success && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            </Col>
          </Row>
        )} */}

        {member && (
          <Card className="shadow-lg h-auto">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
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
                        Upload New Photo(Please Upload in Image Format)
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
                      {formErrors.photo && (
                        <div
                          style={{
                            color: "red",
                            marginTop: "0.5rem",
                            fontSize: "0.875rem",
                          }}
                        >
                          {formErrors.photo}
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Row>
                      {renderEditableField(
                        "ABBS Life Membership No",
                        "LM_NO",
                        "text",
                        null,
                        false
                      )}
                      {renderEditableField(
                        "Title ",
                        "Title",
                        "text",
                        null,
                        true,
                        "Mr/Mrs/Miss"
                      )}
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
                        null,
                        true,
                        "eg-S/O Mr.ABC"
                      )}
                      {renderEditableField(
                        "ABBS Membership Card Issued Year",
                        "Year",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Date of Birth",
                        "Date_of_Birth",
                        "date",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Gotra",
                        "Gotra",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Kuldevi",
                        "Kuldevi",
                        "text",
                        null,
                        true
                      )}
                      {/* {renderEditableField(
                        "Gender",
                        "gender",
                        "text",
                        null,
                        true
                      )} */}


                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="gender"
                      >
                        <Form.Label>
                          <strong>Gender</strong>
                        </Form.Label>
                        <Form.Select
                          value={member.gender || ""}
                          onChange={(e) =>
                            handleChange("gender", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>


                      {renderEditableField(
                        "Email",
                        "Email",
                        "email",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Mobile No",
                        "Contact_No",
                        "text",
                        null,
                        true
                      )}
                      {renderEditableField(
                        "Address",
                        "Address",
                        "text",
                        null,
                        true
                      )}

                      {renderEditableField("City", "City", "text", null, true)}
                      {renderEditableField(
                        "PIN Code",
                        "Pin",
                        "text",
                        null,
                        true
                      )}

                      {/* card_issue select */}
                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="Card_Issued"
                      >
                        <Form.Label>
                          <strong>Card Issued</strong>
                        </Form.Label>
                        <Form.Select
                          value={member.Card_Issued || ""}
                          onChange={(e) =>
                            handleChange("Card_Issued", e.target.value)
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

        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            minWidth: "300px",
          }}
        >
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={4000}
            autohide
            bg="success"
          >
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Form Submitted Successfully!
            </Toast.Body>
          </Toast>
        </div>
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
