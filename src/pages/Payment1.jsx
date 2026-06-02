import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { savePayment } from "../apis/payment";
import styles from "./Payment.module.css";
import qr from "../assets/qrcode.jpg";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment1 = () => {
  const location = useLocation();

  const { membership: plan, email, name, mobile } = location.state || {};
  const memberId = location.state?.memberId ;
 
  const [paymentdata, setPaymentData] = useState({
    name: name || "",
    email: email || "",
    mobile: mobile || "",
    transactionId: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!paymentdata.name) newErrors.name = "Please enter your name.";
    if (!paymentdata.email) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(paymentdata.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!paymentdata.mobile) newErrors.mobile = "Please enter your mobile number.";
    else if (!/^[6-9]\d{9}$/.test(paymentdata.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number.";
    }
    if (!paymentdata.transactionId) newErrors.transactionId = "Please enter the transaction ID.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentdata, [name]: value });
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
      console.log(memberId, paymentdata);
      const payload = {
        memberId,
        transactionId: paymentdata.transactionId,
        name: paymentdata.name,
        email: paymentdata.email,
        mobile: paymentdata.mobile,
      };

      const response = await savePayment(payload);

      if (response.success) {
        toast.success(response.data?.message || "Payment received successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        const newPaymentId = response.data?.payment?._id;
        if (newPaymentId) {
          localStorage.setItem("paymentId", newPaymentId);
        }

        setPaymentData({ name: "", email: "", mobile: "", transactionId: "" });
      } else {
        toast.error("Failed to save payment. Please try again.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      toast.error("Server error occurred while saving payment.", { position: "top-center" });
    }
  };

  return (
    <>
    
      <Navbar />
      <div className={styles.container2}>
        <div className={styles.step1}>
          <div className={styles.payment}>Step #1 - Scan QR Code & Make Payment</div>
          <div className={styles.name}>
            Account Name: <span className={styles.info}>Akhil Bhartiya Bhargava Sabha</span>
          </div>
          <div className={styles.number}>
            SB Account No: <span className={styles.info}>90442010053572</span>
          </div>
          <div className={styles.location}>
            Bank & Branch: <span className={styles.info}>CANARA BANK, Nehru Place, New Delhi</span>
          </div>
          <div className={styles.ifsc}>
            IFSC: <span className={styles.info}>CNRB0000390</span>
          </div>
          <div className={styles.micr}>
            MICR Code: <span className={styles.info}>110015016</span>
          </div>
          <div className={styles.qr}>
            <img src={qr} alt="QR Code" />
          </div>
        </div>

        {/* Step 2 - Payment Details Form */}
        <div className={styles.step2}>
          <div className={styles.submit}>Step #2 - Submit The Details</div>
          <form onSubmit={handleSubmit}>
            {["name", "email", "mobile", "transactionId"].map((field) => (
              <div key={field} className={styles.inputBox}>
                <label className={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className={styles.input}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={paymentdata[field]}
                  onChange={handleChange}
                  // Disable editing of email if you want to lock it
                  disabled={field === "email" && email}
                />
                {errors[field] && <p className={styles.error1}>{errors[field]}</p>}
              </div>
            ))}

            <div className={styles.btns}>
              <button className={styles.btn} type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Payment1;
