import React, { useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar/Navbar";

const Admin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    role: "", // default: blank
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin.role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
      const res = await axios.post(reqUrl, admin);

      const authToken = res.data.token;
      const user = res.data.user;

      // Store tokens and user data in localStorage
      localStorage.setItem("adminToken", authToken);
      localStorage.setItem("adminRole", user.role);

      // Show success toast message
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Adding a delay before navigation to ensure the toast appears
      setTimeout(() => {
        // Redirect based on user role
        if (user.role === "membershipadmin") {
          navigate("/memberadmin");
        } else if (user.role === "matrimonialadmin") {
          navigate("/matrimonialadmin");
        } else if (user.role === "superadmin") {
          navigate("/superadmin");
        } else {
          toast.error("Invalid role. Access denied.");
        }
      }, 2000); // Wait 2 seconds before navigating
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
    <Navbar/>
      <div className={styles.container}>
        <div>
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
                value={admin.email}
                onChange={handleChange}
                required
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
                value={admin.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label className={styles.label}>
                Select Role <span style={{ color: "red" }}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <select
                  name="role"
                  value={admin.role}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select Role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="membershipadmin">Membership Admin</option>
                  <option value="matrimonialadmin">Matrimonial Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.btn}>
              Login
            </button>
          </form>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>

        <div className={styles.right}>

        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Admin;
