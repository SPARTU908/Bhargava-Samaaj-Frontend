import React, { useState } from "react";
import { loginMember, uploadMemberForm } from "../apis/member";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoUpload from "../components/PhotoUpload/PhotoUpload";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const SignFormUpload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(
    !localStorage.getItem("memberToken")
  );

  const [loginData, setLoginData] = useState({
    username: "",
    membership: "",
  });

  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.membership) {
      toast.error("Please fill in both username and membership");
      return;
    }

    setLoading(true);
    try {
      const result = await loginMember(loginData);
      if (result.success) {
        localStorage.setItem("memberToken", result.data.token);
        setMemberId(result.data.memberId);
        toast.success("Login successful!");
        setShowLoginModal(false);
      } else {
        toast.error("Login failed: " + result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file to upload");
      return;
    }

    if (!localStorage.getItem("memberToken") || !memberId) {
      toast.error("Please login before uploading");
      setShowLoginModal(true);
      return;
    }

    setUploading(true);
    try {
      await uploadMemberForm(memberId, file);
      setIsFileUploaded(true);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />

      <Modal show={showLoginModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="membership">
  <Form.Label>Membership</Form.Label>
  <Form.Select
    value={loginData.membership}
    onChange={(e) =>
      setLoginData({ ...loginData, membership: e.target.value })
    }
  >
    <option value="">Select membership</option>
    <option value="साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये">
      साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये
    </option>
    <option value="आजीवन सभासद - एकल - 600 रुपये">
      आजीवन सभासद - एकल - 600 रुपये
    </option>
    <option value="आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये">
      आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये
    </option>
    <option value="डुप्लिकेट परिचय शुल्क - ₹50 रुपये">
      डुप्लिकेट परिचय शुल्क - ₹50 रुपये
    </option>
  </Form.Select>
</Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {!showLoginModal && (
        <Container className="py-5">
          {!isFileUploaded ? (
            <>
              <h3 className="mb-4 text-center">Upload Signed Form</h3>
              <Row className="justify-content-center">
                <Col md={6}>
                  <PhotoUpload file={file} setFile={setFile} />
                  <Button
                    variant="success"
                    className="mt-3 w-100"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Uploading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <Alert variant="success" className="text-center">
                  File uploaded successfully!
                </Alert>
                <p>
                                Admin approval is pending. Please wait before proceeding with
                                the payment. <br />
                                An email will be sent to you once your form is approved.
                              </p>
                <div className="text-center">
                  <Button onClick={handleGoToHome} variant="primary">
                    Go to Home
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default SignFormUpload;
