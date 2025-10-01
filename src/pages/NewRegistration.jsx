import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Image,
} from "react-bootstrap";
import { searchLifeMember, updateLifeMember } from "../apis/lifemember";
import Navbar from "../components/Navbar/Navbar.jsx";

const NewRegistration = () => {
  const [lm_no, setLmNo] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const handleSearch = async () => {
    try {
      const data = await searchLifeMember(lm_no);
      const enrichedData = {
        ...data,
        gotra: data.gotra || "",
        kuldevi: data.kuldevi || "",
        category: data.category || "",
        gender:data.gender||"",
      };

      setMember(enrichedData);
      setError("");
      setSuccess("");
    } catch (err) {
      setError(err.message || "Error fetching member.");
      setMember(null);
    }
  };

  const handleChange = (field, value) => {
    setMember((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append only fields that were empty and are now filled
    Object.entries(member).forEach(([key, value]) => {
      if (value && value !== "") {
        formData.append(key, value);
      }
    });

    if (e.target.photo?.files[0]) {
      formData.append("photo", e.target.photo.files[0]);
    }

    try {
      const res = await updateLifeMember(lm_no, formData);
      setSuccess("Member updated successfully!");
      setError("");
    } catch (err) {
      setError(err.message || "Error updating member.");
      setSuccess("");
    }
  };

  const renderInputField = (label, field, type = "text") => {
    const isEditable = member[field] === "";
    return (
      <Form.Group as={Col} md={6} className="mb-3" controlId={field}>
        <Form.Label>
          <strong>{label}</strong>
        </Form.Label>
        <Form.Control
          type={type}
          value={member[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={isEditable ? `Enter ${label}` : ""}
          disabled={!isEditable}
        />
      </Form.Group>
    );
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-4">Enter Your ABBS Membership No.</h2>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="text"
                value={lm_no}
                onChange={(e) => setLmNo(e.target.value)}
                placeholder="Enter LM No"
                className="me-2"
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        {error && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {success && (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            </Col>
          </Row>
        )}

        {member && (
          <Card className="shadow-lg h-auto">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <Image
                      src={member.photo}
                      rounded
                      fluid
                      alt="Member"
                      style={{ maxHeight: "200px", border: "1px solid #ddd" }}
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />
                    <Form.Group controlId="photo" className="mt-3">
                      <Form.Label>Update Photo </Form.Label>
                      <Form.Control type="file" name="photo" />
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Row>
                      {renderInputField("Life Membership No.", "lm_no")}
                      {renderInputField("Year", "year")}
                      {renderInputField("Mr/Mrs/Miss", "col_y")}
                      {renderInputField("Member Name", "member_name")}
                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="card_issue"
                      >
                        <Form.Label>
                          <strong>Card Issue</strong>
                        </Form.Label>
                        <Form.Select
                          value={member.card_issue}
                          onChange={(e) =>
                            handleChange("card_issue", e.target.value)
                          }
                          disabled={member.card_issue !== ""}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group>
                      {renderInputField("DOB", "dob", "date")}
                      {renderInputField("Address Line-1", "add")}
                      {renderInputField("Address Line-2", "address1")}
                      {renderInputField("Extra Address", "address_extra")}
                      {renderInputField("City", "city")}
                      {renderInputField("PIN Code", "pin")}
                      {renderInputField("Contact No", "contact_no")}
                      {renderInputField("Email", "email")}
                      {renderInputField("Gotra", "gotra")}
                      {renderInputField("Kuldevi", "kuldevi")}
                      {renderInputField("Gender", "gender")}
                      <Form.Group
                        as={Col}
                        md={6}
                        className="mb-3"
                        controlId="category"
                      >
                        <Form.Label>
                          <strong>Category</strong>
                        </Form.Label>
                        <Form.Select
                          value={member.category}
                          onChange={(e) =>
                            handleChange("category", e.target.value)
                          }
                        >
                          <option value="">Select Category</option>
                          <option value="Delegate">Delegate</option>
                          <option value="Parent of Marriageable Candidate">
                            Parent of Marriageable Candidate
                          </option>
                          <option value="Marriageable Candidate">
                            Marriageable Candidate
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button variant="success" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default NewRegistration;
