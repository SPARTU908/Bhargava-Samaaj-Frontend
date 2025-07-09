import React, { useState } from "react";
import styles from "./VivahMemberLogin.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vivahmemberLogin } from "../../apis/vivahMember";
import Navbar from "../Navbar/Navbar";

const VivahMemberLogin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
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

      localStorage.setItem("vivahToken", result.token);

      setTimeout(() => {
        navigate("/members");
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
                    id="email"
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
                    id="password"
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
              <button
                type="submit"
                onClick={handleSubmit}
                className={styles.login}
              >
                Login
              </button>
              <p className={styles.text}>Have no account yet?</p>
              <button
                type="submit"
                onClick={handleRegisterClick}
                className={styles.register}
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default VivahMemberLogin;
