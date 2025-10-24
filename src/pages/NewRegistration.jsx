// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Alert,
//   Image,
//   Toast,
//   Modal,
// } from "react-bootstrap";
// import { FaEdit, FaCheck } from "react-icons/fa";
// import Navbar from "../components/Navbar/Navbar.jsx";
// import {
//   searchLifeMember,
//   createLifeMember,
//   updateLifeMember,
// } from "../apis/lifemember.js";

// const NewRegistration = () => {
//   const [isAbbsMember, setIsAbbsMember] = useState(true);
//   const [LM_NO, setLmNo] = useState("");
//   const [member, setMember] = useState(null);
//   const [error, setError] = useState("");
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [formErrors, setFormErrors] = useState({});
//   const [editingFields, setEditingFields] = useState({});
//   const [showToast, setShowToast] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [photoFile, setPhotoFile] = useState(null);

//   const handleSearch = async () => {
//     setError("");
//     setMember(null);
//     setPhotoPreview(null);

//     try {
//       const data = await searchLifeMember(LM_NO.trim());

//       setMember(data);

//       if (data.photo) {
//         const photoUrl = data.photo.startsWith("http")
//           ? data.photo
//           : `https://bhargava-samaaj.blr1.digitaloceanspaces.com/registration/${data.photo}`;
//         setPhotoPreview(photoUrl);
//       } else {
//         setPhotoPreview(null);
//       }
//     } catch (error) {
//       setError(
//         error.message || "No member found with this Life Membership Number"
//       );
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPhotoPreview(reader.result);
//       reader.readAsDataURL(file);
//       setPhotoFile(file);
//       setFormErrors((prev) => ({ ...prev, photo: null }));
//     } else {
//       setFormErrors((prev) => ({
//         ...prev,
//         photo: "Please upload a valid image file.",
//       }));
//     }
//   };

//   const toggleEdit = (field) => {
//     setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     const requiredFields = [
//       "Title",
//       "Member_Name",
//       "S_O_D_O_W_O",
//       "Year",
//       "Date_of_Birth",
//       "Gotra",
//       "Kuldevi",
//       "gender",
//       "Email",
//       "Contact_No",
//       "Address",
//       "City",
//       "Pin",
//       "Card_Issued",
//       "category",
//     ];

//     requiredFields.forEach((field) => {
//       if (!member?.[field] || member[field].trim() === "") {
//         errors[field] = "This field is required.";
//       }
//     });

//     if (!photoFile && !photoPreview) {
//       errors.photo = "This field is required.";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEditingFields({});

//     const isValid = validateForm();

//     if (!isValid) {
//       return;
//     }

//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     setShowConfirm(false);
//     setSubmitting(true);

//     try {
//       if (isAbbsMember) {
//         await updateLifeMember(member.LM_NO, member, photoFile);
//       } else {
//         await createLifeMember(member, photoFile);
//       }

//       setShowToast(true);

//       setMember({
//         LM_NO: "",
//         Title: "",
//         Member_Name: "",
//         S_O_D_O_W_O: "",
//         Year: "",
//         Date_of_Birth: "",
//         Gotra: "",
//         Kuldevi: "",
//         gender: "",
//         Email: "",
//         Contact_No: "",
//         Address: "",
//         City: "",
//         Pin: "",
//         Card_Issued: "",
//         category: "",
//       });
//       setPhotoFile(null);
//       setPhotoPreview(null);
//       setFormErrors({});
//       setEditingFields({});
//     } catch (error) {
//       alert(error.message || "Submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const updateMemberData = (field, value) => {
//     setMember((prev) => ({ ...prev, [field]: value }));
//   };

//   const renderEditableField = (
//     label,
//     field,
//     type = "text",
//     placeholder = null,
//     required = false,
//     options = null,
//     commonInputProps = {}
//   ) => {
//     const value = member?.[field] || "";
//     const isEditing = editingFields[field] || false;
//     const isFieldRequired = required && !value && formErrors[field];

//     return (
//       <Form.Group
//         as={Col}
//         md={6}
//         className="mb-3"
//         key={field}
//         controlId={field}
//       >
//         <Form.Label>
//           <strong>{label}</strong>{" "}
//           {required && <span style={{ color: "red" }}>*</span>}
//         </Form.Label>
//         <div className="d-flex align-items-center">
//           {isEditing ? (
//             options ? (
//               <Form.Select
//                 {...commonInputProps}
//                 value={value}
//                 onChange={(e) => updateMemberData(field, e.target.value)}
//                 isInvalid={!!formErrors[field]}
//                 autoFocus
//               >
//                 <option value="">Select</option>
//                 {options.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </Form.Select>
//             ) : (
//               <Form.Control
//                 type={type}
//                 placeholder={placeholder}
//                 {...commonInputProps}
//                 value={value}
//                 onChange={(e) => updateMemberData(field, e.target.value)}
//                 isInvalid={!!formErrors[field]}
//                 style={{ flexGrow: 1 }}
//                 autoFocus
//               />
//             )
//           ) : (
//             <div
//               style={{
//                 flexGrow: 1,
//                 padding: "0.375rem 0.75rem",
//                 border: "1px solid #ced4da",
//                 borderRadius: "0.25rem",
//                 backgroundColor: "#e9ecef",
//                 cursor: "default",
//                 userSelect: "none",
//               }}
//             >
//               {value || <i className="text-muted">Not set</i>}
//             </div>
//           )}

//           <Button
//             variant="outline-secondary"
//             size="sm"
//             onClick={() => toggleEdit(field)}
//             style={{
//               marginLeft: "0.5rem",
//               display: "flex",
//               alignItems: "center",
//               gap: "0.25rem",
//               fontSize: "0.85rem",
//               padding: "4px 8px",
//             }}
//             aria-label={isEditing ? `Save ${field}` : `Edit ${field}`}
//           >
//             {isEditing ? <FaCheck color="green" /> : <FaEdit />}
//             {isEditing ? "Save" : "Edit"}
//           </Button>
//         </div>
//         {formErrors[field] && (
//           <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
//             {formErrors[field]}
//           </Form.Control.Feedback>
//         )}
//       </Form.Group>
//     );
//   };

//   const MemberForm = ({ isNonMember = false }) => {
//     return (
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           {renderEditableField(
//             "ABBS Life Membership No",
//             "LM_NO",
//             "text",
//             null,
//             false
//           )}
//           {renderEditableField("Title ", "Title", "text", null, true, null, {
//             placeholder: "Mr/Mrs/Miss",
//           })}
//           {renderEditableField(
//             "Member Name",
//             "Member_Name",
//             "text",
//             null,
//             true
//           )}
//           {renderEditableField(
//             "S/O,D/O,W/O",
//             "S_O_D_O_W_O",
//             "text",
//             null,
//             true,
//             null,
//             { placeholder: "eg-S/O Mr.ABC" }
//           )}
//           {renderEditableField(
//             "ABBS Membership Card Issued Year",
//             "Year",
//             "text",
//             null,
//             true
//           )}
//           {renderEditableField(
//             "Date of Birth",
//             "Date_of_Birth",
//             "date",
//             null,
//             true
//           )}
//           {renderEditableField("Gotra", "Gotra", "text", null, true)}
//           {renderEditableField("Kuldevi", "Kuldevi", "text", null, true)}

//           <Form.Group as={Col} md={6} className="mb-3" controlId="gender">
//             <Form.Label>
//               <strong>Gender</strong>
//             </Form.Label>
//             <Form.Select
//               value={member?.gender || ""}
//               onChange={(e) => updateMemberData("gender", e.target.value)}
//               isInvalid={!!formErrors["gender"]}
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </Form.Select>
//             {formErrors["gender"] && (
//               <Form.Control.Feedback type="invalid">
//                 {formErrors["gender"]}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>

//           {renderEditableField("Email", "Email", "email", null, true)}
//           {renderEditableField("Mobile No", "Contact_No", "text", null, true)}
//           {renderEditableField("Address", "Address", "text", null, true)}
//           {renderEditableField("City", "City", "text", null, true)}
//           {renderEditableField("PIN Code", "Pin", "text", null, true)}

//           <Form.Group as={Col} md={6} className="mb-3" controlId="Card_Issued">
//             <Form.Label>
//               <strong>Card Issued</strong>
//             </Form.Label>
//             <Form.Select
//               value={member?.Card_Issued || ""}
//               onChange={(e) => updateMemberData("Card_Issued", e.target.value)}
//               isInvalid={!!formErrors["Card_Issued"]}
//             >
//               <option value="">Select</option>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Form.Select>
//             {formErrors["Card_Issued"] && (
//               <Form.Control.Feedback type="invalid">
//                 {formErrors["Card_Issued"]}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>

//           <Form.Group as={Col} md={6} className="mb-3" controlId="category">
//             <Form.Label>
//               <strong>Category</strong> <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <div className="d-flex align-items-center">
//               {editingFields["category"] ? (
//                 <Form.Select
//                   value={member?.category || ""}
//                   onChange={(e) => updateMemberData("category", e.target.value)}
//                   onBlur={() => toggleEdit("category")}
//                   isInvalid={!!formErrors["category"]}
//                   autoFocus
//                 >
//                   <option value="">Select</option>
//                   <option value="Delegate">Delegate</option>
//                   <option value="Parent of Marriageable Candidate">
//                     Parent of Marriageable Candidate
//                   </option>
//                   <option value="Marriageable Candidate">
//                     Marriageable Candidate
//                   </option>
//                 </Form.Select>
//               ) : (
//                 <div
//                   style={{
//                     flexGrow: 1,
//                     padding: "0.375rem 0.75rem",
//                     border: "1px solid #ced4da",
//                     borderRadius: "0.25rem",
//                     backgroundColor: "#e9ecef",
//                     cursor: "default",
//                     userSelect: "none",
//                   }}
//                 >
//                   {member?.category || <i className="text-muted">Not set</i>}
//                 </div>
//               )}
//               <Button
//                 variant="outline-secondary"
//                 size="sm"
//                 onClick={() => toggleEdit("category")}
//                 style={{
//                   marginLeft: "0.5rem",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.25rem",
//                   fontSize: "0.85rem",
//                   padding: "4px 8px",
//                 }}
//                 aria-label={
//                   editingFields["category"] ? "Save category" : "Edit category"
//                 }
//               >
//                 {editingFields["category"] ? (
//                   <FaCheck color="green" />
//                 ) : (
//                   <FaEdit />
//                 )}
//                 {editingFields["category"] ? "Save" : "Edit"}
//               </Button>
//             </div>
//             {formErrors["category"] && (
//               <Form.Control.Feedback
//                 type="invalid"
//                 style={{ display: "block" }}
//               >
//                 {formErrors["category"]}
//               </Form.Control.Feedback>
//             )}
//           </Form.Group>

//           <Form.Group as={Col} md={6} className="mb-3" controlId="photo">
//             <Form.Label>
//               <strong>Photo Upload</strong>{" "}
//               <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//             />
//             {formErrors.photo && (
//               <Form.Control.Feedback
//                 type="invalid"
//                 style={{ display: "block" }}
//               >
//                 {formErrors.photo}
//               </Form.Control.Feedback>
//             )}
//             {photoPreview ? (
//               <Image
//                 src={photoPreview}
//                 alt="Member Photo"
//                 fluid
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                 }}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/placeholder.jpg";
//                 }}
//               />
//             ) : (
//               <div
//                 style={{
//                   color: "#999",
//                   fontSize: "1.1rem",
//                   textAlign: "center",
//                 }}
//               >
//                 <p style={{ margin: 0 }}></p>
//               </div>
//             )}
//           </Form.Group>
//         </Row>

//         <div className="text-center mt-4">
//           <Button
//             type="submit"
//             variant="success"
//             size="lg"
//             disabled={submitting}
//           >
//             {submitting ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//       </Form>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <Container className="py-3">
//         <div className="text-center mb-2">
//           <h4 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>
//             Online Registration for 134<sup>th</sup> Annual Conference at Ujjain
//           </h4>
//           <p style={{ fontSize: "0.9rem", margin: 0 }}>
//             20th, 21st, 22nd December 2025
//           </p>
//         </div>
//         <p className="text-center mb-4 fw-semibold text-danger">
//           ⚠️ Last Date for Online Registration:{" "}
//           <strong>
//             7<sup>th</sup> December 2025
//           </strong>
//         </p>

//         <Card.Body>
//           <div className="mb-3 p-3 bg-white rounded border">
//             <h5 className="text-decoration-underline text-secondary mb-2">
//               🧾 Registration Charges:
//             </h5>
//             <ul className="mb-0 ps-3">
//               Online Registration: Rs. 50 per person (Rs. 50/- will be charged
//               while collecting your card during the Ujjain Conference.) On-Spot
//               Registration at the Adhiveshan Venue: Rs. 100 per person
//               <li>Charge per form for On-Spot Registration: Rs. 10</li>
//             </ul>
//           </div>
//           <p className="mb-0">
//             For any queries, contact the ABBS Office at:{" "}
//             <strong className="text-dark">9251276842</strong>
//           </p>
//         </Card.Body>

//         <div className="d-flex justify-content-center mt-4 mb-4 gap-3">
//           <Button
//             variant={isAbbsMember ? "primary" : "outline-primary"}
//             onClick={() => {
//               setIsAbbsMember(true);
//               setMember(null);
//               setError("");
//               setPhotoPreview(null);
//               setLmNo("");
//               setFormErrors({});
//               setEditingFields({});
//             }}
//           >
//             ABBS Life Member
//           </Button>
//           <Button
//             variant={!isAbbsMember ? "primary" : "outline-primary"}
//             onClick={() => {
//               setIsAbbsMember(false);
//               setMember({
//                 LM_NO: "",
//                 Title: "",
//                 Member_Name: "",
//                 S_O_D_O_W_O: "",
//                 Year: "",
//                 Date_of_Birth: "",
//                 Gotra: "",
//                 Kuldevi: "",
//                 gender: "",
//                 Email: "",
//                 Contact_No: "",
//                 Address: "",
//                 City: "",
//                 Pin: "",
//                 Card_Issued: "",
//                 category: "",
//               });
//               setError("");
//               setPhotoPreview(null);
//               setLmNo("");
//               setFormErrors({});
//               setEditingFields({});
//             }}
//           >
//             Non-ABBS Life Member
//           </Button>
//         </div>

//         {isAbbsMember ? (
//           <>

//             <Row className="justify-content-center mb-4">
//               <Col md={6}>
//                 <Form
//                   className="d-flex flex-column mt-3"
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSearch();
//                   }}
//                 >
//                   <div className="bg-warning bg-opacity-25 border-start border-4 border-warning p-2 mb-3 rounded">
//                     <strong>Important Note:</strong> While searching through
//                     Membership Number, do not include the year — simply enter
//                     the membership number only to find your details.
//                   </div>
//                   <Form.Label className="mb-2  fw-semibold">
//                     To Register for Conference-
//                     <br />
//                     Enter your ABBS Life Membership Number:
//                   </Form.Label>
//                   <div className="d-flex">
//                     <Form.Control
//                       type="text"
//                       value={LM_NO}
//                       onChange={(e) => setLmNo(e.target.value)}
//                       placeholder="Enter Life Member No."
//                       className="me-2"
//                       autoFocus
//                     />
//                     <Button variant="primary" type="submit">
//                       Search
//                     </Button>
//                   </div>
//                 </Form>
//               </Col>
//             </Row>

//             {error && (
//               <Row className="justify-content-center">
//                 <Col md={8}>
//                   <Alert
//                     variant="danger"
//                     className="text-center"
//                     style={{ fontSize: "1.1rem" }}
//                   >
//                     {error}
//                   </Alert>
//                 </Col>
//               </Row>
//             )}

//             {member && (
//               <Row className="justify-content-center">
//                 <Col md={8}>
//                   <Card className="p-4">
//                     <MemberForm isNonMember={false} />
//                   </Card>
//                 </Col>
//               </Row>
//             )}
//           </>
//         ) : (
//           <>
//             {/* Registration form for Non-ABBS Life Member */}
//             <Row className="justify-content-center mb-4">
//               <Col md={8}>
//                 <h4 className="mb-3 text-center">
//                   Registration Form for Non-ABBS Life Member
//                 </h4>
//                 <Card className="p-4">
//                   <MemberForm isNonMember={true} />
//                 </Card>
//               </Col>
//             </Row>
//           </>
//         )}

//         <Toast
//           onClose={() => setShowToast(false)}
//           show={showToast}
//           delay={3000}
//           autohide
//           className="position-fixed top-50 start-50 translate-middle shadow-lg border-0"
//           style={{
//             zIndex: 1055,
//             backgroundColor: "#d1e7dd",
//             color: "#0f5132",
//             minWidth: "350px",
//             textAlign: "center",
//             padding: "1rem 1.5rem",
//             borderRadius: "0.5rem",
//             fontSize: "1.1rem",
//             fontWeight: "500",
//           }}
//         >
//           🎉 Registration Form submitted successfully!
//         </Toast>

//         {/* Confirm modal */}
//         <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Submission</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Are you sure you want to submit this registration?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//               I Want to edit my information.
//             </Button>
//             <Button
//               variant="primary"
//               onClick={confirmSubmit}
//               disabled={submitting}
//             >
//               {submitting ? "Submitting..." : "Yes, Submit"}
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </>
//   );
// };

// export default NewRegistration;

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
          {renderEditableField(
            "ABBS Life Membership No",
            "LM_NO",
            "text",
            null,
            false
          )}
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
      <Container className="py-3">
        <div className="text-center mb-2">
          <h4 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
            Online Registration for 134<sup>th</sup> Annual Conference at Ujjain
            ( 20th, 21st, 22nd December 2025)
            {/* <p style={{ fontSize: "0.9rem", margin: 0 }}>
            20th, 21st, 22nd December 2025
          </p> */}
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
      </Container>
    </>
  );
};

export default NewRegistration;
