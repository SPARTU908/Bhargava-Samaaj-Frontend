import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Matrimonial.module.css";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apis/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Matrimonial = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

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
    } else {
      setErrors({});
      const result = await loginUser(userData);
      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setShowModal(false);
          handleMembers();
        }, 3000);
      } else {
        toast.error("Invalid Credentials", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const navigate = useNavigate();

  const handleMembers = () => {
    navigate("/members");
  };
  // const handleLogin = () => {
  //   navigate("/login");
  // };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.btn}>
          <div>
            {/* <button onClick={handleLogin} className={styles.admin}>
              प्रशासक लॉगिन
            </button> */}
          </div>
          <div>
            <button className={styles.login} onClick={() => setShowModal(true)}>
              सही जीवनसाथी ढूँढें
            </button>
          </div>
        </div>
      </div>

      <Form />

      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button style={closeBtnStyle} onClick={() => setShowModal(false)}>
              &times;
            </button>
            {/* <h2 style={{ textAlign: "center" }}>Login</h2> */}
            <form onSubmit={handleLoginSubmit} style={formStyle}>
              <input
                placeholder="Email"
                style={inputStyle}
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleFormChange}
                required
              />
              <input
                placeholder="Password"
                style={inputStyle}
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleFormChange}
                required
              />

              <button type="submit" style={submitBtnStyle}>
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      )}

     
    </>
  );
};

export default Matrimonial;

// Inline styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "400px",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: "0px",
  right: "1px",
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1rem",
};

const inputStyle = {
  padding: "0.6rem",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const submitBtnStyle = {
  padding: "0.6rem",
  fontSize: "1rem",
  backgroundColor: "#e95114",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
