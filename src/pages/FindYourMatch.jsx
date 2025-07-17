// import React, { useState } from "react";
// import Navbar from "../components/Navbar/Navbar";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../apis/login";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import styles from "./FindYourMatch.module.css";

// const FindYourMatch = () => {
//   const [userData, setUserData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const validate = () => {
//     let newErrors = {};
//     if (!userData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!userData.password) {
//       newErrors.password = "Password is required";
//     }
//     return newErrors;
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       const result = await loginUser(userData);
//       if (result.status === 200) {
//         const statusUrl = `${
//           import.meta.env.VITE_BACKEND_URL
//         }/api/v1/form/status/${encodeURIComponent(userData.email)}`;
//         const statusRes = await axios.get(statusUrl);

//         if (statusRes.data.status === "approved") {
//           localStorage.setItem("isLoggedIn", "true");
//           toast.success(result.data.message, {
//             position: "top-center",
//             autoClose: 3000,
//             theme: "light",
//           });

//           setTimeout(() => {
//             handleMembers();
//           }, 3000);
//         } else {
//           toast.info(
//             "Please wait 1–7 days for admin approval before accessing this feature. For more queries, Contact - 987654321",
//             {
//               position: "top-center",
//               autoClose: 4000,
//               theme: "light",
//             }
//           );
//         }
//       } else {
//         toast.error("Invalid Credentials", {
//           position: "top-center",
//           autoClose: 4000,
//           theme: "light",
//         });
//       }
//     } catch (error) {
//       console.error("Login or status check failed:", error);
//       toast.error("Something went wrong. Please try again later.", {
//         position: "top-center",
//         autoClose: 4000,
//         theme: "light",
//       });
//     }
//   };

//   const handleMembers = () => {
//     navigate("/members");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.container}>
//         <form onSubmit={handleLoginSubmit} className={styles.formCard}>
//           <div className={styles.title}>Find Your Perfect Match</div>

//           <input
//             className={styles.input}
//             placeholder="Email"
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleFormChange}
//           />
//           {errors.email && <div className={styles.error}>{errors.email}</div>}

//           <input
//             className={styles.input}
//             placeholder="Password"
//             type="password"
//             name="password"
//             value={userData.password}
//             onChange={handleFormChange}
//           />
//           {errors.password && (
//             <div className={styles.error}>{errors.password}</div>
//           )}

//           <button type="submit" className={styles.button}>
//             Login
//           </button>

//           <ToastContainer />
//         </form>
//       </div>
//     </>
//   );
// };

// export default FindYourMatch;



import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FindYourMatch = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        const statusUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/status/${encodeURIComponent(userData.email)}`;
        const statusRes = await axios.get(statusUrl);

        if (statusRes.data.status === "approved") {
          localStorage.setItem("isLoggedIn", "true");
          toast.success(result.data.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/members");
          }, 3000);
        } else {
          toast.info(
            "Please wait 1–7 days for admin approval before accessing this feature. For more queries, Contact - XXXXXXXXXX",
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
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Row>
          <Col>
            <Card style={{ maxWidth: "400px", padding: "2.5rem 2rem", borderRadius: "12px", margin: "auto" }}>
              <Card.Body>
                <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#333" }}>
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
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default FindYourMatch;
