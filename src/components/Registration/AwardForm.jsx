// import React, { useState } from "react";
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Alert,
//   Spinner,
//   Card,
// } from "react-bootstrap";

// import Navbar from "../Navbar/Navbar";
// import "./AwardForm.css";
// import {submitAwardForm} from "../../apis/awardForm";


// const AwardForm = () => {
//   const [formData, setFormData] = useState({
//     code1: "",
//     code2: "",
//     code3: "",
//     name: "",
//     dob: "",
//     mobile: "",
//     email: "",
//     pin: "",
//     academicQualification: "",
//     occupation: "",
//     father: "",
//     mother: "",
//     spouse: "",
//     proposerName: "",
//     proposerEmail: "",
//     proposerMobile: "",
//     proposerAddress: "",
//   });
// const totalPages = 12; 
// const [currentPage, setCurrentPage] = useState(1);
//   const [zoom, setZoom] = useState(1);
//    const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

//   const [files, setFiles] = useState({
//     photo: null,
//     document1: null,
//     document2: null,
//   });

//   const [status, setStatus] = useState({
//     loading: false,
//     message: "",
//     error: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFiles((prev) => ({ ...prev, [name]: files[0] }));
//   };



// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setStatus({ loading: true, message: '', error: false });

//   const data = new FormData();

//   for (let key in formData) {
//     data.append(key, formData[key]);
//   }

//   data.append('photo', files.photo);
//   data.append('document1', files.document1);
//   data.append('document2', files.document2);

//   try {
//     await submitAwardForm(data); // ✅ Using your axios helper
//     setStatus({ loading: false, message: 'Form submitted successfully!', error: false });

//     // Reset form
//     setFormData({
//       code1: '', code2: '', code3: '', name: '', dob: '', mobile: '', email: '', pin: '',
//       academicQualification: '', occupation: '', father: '', mother: '', spouse: '',
//       proposerName: '', proposerEmail: '', proposerMobile: '', proposerAddress: ''
//     });

//     setFiles({ photo: null, document1: null, document2: null });
//   } catch (err) {
//     setStatus({ loading: false, message: 'Submission failed. Please try again.', error: true });
//   }
// };

//   return (
//     <>
//       <Navbar />
//          <Container fluid className="my-5">
//     <Row>
//       {/* Left Side: Image Viewer */}
//       <Col lg={5} className="mb-4">
//         <Card className="shadow-sm p-3">
//           <h5 className="text-center mb-3">Award Form Preview</h5>

//           <div className="text-center mb-2">
//             <button onClick={prevPage} disabled={currentPage === 1}>⟨ Prev</button>
//             <span style={{ margin: '0 15px' }}>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button onClick={nextPage} disabled={currentPage === totalPages}>Next ⟩
//           </div>

//           <div className="text-center mb-3">
//             <button onClick={zoomOut}>-</button>
//             <button onClick={zoomIn} style={{ marginLeft: 10 }}>+</button>
//           </div>

//           <div
//             style={{
//               border: '1px solid #ccc',
//               maxHeight: '70vh',
//               overflow: 'auto',
//               textAlign: 'center',
//               padding: '10px'
//             }}
//           >
//             <img
//               src={`/award/page${currentPage}.jpg`}
//               alt={`Page ${currentPage}`}
//               style={{
//                 width: `${zoom * 100}%`,
//                 maxWidth: '100%',
//                 height: 'auto',
//               }}
//             />
//           </div>
//         </Card>
//       </Col>

//       {/* Right Side: Form */}
//       <Col lg={7}>
//         <Card className="p-4 shadow-sm h-auto">
//           <h3 className="text-center mb-4" style={{ color: "#003366" }}>
//             Application Form For Awards And Maan Samman <br />
//             <small>(1st Nov 2024 - 31st Oct 2025)</small>
//           </h3>

//           {status.message && (
//             <Alert variant={status.error ? "danger" : "success"}>
//               {status.message}
//             </Alert>
//           )}

//           <Form onSubmit={handleSubmit} encType="multipart/form-data">
//             {/* Section: Nominee Codes */}
//             <h5 className="text-secondary mb-3">Preference for award</h5>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>1. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="code1"
//                     value={formData.code1}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>2. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="code2"
//                     value={formData.code2}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Award applied for special Achievemnets 3. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="code3"
//                     value={formData.code3}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Section: Personal Info */}
//             <h5 className="text-secondary mt-4 mb-3">Applicant's details</h5>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Date of Birth <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mobile<span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email<span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>PIN<span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="pin"
//                     value={formData.pin}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Academic Qualification <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="academicQualification"
//                     value={formData.academicQualification}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Occupation <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="occupation"
//                     value={formData.occupation}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Father's Name <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="father"
//                     value={formData.father}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Mother's Name <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="mother"
//                     value={formData.mother}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Spouse's Name <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     name="spouse"
//                     value={formData.spouse}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Section: Proposer Info */}
//             <h5 className="text-secondary mt-4 mb-3">
//               If the application is not submitted by the applicant himself/herself, details of proposer —
//             </h5>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Proposer Name</Form.Label>
//                   <Form.Control
//                     name="proposerName"
//                     value={formData.proposerName}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Proposer Email</Form.Label>
//                   <Form.Control
//                     name="proposerEmail"
//                     value={formData.proposerEmail}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Proposer Mobile</Form.Label>
//                   <Form.Control
//                     name="proposerMobile"
//                     value={formData.proposerMobile}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-4">
//               <Form.Label>Proposer Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 name="proposerAddress"
//                 value={formData.proposerAddress}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {/* Section: Document Upload */}
//             <h5 className="text-secondary mt-4 mb-3">Upload Files</h5>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Recent Colour Photograph <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     type="file"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Document 1 <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     type="file"
//                     name="document1"
//                     onChange={handleFileChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Document 2 <span style={{ color: "red" }}>*</span></Form.Label>
//                   <Form.Control
//                     required
//                     type="file"
//                     name="document2"
//                     onChange={handleFileChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Submit */}
//             <div className="text-center mt-4">
//               <Button variant="primary" type="submit" disabled={status.loading}>
//                 {status.loading ? (
//                   <Spinner animation="border" size="sm" />
//                 ) : (
//                   "Submit Application"
//                 )}
//               </Button>
//             </div>
//           </Form>
//         </Card>
//       </Container>
//     </>
//   );
// };

// export default AwardForm;



import React, { useState } from "react";
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
    pin: "",
    academicQualification: "",
    occupation: "",
    father: "",
    mother: "",
    spouse: "",
    proposerName: "",
    proposerEmail: "",
    proposerMobile: "",
    proposerAddress: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("photo", files.photo);
    data.append("document1", files.document1);
    data.append("document2", files.document2);

    try {
      await submitAwardForm(data);
      setStatus({
        loading: false,
        message: "Form submitted successfully!",
        error: false,
      });

      setFormData({
        code1: "",
        code2: "",
        code3: "",
        name: "",
        dob: "",
        mobile: "",
        email: "",
        pin: "",
        academicQualification: "",
        occupation: "",
        father: "",
        mother: "",
        spouse: "",
        proposerName: "",
        proposerEmail: "",
        proposerMobile: "",
        proposerAddress: "",
      });

      setFiles({ photo: null, document1: null, document2: null });
    } catch (err) {
      setStatus({
        loading: false,
        message: "Submission failed. Please try again.",
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

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Section: Nominee Codes */}
            <h5 className="text-secondary mb-3">Preference for award</h5>
            <Row>
              <Col md={4}>
               <Form.Group className="mb-3">
                  <Form.Label>1. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                     required
                    name="code1"
                     value={formData.code1}
                     onChange={handleChange}
                   />
                 </Form.Group>
               </Col>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>2. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
                   <Form.Control
                     required
                     name="code2"
                     value={formData.code2}
                     onChange={handleChange}
                   />
                 </Form.Group>
               </Col>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>Award applied for special Achievemnets 3. Code No. <span style={{ color: "red" }}>*</span></Form.Label>
                   <Form.Control
                     required
                     name="code3"
                     value={formData.code3}
                     onChange={handleChange}
                   />
                 </Form.Group>
               </Col>
             </Row>

             {/* Section: Personal Info */}
             <h5 className="text-secondary mt-4 mb-3">Applicant's details</h5>
             <Row>
               <Col md={6}>
                 <Form.Group className="mb-3">
                   <Form.Label>Full Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                     name="name"
                     value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    name="mobile"
                    value={formData.mobile}
                     onChange={handleChange}
                   />
                </Form.Group>
              </Col>
               <Col md={6}>
                 <Form.Group className="mb-3">
                   <Form.Label>Email<span style={{ color: "red" }}>*</span></Form.Label>
                   <Form.Control
                     required
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                   />
                 </Form.Group>
               </Col>
             </Row>

             <Row>
               <Col md={4}>
                 <Form.Group className="mb-3">
                   <Form.Label>PIN<span style={{ color: "red" }}>*</span></Form.Label>
                   <Form.Control
                     required
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Academic Qualification <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    name="academicQualification"
                    value={formData.academicQualification}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Occupation <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                     required
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
                   <Form.Label>Father's Name <span style={{ color: "red" }}>*</span></Form.Label>
                   <Form.Control
                    required
                    name="father"
                    value={formData.father}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Mother's Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    name="mother"
                    value={formData.mother}
                     onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Spouse's Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    name="spouse"
                     value={formData.spouse}
                     onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Section: Proposer Info */}
            <h5 className="text-secondary mt-4 mb-3">
              If the application is not submitted by the applicant himself/herself, details of proposer —
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
                   <Form.Label>Recent Colour Photograph <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    type="file"
                    name="photo"
                    accept="image/*"
                     onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                   <Form.Label>Document 1 <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    type="file"
                    name="document1"
                     onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                   <Form.Label>Document 2 <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    required
                    type="file"
                    name="document2"
                     onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>

     
            <div className="text-center mt-4">
               <Button variant="primary" type="submit" disabled={status.loading}>
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
        </Row> {/* ✅ Missing Row close tag */}
      </Container>
    </>
  );
};

export default AwardForm;
