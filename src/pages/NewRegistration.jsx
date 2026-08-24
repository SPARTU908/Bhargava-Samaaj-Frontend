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
import styles from "./NewRegistration.module.css";
import {
  createConferenceRegistration,
  submitConferencePayment,
} from "../apis/conferenceRegistration.js";
import ConferencePayment from "../components/ConferencePayment";

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
  familyDetails: [],
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
    const familyDetails = member?.familyDetails || [];

    const [editingFamilyIndex, setEditingFamilyIndex] = useState(null);

    const addFamilyMember = () => {
      const newFamilyMember = {
        LM_NO: "",
        Year: "",
        Relation: "",
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
        photoFile: null,
        photoPreview: "",
      };
      updateMemberData("familyDetails", [...familyDetails, newFamilyMember]);

      // Automatically put the newly added family member into edit mode
      setEditingFamilyIndex(familyDetails.length);
    };

    const removeFamilyMember = (index) => {
      const updatedFamily = familyDetails.filter((_, i) => i !== index);

      updateMemberData("familyDetails", updatedFamily);

      if (editingFamilyIndex === index) {
        setEditingFamilyIndex(null);
      }
    };

    const updateFamilyMember = (index, field, value) => {
      const updatedFamily = familyDetails.map((familyMember, i) =>
        i === index ? { ...familyMember, [field]: value } : familyMember,
      );

      updateMemberData("familyDetails", updatedFamily);
    };

    const renderEditableField = useCallback(
      (
        label,
        field,
        type = "text",
        placeholder = null,
        required = false,
        options = null,
      ) => {
        const value = member?.[field] || "";

        return (
          <Form.Group
            as={Col}
            xs={12}
            md={3}
            className="mb-3"
            controlId={field}
          >
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
      [member, formErrors, isEditing, updateMemberData],
    );

    return (
      <Form onSubmit={handleSubmit}>
        {/* <div className="d-flex justify-content-between align-items-center mb-3">
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
        </div> */}

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
            true,
          )}
          {renderEditableField(
            "S/O,D/O,W/O",
            "S_O_D_O_W_O",
            "text",
            "S/O Mr.ABC",
            true,
          )}
          {renderEditableField(
            "ABBS Membership Card Issued Year",
            "Year",
            "text",
            null,
            false,
          )}
          {renderEditableField(
            "Date of Birth",
            "Date_of_Birth",
            "date",
            null,
            true,
          )}
          {renderEditableField("Gotra", "Gotra", "text", null, true)}
          {renderEditableField("Kuldevi", "Kuldevi", "text", null, true)}
          {renderEditableField("Gender", "gender", "select", null, true, [
            "Male",
            "Female",
          ])}
          {renderEditableField("Email", "Email", "email", null, true)}
          {renderEditableField("Mobile No", "Contact_No", "text", null, true)}
          {renderEditableField("Address", "Address", "textarea", null, true)}
          {renderEditableField("City", "City", "text", null, true)}
          {renderEditableField("PIN Code", "Pin", "text", null, true)}
          {renderEditableField(
            "Card Issued",
            "Card_Issued",
            "select",
            null,
            true,
            ["Yes", "No"],
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
                  width:"200px",
                  height:"200px",
                }}
              />
            )}
          </Form.Group>

          {/* family member section start */}

          <Col xs={12} className="mt-4">
            <div className={styles.familySection}>
              {/* <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Family Details</h5>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={addFamilyMember}
                >
                  + Add Family Member
                </Button>
              </div> */}
              <div className={styles.familyHeader}>
                <div>
                  <h5 className="mb-1">Family Members</h5>

                  <p className="mb-0 text-muted small">
                    Add family members who will attend the conference with you.
                  </p>
                </div>

                <Button
                  type="button"
                  className={styles.addFamilyButton}
                  onClick={addFamilyMember}
                >
                  + Add Family Member
                </Button>
              </div>

              {familyDetails.map((familyMember, index) => (
                <Card key={index} className={`${styles.familyCard} mb-4`}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Family Member {index + 1}</h6>

                      <div className="d-flex gap-2">
                        {editingFamilyIndex !== index && (
                          <Button
                            type="button"
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setEditingFamilyIndex(index)}
                          >
                            <FaEdit className="me-1" />
                            Edit
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFamilyMember(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>

                  <Row className={`${styles.familyFieldsRow} g-3`}>
                      {/* Relation */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Relation</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <Form.Select
                            value={familyMember.Relation || ""}
                            onChange={(e) =>
                              updateFamilyMember(
                                index,
                                "Relation",
                                e.target.value,
                              )
                            }
                            isInvalid={
                              !!formErrors[`familyDetails_${index}_Relation`]
                            }
                          >
                            <option value="">Select Relation</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Other">Other</option>
                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Relation`]}
                            </Form.Control.Feedback>
                          </Form.Select>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Relation || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* LM NO */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>ABBS Life Membership No</strong>
                        </Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter LM No. if available"
                          value={familyMember.LM_NO || ""}
                          onChange={(e) =>
                            updateFamilyMember(index, "LM_NO", e.target.value)
                          }
                          disabled={editingFamilyIndex !== index}
                        />
                      </Form.Group>

                      {/* Year */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>ABBS Membership Card Issued Year</strong>
                        </Form.Label>

                        <Form.Control
                          type="text"
                          value={familyMember.Year || ""}
                          onChange={(e) =>
                            updateFamilyMember(index, "Year", e.target.value)
                          }
                          disabled={editingFamilyIndex !== index}
                        />
                      </Form.Group>

                      {/* Title */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Title</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <Form.Select
                            value={familyMember.Title || ""}
                            onChange={(e) =>
                              updateFamilyMember(index, "Title", e.target.value)
                            }
                          >
                            <option value="">Select Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                            <option value="Dr">Dr</option>
                          </Form.Select>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Title || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Member Name */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Member Name</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              value={familyMember.Member_Name || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Member_Name",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[
                                  `familyDetails_${index}_Member_Name`
                                ]
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Member_Name`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Member_Name || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* S/O D/O W/O */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>S/O, D/O, W/O</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              placeholder="S/O Mr. ABC"
                              value={familyMember.S_O_D_O_W_O || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "S_O_D_O_W_O",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[
                                  `familyDetails_${index}_S_O_D_O_W_O`
                                ]
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_S_O_D_O_W_O`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.S_O_D_O_W_O || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Date of Birth */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Date of Birth</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="date"
                              max={new Date().toISOString().split("T")[0]}
                              value={familyMember.Date_of_Birth || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Date_of_Birth",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[
                                  `familyDetails_${index}_Date_of_Birth`
                                ]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {
                                formErrors[
                                  `familyDetails_${index}_Date_of_Birth`
                                ]
                              }
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Date_of_Birth || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Gotra */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Gotra</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              value={familyMember.Gotra || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Gotra",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_Gotra`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Gotra`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Gotra || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Kuldevi */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Kuldevi</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              value={familyMember.Kuldevi || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Kuldevi",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_Kuldevi`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Kuldevi`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Kuldevi || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Gender */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Gender</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Select
                              value={familyMember.gender || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "gender",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_gender`]
                              }
                            >
                              <option value="">Select Gender</option>

                              <option value="Male">Male</option>

                              <option value="Female">Female</option>

                              <option value="Other">Other</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_gender`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.gender || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Email */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Email</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="email"
                              value={familyMember.Email || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Email",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_Email`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Email`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Email || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Contact */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Mobile No</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="10-digit mobile number"
                              value={familyMember.Contact_No || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                updateFamilyMember(index, "Contact_No", value);
                              }}
                              isInvalid={
                                !!formErrors[
                                  `familyDetails_${index}_Contact_No`
                                ]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Contact_No`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Contact_No || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Address */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Address</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={familyMember.Address || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Address",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_Address`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Address`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Address || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* City */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>City</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              value={familyMember.City || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "City",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_City`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_City`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.City || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* PIN */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>PIN Code</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Control
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              placeholder="6-digit PIN code"
                              value={familyMember.Pin || ""}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                updateFamilyMember(index, "Pin", value);
                              }}
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_Pin`]
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Pin`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Pin || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Card Issued */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Card Issued</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Select
                              value={familyMember.Card_Issued || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "Card_Issued",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[
                                  `familyDetails_${index}_Card_Issued`
                                ]
                              }
                            >
                              <option value="">Select</option>

                              <option value="Yes">Yes</option>

                              <option value="No">No</option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_Card_Issued`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.Card_Issued || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      {/* Category */}
                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        md={3}
                        className="mb-3"
                      >
                        <Form.Label>
                          <strong>Category</strong>{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        {editingFamilyIndex === index ? (
                          <>
                            <Form.Select
                              value={familyMember.category || ""}
                              onChange={(e) =>
                                updateFamilyMember(
                                  index,
                                  "category",
                                  e.target.value,
                                )
                              }
                              isInvalid={
                                !!formErrors[`familyDetails_${index}_category`]
                              }
                            >
                              <option value="">Select Category</option>

                              <option value="Delegate">Delegate</option>

                              <option value="Parent of Marriageable Candidate">
                                Parent of Marriageable Candidate
                              </option>

                              <option value="Marriageable Candidate">
                                Marriageable Candidate
                              </option>
                            </Form.Select>

                            <Form.Control.Feedback type="invalid">
                              {formErrors[`familyDetails_${index}_category`]}
                            </Form.Control.Feedback>
                          </>
                        ) : (
                          <div className="form-control bg-light">
                            {familyMember.category || "Not set"}
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        xs={12}
                        sm={6}
                        lg={3}
                        className={`${styles.familyField} mb-4`}
                      >
                        <Form.Label>
                          <strong>Photo</strong>
                        </Form.Label>

                        <Form.Control
                          type="file"
                          accept="image/*"
                          disabled={editingFamilyIndex !== index}
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                              updateFamilyMember(index, "photoFile", file);

                              updateFamilyMember(
                                index,
                                "photoPreview",
                                URL.createObjectURL(file),
                              );
                            }
                          }}
                        />

                        {familyMember.photoPreview && (
                          <img
                            src={familyMember.photoPreview}
                            alt="Family Member"
                            className="mt-2"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </Form.Group>
                    </Row>

                    {editingFamilyIndex === index && (
                      <div className={styles.familyActions}>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          onClick={() => removeFamilyMember(index)}
                        >
                          Remove
                        </Button>

                        <Button
                          type="button"
                          className={styles.doneButton}
                          onClick={() => setEditingFamilyIndex(null)}
                        >
                          <FaCheck className="me-1" />
                          Save Family Member
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* <div className="text-center mt-4">
          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div> */}
        <div className={styles.submitSection}>
          <div>
            <p className={styles.submitTitle}>Ready to continue?</p>

            <small className="text-muted">
              Please review all details before proceeding to payment.
            </small>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className={styles.submitButton}
          >
            {submitting ? "Saving..." : "Save & Proceed to Payment →"}
          </Button>
        </div>
      </Form>
    );
  },
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
  const [currentStep, setCurrentStep] = useState(1);

  const [conferenceRegistration, setConferenceRegistration] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handleSearch = async () => {
    setError("");
    setMember(null);
    setPhotoPreview(null);

    try {
      const data = await searchLifeMember(LM_NO.trim());

      setMember(data);

      // searched member ko editable bana do
      setIsEditing(true);

      if (data.photo) {
        const photoUrl = data.photo.startsWith("http")
          ? data.photo
          : `https://bhargava-samaaj.blr1.digitaloceanspaces.com/registration/${data.photo}`;

        setPhotoPreview(photoUrl);
      }
    } catch (error) {
      setError(
        error.message || "No member found with this Life Membership Number",
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

  const handlePaymentScreenshot = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPaymentError("Please upload a valid image.");
      return;
    }

    setPaymentScreenshot(file);
    setPaymentError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setPaymentPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const updateMemberData = useCallback((field, value) => {
    setMember((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const updated = {
        ...prev,
      };

      delete updated[field];

      return updated;
    });
  }, []);

  // const validateForm = () => {
  //   const requiredFields = [
  //     "Title",
  //     "Member_Name",
  //     "S_O_D_O_W_O",
  //     "Date_of_Birth",
  //     "Gotra",
  //     "Kuldevi",
  //     "gender",
  //     "Email",
  //     "Contact_No",
  //     "Address",
  //     "City",
  //     "Pin",
  //     "Card_Issued",
  //     "category",
  //   ];
  //   const errors = {};
  //   requiredFields.forEach((f) => {
  //     if (!member?.[f]) errors[f] = "This field is required.";
  //   });

  //   if (member.Email && !/\S+@\S+\.\S+/.test(member.Email)) {
  //     errors.Email = "Email is invalid";
  //   } else if (!member.Email) {
  //     errors.Email = "Email is required";
  //   }

  //   const familyDetails = member?.familyDetails || [];

  //   familyDetails.forEach((familyMember, index) => {
  //     if (!familyMember.Relation) {
  //       errors[`familyDetails_${index}_Relation`] = "Relation is required.";
  //     }

  //     if (!familyMember.Member_Name) {
  //       errors[`familyDetails_${index}_Member_Name`] =
  //         "Member Name is required.";
  //     }

  //     if (!familyMember.Date_of_Birth) {
  //       errors[`familyDetails_${index}_Date_of_Birth`] =
  //         "Date of Birth is required.";
  //     }

  //     if (!familyMember.gender) {
  //       errors[`familyDetails_${index}_gender`] = "Gender is required.";
  //     }
  //   });

  //   const mobile = member?.Contact_No?.trim();
  //   if (!mobile) {
  //     errors.Contact_No = "Mobile number is required.";
  //   } else if (!/^\d{10}$/.test(mobile)) {
  //     errors.Contact_No = "Enter a valid 10-digit mobile number.";
  //   }
  //   setFormErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };
  const validateForm = () => {
    const errors = {};

    const isEmpty = (value) =>
      value === undefined || value === null || String(value).trim() === "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex = /^[6-9]\d{9}$/;

    const pinRegex = /^[1-9][0-9]{5}$/;

    /*
  |--------------------------------------------------------------------------
  | PRIMARY MEMBER VALIDATION
  |--------------------------------------------------------------------------
  */

    if (!member) {
      setError("Please enter member details.");
      return false;
    }

    if (isEmpty(member.Title)) {
      errors.Title = "Title is required.";
    }

    if (isEmpty(member.Member_Name)) {
      errors.Member_Name = "Member name is required.";
    } else if (member.Member_Name.trim().length < 2) {
      errors.Member_Name = "Member name must be at least 2 characters.";
    }

    if (isEmpty(member.S_O_D_O_W_O)) {
      errors.S_O_D_O_W_O = "S/O, D/O, W/O is required.";
    }

    if (isEmpty(member.Date_of_Birth)) {
      errors.Date_of_Birth = "Date of birth is required.";
    } else {
      const dob = new Date(member.Date_of_Birth);

      const today = new Date();

      if (dob > today) {
        errors.Date_of_Birth = "Date of birth cannot be in the future.";
      }
    }

    if (isEmpty(member.Gotra)) {
      errors.Gotra = "Gotra is required.";
    }

    if (isEmpty(member.Kuldevi)) {
      errors.Kuldevi = "Kuldevi is required.";
    }

    if (isEmpty(member.gender)) {
      errors.gender = "Please select gender.";
    }

    if (isEmpty(member.Email)) {
      errors.Email = "Email is required.";
    } else if (!emailRegex.test(member.Email.trim())) {
      errors.Email = "Please enter a valid email address.";
    }

    if (isEmpty(member.Contact_No)) {
      errors.Contact_No = "Mobile number is required.";
    } else if (!mobileRegex.test(member.Contact_No.trim())) {
      errors.Contact_No = "Enter a valid 10-digit mobile number.";
    }

    if (isEmpty(member.Address)) {
      errors.Address = "Address is required.";
    } else if (member.Address.trim().length < 5) {
      errors.Address = "Please enter a complete address.";
    }

    if (isEmpty(member.City)) {
      errors.City = "City is required.";
    }

    if (isEmpty(member.Pin)) {
      errors.Pin = "PIN code is required.";
    } else if (!pinRegex.test(member.Pin.trim())) {
      errors.Pin = "Enter a valid 6-digit PIN code.";
    }

    if (isEmpty(member.Card_Issued)) {
      errors.Card_Issued = "Please select whether card was issued.";
    }

    if (isEmpty(member.category)) {
      errors.category = "Please select a category.";
    }

    /*
  |--------------------------------------------------------------------------
  | FAMILY MEMBER VALIDATION
  |--------------------------------------------------------------------------
  */

    const familyDetails = member.familyDetails || [];

    familyDetails.forEach((familyMember, index) => {
      const prefix = `familyDetails_${index}_`;

      if (isEmpty(familyMember.Relation)) {
        errors[`${prefix}Relation`] = "Relation is required.";
      }

      // LM_NO optional

      // Year optional if family member
      // does not have ABBS membership

      if (isEmpty(familyMember.Title)) {
        errors[`${prefix}Title`] = "Title is required.";
      }

      if (isEmpty(familyMember.Member_Name)) {
        errors[`${prefix}Member_Name`] = "Member name is required.";
      } else if (familyMember.Member_Name.trim().length < 2) {
        errors[`${prefix}Member_Name`] =
          "Member name must be at least 2 characters.";
      }

      if (isEmpty(familyMember.S_O_D_O_W_O)) {
        errors[`${prefix}S_O_D_O_W_O`] = "S/O, D/O, W/O is required.";
      }

      if (isEmpty(familyMember.Date_of_Birth)) {
        errors[`${prefix}Date_of_Birth`] = "Date of birth is required.";
      } else {
        const dob = new Date(familyMember.Date_of_Birth);

        if (dob > new Date()) {
          errors[`${prefix}Date_of_Birth`] =
            "Date of birth cannot be in the future.";
        }
      }

      if (isEmpty(familyMember.Gotra)) {
        errors[`${prefix}Gotra`] = "Gotra is required.";
      }

      if (isEmpty(familyMember.Kuldevi)) {
        errors[`${prefix}Kuldevi`] = "Kuldevi is required.";
      }

      if (isEmpty(familyMember.gender)) {
        errors[`${prefix}gender`] = "Gender is required.";
      }

      if (isEmpty(familyMember.Email)) {
        errors[`${prefix}Email`] = "Email is required.";
      } else if (!emailRegex.test(familyMember.Email.trim())) {
        errors[`${prefix}Email`] = "Enter a valid email address.";
      }

      if (isEmpty(familyMember.Contact_No)) {
        errors[`${prefix}Contact_No`] = "Mobile number is required.";
      } else if (!mobileRegex.test(familyMember.Contact_No.trim())) {
        errors[`${prefix}Contact_No`] = "Enter a valid 10-digit mobile number.";
      }

      if (isEmpty(familyMember.Address)) {
        errors[`${prefix}Address`] = "Address is required.";
      }

      if (isEmpty(familyMember.City)) {
        errors[`${prefix}City`] = "City is required.";
      }

      if (isEmpty(familyMember.Pin)) {
        errors[`${prefix}Pin`] = "PIN code is required.";
      } else if (!pinRegex.test(familyMember.Pin.trim())) {
        errors[`${prefix}Pin`] = "Enter a valid 6-digit PIN code.";
      }

      if (isEmpty(familyMember.Card_Issued)) {
        errors[`${prefix}Card_Issued`] = "Please select card issued status.";
      }

      if (isEmpty(familyMember.category)) {
        errors[`${prefix}category`] = "Please select a category.";
      }
    });

    setFormErrors(errors);

    const isValid = Object.keys(errors).length === 0;

    /*
  |--------------------------------------------------------------------------
  | Scroll to first invalid field
  |--------------------------------------------------------------------------
  */

    if (!isValid) {
      setTimeout(() => {
        const firstInvalid = document.querySelector(".is-invalid");

        if (firstInvalid) {
          firstInvalid.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          firstInvalid.focus();
        }
      }, 100);
    }

    return isValid;
  };
  const handlePaymentSuccess = (data) => {
    setCurrentStep(3);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
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
      let savedMember;

      /*
    |--------------------------------------------------------------------------
    | Save member using existing API
    |--------------------------------------------------------------------------
    */

      if (isAbbsMember) {
        savedMember = await updateLifeMember(member.LM_NO, member, photoFile);
      } else {
        savedMember = await createLifeMember(member, photoFile);
      }

      /*
    |--------------------------------------------------------------------------
    | Get actual saved member
    |--------------------------------------------------------------------------
    */

      const savedMemberData =
        savedMember?.member || savedMember?.data || savedMember;

      /*
    |--------------------------------------------------------------------------
    | Create Conference Registration
    |--------------------------------------------------------------------------
    */

      const conferenceData = await createConferenceRegistration({
        memberId: savedMemberData?._id || member._id,

        familyDetails: JSON.stringify(member.familyDetails || []),
      });

      /*
    |--------------------------------------------------------------------------
    | Store payment information in state
    |--------------------------------------------------------------------------
    */

      setConferenceRegistration(conferenceData);

      /*
    |--------------------------------------------------------------------------
    | Go to Step 2
    |--------------------------------------------------------------------------
    */

      setCurrentStep(2);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      alert(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* <Container className="py-3"> */}
      <Container fluid className={styles.registrationPage}>
        <div className="text-center mb-2">
          <h4 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
            Online Registration for 135<sup>th</sup> Annual Conference at Jaipur
            ( 26th, 27th, 28th December 2026)
          </h4>
        </div>
        <p className="text-center mb-4 fw-semibold text-danger">
          ⚠️ Last Date for Online Registration:{" "}
          <strong>
            7<sup>th</sup> December 2026
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
            <div
     className={`d-flex justify-content-between align-items-start ${styles.chargesContent}`}
>
              <div className="me-3" style={{ flex: 1 }}>
                <ul className="mb-0 ps-3">
                  <li>
                    ★ Online Registration: Rs. 50 per person (Rs. 50/- will be
                    charged while collecting your card during the Jaipur
                    Conference.)
                  </li>
                  <li>
                    ★ On-Spot Registration at the Adhiveshan Venue: Rs. 100 per
                    person
                  </li>
                </ul>
              </div>

              <div style={{ flex: 1, textAlign: "right" }}>
                <p>★ Charge per form for On-Spot Registration: Rs. 10</p>
                <p className="mb-0">
                  ★ For any queries, contact the ABBS Office at:{" "}
                  <strong className="text-dark">9251276842</strong>
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
        {currentStep === 1 && (
          <>
            <div
  className={`d-flex justify-content-center gap-3 mb-4 ${styles.registrationTypeWrapper}`}
>
              <Button
                className={styles.registrationTypeButton}
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
                        Membership Number, do not include the year — simply
                        enter the membership number only to find your details.
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
                  // <Row className="justify-content-center">
                  //   <Col xs={12} lg={11} xl={10}>
                  //     <Card className="p-4">
                  <Row>
                    <Col xs={12}>
                      <Card className={styles.registrationCard}>
                        <Card.Body className={styles.registrationCardBody}>
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
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )}
              </>
            ) : (
              // <Row className="justify-content-center mb-4">
              //   <Col xs={12} lg={11} xl={10}>
              //     <Card className="p-4">
              //       <MemberForm
              //         member={member}
              //         isEditing={isEditing}
              //         formErrors={formErrors}
              //         submitting={submitting}
              //         photoPreview={photoPreview}
              //         handlePhotoChange={handlePhotoChange}
              //         setIsEditing={setIsEditing}
              //         handleSubmit={handleSubmit}
              //         updateMemberData={updateMemberData}
              //       />
              //     </Card>
              //   </Col>
              // </Row>
              <Row className="mb-4">
                <Col xs={12}>
                  <Card className={styles.registrationCard}>
                    <Card.Body className={styles.registrationCardBody}>
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}

        {currentStep === 2 && conferenceRegistration && (
          <Row className="justify-content-center">
            <Col md={10}>
              <ConferencePayment
                registration={conferenceRegistration}
                onSuccess={handlePaymentSuccess}
              />
            </Col>
          </Row>
        )}
        {currentStep === 3 && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 text-center">
                <div
                  style={{
                    fontSize: "60px",
                    color: "green",
                  }}
                >
                  ✓
                </div>

                <h3 className="text-success">Registration Successful!</h3>

                <p>Thank you for your registration.</p>

                {conferenceRegistration && (
                  <>
                    <p className="mb-1">Registration Number</p>

                    <h4
                      style={{
                        color: "#f4511e",
                        fontWeight: "700",
                      }}
                    >
                      {conferenceRegistration.primaryRegistrationNumber}
                    </h4>

                    <p className="mt-3">
                      Your payment details have been submitted successfully and
                      will be verified soon.
                    </p>
                  </>
                )}
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
            <Modal.Title>Confirm Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please review all the details carefully. Once
            submitted, the information will be saved.
            <br />
            <br />
            Are you sure you want to save and submit this registration?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Review Again
            </Button>

            <Button
              variant="success"
              onClick={confirmSubmit}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Yes, Save & Submit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {/* <Container>
        Form under maintenance
      </Container> */}
    </>
  );
};

export default NewRegistration;
