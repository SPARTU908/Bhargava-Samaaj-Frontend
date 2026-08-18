import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Image,
} from "react-bootstrap";

import {
  submitConferencePayment,
} from "../apis/conferenceRegistration";

const ConferencePayment = ({
  registration,
  onSuccess,
}) => {

    
  const [transactionId, setTransactionId] =
    useState("");

  const [screenshot, setScreenshot] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [error, setError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

    if (!registration) {
  return (
    <Card className="p-4 text-center">
      <Alert variant="warning">
        Registration details are not available.
        Please complete Step 1 registration first.
      </Alert>
    </Card>
  );
}


  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please upload a valid payment screenshot."
      );
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
      setError(
        "Please upload payment screenshot."
      );
      return;
    }

    if (!transactionId.trim()) {
      setError(
        "Please enter Transaction ID / UTR No."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response =
        await submitConferencePayment(
          registration.registrationId,
          transactionId,
          screenshot
        );

      onSuccess(response);

    } catch (error) {
      setError(
        error.message ||
          "Payment submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Card
      className="p-4"
      style={{
        border: "1px solid #ff8c42",
        borderRadius: "12px",
      }}
    >

      <div className="text-center mb-4">
        <h3
          style={{
            color: "#f4511e",
            fontWeight: "700",
          }}
        >
          Step 2 - Payment
        </h3>
      </div>


      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}


      <Row>

        {/* LEFT SIDE */}
        <Col md={6}>

          <div
            style={{
              border: "1px solid #ffb47a",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >

            <div
              style={{
                padding: "18px",
                textAlign: "center",
                borderBottom:
                  "1px solid #ffb47a",
              }}
            >
             <div
  style={{
    padding: "18px",
    borderBottom: "1px solid #ffb47a",
  }}
>
  <strong
    style={{
      display: "block",
      textAlign: "center",
      marginBottom: "12px",
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
        gap: "15px",
        padding: "8px 0",
        borderBottom:
          index !== registration.members.length - 1
            ? "1px solid #eee"
            : "none",
      }}
    >
      <div>
        <strong>{member.Member_Name}</strong>

        <div
          style={{
            fontSize: "12px",
            color: "#777",
          }}
        >
          {member.memberType === "Primary"
            ? "Primary Member"
            : member.relation || "Family Member"}
        </div>
      </div>

      <strong
        style={{
          color: "#f4511e",
        }}
      >
        {member.registrationNumber}
      </strong>
    </div>
  ))}
</div>


            </div>


            <div
              style={{
                padding: "18px",
                textAlign: "center",
              }}
            >

              <strong>
                Total Amount to Pay
              </strong>

              <div
                style={{
                  color: "#f4511e",
                  fontSize: "32px",
                  fontWeight: "700",
                  marginTop: "5px",
                }}
              >
                ₹{registration.amount}
              </div>

              <small>
                (
                {registration.totalMembers}
                {" "}
                Members × ₹50
                )
              </small>

            </div>

          </div>

        </Col>


        {/* RIGHT SIDE QR */}
        <Col
          md={6}
          className="text-center mt-4 mt-md-0"
        >

          <strong>
            Scan & Pay
          </strong>

          <div className="mt-2">

            <img
              src="/assets/qr-reg.jpg"
              alt="Payment QR"
              style={{
                width: "230px",
                maxWidth: "100%",
              }}
            />

          </div>

        </Col>

      </Row>


      {/* PAYMENT FORM */}

      <Form
        onSubmit={handleSubmit}
        className="mt-4"
      >

        <Form.Group className="mb-3">

          <Form.Label>
            <strong>
              Upload Payment Screenshot
            </strong>

            <span
              style={{
                color: "red",
              }}
            >
              {" "}*
            </span>
          </Form.Label>

          <Form.Control
            type="file"
            accept="image/*"
            onChange={
              handleScreenshotChange
            }
          />

          <Form.Text>
            Upload clear screenshot of payment
          </Form.Text>

        </Form.Group>


        {preview && (
          <div className="mb-3">

            <Image
              src={preview}
              alt="Payment Screenshot"
              fluid
              style={{
                maxHeight: "250px",
                border:
                  "1px solid #ddd",
                borderRadius: "8px",
              }}
            />

          </div>
        )}


        <Form.Group className="mb-4">

          <Form.Label>
            <strong>
              Transaction ID / UTR No.
            </strong>

            <span
              style={{
                color: "red",
              }}
            >
              {" "}*
            </span>
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Transaction ID / UTR No."
            value={transactionId}
            onChange={(e) =>
              setTransactionId(
                e.target.value
              )
            }
          />

        </Form.Group>


        <div className="text-center">

          <Button
            type="submit"
            disabled={submitting}
            style={{
              backgroundColor:
                "#ff4b00",
              border:
                "none",
              minWidth:
                "180px",
              fontWeight:
                "600",
            }}
          >
            {submitting
              ? "Submitting..."
              : "Submit Payment"}
          </Button>

        </div>

      </Form>

    </Card>
  );
};

export default ConferencePayment;