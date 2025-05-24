import Navbar from "../components/Navbar/Navbar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import SignatureUpload from "../components/Signature/SignatureUpload";
import styles from "./Membership.module.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import pdf from "../assets/pdf.png";
import DatePicker from "react-datepicker";
import SpousePhotoUpload from "../components/SpousePhotoUpload/SpousePhotoUpload";
import SpouseSignatureUpload from "../components/SpouseSignatureUpload/SpouseSignatureUpload";
import { registerMember } from "../apis/member";

const Membership = () => {
  const [memberData, setMemberData] = useState({
    username: "",
    email: "",
    address: "",
    mobile: "",
    spouse: "",
    dob: "",
    pincode: "",
    photo: "",
    signature: "",
    fatherName: "",
    husbandName: "",
    gotra: "",
    kuldevi: "",
    occupation: "",
    spouseMobile: "",
    spouseEmail: "",
    spousePhoto: "",
    spouseSignature: "",
  });
  const [selectedFee, setSelectedFee] = useState("");
  const [errors, setErrors] = useState({});
  const [photourl, setPhotoUrl] = useState("");
  const [signatureurl, setSignatureUrl] = useState("");
  const [spousephotourl, setSpousePhotoUrl] = useState("");
  const [spousesignatureurl, setSpouseSignatureUrl] = useState("");
  const navigate = useNavigate();
  const handleSelection = (event) => {
    setSelectedFee(event.target.value);
  };

  const validate = () => {
    let newErrors = {};

    const requiredFields = [
      "username",
      "email",
      "address",
      // "spouse",
      "dob",
      "pincode",
      "photo",
      "signature",
      "fatherName",
      "husbandName",
      "gotra",
      "kuldevi",
      "mobile",
      // "spouseMobile",
      // "spouseEmail",
      // "spousePhoto",
      // "spouseSignature",
      "occupation",
    ];

    requiredFields.forEach((field) => {
      if (!memberData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (memberData.email && !/\S+@\S+\.\S+/.test(memberData.email)) {
      newErrors.email = "Email is invalid";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleSubmit = async (e) => {
    memberData.photo = photourl;
    memberData.signature = signatureurl;
    memberData.spousePhoto = spousephotourl;
    memberData.spouseSignature = spousesignatureurl;
    console.log(memberData);
    e.preventDefault();

    const validationErrors = validate();
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const result = await registerMember(memberData);
      console.log("result", result);
      if (result.status === 201) {
        toast.success(
          result.data.message || "Thanks for submitting your details!",
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
        setMemberData({
          username: "",
          email: "",
          address: "",
          mobile: "",
          spouse: "",
          dob: "",
          pincode: "",
          photo: "",
          signature: "",
          fatherName: "",
          husbandName: "",
          gotra: "",
          kuldevi: "",
          occupation: "",
          spouseMobile: "",
          spouseEmail: "",
          spousePhoto: "",
          spouseSignature: "",
        });
        setPhotoUrl("");
        setSignatureUrl("");
        setSpousePhotoUrl("");
        setSpouseSignatureUrl("");
        console.log("Member Data Submitted:", memberData);
      }
    }

    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <>
        <div className={styles.heading}>
          अखिल भारतीय भार्गव सभा (रजि.) के सभासद बनने एवं लिमिटेड परिचय-पत्र
          प्राप्त करने हेतु आवेदन-पत्र{" "}
        </div>
        <div className={styles.age}>
          सम्भवत: 18 वर्ष या उससे अधिक आयु के सभी महिला/पुरुष नियमुसार बन सकते
          हैं
        </div>

        <div className={styles.fees}>
          <div className={styles.memberFees}>सदस्यता शुल्क </div>
          <label className={styles.row1}>
            <input
              type="radio"
              name="membership"
              value="साधारण सभासद - 300 रुपये"
              checked={selectedFee === "साधारण सभासद - 300 रुपये"}
              onChange={handleSelection}
            />
           
            <div className={styles.col1}>साधारण सभासद</div>
            <div className={styles.col2}>300 रुपये</div>
          </label>
          <label className={styles.row2}>
            <input
              type="radio"
              name="membership"
              value="आजीवन सभासद - एकल - 600 रुपये"
              checked={selectedFee === "आजीवन सभासद - एकल - 600 रुपये"}
              onChange={handleSelection}
            />
            
            <div className={styles.sabhasadh}>आजीवन सभासद-</div>
            <div className={styles.ekal}>एकल</div>
            <div className={styles.rupees}>600 रुपये</div>
          </label>

          <label className={styles.row3}>
            <input
              type="radio"
              name="membership"
              value="आजीवन सभासद - युगल - 1000 रुपये"
              checked={selectedFee === "आजीवन सभासद - युगल - 1000 रुपये"}
              onChange={handleSelection}
            />
            <div className={styles.couple}>युगल-(पति-पत्नी)</div>
            <div className={styles.rupee}>1,000 रुपये</div>
          </label>
          <label className={styles.row4}>
            <input
              type="radio"
              name="membership"
              value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये"
              checked={selectedFee === "डुप्लिकेट परिचय शुल्क - ₹50 रुपये"}
              onChange={handleSelection}
            />
            <div className={styles.dual}>
              डुप्लिकेट परिचय हेतु शुल्क (प्रति सदस्य)
            </div>
            <div className={styles.duplicate}>₹50 रुपये</div>
          </label>
           <div style={{ marginTop: "20px" }}>
        <strong>आपका चयन:</strong> {selectedFee || "कोई चयन नहीं किया गया"}
      </div>
        </div>

        {/* FORM */}
        <div className={styles.container}>
          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="username" className={styles.label}>
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="username"
                id="username"
                value={memberData.username}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="spouse" className={styles.label}>
                Spouse Name
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="spouse"
                name="spouse"
                id="spouse"
                value={memberData.spouse}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="email" className={styles.label}>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="email"
                name="email"
                id="email"
                value={memberData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="spouseEmail" className={styles.label}>
                Spouse Email
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="email"
                name="spouseEmail"
                id="spouseEmail"
                value={memberData.spouseEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="adddress" className={styles.label}>
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="address"
                id="address"
                value={memberData.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="fatherName" className={styles.label}>
                Father Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="fatherName"
                id="fatherName"
                value={memberData.fatherName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="mobile" className={styles.label}>
                Mobile <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="mobile"
                id="mobile"
                value={memberData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="spouseMobile" className={styles.label}>
                Spouse Mobile
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="spouseMobile"
                id="spouseMobile"
                value={memberData.spouseMobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                DOB <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                selected={memberData.dob}
                onChange={(date) => setMemberData({ ...memberData, dob: date })}
                dateFormat="dd/MM/yyyy"
                className={styles.input}
                placeholderText="Select Date of Birth"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="pincode" className={styles.label}>
                Pincode<span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="pincode"
                id="pincode"
                value={memberData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Gotra <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="gotra"
                id="gotra"
                value={memberData.gotra}
                onChange={handleChange}
              />
            </div>

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
                value={memberData.kuldevi}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="photo" className={styles.label}>
                Upload Photo<span style={{ color: "red" }}>*</span>
              </label>
              <PhotoUpload url={photourl} setUrl={setPhotoUrl} />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="spousePhoto" className={styles.label}>
                Upload Spouse Photo
              </label>
              <SpousePhotoUpload
                url={spousephotourl}
                setUrl={setSpousePhotoUrl}
              />
            </div>
          </div>

          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label htmlFor="signature" className={styles.label}>
                Upload Signature<span style={{ color: "red" }}>*</span>
              </label>
              <SignatureUpload url={signatureurl} setUrl={setSignatureUrl} />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="spouseSignature" className={styles.label}>
                Upload Spouse Signature
              </label>
              <SpouseSignatureUpload
                url={spousesignatureurl}
                setUrl={setSpouseSignatureUrl}
              />
            </div>
          </div>
          <div className={styles.row1}>
            <div className={styles.inputBox}>
              <label className={styles.label}>
                Occupation <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="occupation"
                id="occupation"
                value={memberData.occupation}
                onChange={handleChange}
              />
            </div>
            {/* <div className={styles.inputBox}>
              <label className={styles.label}>
                Husband Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder=""
                className={styles.input}
                type="text"
                name="husbandName"
                id="husbandName"
                value={memberData.husbandName}
                onChange={handleChange}
              />
            </div> */}
          </div>

          <div className={styles.btn}>
            <button className={styles.submit} onClick={handleSubmit}>
              Proceed To Payment
            </button>
          </div>
        </div>
        <ToastContainer />
      </>
    </>
  );
};

export default Membership;
