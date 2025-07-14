import React, { useState } from "react";
import styles from "./VivahMemberRegister.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vivahmemberRegister } from "../../apis/vivahMember";
import Navbar from "../Navbar/Navbar";

const VivahMemberRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipno: "",
    gender: "",
    city: "",
    gotra: "",
    kuldevi: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    const required = [
      "name",
      "email",
      "phone",
      "gender",
      "city",
      "gotra",
      "kuldevi",
      "password",
      "confirmpassword",
    ];

    required.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits and valid";
    }

    if (
      formData.password &&
      formData.confirmpassword &&
      formData.password !== formData.confirmpassword
    ) {
      newErrors.confirmpassword = "Passwords do not match";
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }

    return newErrors;
  };

  const handleLoginClick = () => {
    navigate("/vivahmemberlogin");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("Form submitted", formData);

  //   const validationErrors = validate();
  //   console.log(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setErrors({});
  //     const result = await vivahmemberRegister(formData);
  //     console.log("API result:", result);
  //     if (result.success) {
  //       toast.success(result.data.message || "Registration successful", {
  //         position: "top-center",
  //         autoClose: 3000,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         handleLoginClick();
  //       }, 3000);
  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         membershipno: "",
  //         gender: "",
  //         city: "",
  //         gotra: "",
  //         kuldevi: "",
  //         password: "",
  //         confirmpassword: "",
  //       });
  //     } else {
  //       const errorMessage = result?.error?.message?.toLowerCase();

  //       if (
  //         errorMessage?.includes("email") &&
  //         errorMessage?.includes("already")
  //       ) {
  //         toast.error("Email is already registered", {
  //           position: "top-center",
  //           autoClose: 4000,
  //           theme: "light",
  //         });
  //       } else {
  //         toast.error(result?.error?.message || "Registration failed", {
  //           position: "top-center",
  //           autoClose: 4000,
  //           theme: "light",
  //         });
  //       }
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Don't proceed to API or set isSubmitting
    }

    setErrors({});
    setIsSubmitting(true); // ✅ Only here after validation passes

    try {
      const result = await vivahmemberRegister(formData);

      if (result.success) {
        toast.success(result.data.message || "Registration successful", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });

        setTimeout(() => {
          handleLoginClick();
        }, 3000);

        setFormData({
          name: "",
          email: "",
          phone: "",
          membershipno: "",
          gender: "",
          city: "",
          gotra: "",
          kuldevi: "",
          password: "",
          confirmpassword: "",
        });
      } else {
        const errorMessage = result?.error?.message?.toLowerCase();

        if (
          errorMessage?.includes("email") &&
          errorMessage?.includes("already")
        ) {
          toast.error("Email is already registered", {
            position: "top-center",
            autoClose: 4000,
            theme: "light",
          });
        } else {
          toast.error(result?.error?.message || "Registration failed", {
            position: "top-center",
            autoClose: 4000,
            theme: "light",
          });
        }

        setIsSubmitting(false); // Allow retry after error
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 4000,
        theme: "light",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.registerContainer}>
            <h1>Register to find a match for your loved one</h1>
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <div className={styles.inputParentBox}>
                <label htmlFor="name" className={styles.label}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="email" className={styles.label}>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="phone" className={styles.label}>
                  Phone <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="membershipno" className={styles.label}>
                  Membership No
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  id="membershipno"
                  name="membershipno"
                  value={formData.membershipno}
                  onChange={handleChange}
                />
                {errors.membershipno && (
                  <p className={styles.error}>{errors.membershipno}</p>
                )}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="gender" className={styles.label}>
                  Gender <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className={styles.input}
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className={styles.error}>{errors.gender}</p>
                )}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="city" className={styles.label}>
                  City <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className={styles.error}>{errors.city}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="gotra" className={styles.label}>
                  Gotra <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  id="gotra"
                  name="gotra"
                  value={formData.gotra}
                  onChange={handleChange}
                />
                {errors.gotra && <p className={styles.error}>{errors.gotra}</p>}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="kuldevi" className={styles.label}>
                  Kuldevi <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  id="kuldevi"
                  name="kuldevi"
                  value={formData.kuldevi}
                  onChange={handleChange}
                />
                {errors.kuldevi && (
                  <p className={styles.error}>{errors.kuldevi}</p>
                )}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="password" className={styles.label}>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
              </div>

              <div className={styles.inputParentBox}>
                <label htmlFor="confirmpassword" className={styles.label}>
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                />

                {errors.confirmpassword && (
                  <p className={styles.error}>{errors.confirmpassword}</p>
                )}
              </div>

              <button
                type="submit"
                className={styles.register}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <p className={styles.text}>Already have an account?</p>
              <button
                type="button"
                className={styles.login}
                onClick={handleLoginClick}
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default VivahMemberRegister;
