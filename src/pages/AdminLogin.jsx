import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminLogin.module.css";
import Navbar from "../components/Navbar/Navbar";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // 1. Admin login
    //   const res = await axios.post("http://localhost:3000/api/v1/admin/login", adminData);
    //   const authToken = res.data.token;
    //   localStorage.setItem("adminToken", authToken);
    //   setError("");
    //   navigate("/review");

    // } catch (err) {
    //   console.error(err);
    //   setError("Login failed. Please check your credentials.");
    // }
     try {
      // 1. Admin login with dynamic backend URL
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/login`;
      const res = await axios.post(reqUrl, adminData);

      const authToken = res.data.token;
      localStorage.setItem("adminToken", authToken);
      setError(""); // Clear previous error

      // 2. Navigate after successful login
      navigate("/review");

    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <GrUserAdmin className={styles.admin} />
        <div className={styles.heading}>Admin Panel</div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor="email" className={styles.label}>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Enter Your Email"
              className={styles.input}
              type="email"
              name="email"
              id="email"
              value={adminData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.label}>
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Enter Your Password"
              className={styles.input}
              type="password"
              name="password"
              id="password"
              value={adminData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.btn}>Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default AdminLogin;


