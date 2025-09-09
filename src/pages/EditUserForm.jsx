// import React, { useEffect, useState } from "react";
// import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";
// import { updateUserDetails } from "../apis/form";

// const EditUserFormUser = () => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const email = localStorage.getItem("userEmail"); // get user email

//   // Fetch existing user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/${email}`,
//           {
//             withCredentials: true,
//           }
//         );
//         setFormData(res.data); // pre-fill form
//       } catch (error) {
//         setErrorMsg("Failed to fetch user data.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (email) {
//       fetchUserData();
//     } else {
//       setErrorMsg("User email not found.");
//       setLoading(false);
//     }
//   }, [email]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");

//     try {
//       const res = await updateUserDetails(email, formData);
//       setSuccessMsg("User details updated successfully!");
//     } catch (error) {
//       setErrorMsg("Failed to update user details.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <Container style={{ maxWidth: "600px", marginTop: "40px" }}>
//       <h3 className="mb-4">Edit Your Profile</h3>

//       {successMsg && <Alert variant="success">{successMsg}</Alert>}
//       {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formName">
//           <Form.Label>Full Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name || ""}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formCity">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             type="text"
//             name="city"
//             value={formData.city || ""}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formProfession">
//           <Form.Label>Profession</Form.Label>
//           <Form.Control
//             type="text"
//             name="profession"
//             value={formData.profession || ""}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formIncome">
//           <Form.Label>Income</Form.Label>
//           <Form.Control
//             type="text"
//             name="income"
//             value={formData.income || ""}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         {/* Add more fields as needed */}

//         <Button variant="primary" type="submit">
//           Save Changes
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default EditUserFormUser;



// import React, { useEffect, useState } from "react";
// import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
// import axios from "axios";

// const EditUserForm = () => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const email = localStorage.getItem("userEmail");

//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/v1/form/${email}`);
//         setFormData(res.data);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (email) fetchUserData();
//   }, [email]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `${BACKEND_URL}/api/v1/form/update/${email}`,
//         formData,
//         { withCredentials: true }
//       );
//       alert("User details updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update user");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <h3 className="mb-4">Edit Your Profile</h3>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           {/* PERSONAL INFO */}
//           {[
//             "number",
//             "name",
//             "email",
//             "mobile",
//             "whatsapp",
//             "gender",
//             "dob",
//             "birthTime",
//             "birthPlace",
//             "height",
//             "weight",
//             "bloodGroup",
//             "complexion",
//             "manglik",
//             "gotra",
//             "kuldevi",
//             "nri",
//             "residence",
//           ].map((field) => (
//             <Col md={6} key={field} className="mb-3">
//               <Form.Group controlId={field}>
//                 <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
//                 <Form.Control
//                   type={field === "dob" ? "date" : "text"}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           ))}

//           {/* EDUCATION / PROFESSION */}
//           {[
//             "education",
//             "otherQualification",
//             "professionQualification",
//             "profession",
//             "company",
//             "designation",
//             "income",
//             "hobbies",
//           ].map((field) => (
//             <Col md={6} key={field} className="mb-3">
//               <Form.Group controlId={field}>
//                 <Form.Label>{field}</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           ))}

//           {/* FAMILY DETAILS */}
//           {[
//             "guardianName",
//             "fatherName",
//             "fatherProfession",
//             "fatherIncome",
//             "fatherOccupation",
//             "fatherDesignation",
//             "motherName",
//             "nativePlace",
//             "motherDOB",
//           ].map((field) => (
//             <Col md={6} key={field} className="mb-3">
//               <Form.Group controlId={field}>
//                 <Form.Label>{field}</Form.Label>
//                 <Form.Control
//                   type={field === "motherDOB" ? "date" : "text"}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           ))}

//           {/* ADDRESS */}
//           {["address", "city", "pin", "remarks"].map((field) => (
//             <Col md={6} key={field} className="mb-3">
//               <Form.Group controlId={field}>
//                 <Form.Label>{field}</Form.Label>
//                 <Form.Control
//                   type={field === "pin" ? "number" : "text"}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Col>
//           ))}

//           {/* PASSWORD (optional - you may remove it if password change is separate) */}
//           <Col md={6} className="mb-3">
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="password"
//                 value={formData.password || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>

//           {/* PHOTO & BIODATA (as URL inputs, for now) */}
//           <Col md={6} className="mb-3">
//             <Form.Group controlId="photo">
//               <Form.Label>Photo URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="photo"
//                 value={formData.photo || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6} className="mb-3">
//             <Form.Group controlId="bioData">
//               <Form.Label>BioData URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="bioData"
//                 value={formData.bioData || ""}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Button variant="primary" type="submit">
//           Update Profile
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default EditUserForm;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EditProfile = () => {
//   const userEmail = localStorage.getItem("userEmail"); 
//   console.log(userEmail)// ✅ Only defined once
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: userEmail,
//     phone: "",
//     dob: "",
//     // ... Add all other fields from your model
//   });

//   useEffect(() => {
//     if (!userEmail) return;

//     axios
//       .get(`${BACKEND_URL}/api/v1/form/${userEmail}`) // Make sure this route exists
//       .then((res) => setFormData(res.data))
//       .catch((err) => console.error("Error fetching user", err));
//   }, [userEmail]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(`${BACKEND_URL}/api/v1/form/update/${userEmail}`, formData);
//       alert("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name || ""}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Phone:
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone || ""}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Date of Birth:
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob || ""}
//           onChange={handleChange}
//         />
//       </label>

//       {/* Add other fields similarly */}

//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default EditProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const EditProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    email: userEmail || "",
    mobile: "",
    gender: "",
    birthTime: "",
    birthPlace: "",
    height: "",
    weight: "",
    dob: "",
    bloodGroup: "",
    manglik: "",
    gotra: "",
    kuldevi: "",
    complexion: "",
    education: "",
    professionQualification: "",
    profession: "",
    company: "",
    designation: "",
    income: "",
    hobbies: "",
    otherQualification: "",
    guardianName: "",
    fatherName: "",
    fatherProfession: "",
    fatherIncome: "",
    fatherDesignation: "",
    motherName: "",
    nativePlace: "",
    address: "",
    city: "",
    pin: "",
    whatsapp: "",
    nri: "",
    remarks: "",
    
    
  });

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`${BACKEND_URL}/api/v1/form/${userEmail}`)
      .then((res) => {
        const { _id, __v, password, photo,bioData,status,submittedAt,createdAt, updatedAt,...cleanedData } = res.data;
        setFormData(cleanedData);
      })
      .catch((err) => console.error("Error fetching user", err));
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BACKEND_URL}/api/v1/form/update/${userEmail}`, formData);
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm h-auto">
        <Card.Header className=" text-black text-center">
          <h4>Edit Your Profile</h4>
        </Card.Header>

        {/* Scrollable body */}
        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            padding: "20px",
            background: "#f9f9f9",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Row>
              {Object.entries(formData).map(([key, value]) => {
                if (["_id", "__v", "password"].includes(key)) return null;

                // Special types
                const isDateField = key.toLowerCase().includes("dob");
                const inputType = isDateField ? "date" : "text";

                return (
                  <Col md={6} sm={12} key={key} className="mb-3">
                    <Form.Group controlId={`form-${key}`}>
                      <Form.Label className="text-capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </Form.Label>
                      <Form.Control
                        type={inputType}
                        name={key}
                        value={value || ""}
                        onChange={handleChange}
                        
                      />
                    </Form.Group>
                  </Col>
                );
              })}
            </Row>

            <div className="text-center mt-4">
              <Button variant="success" type="submit" className="px-5">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default EditProfile;
