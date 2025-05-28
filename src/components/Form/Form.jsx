import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerUser } from "../../apis/form";
import FileUpload from "../FileUpload/FileUpload";
import BioDataUpload from "../BioDataUpload/BioDataUpload";

const Form = () => {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    birthTime: "",
    birthPlace: "",
    height: "",
    weight: "",
    dob: "",
    bloodGroup: "",
    manglik: "",
    gotra: "",
    kuldevi: "",
    complexion: "",
    education: "",
    professionQualification: "",
    profession: "",
    company: "",
    designation: "",
    income: "",
    hobbies: "",
    otherQualification: "",
    guardianName: "",
    fatherName: "",
    fatherProfession: "",
    motherName: "",
    nativePlace: "",
    address: "",
    city: "",
    pin: "",
    whatsapp: "",
    residence: "",
    nri: "",
    remarks: "",
    password: "",
    photo: "",
    bioData: "",
  });
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState("");
  const [biourl, setbiourl] = useState("");
  const validate = () => {
    let newErrors = {};

    const requiredFields = [
      "number",
      "name",
      "email",
      "mobile",
      "gender",
      "birthTime",
      "birthPlace",
      "height",
      "weight",
      "dob",
      "bloodGroup",
      "manglik",
      "gotra",
      "kuldevi",
      "complexion",
      "education",
      "professionQualification",
      "profession",
      "company",
      "designation",
      "income",
      "hobbies",
      "guardianName",
      "fatherName",
      "fatherProfession",
      "motherName",
      "nativePlace",
      "address",
      "city",
      "pin",
      "whatsapp",
      "residence",
      "nri",
      "remarks",
      "password",
      "photo",
      "bioData",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    formData.photo = url;
    formData.bioData = biourl;
    console.log(formData);
    e.preventDefault();

    const validationErrors = validate();
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const result = await registerUser(formData);
      console.log("result", result);
      if (result.status === 201) {
        toast.success(
          result.data.message ||
            "Thanks for submitting your details!, Your details get lived in 24 to 36 hrs.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setFormData({
          number: "",
          name: "",
          email: "",
          mobile: "",
          gender: "",
          birthTime: "",
          birthPlace: "",
          height: "",
          weight: "",
          dob: "",
          bloodGroup: "",
          manglik: "",
          gotra: "",
          kuldevi: "",
          complexion: "",
          education: "",
          professionQualification: "",
          profession: "",
          company: "",
          designation: "",
          income: "",
          hobbies: "",
          otherQualification: "",
          guardianName: "",
          fatherName: "",
          fatherProfession: "",
          motherName: "",
          nativePlace: "",
          address: "",
          city: "",
          pin: "",
          whatsapp: "",
          residence: "",
          nri: "",
          remarks: "",
          password: "",
          photo: "",
          bioData: "",
        });
        setUrl("");
        setbiourl("");
        console.log("Form Data Submitted:", formData);
      }
    }
  };

  return (
    <>
      <div className={styles.heading}>वैवाहिक फ़ॉर्म</div>
      <div className={styles.container}>
        <div className={styles.inputBox}>
          <label htmlFor="number" className={styles.label}>
            ABBS Membership <span style={{ color: "red" }}>*</span>
          </label>
          <input
            placeholder="Enter Your ABBS Membership No."
            className={styles.input}
            type="text"
            name="number"
            id="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        {/* Name and Email */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="name" className={styles.label}>
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Enter Your Name"
              className={styles.input}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="email" className={styles.label1}>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Enter Your Email"
              className={styles.input1}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Mobile and gender */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="mobile" className={styles.label}>
              Mobile <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Enter Your Mobile Number"
              className={styles.input}
              type="text"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.input1}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Birth Time and birth place */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="birthTime" className={styles.label}>
              Birth Time <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="In 24 Hours"
              className={styles.input}
              type="text"
              name="birthTime"
              id="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              Birth Place <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="birthPlace"
              id="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Height and weight */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              Height <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="in cm"
              className={styles.input}
              type="text"
              name="height"
              id="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              Weight <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="in kg"
              className={styles.input1}
              type="text"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row: DOB and Blood Group */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              DOB <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.dob}
              onChange={(date) => setFormData({ ...formData, dob: date })}
              dateFormat="dd/MM/yyyy"
              className={styles.input}
              placeholderText="Select Date of Birth"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              Blood Group <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="bloodGroup"
              className={styles.input1}
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {/* manglik and gotra */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              Manglik <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="manglik"
              value={formData.manglik}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Don't Know">Don't Know</option>
            </select>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              Gotra <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="gotra"
              id="gotra"
              value={formData.gotra}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* kuldevi and complexion */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              Kuldevi <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="kuldevi"
              id="kuldevi"
              value={formData.kuldevi}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="complexion" className={styles.label1}>
              Complexion <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="complexion"
              id="complexion"
              value={formData.complexion}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* educational qualification and professional qualification */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="education" className={styles.label}>
              Education Qualification<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="education"
              id="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="professionQualification" className={styles.label1}>
              Professional Qualification<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="professionQualification"
              id="professionQualification"
              value={formData.professionQualification}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* profession and company */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="profession" className={styles.label}>
              Profession<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="profession"
              id="profession"
              value={formData.profession}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="company" className={styles.label1}>
              Company<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Designation and monthly income */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="designation" className={styles.label}>
              Designation<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="designation"
              id="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="income" className={styles.label1}>
              Monthly Income<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="income"
              id="income"
              value={formData.income}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Hobbies and other qualification */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="hobbies" className={styles.label}>
              Hobbies<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="hobbies"
              id="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="otherQualification" className={styles.label1}>
              Other Qualification<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="otherQualification"
              id="otherQualification"
              value={formData.otherQualification}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Guardian name and father name */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="guardianName" className={styles.label}>
              Guardian Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="guardianName"
              id="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="fatherName" className={styles.label1}>
              Father Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="fatherName"
              id="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* father profession and monthly income */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="fatherProfession" className={styles.label}>
              Father Profession<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="fatherProfession"
              id="fatherProfession"
              value={formData.fatherProfession}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="monthlyIncome" className={styles.label1}>
              Monthly Income<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="monthlyIncome"
              id="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* father occupation and father designation */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="fatherDesignation" className={styles.label}>
              Father Designation<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="fatherDesignation"
              id="fatherDesignation"
              value={formData.fatherDesignation}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="motherName" className={styles.label1}>
              Mother Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="motherName"
              id="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* NATIVE PLACE AND ADDRESS */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="nativePlace" className={styles.label}>
              Native Place<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="nativePlace"
              id="nativePlace"
              value={formData.nativePlace}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="address" className={styles.label1}>
              Address<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* city and pin */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="city" className={styles.label}>
              City<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="pin" className={styles.label1}>
              Pin<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="pin"
              id="pin"
              value={formData.pin}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Whatsapp no residencial no  */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="whatsapp" className={styles.label}>
              Whatsapp No<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input}
              type="text"
              name="whatsapp"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="residence" className={styles.label1}>
              Residence Phone No<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="residence"
              id="residence"
              value={formData.residence}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* mobile and nri */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="photo" className={styles.label}>
              Upload Photo<span style={{ color: "red" }}>*</span>
            </label>

            <FileUpload url={url} setUrl={setUrl} />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.label1}>
              NRI<span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="nri"
              value={formData.nri}
              onChange={handleChange}
              className={styles.input1}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        {/* remarks and create passowrd */}
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="remarks" className={styles.label}>
              Remarks<span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              placeholder=""
              className={styles.input}
              type="text"
              name="remarks"
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.label1}>
              Create Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder=""
              className={styles.input1}
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row1}>
          <div className={styles.inputBox}>
            <label htmlFor="bioData" className={styles.label}>
              Upload Bio Data <span style={{ color: "red" }}>*</span>
              <span></span>
            </label>
            {/* <BioDataUpload /> */}
            {/* <input type="file"  className={styles.input}/> */}
            <BioDataUpload url={biourl} setUrl={setbiourl} />
          </div>
        </div>
        <div className={styles.btn}>
          <button className={styles.submit} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
