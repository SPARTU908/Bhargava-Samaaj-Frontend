import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { uploadMemberForm } from "../apis/member";
import { savePayment } from "../apis/payment";
import styles from "./Payment.module.css";
import qr from "../assets/qrcode.jpg";
import Navbar from "../components/Navbar/Navbar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [paymentdata, setPaymentData] = useState({
    name: "",
    email: "",
    mobile: "",
    transactionId: "",
  });
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const location = useLocation();
  const { membership: plan } = location.state || {};

  const memberId = location.state?.memberId || localStorage.getItem("memberId");

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!paymentdata.name) {
      newErrors.name = "Please enter your name.";
    }

    if (!paymentdata.email) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(paymentdata.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!paymentdata.mobile) {
      newErrors.mobile = "Please enter your mobile number.";
    }

    if (!paymentdata.transactionId) {
      newErrors.transactionId = "Please enter the transaction ID.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentdata, [name]: value });
  };

  const handleUpload = async () => {
    if (!file) {
      setErrors({ upload: "Please select a file to upload." });
      return;
    }
    if (!memberId) {
      setErrors({ uploadForm: "Member ID missing in navigation state." });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await uploadMemberForm(memberId, file);
      toast.success("File uploaded successfully!", {
        position: "top-center",
      });
      setIsFileUploaded(true);

      setFile(null);
      setErrors({});
      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
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
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", {
        position: "top-center",
      });
      return;
    }

    try {
      const payload = {
        memberId,
        transactionId: paymentdata.transactionId,
      };

      console.log("Sending Payment details:", payload);

      const response = await savePayment(payload);

      if (response.success) {
        toast.success(
          response.data?.message || "Payment received successfully!",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );

        const newPaymentId = response.data?.payment?._id;
        if (newPaymentId) {
          localStorage.setItem("paymentId", newPaymentId);
        }

        setPaymentData({
          name: "",
          email: "",
          mobile: "",
          transactionId: "",
        });
      } else {
        toast.error("Failed to save payment. Please try again.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      toast.error("Server error occurred while saving payment.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {!isFileUploaded && (
          <div className={styles.card}>
            <h2 className={styles.title}>Upload Your Signed Form</h2>
            <p className={styles.subtitle}>
              Please upload the signed membership form below.
            </p>

            <div className={styles.formGroup}>
              <label htmlFor="upload" className={styles.label1}>
                Upload Signed Form <span className={styles.required}>*</span>
              </label>

              <PhotoUpload
                file={file}
                setFile={setFile}
                className={styles.uploadInput}
              />

              {errors.upload && <p className={styles.error}>{errors.upload}</p>}
              {errors.uploadForm && (
                <p className={styles.error}>{errors.uploadForm}</p>
              )}
            </div>

            <button
              onClick={handleUpload}
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        )}

        {isFileUploaded && (
          <>
          <div className={styles.container2}>

         
            <div className={styles.step1}>
              <div className={styles.payment}>
                Step #1 - Scan QR Code & Make Payment
              </div>
              <div className={styles.name}>
                Account Name :
                <span className={styles.info}>
                  Akhil Bhartiya Bhargava Sabha
                </span>
              </div>
              <div className={styles.number}>
                SB Account No:{" "}
                <span className={styles.info}>90442010053572</span>
              </div>
              <div className={styles.location}>
                Bank & Branch :
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
                <div className={styles.plan}>{plan}</div>{" "}
              </div>
              <div className={styles.qr}>
                <img src={qr} alt="QR Code" />
              </div>
            </div>
            {/* Step 2 */}
            <div className={styles.step2}>
              <div className={styles.submit}>Step #2 - Submit The Details</div>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputBox}>
                  <label htmlFor="name" className={styles.label}>
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={paymentdata.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className={styles.error1}>{errors.name}</p>}
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
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
                  <label htmlFor="mobile" className={styles.label}>
                    Mobile <span style={{ color: "red" }}>*</span>
                  </label>
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
                  <label htmlFor="transactionId" className={styles.label}>
                    Transaction ID <span style={{ color: "red" }}>*</span>
                  </label>
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
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Payment;
