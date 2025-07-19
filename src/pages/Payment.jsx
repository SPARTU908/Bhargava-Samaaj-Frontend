// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { uploadMemberForm } from "../apis/member";
// import { savePayment } from "../apis/payment";
// import styles from "./Payment.module.css";
// import qr from "../assets/qrcode.jpg";
// import Navbar from "../components/Navbar/Navbar";
// import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Payment = () => {
//   const [paymentdata, setPaymentData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     transactionId: "",
//   });
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
//   const location = useLocation();
//   const { membership: plan } = location.state || {};

//   const memberId = location.state?.memberId || localStorage.getItem("memberId");

//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     let newErrors = {};

//     if (!paymentdata.name) {
//       newErrors.name = "Please enter your name.";
//     }

//     if (!paymentdata.email) {
//       newErrors.email = "Please enter your email.";
//     } else if (!/\S+@\S+\.\S+/.test(paymentdata.email)) {
//       newErrors.email = "Invalid email address.";
//     }

//     if (!paymentdata.mobile) {
//       newErrors.mobile = "Please enter your mobile number.";
//     }

//     if (!paymentdata.transactionId) {
//       newErrors.transactionId = "Please enter the transaction ID.";
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData({ ...paymentdata, [name]: value });
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setErrors({ upload: "Please select a file to upload." });
//       return;
//     }
//     if (!memberId) {
//       setErrors({ uploadForm: "Member ID missing in navigation state." });
//       return;
//     }

//     setErrors({});
//     setLoading(true);

//     try {
//       const response = await uploadMemberForm(memberId, file);
//       toast.success("File uploaded successfully!", {
//         position: "top-center",
//       });
//       setIsFileUploaded(true);

//       setFile(null);
//       setErrors({});
//       console.log("Upload success:", response.data);
//     } catch (err) {
//       console.error("Upload error:", err.response?.data || err.message);
//       setErrors({ uploadForm: "Upload failed. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const validationErrors = validate();
//   //   if (Object.keys(validationErrors).length > 0) {
//   //     setErrors(validationErrors);
//   //     toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", {
//   //       position: "top-center",
//   //     });
//   //     return;
//   //   }

//   //   try {
//   //     const payload = {
//   //       memberId,
//   //       transactionId: paymentdata.transactionId,
//   //     };

//   //     console.log("Sending Payment details:", payload);

//   //     const response = await savePayment(payload);

//   //     if (response.success) {
//   //       toast.success(
//   //         response.data?.message || "Payment received successfully!",
//   //         {
//   //           position: "top-center",
//   //           autoClose: 3000,
//   //         }
//   //       );

//   //       const newPaymentId = response.data?.payment?._id;
//   //       if (newPaymentId) {
//   //         localStorage.setItem("paymentId", newPaymentId);
//   //       }

//   //       setPaymentData({
//   //         name: "",
//   //         email: "",
//   //         mobile: "",
//   //         transactionId: "",
//   //       });
//   //     } else {
//   //       toast.error("Failed to save payment. Please try again.", {
//   //         position: "top-center",
//   //       });
//   //     }
//   //   } catch (err) {
//   //     console.error("Error saving payment:", err);
//   //     toast.error("Server error occurred while saving payment.", {
//   //       position: "top-center",
//   //     });
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", {
//         position: "top-center",
//       });
//       return;
//     }

//     try {
//       // Add memberId to the payload
//       const payload = {
//         memberId, // Include memberId in the payment data
//         transactionId: paymentdata.transactionId,
//         name: paymentdata.name,
//         email: paymentdata.email,
//         mobile: paymentdata.mobile,
//       };

//       console.log("Sending Payment details:", payload);

//       const response = await savePayment(payload);

//       if (response.success) {
//         toast.success(
//           response.data?.message || "Payment received successfully!",
//           {
//             position: "top-center",
//             autoClose: 3000,
//           }
//         );

//         const newPaymentId = response.data?.payment?._id;
//         if (newPaymentId) {
//           localStorage.setItem("paymentId", newPaymentId);
//         }

//         // Clear form data after successful submission
//         setPaymentData({
//           name: "",
//           email: "",
//           mobile: "",
//           transactionId: "",
//         });
//       } else {
//         toast.error("Failed to save payment. Please try again.", {
//           position: "top-center",
//         });
//       }
//     } catch (err) {
//       console.error("Error saving payment:", err);
//       toast.error("Server error occurred while saving payment.", {
//         position: "top-center",
//       });
//     }
// };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         {!isFileUploaded && (
//           <div className={styles.card}>
//             <h2 className={styles.title}>Upload Your Signed Form</h2>
//             <p className={styles.subtitle}>
//               Please upload the signed membership form below.
//             </p>

//             <div className={styles.formGroup}>
//               <label htmlFor="upload" className={styles.label1}>
//                 Upload Signed Form <span className={styles.required}>*</span>
//               </label>

//               <PhotoUpload
//                 file={file}
//                 setFile={setFile}
//                 className={styles.uploadInput}
//               />

//               {errors.upload && <p className={styles.error}>{errors.upload}</p>}
//               {errors.uploadForm && (
//                 <p className={styles.error}>{errors.uploadForm}</p>
//               )}
//             </div>

//             <button
//               onClick={handleUpload}
//               className={styles.button}
//               disabled={loading}
//             >
//               {loading ? "Uploading..." : "Submit"}
//             </button>
//           </div>
//         )}

//         {isFileUploaded && (
//           <>
//           <div className={styles.container2}>

//             <div className={styles.step1}>
//               <div className={styles.payment}>
//                 Step #1 - Scan QR Code & Make Payment
//               </div>
//               <div className={styles.name}>
//                 Account Name :
//                 <span className={styles.info}>
//                   Akhil Bhartiya Bhargava Sabha
//                 </span>
//               </div>
//               <div className={styles.number}>
//                 SB Account No:{" "}
//                 <span className={styles.info}>90442010053572</span>
//               </div>
//               <div className={styles.location}>
//                 Bank & Branch :
//                 <span className={styles.info}>
//                   CANARA BANK, Nehru Place, New Delhi
//                 </span>
//               </div>
//               <div className={styles.ifsc}>
//                 IFSC: <span className={styles.info}>CNRB0000390</span>
//               </div>
//               <div className={styles.micr}>
//                 MICR Code: <span className={styles.info}>110015016</span>
//               </div>
//               <div className={styles.amountBox}>
//                 <div className={styles.planing}>
//                   आपके द्वारा चुनी गई सदस्यता:
//                 </div>
//                 <div className={styles.plan}>{plan}</div>{" "}
//               </div>
//               <div className={styles.qr}>
//                 <img src={qr} alt="QR Code" />
//               </div>
//             </div>
//             {/* Step 2 */}
//             <div className={styles.step2}>
//               <div className={styles.submit}>Step #2 - Submit The Details</div>
//               <form onSubmit={handleSubmit}>
//                 <div className={styles.inputBox}>
//                   <label htmlFor="name" className={styles.label}>
//                     Name <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="name"
//                     value={paymentdata.name}
//                     onChange={handleChange}
//                   />
//                   {errors.name && <p className={styles.error1}>{errors.name}</p>}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="email" className={styles.label}>
//                     Email <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="email"
//                     value={paymentdata.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <p className={styles.error1}>{errors.email}</p>
//                   )}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="mobile" className={styles.label}>
//                     Mobile <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="mobile"
//                     value={paymentdata.mobile}
//                     onChange={handleChange}
//                   />
//                   {errors.mobile && (
//                     <p className={styles.error1}>{errors.mobile}</p>
//                   )}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="transactionId" className={styles.label}>
//                     Transaction ID <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="transactionId"
//                     value={paymentdata.transactionId}
//                     onChange={handleChange}
//                   />
//                   {errors.transactionId && (
//                     <p className={styles.error1}>{errors.transactionId}</p>
//                   )}
//                 </div>

//                 <div className={styles.btns}>
//                   <button className={styles.btn} type="submit">
//                     SUBMIT
//                   </button>
//                 </div>
//               </form>
//             </div>
//              </div>
//           </>
//         )}
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default Payment;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { uploadMemberForm } from "../apis/member";
// import { savePayment } from "../apis/payment";
// import { loginMember } from "../apis/member";
// import Navbar from "../components/Navbar/Navbar";
// import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
// import styles from "./Payment.module.css";
// import qr from "../assets/qrcode.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Payment = () => {
//   const [showLoginModal, setShowLoginModal] = useState(!localStorage.getItem("memberToken"));
//   const [loginData, setLoginData] = useState({ username: "", membership: "" });

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const result = await loginMember(loginData);
//     if (result.success) {
//       toast.success("Login successful!", { position: "top-center" });
//       localStorage.setItem("memberToken", result.data.token);
//       localStorage.setItem("memberId", result.data.memberId);
//       setShowLoginModal(false);
//     } else {
//       toast.error("Login failed: " + result.error, { position: "top-center" });
//     }
//   };

//   const [paymentdata, setPaymentData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     transactionId: "",
//   });
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
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
//     else if (!/\S+@\S+\.\S+/.test(paymentdata.email)) newErrors.email = "Invalid email address.";
//     if (!paymentdata.mobile) newErrors.mobile = "Please enter your mobile number.";
//     if (!paymentdata.transactionId) newErrors.transactionId = "Please enter the transaction ID.";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentData({ ...paymentdata, [name]: value });
//   };

//   const handleUpload = async () => {
//     if (!file) return setErrors({ upload: "Please select a file to upload." });
//     if (!memberId) return setErrors({ uploadForm: "Member ID missing." });

//     setErrors({});
//     setLoading(true);
//     try {
//       const response = await uploadMemberForm(memberId, file);
//       toast.success("File uploaded successfully!", { position: "top-center" });
//       setIsFileUploaded(true);
//       setFile(null);
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
//         toast.success(response.data?.message || "Payment received successfully!", { position: "top-center", autoClose: 3000 });
//         localStorage.setItem("paymentId", response.data?.payment?._id);
//         setPaymentData({ name: "", email: "", mobile: "", transactionId: "" });
//       } else {
//         toast.error("Failed to save payment. Please try again.", { position: "top-center" });
//       }
//     } catch (err) {
//       toast.error("Server error occurred while saving payment.", { position: "top-center" });
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       {showLoginModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <button className={styles.closeBtn} onClick={() => setShowLoginModal(false)}>&times;</button>
//             <h2 className={styles.modalTitle}>Member Login</h2>
//             <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
//               <label>
//                 Username
//                 <input type="text" name="username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} required />
//               </label>
//               <label>
//                 Membership
//                 <select name="membership" value={loginData.membership} onChange={(e) => setLoginData({ ...loginData, membership: e.target.value })} required>
//                   <option value="">Select tier</option>
//                   <option value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये">साधारण (₹300)</option>
//                   <option value="आजीवन सभासद - एकल - 600 रुपये">आजीवन (₹600)</option>
//                   <option value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये">युगल (₹1000)</option>
//                   <option value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये">डुप्लिकेट (₹50)</option>
//                 </select>
//               </label>
//               <button type="submit" className={styles.loginBtn}>Login</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {!showLoginModal && (
//         <div className={styles.container}>
//           {!isFileUploaded && (
//             <div className={styles.card}>
//               <h2 className={styles.title}>Upload Your Signed Form</h2>
//               <PhotoUpload file={file} setFile={setFile} />
//               {errors.upload && <p className={styles.error}>{errors.upload}</p>}
//               {errors.uploadForm && <p className={styles.error}>{errors.uploadForm}</p>}
//               <button onClick={handleUpload} className={styles.button} disabled={loading}>
//                 {loading ? "Uploading..." : "Submit"}
//               </button>
//             </div>
//           )}

//           {isFileUploaded && (
//             <div className={styles.container2}>
//               <div className={styles.step1}>
//                 <div className={styles.payment}>Step #1 - Scan QR Code & Make Payment</div>
//                 <div className={styles.plan}>{plan}</div>
//                 <img src={qr} alt="QR Code" className={styles.qr} />
//               </div>
//               <div className={styles.step2}>
//                 <form onSubmit={handleSubmit}>
//                   <input type="text" name="name" value={paymentdata.name} onChange={handleChange} placeholder="Name" />
//                   <input type="text" name="email" value={paymentdata.email} onChange={handleChange} placeholder="Email" />
//                   <input type="text" name="mobile" value={paymentdata.mobile} onChange={handleChange} placeholder="Mobile" />
//                   <input type="text" name="transactionId" value={paymentdata.transactionId} onChange={handleChange} placeholder="Transaction ID" />
//                   <button className={styles.btn} type="submit">SUBMIT</button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <ToastContainer />
//     </>
//   );
// };

// export default Payment;

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { uploadMemberForm } from "../apis/member";
// import { savePayment } from "../apis/payment";
// import { loginMember } from "../apis/member";
// import Navbar from "../components/Navbar/Navbar";
// import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
// import styles from "./Payment.module.css";
// import qr from "../assets/qrcode.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getMemberStatus } from "../apis/member";

// const Payment = () => {
//   const [showLoginModal, setShowLoginModal] = useState(
//     !localStorage.getItem("memberToken")
//   );
//   const [loginData, setLoginData] = useState({ username: "", membership: "" });

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const result = await loginMember(loginData);
//     if (result.success) {
//       toast.success("Login successful!", { position: "top-center" });
//       localStorage.setItem("memberToken", result.data.token);
//       localStorage.setItem("memberId", result.data.memberId);
//       setShowLoginModal(false); // Close login modal
//     } else {
//       toast.error("Login failed: " + result.error, { position: "top-center" });
//     }
//   };

//   const [paymentdata, setPaymentData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     transactionId: "",
//   });
//   const [isFileUploaded, setIsFileUploaded] = useState(false);
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
//   const memberId = localStorage.getItem("memberId");
//   if (!memberId) return;

//   const status = await getMemberStatus(memberId);
//   if (status.success) {
//     setIsApproved(status.approved);
//   } else {
//     toast.error("Unable to verify approval status.", { position: "top-center" });
//   }
// };

//   const handleUpload = async () => {
//     if (!file) return setErrors({ upload: "Please select a file to upload." });
//     if (!memberId) {
//       toast.error("Please log in first to upload the form.", {
//         position: "top-center",
//       });
//       setShowLoginModal(true); // Show login modal
//       return;
//     }

//     setErrors({});
//     setLoading(true);
//     try {
//       const response = await uploadMemberForm(memberId, file);
//       toast.success("File uploaded successfully!", { position: "top-center" });
//       setIsFileUploaded(true);
//       setFile(null);
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
//       setShowLoginModal(true); // Open the login modal
//     }
//   };

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
//                 disabled={!localStorage.getItem("memberToken")} // Disable file upload if not logged in
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

//           {isFileUploaded && (
//             <div className={styles.container2}>
//               <div className={styles.step1}>
//                 <div className={styles.payment}>
//                   Step #1 - Scan QR Code & Make Payment
//                 </div>
//                 <div className={styles.name}>
//                   Account Name : {" "}
//                   <span className={styles.info}>
//                     Akhil Bhartiya Bhargava Sabha {" "}
//                   </span>
//                   {" "}
//                 </div>
//                 {" "}
//                 <div className={styles.number}>
//                   SB Account No: {" "}
//                   <span className={styles.info}>90442010053572</span>
//                   {" "}
//                 </div>
//                 {" "}
//                 <div className={styles.location}>
//                   Bank & Branch : //{" "}
//                   <span className={styles.info}>
//                     CANARA BANK, Nehru Place, New Delhi {" "}
//                   </span>
//                   {" "}
//                 </div>
//                 {" "}
//                 <div className={styles.ifsc}>
//                   IFSC: <span className={styles.info}>CNRB0000390</span>
//                   {" "}
//                 </div>
//                 {" "}
//                 <div className={styles.micr}>
//                   MICR Code: <span className={styles.info}>110015016</span>
//                   {" "}
//                 </div>
//                 {" "}
//                 <div className={styles.amountBox}>
//                   {" "}
//                   <div className={styles.planing}>
//                     आपके द्वारा चुनी गई सदस्यता: {" "}
//                   </div>
//                   <div className={styles.plan}>{plan}</div> {" "}
//                 </div>

//                 <img src={qr} alt="QR Code" className={styles.qr} />
//               </div>
//               <div className={styles.step2}>
//                  <div className={styles.submit}>Step #2 - Submit The Details</div>
//                 <form onSubmit={handleSubmit}>
//                  <div className={styles.inputBox}>
//                    <label htmlFor="name" className={styles.label}>
//                      Name <span style={{ color: "red" }}>*</span>
//                    </label>
//                  <input
//                     className={styles.input}
//                     type="text"
//                     name="name"
//                     value={paymentdata.name}
//                     onChange={handleChange}
//                   />
//                   {errors.name && <p className={styles.error1}>{errors.name}</p>}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="email" className={styles.label}>
//                     Email <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="email"
//                     value={paymentdata.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <p className={styles.error1}>{errors.email}</p>
//                   )}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="mobile" className={styles.label}>
//                     Mobile <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="mobile"
//                     value={paymentdata.mobile}
//                     onChange={handleChange}
//                   />
//                   {errors.mobile && (
//                     <p className={styles.error1}>{errors.mobile}</p>
//                   )}
//                 </div>

//                 <div className={styles.inputBox}>
//                   <label htmlFor="transactionId" className={styles.label}>
//                     Transaction ID <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     name="transactionId"
//                     value={paymentdata.transactionId}
//                     onChange={handleChange}
//                   />
//                   {errors.transactionId && (
//                     <p className={styles.error1}>{errors.transactionId}</p>
//                   )}
//                 </div>

//                 <div className={styles.btns}>
//                   <button className={styles.btn} type="submit">
//                     SUBMIT
//                   </button>
//                 </div>
//               </form>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <ToastContainer />
//     </>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { uploadMemberForm, loginMember, getMemberStatus } from "../apis/member";
import { savePayment } from "../apis/payment";
import Navbar from "../components/Navbar/Navbar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import styles from "./Payment.module.css";
import qr from "../assets/qrcode.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [showLoginModal, setShowLoginModal] = useState(
    !localStorage.getItem("memberToken")
  );
  const [loginData, setLoginData] = useState({ username: "", membership: "" });

  const [paymentdata, setPaymentData] = useState({
    name: "",
    email: "",
    mobile: "",
    transactionId: "",
  });

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { membership: plan } = location.state || {};
  const memberId = localStorage.getItem("memberId");

  const validate = () => {
    let newErrors = {};
    if (!paymentdata.name) newErrors.name = "Please enter your name.";
    if (!paymentdata.email) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(paymentdata.email))
      newErrors.email = "Invalid email address.";
    if (!paymentdata.mobile)
      newErrors.mobile = "Please enter your mobile number.";
    if (!paymentdata.transactionId)
      newErrors.transactionId = "Please enter the transaction ID.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentdata, [name]: value });
  };

  const checkApprovalStatus = async () => {
    const memberId = localStorage.getItem("memberId");
    if (!memberId) return;

    const status = await getMemberStatus(memberId);
    if (status.success) {
      setIsApproved(status.approved);
    } else {
      toast.error("Unable to verify approval status.", {
        position: "top-center",
      });
    }
  };

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   const result = await loginMember(loginData);
  //   if (result.success) {
  //     toast.success("Login successful!", { position: "top-center" });
  //     localStorage.setItem("memberToken", result.data.token);
  //     localStorage.setItem("memberId", result.data.memberId);
  //     setShowLoginModal(false);
  //     await checkApprovalStatus();
  //   } else {
  //     toast.error("Login failed: " + result.error, { position: "top-center" });
  //   }
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await loginMember(loginData);

    if (result.success) {
      toast.success("Login successful!", { position: "top-center" });

      localStorage.setItem("memberToken", result.data.token);
      localStorage.setItem("memberId", result.data.memberId);
      setShowLoginModal(false);

      // ✅ Use these values directly without calling getMemberStatus()
      if (result.data.uploadForm) {
        setIsFileUploaded(true);
      }
      if (result.data.isFormApproved) {
        setIsApproved(true);
      }
    } else {
      toast.error("Login failed: " + result.error, { position: "top-center" });
    }
  };

  const handleUpload = async () => {
    if (!file) return setErrors({ upload: "Please select a file to upload." });
    if (!memberId) {
      toast.error("Please log in first to upload the form.", {
        position: "top-center",
      });
      setShowLoginModal(true);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await uploadMemberForm(memberId, file);
      toast.success("File uploaded successfully!", { position: "top-center" });
      setIsFileUploaded(true);
      setFile(null);
      await checkApprovalStatus(); // 🔄 check approval right after upload
    } catch (err) {
      setErrors({ uploadForm: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", { position: "top-center" });
      return;
    }

    try {
      const payload = {
        memberId,
        transactionId: paymentdata.transactionId,
        name: paymentdata.name,
        email: paymentdata.email,
        mobile: paymentdata.mobile,
      };
      const response = await savePayment(payload);
      if (response.success) {
        toast.success(
          response.data?.message || "Payment received successfully!",
          { position: "top-center", autoClose: 3000 }
        );
        localStorage.setItem("paymentId", response.data?.payment?._id);
        setPaymentData({ name: "", email: "", mobile: "", transactionId: "" });
      } else {
        toast.error("Failed to save payment. Please try again.", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Server error occurred while saving payment.", {
        position: "top-center",
      });
    }
  };

  const handleChooseFile = () => {
    if (!memberId) {
      toast.error("Please log in first to choose a file.", {
        position: "top-center",
      });
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("memberToken")) {
      checkApprovalStatus();
    }
  }, []);

  return (
    <>
      <Navbar />

      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowLoginModal(false)}
            >
              &times;
            </button>
            <h2 className={styles.modalTitle}>Member Login</h2>
            <form onSubmit={handleLoginSubmit} className={styles.loginForm}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Membership
                <select
                  name="membership"
                  value={loginData.membership}
                  onChange={(e) =>
                    setLoginData({ ...loginData, membership: e.target.value })
                  }
                  required
                >
                  <option value="">Select tier</option>
                  <option value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये">
                    साधारण (₹300)
                  </option>
                  <option value="आजीवन सभासद - एकल - 600 रुपये">
                    आजीवन (₹600)
                  </option>
                  <option value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये">
                    युगल (₹1000)
                  </option>
                  <option value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये">
                    डुप्लिकेट (₹50)
                  </option>
                </select>
              </label>
              <button type="submit" className={styles.loginBtn}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {!showLoginModal && (
        <div className={styles.container}>
          {!isFileUploaded && (
            <div className={styles.card}>
              <h2 className={styles.title}>Upload Your Signed Form</h2>
              <PhotoUpload
                file={file}
                setFile={setFile}
                onChooseFile={handleChooseFile}
                disabled={!localStorage.getItem("memberToken")}
              />
              {errors.upload && <p className={styles.error}>{errors.upload}</p>}
              {errors.uploadForm && (
                <p className={styles.error}>{errors.uploadForm}</p>
              )}
              <button
                onClick={handleUpload}
                className={styles.button}
                disabled={loading || !localStorage.getItem("memberToken")}
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </div>
          )}

          {isFileUploaded && isApproved && (
            <div className={styles.container2}>
              <div className={styles.step1}>
                <div className={styles.payment}>
                  Step #1 - Scan QR Code & Make Payment
                </div>
                <div className={styles.name}>
                  Account Name :{" "}
                  <span className={styles.info}>
                    Akhil Bhartiya Bhargava Sabha
                  </span>
                </div>
                <div className={styles.number}>
                  SB Account No:{" "}
                  <span className={styles.info}>90442010053572</span>
                </div>
                <div className={styles.location}>
                  Bank & Branch :{" "}
                  <span className={styles.info}>
                    CANARA BANK, Nehru Place, New Delhi
                  </span>
                </div>
                <div className={styles.ifsc}>
                  IFSC: <span className={styles.info}>CNRB0000390</span>
                </div>
                <div className={styles.micr}>
                  MICR Code: <span className={styles.info}>110015016</span>
                </div>
                <div className={styles.amountBox}>
                  <div className={styles.planing}>
                    आपके द्वारा चुनी गई सदस्यता:
                  </div>
                  <div className={styles.plan}>{plan}</div>
                </div>
                <img src={qr} alt="QR Code" className={styles.qr} />
              </div>

              <div className={styles.step2}>
                <div className={styles.submit}>
                  Step #2 - Submit The Details
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputBox}>
                    <label className={styles.label}>Name *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="name"
                      value={paymentdata.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className={styles.error1}>{errors.name}</p>
                    )}
                  </div>

                  <div className={styles.inputBox}>
                    <label className={styles.label}>Email *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="email"
                      value={paymentdata.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className={styles.error1}>{errors.email}</p>
                    )}
                  </div>

                  <div className={styles.inputBox}>
                    <label className={styles.label}>Mobile *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="mobile"
                      value={paymentdata.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && (
                      <p className={styles.error1}>{errors.mobile}</p>
                    )}
                  </div>

                  <div className={styles.inputBox}>
                    <label className={styles.label}>Transaction ID *</label>
                    <input
                      className={styles.input}
                      type="text"
                      name="transactionId"
                      value={paymentdata.transactionId}
                      onChange={handleChange}
                    />
                    {errors.transactionId && (
                      <p className={styles.error1}>{errors.transactionId}</p>
                    )}
                  </div>

                  <div className={styles.btns}>
                    <button className={styles.btn} type="submit">
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isFileUploaded && !isApproved && (
            <div className={styles.waitingApproval}>
              <h3 className={styles.approvalHeading}>
                Form Submitted Successfully
              </h3>
              <p className={styles.approvalMessage}>
                Admin approval is pending. Please wait before proceeding with
                the payment. <br />
                An email will be sent to you once your form is approved.
              </p>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Payment;
