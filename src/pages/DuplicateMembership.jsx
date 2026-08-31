import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  searchMemberByLmNo,
  searchMemberByDetails,
  submitDuplicateForm,
} from "../apis/duplicateMembership";

import Navbar from "../components/Navbar/Navbar";

import "./DuplicateMembership.css";

const EMPTY_FORM = {
  name: "",
  abbsLmNo: "",
  mobile: "",
  email: "",
  dob: "",
  relationName: "",
  occupation: "",

  spouseName: "",
  spouseLmNo: "",
  spouseRelationName: "",
  spouseDob: "",
  spouseOccupation: "",
  spouseMobile: "",
  spouseEmail: "",

  gotra: "",
  kuldevi: "",

  oldAddress: "",
  newAddress: "",
  pincode: "",
  newPincode: "",
};

const DuplicateMembership = () => {
  const navigate = useNavigate();

  const [knowLmNo, setKnowLmNo] = useState(true);

  const [lmNo, setLmNo] = useState("");

  const [searchData, setSearchData] = useState({
    name: "",
    dob: "",
    mobile: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [showSpouse, setShowSpouse] = useState(false);

  const [files, setFiles] = useState({
    photo: null,
    aadharCard: null,
    signature: null,

    spousePhoto: null,
    spouseAadharCard: null,
    spouseSignature: null,
  });

  /*
  |--------------------------------------------------------------------------
  | NORMAL INPUT
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH FORM
  |--------------------------------------------------------------------------
  */

  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | FILE
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (name, file) => {
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | MAP EXCEL MEMBER TO FORM
  |--------------------------------------------------------------------------
  */

  const selectMember = (member) => {
    setFormData((prev) => ({
      ...prev,

      name: member.Member_Name || "",

      abbsLmNo: member.LM_NO || "",

      mobile: member.Contact_No || "",

      email: member.Email || "",

      dob: member.Date_of_Birth || "",

      relationName: member.S_O_D_O_W_O || "",

      occupation: member.Occupation || "",

      gotra: member.Gotra || "",

      kuldevi: member.Kuldevi || "",

      oldAddress: [member.Address, member.CITY || member.City]
        .filter(Boolean)
        .join(", "),

      pincode: member.Pin || "",
    }));

    setVerified(true);

    setSearchResults([]);

    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH LM NUMBER
  |--------------------------------------------------------------------------
  */

  const handleLmSearch = async () => {
    try {
      if (!lmNo.trim()) {
        setError("कृपया ABBS LM नंबर दर्ज करें।");
        return;
      }

      setLoading(true);
      setError("");

      const response = await searchMemberByLmNo(lmNo.trim());

      console.log("LM SEARCH RESPONSE:", response);

      if (!response?.success || !response?.data) {
        setError("इस LM नंबर से सदस्य नहीं मिला।");
        return;
      }

      selectMember(response.data);
    } catch (error) {
      console.error("LM Search Error:", error);

      setError(error?.message || "इस LM नंबर से सदस्य नहीं मिला।");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH USING DETAILS
  |--------------------------------------------------------------------------
  */

  const handleDetailsSearch = async () => {
    try {
      if (!searchData.name.trim()) {
        setError("कृपया नाम दर्ज करें।");

        return;
      }

      setLoading(true);
      setError("");

      const response = await searchMemberByDetails(searchData);

      if (response.data.length === 1) {
        selectMember(response.data[0]);
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      setSearchResults([]);

      setError(error.message || "कोई सदस्य नहीं मिला।");
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SPOUSE SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSpouseSearch = async () => {
    try {
      if (!formData.spouseLmNo) {
        alert("Enter spouse LM Number");

        return;
      }

      const response = await searchMemberByLmNo(formData.spouseLmNo);

      const member = response.data;

      setFormData((prev) => ({
        ...prev,

        spouseName: member.Member_Name || "",

        spouseLmNo: member.LM_NO || "",

        spouseMobile: member.Contact_No || "",

        spouseEmail: member.Email || "",

        spouseRelationName: member.S_O_D_O_W_O || "",

        spouseOccupation: member.Occupation || "",
      }));
    } catch (error) {
      alert(error.message || "Spouse member not found");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("पहले अपना ABBS सदस्यता रिकॉर्ड verify करें।");

      return;
    }

    if (!files.photo || !files.aadharCard || !files.signature) {
      alert("Photo, Aadhaar और Signature upload करें।");

      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          payload.append(key, value);
        }
      });

      payload.append("photo", files.photo);

      payload.append("aadharCard", files.aadharCard);

      payload.append("signature", files.signature);

      if (showSpouse) {
        if (files.spousePhoto) {
          payload.append("spousePhoto", files.spousePhoto);
        }

        if (files.spouseAadharCard) {
          payload.append("spouseAadharCard", files.spouseAadharCard);
        }

        if (files.spouseSignature) {
          payload.append("spouseSignature", files.spouseSignature);
        }
      }

      const response = await submitDuplicateForm(payload);

      navigate("/duplicate-payment", {
        state: {
          applicationId: response.data.applicationId,

          totalMembers: response.data.totalMembers,

          feePerMember: response.data.feePerMember,

          totalAmount: response.data.totalAmount,
        },
      });
    } catch (error) {
      alert(error.message || "Application submit नहीं हो पाया।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="duplicate-page">
        <div className="duplicate-wrapper">
          {/* Header */}
          <section className="duplicate-hero">
            {/* <div className="hero-badge">
            ABBS Duplicate Identity Card
          </div> */}

            <h1>डुप्लिकेट परिचय-पत्र हेतु आवेदन</h1>

            {/* <p>
            अखिल भारतीय भार्गव सभा (रजि.)
          </p> */}

            <div className="hero-fee">
              <span className="fee-label">आवेदन शुल्क</span>

              <strong>₹50 प्रति आवेदन</strong>
            </div>
          </section>

          {/* ==========================
            VERIFICATION
        ========================== */}

          {!verified && (
            <section className="form-card verification-card">
              <div className="section-heading">
                <div className="section-number">1</div>

                <div>
                  <h2>सदस्यता सत्यापन</h2>

                  <p>
                    आगे बढ़ने से पहले अपनी ABBS Life Membership की जानकारी
                    सत्यापित करें।
                  </p>
                </div>
              </div>

              <div className="verification-options">
                <label
                  className={`verification-option ${
                    knowLmNo ? "active-option" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="lmOption"
                    checked={knowLmNo}
                    onChange={() => {
                      setKnowLmNo(true);
                      setError("");
                      setSearchResults([]);
                    }}
                  />

                  <div>
                    <strong>मुझे अपना ABBS L/M Number पता है</strong>

                    <span>ABBS Life Membership Number से सीधे खोजें</span>
                  </div>
                </label>

                <label
                  className={`verification-option ${
                    !knowLmNo ? "active-option" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="lmOption"
                    checked={!knowLmNo}
                    onChange={() => {
                      setKnowLmNo(false);
                      setError("");
                      setSearchResults([]);
                    }}
                  />

                  <div>
                    <strong>मुझे ABBS L/M Number याद नहीं है</strong>

                    <span>नाम, जन्म तिथि या मोबाइल से अपना रिकॉर्ड खोजें</span>
                  </div>
                </label>
              </div>

              {knowLmNo ? (
                <div className="search-box">
                  <div className="search-field">
                    <label>
                      ABBS LM Number
                      <span className="required">*</span>
                    </label>

                    <input
                      type="text"
                      value={lmNo}
                      onChange={(e) => setLmNo(e.target.value)}
                      placeholder="जैसे 13772"
                    />
                  </div>

                  <button
                    type="button"
                    className="primary-btn search-btn"
                    onClick={handleLmSearch}
                    disabled={loading}
                  >
                    {loading ? "खोज रहे हैं..." : "सदस्य खोजें"}
                  </button>
                </div>
              ) : (
                <div className="details-search-grid">
                  <div className="search-field">
                    <label>
                      Member Name
                      <span className="required">*</span>
                    </label>

                    <input
                      name="name"
                      value={searchData.name}
                      onChange={handleSearchChange}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="search-field">
                    <label>Date of Birth</label>

                    <input
                      type="text"
                      name="dob"
                      value={searchData.dob}
                      onChange={handleSearchChange}
                      placeholder="DD.MM.YYYY"
                    />
                  </div>

                  <div className="search-field">
                    <label>Mobile Number</label>

                    <input
                      type="text"
                      name="mobile"
                      value={searchData.mobile}
                      onChange={handleSearchChange}
                      placeholder="10 digit mobile number"
                    />
                  </div>

                  <div className="details-search-action">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleDetailsSearch}
                      disabled={loading}
                    >
                      {loading ? "खोज रहे हैं..." : "अपना रिकॉर्ड खोजें"}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <span className="message-icon">!</span>

                  {error}
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="search-results">
                  <div className="results-title">
                    <h3>अपना सही रिकॉर्ड चुनें</h3>

                    <span>{searchResults.length} रिकॉर्ड मिले</span>
                  </div>

                  <div className="results-grid">
                    {searchResults.map((member) => (
                      <div key={member._id} className="member-result-card">
                        <div className="member-avatar">
                          {member.Member_Name?.charAt(0)?.toUpperCase() || "M"}
                        </div>

                        <div className="member-result-info">
                          <h4>{member.Member_Name}</h4>

                          <div className="result-meta">
                            <span>
                              <b>LM No:</b> {member.LM_NO}
                            </span>

                            <span>
                              <b>DOB:</b> {member.Date_of_Birth || "-"}
                            </span>

                            <span>
                              <b>City:</b> {member.CITY || member.CITY || "-"}
                            </span>

                            <span>
                              <b>Address:</b>{" "}
                              {member.Address || member.Address || "-"}
                            </span>
                            <span>
                              <b>Contact No:</b>{" "}
                              {member.Contact_No || member.Contact_No || "-"}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="select-btn"
                          onClick={() => selectMember(member)}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ==========================
            MAIN FORM
        ========================== */}

          {verified && (
            <form onSubmit={handleSubmit} className="duplicate-form">
              {/* Verified status */}
              <div className="verified-banner">
                <div className="verified-icon">✓</div>

                <div>
                  <strong>सदस्यता सत्यापित</strong>

                  <span>ABBS L/M No: {formData.abbsLmNo}</span>
                </div>
              </div>

              {/* Member Details */}
              <section className="form-card">
                <div className="section-heading">
                  <div className="section-number">2</div>

                  <div>
                    <h2>सदस्य का विवरण</h2>

                    <p>
                      कृपया नीचे दी गई जानकारी जांचें और आवश्यक होने पर अपडेट
                      करें।
                    </p>
                  </div>
                </div>

                <div className="form-grid">
                  <Field
                    label="Name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <Field
                    label="ABBS LM No"
                    required
                    name="abbsLmNo"
                    value={formData.abbsLmNo}
                    readOnly
                    locked
                  />

                  <Field
                    label="Mobile"
                    required
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                  <Field
                    label="Email"
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Field
                    label="DOB"
                    required
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />

                  <Field
                    label="S/o, D/o, W/o Name"
                    required
                    name="relationName"
                    value={formData.relationName}
                    onChange={handleChange}
                  />


                  <Field
                    label="Gotra"
                    required
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleChange}
                  />



                  <Field
                    label="Kuldevi"
                    required
                    name="kuldevi"
                    value={formData.kuldevi}
                    onChange={handleChange}
                  />

                   <Textarea
                    label="Old Address/Current Address"
                    required
                    name="oldAddress"
                    value={formData.oldAddress}
                    onChange={handleChange}
                    placeholder="पुराना पता"
                  />

                    <Textarea
                    label="New Address"
                    required
                    name="newAddress"
                    value={formData.newAddress}
                    onChange={handleChange}
                    placeholder="नया पता दर्ज करें"
                  />

                  
                 
                </div>

                <div className="address-grid">

                 <Field
                    label="Pin Code"
                    required
                    name="pincode"
                    inputMode="numeric"
                    value={formData.pincode}
                    onChange={handleChange}
                  />


                   <Field
                    label="New Pin Code"
                    required
                    name="newPincode"
                    value={formData.newPincode}
                    onChange={handleChange}
                  />


                
                  
                  <Field
                    label="Occupation"
                    required
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* Documents */}
              <section className="form-card">
                <div className="section-heading">
                  <div className="section-number">3</div>

                  <div>
                    <h2>आवश्यक दस्तावेज</h2>

                    <p>साफ और स्पष्ट फोटो/दस्तावेज अपलोड करें।</p>
                  </div>
                </div>

                <div className="upload-grid">
                  <FileField
                    label="Photo"
                    required
                    hint="Passport size photo"
                    file={files.photo}
                    onChange={(file) => handleFileChange("photo", file)}
                  />

                  <FileField
                    label="Aadhaar Card"
                    required
                    hint="Image or PDF"
                    file={files.aadharCard}
                    onChange={(file) => handleFileChange("aadharCard", file)}
                  />

                  <FileField
                    label="Signature"
                    required
                    hint="Clear signature image"
                    file={files.signature}
                    onChange={(file) => handleFileChange("signature", file)}
                  />
                </div>
              </section>

              {/* Spouse Toggle */}
              <section className="form-card spouse-section">
                <div className="spouse-toggle-row">
                  <div>
                    <h2>जीवनसाथी का परिचय-पत्र</h2>

                    <p>
                      यदि जीवनसाथी के लिए भी duplicate परिचय-पत्र चाहिए तो यह
                      विकल्प चुनें।
                    </p>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={showSpouse}
                      onChange={(e) => setShowSpouse(e.target.checked)}
                    />

                    <span className="slider"></span>
                  </label>
                </div>

                {showSpouse && (
                  <div className="spouse-content">
                    <div className="subsection-title">Spouse Details</div>

                    <div className="form-grid">
                      <div className="form-field">
                        <label>
                          Spouse ABBS L/M No
                          <span className="required">*</span>
                        </label>

                        <div className="lm-search-inline">
                          <input
                            name="spouseLmNo"
                            value={formData.spouseLmNo}
                            onChange={handleChange}
                            placeholder="Enter LM No"
                          />

                          <button type="button" onClick={handleSpouseSearch}>
                            Verify
                          </button>
                        </div>
                      </div>

                      <Field
                        label="Spouse Name"
                        name="spouseName"
                        value={formData.spouseName}
                        onChange={handleChange}
                      />

                      <Field
                        label="W/o, D/o Name"
                        name="spouseRelationName"
                        value={formData.spouseRelationName}
                        onChange={handleChange}
                      />

                      <Field
                        label="Spouse DOB"
                        name="spouseDob"
                        type="date"
                        value={formData.spouseDob}
                        onChange={handleChange}
                      />

                      <Field
                        label="Spouse Occupation"
                        name="spouseOccupation"
                        value={formData.spouseOccupation}
                        onChange={handleChange}
                      />

                      <Field
                        label="Spouse Mobile"
                        name="spouseMobile"
                        type="tel"
                        value={formData.spouseMobile}
                        onChange={handleChange}
                      />

                      <Field
                        label="Spouse Email"
                        name="spouseEmail"
                        type="email"
                        value={formData.spouseEmail}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="upload-grid spouse-upload-grid">
                      <FileField
                        label="Spouse Photo"
                        hint="Passport size photo"
                        file={files.spousePhoto}
                        onChange={(file) =>
                          handleFileChange("spousePhoto", file)
                        }
                      />

                      <FileField
                        label="Spouse Aadhaar Card"
                        hint="Image or PDF"
                        file={files.spouseAadharCard}
                        onChange={(file) =>
                          handleFileChange("spouseAadharCard", file)
                        }
                      />

                      <FileField
                        label="Spouse Signature"
                        hint="Clear signature image"
                        file={files.spouseSignature}
                        onChange={(file) =>
                          handleFileChange("spouseSignature", file)
                        }
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* Fee */}
              {/* <section className="amount-box">

              <div>
                <span>
                  भुगतान विवरण
                </span>

                <small>
                  डुप्लिकेट परिचय-पत्र हेतु ₹50 प्रति
                  सदस्य
                </small>
              </div>


              <div className="amount-value">

                <span>
                  {showSpouse
                    ? "2 Members"
                    : "1 Member"}
                </span>

                <strong>
                  {showSpouse
                    ? "₹100"
                    : "₹50"}
                </strong>

              </div>

            </section> */}

              <section className="amount-box">
                <div>
                  <span>भुगतान विवरण</span>

                  <small>डुप्लिकेट परिचय-पत्र हेतु निश्चित आवेदन शुल्क</small>
                </div>

                <div className="amount-value">
                  <span>Application Fee</span>

                  <strong>₹50</strong>
                </div>
              </section>

              {/* Submit */}
              <div className="submit-area">
                <p>
                  Save & Continue पर क्लिक करने के बाद आप payment page पर
                  जाएंगे।
                </p>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Save & Continue to Payment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

const Field = ({ label, required = false, locked = false, ...props }) => (
  <div className="form-field">
    <label>
      {label}

      {required && <span className="required">*</span>}
    </label>

    <input {...props} className={locked ? "locked-input" : ""} />
  </div>
);

const Textarea = ({ label, required = false, ...props }) => (
  <div className="form-field textarea-field">
    <label>
      {label}

      {required && <span className="required">*</span>}
    </label>

    <textarea rows="4" {...props} />
  </div>
);

const FileField = ({ label, required = false, hint, file, onChange }) => (
  <div className="file-upload-card">
    <div className="upload-icon">↑</div>

    <div className="upload-heading">
      {label}

      {required && <span className="required">*</span>}
    </div>

    {hint && <p>{hint}</p>}

    <label className="file-select-button">
      <span>{file ? "Change File" : "Choose File"}</span>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>

    <div className={`file-name ${file ? "has-file" : ""}`}>
      {file ? file.name : "No file selected"}
    </div>
  </div>
);

export default DuplicateMembership;
