import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner, Image } from "react-bootstrap";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const labelMap = {
    number: "ABBS Membership Number",
    dob: "Date of Birth",
    birthTime: "Time of Birth",
    birthPlace: "Place of Birth",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    kuldevi: "Kuldevi Name",
    gotra: "Gotra (Family Lineage)",
    manglik: "Manglik Status",
    guardianName: "Guardian's Name",
    fatherProfession: "Father's Profession",
    fatherIncome: "Father's Income",
    fatherDesignation: "Father's Designation",
    pin: "PIN Code",
    whatsapp: "WhatsApp Number",
    nri: "Are you NRI?",
    education: "Education Qualification",
    professionQualification: "Professional Qualification",
    bioData: "Biodata File",
    photo: "Profile Photo",
  };

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BACKEND_URL}/api/v1/form/${userId}`)
      .then((res) => {
        const {
          _id,
          __v,
          password,
          status,
          submittedAt,
          createdAt,
          updatedAt,
          resetOTP,
          resetOTPExpires,
          ...cleaned
        } = res.data;
        setProfile(cleaned);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-5 text-danger">
        User profile not found.
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-lg h-auto">
        <Card.Header className="text-white bg-primary text-center">
          <h4 style={{ margin: 0 }}>My Profile</h4>
        </Card.Header>
        <Card.Body>
          <Row className="g-4">
            {/* Display photo if available */}

            {/* Display BioData link if available */}

            {/* Display other profile fields */}
            {Object.entries(profile).map(([key, value]) => {
              if (!value || ["photo", "bioData"].includes(key)) return null;

              const label =
                labelMap[key] ||
                key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
              return (
                <Col sm={6} key={key}>
                  <div>
                    <strong>{label}: </strong>
                    <span>{value}</span>
                  </div>
                </Col>
              );
            })}

            {profile.photo && (
              <Col sm={12} md={4} className="text-center">
                <Image
                  src={profile.photo}
                  fluid
                  alt="Profile Photo"
                  style={{
                    maxHeight: "200px",
                    width: "100%",
                    objectFit: "cover",
                    border: "2px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
                <div className="mt-2">
                  <strong>Photo</strong>
                </div>
              </Col>
            )}

            {profile.bioData && (
              <Col sm={12} md={8}>
                <div className="d-flex flex-column justify-content-center h-100">
                  <strong>Biodata:</strong>
                  <a
                    href={profile.bioData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary mt-2"
                  >
                    View / Download Biodata
                  </a>
                </div>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
