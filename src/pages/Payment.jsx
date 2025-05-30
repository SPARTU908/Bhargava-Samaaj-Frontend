import Navbar from "../components/Navbar/Navbar";
import styles from "./Payment.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { savePayment } from "../apis/payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qr from "../assets/qrcode.jpg"

const Payment = () => {
  const [paymentdata, setPaymentData] = useState({
    name: "",
    email: "",
    mobile: "",
    transaction: "",
  });
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const { membership: plan } = location.state || {};
  console.log(plan);

  // const validate = () => {
  //   let newErrors = {};
  //   const requiredFields = ["name", "email", "mobile", "transaction"];
  //   requiredFields.forEach((field) => {
  //     if (!paymentdata[field]) {
  //       newErrors[field] = `${field} is required`;
  //     }
  //   });

  //   if (paymentdata.email && !/\S+@\S+\.\S+/.test(paymentdata.email)) {
  //     newErrors.email = "Email is invalid";
  //   }

  //   return newErrors;
  // };

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

  if (!paymentdata.transaction) {
    newErrors.transaction = "Please enter the transaction ID.";
  }

  return newErrors;
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentdata, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationErrors = validate();
  //   console.log(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setErrors({});
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
       toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", {
              position: "top-center",
            });
            return;
    } else {
      setErrors({});

      // Prepare data to send to backend
      const response = await savePayment(paymentdata);

      if (response.success) {
        toast.success(
          response.data.message || "Thanks for submitting your details!",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setPaymentData({ name: "", email: "", mobile: "", transaction: "" });
      } else {
        alert(
          "Failed to save payment: " +
            (response.error?.message || response.error)
        );
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.step1}>
          <div className={styles.payment}>
            Step #1 - Scan QR Code & Make Payment
          </div>
          <div className={styles.name}>
            Account Name :
            <span className={styles.info}>Akhil Bhartiya Bhargava Sabha</span>
          </div>
          <div className={styles.number}>
            SB Account No: <span className={styles.info}>90442010053572</span>
          </div>
          <div className={styles.location}>
            {" "}
            Bank & Branch :{" "}
            <span className={styles.info}>
              CANARA BANK, Nehru Place, New Delhi,
            </span>{" "}
          </div>
          <div className={styles.ifsc}>
            {" "}
            IFSC: <span className={styles.info}>CNRB0000390</span>
          </div>
          <div className={styles.micr}>
            {" "}
            MICR Code: <span className={styles.info}>110015016</span>
          </div>
          <div className={styles.amountBox}>
            <div className={styles.planing}> आपके द्वारा चुनी गई सदस्यता:</div>{" "}
            <div className={styles.plan}>{plan}</div>
          </div>
          <div className={styles.qr}>
            <img src={qr} alt="" />
          </div>
        </div>

        <div className={styles.step2}>
          <div className={styles.submit}>Step #2 - Submit The Details </div>
          <div className={styles.inputBox}>
            <label htmlFor="name" className={styles.label}>
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="name"
              id="name"
              value={paymentdata.name}
              onChange={handleChange}
            />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="email" className={styles.label}>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="email"
              id="email"
              value={paymentdata.email}
              onChange={handleChange}
            />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="mobile" className={styles.label}>
              Mobile <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="mobile"
              id="mobile"
              value={paymentdata.mobile}
              onChange={handleChange}
            />
              {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="transaction" className={styles.label}>
              Transaction id: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="transaction"
              id="transaction"
              value={paymentdata.transaction}
              onChange={handleChange}
            />
              {errors.transaction && <p className={styles.error}>{errors.transaction}</p>}
          </div>
          <div>
            <button className={styles.btn} onClick={handleSubmit}>
              {" "}
              SUBMIT
            </button>
          </div>
        </div>
      </div>
       <ToastContainer />
    </>
  );
};

export default Payment;
