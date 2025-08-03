// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { uploadMemberForm, loginMember, getMemberStatus } from "../apis/member";
// import { savePayment } from "../apis/payment";
// import Navbar from "../components/Navbar/Navbar";
// import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
// import styles from "./Payment.module.css";
// import qr from "../assets/qrcode.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignFormUpload = () => {
//   const [showLoginModal, setShowLoginModal] = useState(
//     !localStorage.getItem("memberToken")
//   );
//   const [loginData, setLoginData] = useState({ username: "", membership: "" });

//   const [paymentdata, setPaymentData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     transactionId: "",
//   });

//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const [isApproved, setIsApproved] = useState(false);
//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const { membership: plan } = location.state || {};
//   const memberId = localStorage.getItem("memberId");

//   const validate = () => {
//     let newErrors = {};
//     if (!paymentdata.name) newErrors.name = "Please enter your name.";
//     if (!paymentdata.email) newErrors.email = "Please enter your email.";
//     else if (!/\S+@\S+\.\S+/.test(paymentdata.email))
//       newErrors.email = "Invalid email address.";
//     if (!paymentdata.mobile)
//       newErrors.mobile = "Please enter your mobile number.";
//     if (!paymentdata.transactionId)
//       newErrors.transactionId = "Please enter the transaction ID.";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData({ ...paymentdata, [name]: value });
//   };

//   const checkApprovalStatus = async () => {
//     const memberId = localStorage.getItem("memberId");
//     if (!memberId) return;

//     const status = await getMemberStatus(memberId);
//     if (status.success) {
//       setIsApproved(status.approved);
//     } else {
//       toast.error("Unable to verify approval status.", {
//         position: "top-center",
//       });
//     }
//   };

//   // const handleLoginSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const result = await loginMember(loginData);
//   //   if (result.success) {
//   //     toast.success("Login successful!", { position: "top-center" });
//   //     localStorage.setItem("memberToken", result.data.token);
//   //     localStorage.setItem("memberId", result.data.memberId);
//   //     setShowLoginModal(false);
//   //     await checkApprovalStatus();
//   //   } else {
//   //     toast.error("Login failed: " + result.error, { position: "top-center" });
//   //   }
//   // };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const result = await loginMember(loginData);

//     if (result.success) {
//       toast.success("Login successful!", { position: "top-center" });

//       localStorage.setItem("memberToken", result.data.token);
//       localStorage.setItem("memberId", result.data.memberId);
//       setShowLoginModal(false);

//       // ✅ Use these values directly without calling getMemberStatus()
//       if (result.data.uploadForm) {
//         setIsFileUploaded(true);
//       }
//       if (result.data.isFormApproved) {
//         setIsApproved(true);
//       }
//     } else {
//       toast.error("Login failed: " + result.error, { position: "top-center" });
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return setErrors({ upload: "Please select a file to upload." });
//     if (!memberId) {
//       toast.error("Please log in first to upload the form.", {
//         position: "top-center",
//       });
//       setShowLoginModal(true);
//       return;
//     }

//     setErrors({});
//     setLoading(true);
//     try {
//       await uploadMemberForm(memberId, file);
//       toast.success("File uploaded successfully!", { position: "top-center" });
//       setIsFileUploaded(true);
//       setFile(null);
//       await checkApprovalStatus(); // 🔄 check approval right after upload
//     } catch (err) {
//       setErrors({ uploadForm: "Upload failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", { position: "top-center" });
//       return;
//     }

//     try {
//       const payload = {
//         memberId,
//         transactionId: paymentdata.transactionId,
//         name: paymentdata.name,
//         email: paymentdata.email,
//         mobile: paymentdata.mobile,
//       };
//       const response = await savePayment(payload);
//       if (response.success) {
//         toast.success(
//           response.data?.message || "Payment received successfully!",
//           { position: "top-center", autoClose: 3000 }
//         );
//         localStorage.setItem("paymentId", response.data?.payment?._id);
//         setPaymentData({ name: "", email: "", mobile: "", transactionId: "" });
//       } else {
//         toast.error("Failed to save payment. Please try again.", {
//           position: "top-center",
//         });
//       }
//     } catch (err) {
//       toast.error("Server error occurred while saving payment.", {
//         position: "top-center",
//       });
//     }
//   };

//   const handleChooseFile = () => {
//     if (!memberId) {
//       toast.error("Please log in first to choose a file.", {
//         position: "top-center",
//       });
//       setShowLoginModal(true);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("memberToken")) {
//       checkApprovalStatus();
//     }
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {showLoginModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setShowLoginModal(false)}
//             >
//               &times;
//             </button>
//             <h2 className={styles.modalTitle}>Member Login</h2>
//             <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
//               <label>
//                 Username
//                 <input
//                   type="text"
//                   name="username"
//                   value={loginData.username}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, username: e.target.value })
//                   }
//                   required
//                 />
//               </label>
//               <label>
//                 Membership
//                 <select
//                   name="membership"
//                   value={loginData.membership}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, membership: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">Select tier</option>
//                   <option value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये">
//                     साधारण (₹300)
//                   </option>
//                   <option value="आजीवन सभासद - एकल - 600 रुपये">
//                     आजीवन (₹600)
//                   </option>
//                   <option value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये">
//                     युगल (₹1000)
//                   </option>
//                   <option value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये">
//                     डुप्लिकेट (₹50)
//                   </option>
//                 </select>
//               </label>
//               <button type="submit" className={styles.loginBtn}>
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {!showLoginModal && (
//         <div className={styles.container}>
//           {!isFileUploaded && (
//             <div className={styles.card}>
//               <h2 className={styles.title}>Upload Your Signed Form</h2>
//               <PhotoUpload
//                 file={file}
//                 setFile={setFile}
//                 onChooseFile={handleChooseFile}
//                 disabled={!localStorage.getItem("memberToken")}
//               />
//               {errors.upload && <p className={styles.error}>{errors.upload}</p>}
//               {errors.uploadForm && (
//                 <p className={styles.error}>{errors.uploadForm}</p>
//               )}
//               <button
//                 onClick={handleUpload}
//                 className={styles.button}
//                 disabled={loading || !localStorage.getItem("memberToken")}
//               >
//                 {loading ? "Uploading..." : "Submit"}
//               </button>
//             </div>
//           )}

//           {isFileUploaded && isApproved && (
//             <div className={styles.container2}>
//               <div className={styles.step1}>
//                 <div className={styles.payment}>
//                   Step #1 - Scan QR Code & Make Payment
//                 </div>
//                 <div className={styles.name}>
//                   Account Name :{" "}
//                   <span className={styles.info}>
//                     Akhil Bhartiya Bhargava Sabha
//                   </span>
//                 </div>
//                 <div className={styles.number}>
//                   SB Account No:{" "}
//                   <span className={styles.info}>90442010053572</span>
//                 </div>
//                 <div className={styles.location}>
//                   Bank & Branch :{" "}
//                   <span className={styles.info}>
//                     CANARA BANK, Nehru Place, New Delhi
//                   </span>
//                 </div>
//                 <div className={styles.ifsc}>
//                   IFSC: <span className={styles.info}>CNRB0000390</span>
//                 </div>
//                 <div className={styles.micr}>
//                   MICR Code: <span className={styles.info}>110015016</span>
//                 </div>
//                 <div className={styles.amountBox}>
//                   <div className={styles.planing}>
//                     आपके द्वारा चुनी गई सदस्यता:
//                   </div>
//                   <div className={styles.plan}>{plan}</div>
//                 </div>
//                 <img src={qr} alt="QR Code" className={styles.qr} />
//               </div>

//               <div className={styles.step2}>
//                 <div className={styles.submit}>
//                   Step #2 - Submit The Details
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className={styles.inputBox}>
//                     <label className={styles.label}>Name *</label>
//                     <input
//                       className={styles.input}
//                       type="text"
//                       name="name"
//                       value={paymentdata.name}
//                       onChange={handleChange}
//                     />
//                     {errors.name && (
//                       <p className={styles.error1}>{errors.name}</p>
//                     )}
//                   </div>

//                   <div className={styles.inputBox}>
//                     <label className={styles.label}>Email *</label>
//                     <input
//                       className={styles.input}
//                       type="text"
//                       name="email"
//                       value={paymentdata.email}
//                       onChange={handleChange}
//                     />
//                     {errors.email && (
//                       <p className={styles.error1}>{errors.email}</p>
//                     )}
//                   </div>

//                   <div className={styles.inputBox}>
//                     <label className={styles.label}>Mobile *</label>
//                     <input
//                       className={styles.input}
//                       type="text"
//                       name="mobile"
//                       value={paymentdata.mobile}
//                       onChange={handleChange}
//                     />
//                     {errors.mobile && (
//                       <p className={styles.error1}>{errors.mobile}</p>
//                     )}
//                   </div>

//                   <div className={styles.inputBox}>
//                     <label className={styles.label}>Transaction ID *</label>
//                     <input
//                       className={styles.input}
//                       type="text"
//                       name="transactionId"
//                       value={paymentdata.transactionId}
//                       onChange={handleChange}
//                     />
//                     {errors.transactionId && (
//                       <p className={styles.error1}>{errors.transactionId}</p>
//                     )}
//                   </div>

//                   <div className={styles.btns}>
//                     <button className={styles.btn} type="submit">
//                       SUBMIT
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {isFileUploaded && !isApproved && (
//             <div className={styles.waitingApproval}>
//               <h3 className={styles.approvalHeading}>
//                 Form Submitted Successfully
//               </h3>
//               <p className={styles.approvalMessage}>
//                 Admin approval is pending. Please wait before proceeding with
//                 the payment. <br />
//                 An email will be sent to you once your form is approved.
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       <ToastContainer />
//     </>
//   );
// };

// export default SignFormUpload;


// import React, { useState } from "react";
// import styles from "./SignFormUpload.module.css";
// import axios from "axios";
// import { loginMember } from "../apis/member";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignFormUpload = () => {
//   const navigate = useNavigate();

//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [isFileUploaded, setIsFileUploaded] = useState(false);

//   const [showLoginModal, setShowLoginModal] = useState(
//     !localStorage.getItem("memberToken")
//   );

//   const [loginData, setLoginData] = useState({
//     username: "",
//     membership: "",
//   });

//   const [memberId, setMemberId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChooseFile = () => {
//     if (!localStorage.getItem("memberToken")) {
//       toast.error("Please login first to upload form");
//       setShowLoginModal(true);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (!loginData.username || !loginData.membership) {
//       toast.error("Please fill in both username and membership");
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await loginMember(loginData);
//       if (result.success) {
//         localStorage.setItem("memberToken", result.data.token);
//         setMemberId(result.data.memberId);
//         toast.success("Login successful!");
//         setShowLoginModal(false);
//       } else {
//         toast.error("Login failed: " + result.error);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Login error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please choose a file to upload");
//       return;
//     }

//     if (!localStorage.getItem("memberToken") || !memberId) {
//       toast.error("Please login before uploading");
//       setShowLoginModal(true);
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "matrimonial");

//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/djsz5vqib/image/upload",
//         formData
//       );

//       const fileUrl = response.data.secure_url;

//       await axios.post(
//         "https://vivah-8mtx.onrender.com/api/member/upload-signedform",
//         {
//           memberId,
//           signedForm: fileUrl,
//         }
//       );

//       setIsFileUploaded(true);
//       toast.success("File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleGoToHome = () => {
//     navigate("/");
//   };

//   return (
//     <>
//       <ToastContainer />

//       {showLoginModal && (
//         <div className={styles.modalBackdrop}>
//           <div className={styles.modalContent}>
//             <h2>Login</h2>
//             <form onSubmit={handleLoginSubmit}>
//               <div>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                   id="username"
//                   type="text"
//                   value={loginData.username}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, username: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label htmlFor="membership">Membership:</label>
//                 <input
//                   id="membership"
//                   type="text"
//                   value={loginData.membership}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, membership: e.target.value })
//                   }
//                 />
//               </div>
//               <button type="submit" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {!showLoginModal && (
//         <div className={styles.container}>
//           {!isFileUploaded ? (
//             <>
//               <h2>Upload Signed Form</h2>
//               <div>
//                 <input
//                   type="file"
//                   onClick={handleChooseFile}
//                   onChange={handleFileChange}
//                   disabled={!localStorage.getItem("memberToken")}
//                 />
//                 <button
//                   onClick={handleUpload}
//                   disabled={uploading || !localStorage.getItem("memberToken")}
//                   className={styles.button}
//                 >
//                   {uploading ? "Uploading..." : "Submit"}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div>
//               <h3>File uploaded successfully!</h3>
//               <button onClick={handleGoToHome}>Go to Home</button>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default SignFormUpload;




import React, { useState } from "react";
import { loginMember, uploadMemberForm } from "../apis/member";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const SignFormUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(
    !localStorage.getItem("memberToken")
  );

  const [loginData, setLoginData] = useState({
    username: "",
    membership: "",
  });

  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.membership) {
      toast.error("Please fill in both username and membership");
      return;
    }

    setLoading(true);
    try {
      const result = await loginMember(loginData);
      if (result.success) {
        localStorage.setItem("memberToken", result.data.token);
        setMemberId(result.data.memberId);
        toast.success("Login successful!");
        setShowLoginModal(false);
      } else {
        toast.error("Login failed: " + result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file to upload");
      return;
    }

    if (!localStorage.getItem("memberToken") || !memberId) {
      toast.error("Please login before uploading");
      setShowLoginModal(true);
      return;
    }

    setUploading(true);
    try {
      await uploadMemberForm(memberId, file);
      setIsFileUploaded(true);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />

      <Modal show={showLoginModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="membership">
  <Form.Label>Membership</Form.Label>
  <Form.Select
    value={loginData.membership}
    onChange={(e) =>
      setLoginData({ ...loginData, membership: e.target.value })
    }
  >
    <option value="">Select membership</option>
    <option value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये">
      साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये
    </option>
    <option value="आजीवन सभासद - एकल - 600 रुपये">
      आजीवन सभासद - एकल - 600 रुपये
    </option>
    <option value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये">
      आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये
    </option>
    <option value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये">
      डुप्लिकेट परिचय शुल्क - ₹50 रुपये
    </option>
  </Form.Select>
</Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {!showLoginModal && (
        <Container className="py-5">
          {!isFileUploaded ? (
            <>
              <h3 className="mb-4 text-center">Upload Signed Form</h3>
              <Row className="justify-content-center">
                <Col md={6}>
                  <PhotoUpload file={file} setFile={setFile} />
                  <Button
                    variant="success"
                    className="mt-3 w-100"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Uploading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <Alert variant="success" className="text-center">
                  File uploaded successfully!
                </Alert>
                <p>
                                Admin approval is pending. Please wait before proceeding with
                                the payment. <br />
                                An email will be sent to you once your form is approved.
                              </p>
                <div className="text-center">
                  <Button onClick={handleGoToHome} variant="primary">
                    Go to Home
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default SignFormUpload;
