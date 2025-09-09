import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card ,Modal} from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FindYourMatch = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotErrors, setForgotErrors] = useState({});
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm({ ...forgotForm, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const validateForgotForm = () => {
    const errors = {};
    if (!forgotForm.email || !/\S+@\S+\.\S+/.test(forgotForm.email)) {
      errors.email = "Valid email is required";
    }
    if (!forgotForm.newPassword) {
      errors.newPassword = "New password is required";
    }
    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleResetPassword = async () => {
    const errors = validateForgotForm();
    if (Object.keys(errors).length > 0) {
      setForgotErrors(errors);
      return;
    }

    setIsResetting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/reset-password`,
        {
          email: forgotForm.email,
          newPassword: forgotForm.newPassword,
        }
      );

      if (res.status === 200) {
        toast.success("Password reset successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setShowForgotModal(false);
        setForgotForm({ email: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error("Reset failed. Email not found?", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Server error. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const result = await loginUser(userData);
      if (result.status === 200) {
        const statusUrl = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/form/status/${encodeURIComponent(userData.email)}`;
        const statusRes = await axios.get(statusUrl);

        if (statusRes.data.status === "approved") {
          localStorage.setItem("isLoggedIn", "true");
         localStorage.setItem("userEmail", userData.email); 
          toast.success(result.data.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/user-dashboard");
          }, 3000);
        } else {
          toast.info(
            "Please wait 1–7 days for admin approval before accessing this feature.",
            {
              position: "top-center",
              autoClose: 4000,
              theme: "light",
            }
          );
        }
      } else {
        toast.error("Invalid Credentials", {
          position: "top-center",
          autoClose: 4000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Login or status check failed:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-center",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <Row>
          <Col>
            <Card
              style={{
                maxWidth: "400px",
                padding: "2.5rem 2rem",
                borderRadius: "12px",
                margin: "auto",
                minHeight: "345px"
              }}
            >
              <Card.Body>
                <h2
                  className="text-center mb-4"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Find Your Perfect Match
                </h2>
                <Form onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={userData.email}
                      onChange={handleFormChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={handleFormChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#0077cc",
                      border: "none",
                      width: "100%",
                      padding: "12px",
                      fontSize: "1.1rem",
                      borderRadius: "8px",
                    }}
                  >
                    Login
                  </Button>
                  <Form.Text className="text-muted text-end d-block mb-3">
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#0077cc",
                        textDecoration: "underline",
                      }}
                      onClick={() => setShowForgotModal(true)}
                    >
                      Forgot Password?
                    </span>
                  </Form.Text>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />

      <Modal
  show={showForgotModal}
  onHide={() => setShowForgotModal(false)}
  centered
  backdrop="static"
>
  <Modal.Header closeButton style={{ borderBottom: "none" }}>
    <Modal.Title className="w-100 text-center" style={{ fontWeight: "600", color: "#0077cc" }}>
      🔒 Reset Your Password
    </Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ padding: "2rem 2.5rem" }}>
    <Form>
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your registered email"
          value={forgotForm.email}
          onChange={handleForgotChange}
          isInvalid={!!forgotErrors.email}
        />
        <Form.Control.Feedback type="invalid">
          {forgotErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "500" }}>New Password</Form.Label>
        <Form.Control
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={forgotForm.newPassword}
          onChange={handleForgotChange}
          isInvalid={!!forgotErrors.newPassword}
        />
        <Form.Control.Feedback type="invalid">
          {forgotErrors.newPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "500" }}>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Re-enter new password"
          value={forgotForm.confirmPassword}
          onChange={handleForgotChange}
          isInvalid={!!forgotErrors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {forgotErrors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer style={{ borderTop: "none", justifyContent: "space-between", padding: "1.5rem 2.5rem" }}>
    <Button
      variant="outline-secondary"
      onClick={() => setShowForgotModal(false)}
      style={{
        borderRadius: "8px",
        padding: "10px 20px",
        fontWeight: "500",
      }}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onClick={handleResetPassword}
      disabled={isResetting}
      style={{
        backgroundColor: "#0077cc",
        border: "none",
        borderRadius: "8px",
        padding: "10px 24px",
        fontWeight: "500",
      }}
    >
      {isResetting ? "Resetting..." : "Reset Password"}
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default FindYourMatch;
