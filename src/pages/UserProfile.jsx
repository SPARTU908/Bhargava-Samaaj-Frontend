import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";

const UserProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`${BACKEND_URL}/api/v1/form/${userEmail}`)
      .then((res) => {
        const { _id, __v, password, photo,bioData,status,submittedAt,createdAt, updatedAt, ...cleaned } = res.data;
        setProfile(cleaned);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center py-5 text-danger">User profile not found.</div>;
  }

  return (
    <Container className="py-4">
      <Card className="shadow-lg h-auto">
        <Card.Header className="text-white bg-primary text-center">
          <h4 style={{ margin: 0 }}>My Profile</h4>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {Object.entries(profile).map(([key, value]) => {
              if (!value || key === "photo" || key === "bioData") return null;

              const label = key
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
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
