import React, { useState } from "react";
import { useLocation, useNavigate,} from "react-router-dom";
import { submitDuplicatePayment,} from "../apis/duplicateMembership";

import qrImage from "../assets/qrcode.jpg";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./DuplicatePayment.css";


const DuplicatePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    applicationId,
    totalMembers,
    feePerMember,
    totalAmount,
  } = location.state || {};

  const [transactionId, setTransactionId] =
    useState("");

  const [screenshot, setScreenshot] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  if (!applicationId) {
    return (
      <>
        <Navbar />


    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />

        <div className="duplicate-payment-page">
          <div className="invalid-payment-card">

            <div className="invalid-payment-icon">
              !
            </div>

            <h2>
              Invalid Application
            </h2>

            <p>
              Payment details are not available.
              Please submit the duplicate card
              application again.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/duplicate-membership"
                )
              }
            >
              Back to Application
            </button>

          </div>
        </div>
      </>
    );
  }


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !transactionId.trim() ||
  //     !screenshot
  //   ) {
  //     alert(
  //       "Transaction ID और payment screenshot आवश्यक है।"
  //     );

  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData =
  //       new FormData();

  //     formData.append(
  //       "transactionId",
  //       transactionId.trim()
  //     );

  //     formData.append(
  //       "paymentScreenshot",
  //       screenshot
  //     );

  //     await submitDuplicatePayment(
  //       applicationId,
  //       formData
  //     );

  //     alert(
  //       "Payment submitted successfully."
  //     );

  //     navigate("/");

  //   } catch (error) {
  //     console.error(
  //       "Payment Submit Error:",
  //       error
  //     );

  //     alert(
  //       error?.message ||
  //         "Payment submit नहीं हो पाया।"
  //     );

  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!transactionId.trim() || !screenshot) {
    toast.error(
      "Transaction ID और payment screenshot आवश्यक है।",
      {
        position: "top-center",
        autoClose: 3000,
      }
    );

    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "transactionId",
      transactionId.trim()
    );

    formData.append(
      "paymentScreenshot",
      screenshot
    );

    const response =
      await submitDuplicatePayment(
        applicationId,
        formData
      );

    toast.success(
      response?.message ||
        "Payment submitted successfully!",
      {
        position: "top-center",
        autoClose: 2500,
      }
    );

    // Toast dikhne ke baad home page
    setTimeout(() => {
      navigate("/");
    }, 2500);

  } catch (error) {
    console.error(
      "Payment Submit Error:",
      error
    );

    toast.error(
      error?.message ||
        "Payment submit नहीं हो पाया।",
      {
        position: "top-center",
        autoClose: 3000,
      }
    );

  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />

      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />

      <main className="duplicate-payment-page">

        <div className="payment-wrapper">

          {/* HEADER */}
          <section className="payment-header">

            <div className="payment-header-badge">
              Secure Payment
            </div>

            <h1>
              Duplicate Card Payment
            </h1>

            <p>
              डुप्लिकेट परिचय-पत्र हेतु भुगतान करें
              और नीचे Transaction ID तथा payment
              screenshot जमा करें।
            </p>

          </section>


          <div className="payment-layout">

            {/* LEFT SIDE */}
            <section className="payment-left-card">

              <div className="payment-section-title">

                <div className="step-number">
                  1
                </div>

                <div>
                  <h2>
                    Scan QR & Pay
                  </h2>

                  <p>
                    नीचे दिए गए QR Code को scan करके
                    निर्धारित राशि का भुगतान करें।
                  </p>
                </div>

              </div>


              {/* PAYMENT SUMMARY */}
              <div className="payment-summary-card">

                <div className="payment-summary-row">

                  <span>
                    Total Members
                  </span>

                  <strong>
                    {totalMembers || 1}
                  </strong>

                </div>


                <div className="payment-summary-row">

                  <span>
                    Fee Per Member
                  </span>

                  <strong>
                    ₹{feePerMember || 50}
                  </strong>

                </div>


                <div className="payment-summary-row total-row">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{totalAmount || 50}
                  </strong>

                </div>

              </div>


              {/* QR */}
              <div className="qr-section">

                <div className="qr-box">

                  <img
                    src={qrImage}
                    alt="Payment QR Code"
                  />

                </div>

                <div className="qr-note">
                  Scan using any UPI app
                </div>

              </div>


              <div className="payment-instruction">

                <span className="info-circle">
                  i
                </span>

                <p>
                  भुगतान पूरा होने के बाद Transaction
                  ID / UTR नोट करें और payment
                  screenshot सुरक्षित रखें।
                </p>

              </div>

            </section>


            {/* RIGHT SIDE */}
            <section className="payment-right-card">

              <div className="payment-section-title">

                <div className="step-number">
                  2
                </div>

                <div>
                  <h2>
                    Submit Payment Details
                  </h2>

                  <p>
                    भुगतान verify करने के लिए नीचे
                    विवरण जमा करें।
                  </p>
                </div>

              </div>


              <form
                onSubmit={handleSubmit}
                className="payment-form"
              >

                {/* TRANSACTION ID */}
                <div className="payment-form-group">

                  <label>
                    Transaction ID / UTR
                    <span className="required-star">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) =>
                      setTransactionId(
                        e.target.value
                      )
                    }
                    placeholder="Enter transaction ID or UTR number"
                  />

                  <small>
                    अपने payment app में दिखाई देने
                    वाला Transaction ID / UTR दर्ज करें।
                  </small>

                </div>


                {/* FILE UPLOAD */}
                <div className="payment-form-group">

                  <label>
                    Upload Payment Screenshot
                    <span className="required-star">
                      *
                    </span>
                  </label>


                  <label className="payment-upload-box">

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setScreenshot(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                    />


                    <div className="payment-upload-icon">
                      ↑
                    </div>


                    <div className="payment-upload-content">

                      <strong>
                        {screenshot
                          ? "Screenshot Selected"
                          : "Choose Payment Screenshot"}
                      </strong>

                      <span>
                        JPG, JPEG or PNG
                      </span>

                    </div>

                  </label>


                  {screenshot && (
                    <div className="selected-payment-file">

                      <div>
                        <span>
                          ✓
                        </span>

                        <p>
                          {screenshot.name}
                        </p>
                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          setScreenshot(null)
                        }
                      >
                        Remove
                      </button>

                    </div>
                  )}

                </div>


                {/* AMOUNT CONFIRMATION */}
                <div className="payment-confirmation-box">

                  <div>
                    <span>
                      Amount Paid
                    </span>

                    <small>
                      Please pay exactly this amount
                    </small>
                  </div>

                  <strong>
                    ₹{totalAmount || 50}
                  </strong>

                </div>


                <button
                  type="submit"
                  className="payment-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Submitting Payment..."
                    : "Submit Payment"}
                </button>


                <p className="payment-security-text">
                  Your payment details will be reviewed
                  before approval.
                </p>

              </form>

            </section>

          </div>

        </div>

      </main>
    </>
  );
};


export default DuplicatePayment;