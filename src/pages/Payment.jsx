import styles from "./Payment.module.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { savePayment } from "../apis/payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qr from "../assets/qrcode.jpg";
import Navbar from "../components/Navbar/Navbar";
import FileUpload from "../components/FileUpload/FileUpload";
import { updatePaymentForm } from "../apis/payment";

const Payment = () => {
  const location = useLocation();
  const { membership: plan, name, email } = location.state || {};
  const navigate = useNavigate();

  const [paymentdata, setPaymentData] = useState({
    name: name || "",
    email: email || "",
    mobile: "",
    transaction: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [url, setUrl] = useState("");

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

  const handleUpload = async (e) => {
    e.preventDefault();
   try {
      const response = await updatePaymentForm(paymentId, url);

      if (response.success) {
        toast.success(
          response.data.message || "Thanks for submitting your details!",
          {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          }
        );
      }
    } catch (err) {
      toast.error("Server error occurred.", { position: "top-center" });
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
      const response = await savePayment(paymentdata);

      if (response.success) {
        toast.success(
          response.data.message || "Thanks for submitting your details!",
          {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          }
        );

        setIsFormSubmitted(true);
      
        const newPaymentId = response.data.data._id;
        console.log(response.data);
        console.log(newPaymentId);
        console.log(paymentId);
        localStorage.setItem("paymentId", newPaymentId);
        setPaymentId(newPaymentId);
        setPaymentData({ ...paymentdata, mobile: "", transaction: "" });
      } else {
        toast.error(
          "Failed to save payment: " +
            (response.error?.message || response.error),
          { position: "top-center" }
        );
      }
    } catch (err) {
      toast.error("Server error occurred.", { position: "top-center" });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {!isFormSubmitted ? (
          <>
            {/* Step 1 */}
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
                <div className={styles.plan}>{plan}</div>
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
                    readOnly
                  />
                  {errors.name && <p className={styles.error}>{errors.name}</p>}
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
                    readOnly
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
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
                    <p className={styles.error}>{errors.mobile}</p>
                  )}
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="transaction" className={styles.label}>
                    Transaction ID <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="transaction"
                    value={paymentdata.transaction}
                    onChange={handleChange}
                  />
                  {errors.transaction && (
                    <p className={styles.error}>{errors.transaction}</p>
                  )}
                </div>

                <div className={styles.btns}>
                  <button className={styles.btn} type="submit">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          // ✅ Step 3 - Upload Signed Form
          <div className={styles.step3}>
            <h2>Step #3 - Upload Your Signed Form</h2>
            <p className={styles.info}>
              Please upload the signed membership form below:
            </p>

            <div className={styles.inputBox}>
              <label htmlFor="upload" className={styles.label}>
                Upload Signed Form<span style={{ color: "red" }}>*</span>
              </label>
              <FileUpload url={url} setUrl={setUrl} />
              {errors.upload && <p className={styles.error}>{errors.upload}</p>}
              <button onClick={handleUpload}>Submit</button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Payment;
