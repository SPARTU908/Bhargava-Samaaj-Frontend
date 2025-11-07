import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Image } from "react-bootstrap";

const EditProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    number: "",
    name: "",
    email: userEmail || "",
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
    fatherIncome: "",
    fatherDesignation: "",
    motherName: "",
    nativePlace: "",
    address: "",
    city: "",
    pin: "",
    whatsapp: "",
    nri: "",
    remarks: "",
    photo: "",
    bioData: "",
  });

  const [photo, setPhoto] = useState(null);
  const [bioData, setBioData] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");
  const [existingBiodata, setExistingBiodata] = useState("");

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`${BACKEND_URL}/api/v1/form/${userEmail}`)
      .then((res) => {
        const {
          photo,
          bioData,
          _id,
          __v,
          password,
          status,
          submittedAt,
          createdAt,
          updatedAt,
          resetOTP,
          resetOTPExpires,
          deletedAt,
          ...cleanedData

        } = res.data;

        setFormData(cleanedData);
        if (photo) setExistingPhoto(photo);
        if (bioData) setExistingBiodata(bioData);
      })
      .catch((err) => console.error("Error fetching user", err));
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleBioDataChange = (e) => setBioData(e.target.files[0]);

  const labelMap = {
    number: "ABBS Membership Number",
    dob: "Date of Birth",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    birthPlace: "Place of Birth",
    birthTime: "Time of Birth",
    kuldevi: "Kuldevi Name",
    pin: "PIN Code",
    whatsapp: "WhatsApp Number",
    photo: "Profile Photo",
    bioData: "Biodata File",
    nri: "Are you NRI?",
    gotra: "Gotra (Family Lineage)",
    manglik: "Manglik Status",
    guardianName: "Guardian's Name",
    fatherProfession: "Father's Profession",
    fatherIncome: "Father's Income",
    fatherDesignation: "Father's Designation",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (photo) formDataToSend.append("photo", photo);
      if (bioData) formDataToSend.append("bioData", bioData);

      await axios.patch(
        `${BACKEND_URL}/api/v1/form/update/${userEmail}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm h-auto">
        <Card.Header className="text-black text-center bg-light">
          <h4>Edit Your Profile</h4>
        </Card.Header>

        <div
          style={{
            maxHeight: "600px",
            overflowY: "auto",
            padding: "20px",
            background: "#f9f9f9",
          }}
        >
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              {Object.entries(formData).map(([key, value]) => {
                const isDateField = key.toLowerCase().includes("dob");
                const inputType = isDateField ? "date" : "text";

                return (
                  <Col md={6} sm={12} key={key} className="mb-3">
                    <Form.Group controlId={`form-${key}`}>
                      <Form.Label className="text-capitalize">
                        {labelMap[key] || key.replace(/([A-Z])/g, " $1")}
                      </Form.Label>
                      <Form.Control
                        type={inputType}
                        name={key}
                        value={value || ""}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                );
              })}
            </Row>

            <hr className="my-4" />

            <Row>
              {/* Photo Upload */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload New Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handlePhotoChange}
                  />
                  {existingPhoto && (
                    <div className="mt-2">
                      <p className="mb-1">Current Photo:</p>
                      <Image
                        src={existingPhoto}
                        alt="Current Photo"
                        thumbnail
                        style={{ maxWidth: "150px", height: "auto" }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>

              {/* Biodata Upload */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload New Biodata</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.img,.png"
                    onChange={handleBioDataChange}
                  />
                  {existingBiodata && (
                    <div className="mt-2">
                      <p className="mb-1">Current Biodata:</p>
                      <a
                        href={existingBiodata}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Biodata
                      </a>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button variant="success" type="submit" className="px-5">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default EditProfile;
