import React, { useState } from "react";
import { Row, Col, Form, Button, Card, Alert, Image } from "react-bootstrap";
import qrImage from "../assets/qr-reg.jpg";

import { submitConferencePayment } from "../apis/conferenceRegistration";

const ConferencePayment = ({ registration, onSuccess }) => {
  const [transactionId, setTransactionId] = useState("");

  const [screenshot, setScreenshot] = useState(null);

  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  if (!registration) {
    return (
      <Card className="p-4 text-center">
        <Alert variant="warning">
          Registration details are not available. Please complete Step 1
          registration first.
        </Alert>
      </Card>
    );
  }

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid payment screenshot.");
      return;
    }

    setScreenshot(file);

    setError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!screenshot) {
      setError("Please upload payment screenshot.");
      return;
    }

    if (!transactionId.trim()) {
      setError("Please enter Transaction ID / UTR No.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await submitConferencePayment(
        registration.registrationId,
        transactionId,
        screenshot,
      );

      onSuccess(response);
    } catch (error) {
      setError(error.message || "Payment submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="p-4 shadow-sm"
      style={{
        border: "1px solid #ff8c42",
        borderRadius: "14px",
        maxWidth: "1050px",
        margin: "0 auto",
        height: "auto !important",
      }}
    >
      <div className="text-center mb-4">
        <h3
          style={{
            color: "#f4511e",
            fontWeight: "700",
            marginBottom: "5px",
          }}
        >
          Step 2 - Payment
        </h3>

        <p
          style={{
            color: "#777",
            marginBottom: 0,
            fontSize: "14px",
          }}
        >
          Scan the QR code and submit your payment details
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="align-items-stretch g-4">
        {/* LEFT SIDE */}
        <Col md={6}>
          <div
            style={{
              border: "1px solid #ffb47a",
              borderRadius: "10px",
              height: "100%",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            {/* Registration Numbers */}
            <div
              style={{
                padding: "22px",
                borderBottom: "1px solid #ffb47a",
              }}
            >
              <strong
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "18px",
                  fontSize: "16px",
                }}
              >
                Registration Numbers
              </strong>

              {registration.members?.map((member, index) => (
                <div
                  key={member.registrationNumber}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    padding: "10px 0",
                    borderBottom:
                      index !== registration.members.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "15px",
                      }}
                    >
                      {member.Member_Name}
                    </strong>

                    <small
                      style={{
                        color: "#777",
                      }}
                    >
                      {member.memberType === "Primary"
                        ? "Primary Member"
                        : member.relation || "Family Member"}
                    </small>
                  </div>

                  <strong
                    style={{
                      color: "#f4511e",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.registrationNumber}
                  </strong>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div
              style={{
                padding: "24px",
                textAlign: "center",
                backgroundColor: "#fffaf7",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "6px",
                }}
              >
                Total Amount to Pay
              </div>

              <div
                style={{
                  color: "#f4511e",
                  fontSize: "34px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                ₹{registration.amount}
              </div>

              <small style={{ color: "#666" }}>
                {registration.totalMembers} Member
                {registration.totalMembers > 1 ? "s" : ""} × ₹50
              </small>
            </div>
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={6}>
          <div
            style={{
              border: "1px solid #ffb47a",
              borderRadius: "10px",
              padding: "22px",
              height: "100%",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <strong
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "16px",
              }}
            >
              Scan & Pay
            </strong>

            <img
              src={qrImage}
              alt="Payment QR"
              style={{
                width: "370px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div
              style={{
                marginTop: "14px",
                color: "#666",
                fontSize: "13px",
              }}
            >
              Scan the QR code using any UPI app
            </div>

            <div
              style={{
                marginTop: "8px",
                fontWeight: "600",
                color: "#f4511e",
              }}
            >
              Amount: ₹{registration.amount}
            </div>
          </div>
        </Col>
      </Row>

      {/* PAYMENT FORM */}

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Upload Payment Screenshot</strong>

            <span
              style={{
                color: "red",
              }}
            >
              {" "}
              *
            </span>
          </Form.Label>

          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
          />

          <Form.Text>Upload clear screenshot of payment</Form.Text>
        </Form.Group>

        {preview && (
          <div className="mb-3">
            <Image
              src={preview}
              alt="Payment Screenshot"
              fluid
              style={{
                maxHeight: "250px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        <Form.Group className="mb-4">
          <Form.Label>
            <strong>Transaction ID / UTR No.</strong>

            <span
              style={{
                color: "red",
              }}
            >
              {" "}
              *
            </span>
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Transaction ID / UTR No."
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor: "#ff4b00",
              border: "none",
              minWidth: "180px",
              fontWeight: "600",
            }}
          >
            {submitting ? "Submitting..." : "Submit Payment"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ConferencePayment;
