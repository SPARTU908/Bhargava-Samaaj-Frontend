import Navbar from "../components/Navbar/Navbar";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import SignatureUpload from "../components/Signature/SignatureUpload";
import styles from "./NewMembership.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import SpousePhotoUpload from "../components/SpousePhotoUpload/SpousePhotoUpload";
import SpouseSignatureUpload from "../components/SpouseSignatureUpload/SpouseSignatureUpload";
import { registerMember } from "../apis/member";

const NewMembership = () => {
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
    gotra: "",
    kuldevi: "",
    occupation: "",
    spouseMobile: "",
    spouseEmail: "",
    spousePhoto: "",
    spouseSignature: "",
    membership: "",
  });
  const [selectedFee, setSelectedFee] = useState("");
  const [errors, setErrors] = useState({});
  const [photourl, setPhotoUrl] = useState("");
  const [signatureurl, setSignatureUrl] = useState("");
  const [spousephotourl, setSpousePhotoUrl] = useState("");
  const [spousesignatureurl, setSpouseSignatureUrl] = useState("");
  const [showSpouseFields, setShowSpouseFields] = useState(false);
  const[plan, setPlan] = useState("");

  const navigate = useNavigate();
  const handleSelection = (event) => {
    setSelectedFee(event.target.value);
    if (event.target.value === "आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये") {
      setShowSpouseFields(true);
    }
  };
const validate = () => {
    let newErrors = {};

    if (!memberData.username) newErrors.username = "कृपया नाम दर्ज करें।";
    if (!memberData.email) newErrors.email = "कृपया ईमेल दर्ज करें।";
    else if (!/\S+@\S+\.\S+/.test(memberData.email)) {
      newErrors.email = "कृपया मान्य ईमेल दर्ज करें।";
    }
    if (!memberData.address) newErrors.address = "कृपया पता दर्ज करें।";
    if (!memberData.dob) newErrors.dob = "कृपया जन्म तिथि चुनें।";
    if (!memberData.pincode) newErrors.pincode = "कृपया पिनकोड दर्ज करें।";
    if (!photourl) newErrors.photo = "कृपया फोटो अपलोड करें।";
    if (!signatureurl) newErrors.signature = "कृपया हस्ताक्षर अपलोड करें।";
    if (!memberData.fatherName)
      newErrors.fatherName = "कृपया पिता का नाम दर्ज करें।";
    if (!memberData.gotra) newErrors.gotra = "कृपया गोत्र दर्ज करें।";
    if (!memberData.kuldevi) newErrors.kuldevi = "कृपया कुलदेवी दर्ज करें।";
    if (!memberData.mobile) newErrors.mobile = "कृपया मोबाइल नंबर दर्ज करें।";
    if (!memberData.occupation)
      newErrors.occupation = "कृपया व्यवसाय दर्ज करें।";
    if (!selectedFee)
      newErrors.membership = "कृपया सदस्यता शुल्क का एक विकल्प चुनें।";

    if (showSpouseFields) {
      const skipSpouseValidation =
        selectedFee === "साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये" ||
        selectedFee === "आजीवन सभासद - एकल - 600 रुपये" ||
        selectedFee === "डुप्लिकेट परिचय शुल्क - ₹50 रुपये";

      if (!skipSpouseValidation) {
        if (!memberData.spouse)
          newErrors.spouse = "कृपया जीवनसाथी का नाम दर्ज करें।";
        if (!memberData.spouseEmail)
          newErrors.spouseEmail = "कृपया जीवनसाथी का ईमेल दर्ज करें।";
        else if (!/\S+@\S+\.\S+/.test(memberData.spouseEmail)) {
          newErrors.spouseEmail = "कृपया जीवनसाथी का मान्य ईमेल दर्ज करें।";
        }
        if (!memberData.spouseMobile)
          newErrors.spouseMobile = "कृपया जीवनसाथी का मोबाइल नंबर दर्ज करें।";
        if (!spousephotourl)
          newErrors.spousePhoto = "कृपया जीवनसाथी की फोटो अपलोड करें।";
        if (!spousesignatureurl)
          newErrors.spouseSignature = "कृपया जीवनसाथी का हस्ताक्षर अपलोड करें।";
      }
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
    memberData.membership = selectedFee;
    console.log("member", memberData);

    e.preventDefault();

    const validationErrors = validate();
    console.log("hello", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("कृपया सभी आवश्यक फ़ील्ड भरें।", {
        position: "top-center",
      });
      return;
    } else {
      setErrors({});
    }

    try {
      const result = await registerMember(memberData);
      console.log("result", result);
      if (result.success) {
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
        setPlan(
            memberData.membership,
            console.log(memberData.membership)
        )
           
        

        // Reset form
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
          gotra: "",
          kuldevi: "",
          occupation: "",
          spouseMobile: "",
          spouseEmail: "",
          spousePhoto: "",
          spouseSignature: "",
          membership: "",
        });

        setPhotoUrl("");
        setSignatureUrl("");
        setSpousePhotoUrl("");
        setSpouseSignatureUrl("");
        setSelectedFee("");
        console.log("Member Data Submitted:", memberData);
        setTimeout(() => {
          console.log(plan)
          navigate("/payment", {
            state: {
              membership: memberData.membership,
            
            },
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message || "फॉर्म सबमिट करते समय कुछ त्रुटि हुई।"
      );
    }
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
        <div>
          <div className={styles.fees}>
            <div className={styles.memberFees}>सदस्यता शुल्क </div>
            <label className={styles.row1}>
              <input
                type="radio"
                name="membership"
                value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये"
                checked={
                  selectedFee ===
                  "साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये"
                }
                onChange={handleSelection}
              />

              <div className={styles.col1}>
                साधारण सभासद-द्विवार्षिक सत्र के लिए
              </div>

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
                value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये"
                checked={
                  selectedFee === "आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये"
                }
                onChange={handleSelection}
              />
              <div className={styles.sabhasadh}>आजीवन सभासद-</div>
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
              <div className={styles.duplicate}>50 रुपये</div>
            </label>
            <div className={styles.result}>
              <strong>आपका चयन:</strong>{" "}
              {selectedFee || "कोई चयन नहीं किया गया"}
            </div>
          </div>
          {errors.membership && (
            <div className={styles.error1}>{errors.membership}</div>
          )}

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
                {errors.username && (
                  <p className={styles.error}>{errors.username}</p>
                )}
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="spouse" className={styles.label}>
                  Spouse Name
                </label>
                <input
                  placeholder=""
                  className={styles.input}
                  type="text"
                  name="spouse"
                  id="spouse"
                  value={memberData.spouse}
                  onChange={handleChange}
                  disabled={!showSpouseFields}
                  // disabled={isSpouseFieldsReadonly}
                />
                {errors.spouse && (
                  <p className={styles.error}>{errors.spouse}</p>
                )}
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
                {errors.email && <p className={styles.error}>{errors.email}</p>}
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
                  disabled={!showSpouseFields}
                  // disabled={isSpouseFieldsReadonly}
                />
                {errors.spouseEmail && (
                  <p className={styles.error}>{errors.spouseEmail}</p>
                )}
              </div>
            </div>

            <div className={styles.row1}>
              <div className={styles.inputBox}>
                <label htmlFor="address" className={styles.label}>
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
                {errors.address && (
                  <p className={styles.error}>{errors.address}</p>
                )}
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
                {errors.fatherName && (
                  <p className={styles.error}>{errors.fatherName}</p>
                )}
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
                {errors.mobile && (
                  <p className={styles.error}>{errors.mobile}</p>
                )}
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
                  disabled={!showSpouseFields}
                  // disabled={isSpouseFieldsReadonly}
                />
                {errors.spouseMobile && (
                  <p className={styles.error}>{errors.spouseMobile}</p>
                )}
              </div>
            </div>

            <div className={styles.row1}>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  DOB <span style={{ color: "red" }}>*</span>
                </label>
                <DatePicker
                  selected={memberData.dob}
                  onChange={(date) =>
                    setMemberData({ ...memberData, dob: date })
                  }
                  dateFormat="dd/MM/yyyy"
                  className={styles.input}
                  placeholderText="Select Date of Birth"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {errors.dob && <p className={styles.error}>{errors.dob}</p>}
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
                {errors.pincode && (
                  <p className={styles.error}>{errors.pincode}</p>
                )}
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
                {errors.gotra && <p className={styles.error}>{errors.gotra}</p>}
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
                {errors.kuldevi && (
                  <p className={styles.error}>{errors.kuldevi}</p>
                )}
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
                {errors.occupation && (
                  <p className={styles.error}>{errors.occupation}</p>
                )}
              </div>
            </div>

            <div className={styles.row1}>
              <div className={styles.inputBox}>
                <label htmlFor="photo" className={styles.label}>
                  Upload Photo<span style={{ color: "red" }}>*</span>
                </label>
                <PhotoUpload url={photourl} setUrl={setPhotoUrl} />
                {errors.photo && <p className={styles.error}>{errors.photo}</p>}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="spousePhoto" className={styles.label}>
                  Upload Spouse Photo
                </label>
                <SpousePhotoUpload
                  url={spousephotourl}
                  setUrl={setSpousePhotoUrl}
                  disabled={!showSpouseFields}
                  // disabled={isSpouseFieldsReadonly}
                />
                {errors.spousePhoto && (
                  <p className={styles.error}>{errors.spousePhoto}</p>
                )}
              </div>
            </div>

            <div className={styles.row1}>
              <div className={styles.inputBox}>
                <label htmlFor="signature" className={styles.label}>
                  Upload Signature<span style={{ color: "red" }}>*</span>
                </label>
                <SignatureUpload url={signatureurl} setUrl={setSignatureUrl} />
                {errors.signature && (
                  <p className={styles.error}>{errors.signature}</p>
                )}
              </div>
              <div className={styles.inputBox}>
                <label htmlFor="spouseSignature" className={styles.label}>
                  Upload Spouse Signature
                </label>
                <SpouseSignatureUpload
                  url={spousesignatureurl}
                  setUrl={setSpouseSignatureUrl}
                  disabled={!showSpouseFields}
                  // disabled={isSpouseFieldsReadonly}
                />
                {errors.spouseSignature && (
                  <p className={styles.error}>{errors.spouseSignature}</p>
                )}
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.submit} onClick={handleSubmit}>
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    </>
  );
};

export default NewMembership;
