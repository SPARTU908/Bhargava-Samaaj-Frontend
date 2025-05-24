import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Payment.module.css";
import { FaGooglePay } from "react-icons/fa";
import {useState} from "react";

const Payment = () => {
  const[paymentdata,setPaymentData] = useState({
    name:"",
    email:"",
    mobile:"",
    transactionid:""
  });
   const validate = () => {
    let newErrors = {};
   const requiredFields = [
    "name",
    "email",
    "mobile",
    "transactionid"
     
    ];
     requiredFields.forEach((field) => {
      if (!paymentdata[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (paymentdata.email && !/\S+@\S+\.\S+/.test(paymentdata.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };
  const handleChange = (e) => {
      const { name, value } = e.target;
      setPaymentData({ ...paymentdata, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
   
      const validationErrors = validate();
      console.log(validationErrors);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
  
        
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
          <div className={styles.qr}>QR</div>
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
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="transactionid" className={styles.label}>
              Transaction id: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="transactionid"
              id="transactionid"
              value={paymentdata.transactionid}
              onChange={handleChange}
            />
          </div>
          <div><button className={styles.btn}> SUBMIT</button></div>
        </div>
      </div>
    </>
  );
};

export default Payment;
