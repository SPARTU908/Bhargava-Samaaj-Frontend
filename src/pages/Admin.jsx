import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar/Navbar";
import "./Admin.css";

const Admin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    role: "",
  });

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
      const res = await axios.post(reqUrl, admin, {
        withCredentials: true,
      });

      const { token, user } = res.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminRole", user.role);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        if (user.role === "membershipadmin") {
          navigate("/memberadmindashboard");
        } else if (user.role === "matrimonialadmin") {
          navigate("/matrimonialadmin");
        } else if (user.role === "superadmin") {
          navigate("/superadmin");
        } else if (user.role === "conferenceadmin") {
          navigate("/conference-admin");
        } else {
          toast.error("Invalid role. Access denied.");
        }
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="layout">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
              Admin Panel
            </h2>
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>
                  Select Role <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="role"
                  value={admin.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="membershipadmin">Membership Admin</option>
                  <option value="matrimonialadmin">Matrimonial Admin</option>
                  <option value="conferenceadmin">Conference Admin</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <Button style={{ backgroundColor: "#ea8d0c", border: "none" }} type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;
