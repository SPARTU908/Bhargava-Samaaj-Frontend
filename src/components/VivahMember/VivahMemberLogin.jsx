import React, { useState } from "react";
import styles from "./VivahMemberLogin.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vivahmemberLogin } from "../../apis/vivahMember";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap"; 

const VivahMemberLogin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  // 🔄 Forgot password state
  const [showModal, setShowModal] = useState(false);
  const [forgotForm, setForgotForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotErrors, setForgotErrors] = useState({});
  const [isResetting, setIsResetting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const result = await vivahmemberLogin(userData);

    if (result.status === 200 && result.token) {
      toast.success(result.message || "Login successful", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        navigate("/biodata-user");
      }, 3000);
    } else {
      toast.error(result.error || "Invalid credentials or not approved", {
        position: "top-center",
        autoClose: 4000,
        theme: "light",
      });
    }
  };

  const handleRegisterClick = () => {
    navigate("/vivahmemberregister");
  };

  // 🔄 Forgot password form handlers
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotForm({ ...forgotForm, [name]: value });
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
  //       `${import.meta.env.VITE_BACKEND_URL}/api/v1/reset-password`,
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
  //       setShowModal(false);
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
  const errors = validateForgotForm();
  if (Object.keys(errors).length > 0) {
    setForgotErrors(errors);
    return;
  }

  setIsResetting(true);
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reset-password`,
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
      setShowModal(false);
      setForgotForm({ email: "", newPassword: "", confirmPassword: "" });
    }
  } catch (err) {
    if (err.response?.status === 404) {
      toast.error("Email not found. Please enter a valid email.", {
        position: "top-center",
      });
    } else {
      toast.error("Server error. Please try again.", {
        position: "top-center",
      });
    }
  } finally {
    setIsResetting(false);
  }
};

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputParentBox}>
                <div className={styles.inputBox}>
                  <input
                    placeholder="Email"
                    className={styles.input}
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <div className={styles.inputBox}>
                  <input
                    placeholder="Password"
                    className={styles.input}
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              <p
                onClick={() => setShowModal(true)}
                style={{
                  color: "#0077cc",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginBottom: "15px",
                  textAlign: "right",
                }}
              >
                Forgot Password?
              </p>

              <button type="submit" className={styles.login}>
                Login
              </button>

              <p className={styles.text}>Have no account yet?</p>
              <button type="button" onClick={handleRegisterClick} className={styles.register}>
                Register
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

      {/* 🔄 Forgot Password Modal */}
      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={forgotForm.email}
                onChange={handleForgotChange}
                isInvalid={!!forgotErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {forgotErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={forgotForm.newPassword}
                onChange={handleForgotChange}
                isInvalid={!!forgotErrors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {forgotErrors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
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
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleResetPassword} disabled={isResetting}>
            {isResetting ? "Resetting..." : "Reset Password"}
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  backdrop="static"
>
  <Modal.Header closeButton style={{ borderBottom: "none" }}>
    <Modal.Title className="w-100 text-center" style={{ fontWeight: "600", color: "#0077cc" }}>
      🔐 Reset Your Password
    </Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ padding: "2rem 2.5rem" }}>
    <Form>
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: "500" }}>Email Address</Form.Label>
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

  <Modal.Footer
    style={{
      borderTop: "none",
      justifyContent: "space-between",
      padding: "1.5rem 2.5rem",
    }}
  >
    <Button
      variant="outline-secondary"
      onClick={() => setShowModal(false)}
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

export default VivahMemberLogin;
