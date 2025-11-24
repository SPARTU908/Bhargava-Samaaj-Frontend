import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
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
    otp: "",
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

  const handleRequestOtp = async () => {
    if (!forgotForm.email || !/\S+@\S+\.\S+/.test(forgotForm.email)) {
      setForgotErrors({ email: "Valid email is required" });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/request-reset-otp`,
        { email: forgotForm.email }
      );
      toast.success("OTP sent to your email!", { position: "top-center" });
    } catch (err) {
      toast.error("Failed to send OTP. Try again.", { position: "top-center" });
    }
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

  // const handleResetPassword = async () => {
  //   const errors = validateForgotForm();
  //   if (Object.keys(errors).length > 0) {
  //     setForgotErrors(errors);
  //     return;
  //   }

  //   setIsResetting(true);
  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/reset-password`,
  //       {
  //         email: forgotForm.email,
  //         newPassword: forgotForm.newPassword,
  //       }
  //     );

  //     if (res.status === 200) {
  //       toast.success("Password reset successfully!", {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //       setShowForgotModal(false);
  //       setForgotForm({ email: "", newPassword: "", confirmPassword: "" });
  //     } else {
  //       toast.error("Reset failed. Email not found?", {
  //         position: "top-center",
  //       });
  //     }
  //   } catch (err) {
  //     toast.error("Server error. Please try again.", {
  //       position: "top-center",
  //     });
  //   } finally {
  //     setIsResetting(false);
  //   }
  // };

  const handleResetPassword = async () => {
    const errors = {};
    if (!forgotForm.email || !/\S+@\S+\.\S+/.test(forgotForm.email)) {
      errors.email = "Valid email is required";
    }
    if (!forgotForm.otp) {
      errors.otp = "OTP is required";
    }
    if (!forgotForm.newPassword) {
      errors.newPassword = "New password is required";
    }
    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length > 0) {
      setForgotErrors(errors);
      return;
    }

    setIsResetting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/verify-reset-otp`,
        {
          email: forgotForm.email,
          otp: forgotForm.otp,
          newPassword: forgotForm.newPassword,
        }
      );

      toast.success("Password reset successfully!", { position: "top-center" });
      setShowForgotModal(false);
      setForgotForm({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error("Invalid OTP or error occurred", { position: "top-center" });
    } finally {
      setIsResetting(false);
    }
  };

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setErrors({});

  //   try {
  //     const result = await loginUser(userData);
  //     if (result.status === 200) {
  //       const statusUrl = `${
  //         import.meta.env.VITE_BACKEND_URL
  //       }/api/v1/form/status/${encodeURIComponent(userData.email)}`;
  //       const statusRes = await axios.get(statusUrl);

  //       if (statusRes.data.status === "approved") {
  //         localStorage.setItem("isLoggedIn", "true");
  //         localStorage.setItem("userEmail", userData.email);
  //         toast.success(result.data.message, {
  //           position: "top-center",
  //           autoClose: 3000,
  //           theme: "light",
  //         });

  //         setTimeout(() => {
  //           navigate("/user-dashboard");
  //         }, 3000);


      
  //         }  else {
  //         toast.info(
  //           "Please wait 1–7 days for admin approval before accessing this feature.",
  //           {
  //             position: "top-center",
  //             autoClose: 4000,
  //             theme: "light",
  //           }
  //         );
  //       }
  //     } else {
  //       toast.error("Invalid Credentials Or Your Form got Rejected", {
  //         position: "top-center",
  //         autoClose: 4000,
  //         theme: "light",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Login or status check failed:", error);
  //     toast.error("Something went wrong. Please try again later.", {
  //       position: "top-center",
  //       autoClose: 4000,
  //       theme: "light",
  //     });
  //   }
  // };

// const handleLoginSubmit = async (e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   if (Object.keys(validationErrors).length > 0) {
//     setErrors(validationErrors);
//     return;
//   }

//   setErrors({});

//   try {
//     const result = await loginUser(userData);

//     if (result.status === 200) {
//       const statusUrl = `${
//         import.meta.env.VITE_BACKEND_URL
//       }/api/v1/form/status/${encodeURIComponent(userData.email)}`;

//       const statusRes = await axios.get(statusUrl);
//       const userStatus = statusRes.data.status;
//       const userId = statusRes.data._id;

//       if (userStatus === "approved") {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("userEmail", userData.email);
//          localStorage.setItem("userId", userId);
//         toast.success(result.data.message, {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "light",
//         });

//         setTimeout(() => {
//           navigate("/user-dashboard");
//         }, 3000);

//       } else if (userStatus === "rejected") {
//         toast.error("Your form got rejected.", {
//           position: "top-center",
//           autoClose: 4000,
//           theme: "light",
//         });

//       } else {
//         // For pending or any other status
//         toast.info(
//           "Please wait 1–7 days for admin approval before accessing this feature.",
//           {
//             position: "top-center",
//             autoClose: 4000,
//             theme: "light",
//           }
//         );
//       }
//     } else {
//       toast.error("Invalid Credentials Or Your Form got Rejected", {
//         position: "top-center",
//         autoClose: 4000,
//         theme: "light",
//       });
//     }
//   } catch (error) {
//     console.error("Login or status check failed:", error);
//     toast.error("Something went wrong. Please try again later.", {
//       position: "top-center",
//       autoClose: 4000,
//       theme: "light",
//     });
//   }
// };


const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const result = await loginUser(userData);

    if (result.status === 200) {
      const { status, userId, email, name } = result.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      if (status === "approved") {
        toast.success("Login successful");
        navigate("/user-dashboard");
      } 
      else if (status === "rejected") {
        toast.error("Your form was rejected.");
      } 
      else if(status == "deleted"){
        toast.error("Your form was deleted");
      }
      else {
        toast.info("Please wait 1-7 days for admin approval.");
      }
    } else {
      toast.error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Something went wrong.");
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
                minHeight: "345px",
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
          <Modal.Title
            className="w-100 text-center"
            style={{ fontWeight: "600", color: "#0077cc" }}
          >
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

            <Button
              variant="outline-primary"
              onClick={handleRequestOtp}
              style={{ marginBottom: "1rem" }}
            >
              Send OTP
            </Button>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "500" }}>OTP</Form.Label>
              <Form.Control
                type="text"
                name="otp"
                placeholder="Enter the OTP sent to your email"
                value={forgotForm.otp}
                onChange={handleForgotChange}
                isInvalid={!!forgotErrors.otp}
              />
              <Form.Control.Feedback type="invalid">
                {forgotErrors.otp}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "500" }}>
                New Password
              </Form.Label>
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
              <Form.Label style={{ fontWeight: "500" }}>
                Confirm Password
              </Form.Label>
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

        <Modal.Footer
          style={{
            borderTop: "none",
            justifyContent: "space-between",
            padding: "1.5rem 2.5rem",
          }}
        >
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
