import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getApprovedMembers } from "../apis/form";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadForm = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchMember = async () => {
      const allMembers = await getApprovedMembers();
      const selected = allMembers.find((m) => m._id === id);
      setMember(selected);
    };
    fetchMember();
  }, [id]);


  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${member.name}_Biodata.pdf`);
  };


  if (!member) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container className="my-5">
  {/* PDF Content */}
  <div ref={pdfRef}>
    <Card className=" shadow-lg border-0 rounded-4 p-4 mb-3 h-auto">
      <Row className="align-items-center">
        <Col md={4} className="text-center">
          <img
            src={member.photo || "https://via.placeholder.com/250x300.png"}
            alt={member.name}
            className="img-fluid rounded-4 border border-3 border-light shadow"
            style={{ height:"auto", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <h2 className="fw-bold text-danger mb-1">{member.name}</h2>
          <p className="text-muted fst-italic mb-4">{member.profession}</p>
             <Card className="mb-3 border-0 shadow-sm">
                 <Card.Body>
                   <h5 className="fw-semibold text-danger border-bottom pb-2">
                   Personal Details
                   </h5>
                  <Row>
                     <Col sm={6}><b>DOB:</b> {new Date(member.dob).toLocaleDateString()}</Col>
                     <Col sm={6}><b>Birth Time:</b> {member.birthTime}</Col>
                     <Col sm={6}><b>Birth Place:</b> {member.birthPlace}</Col>
                     <Col sm={6}><b>Height:</b> {member.height}</Col>
                     <Col sm={6}><b>Weight:</b> {member.weight}</Col>
                     <Col sm={6}><b>Blood Group:</b> {member.bloodGroup}</Col>
                     <Col sm={6}><b>Complexion:</b> {member.complexion}</Col>
                     <Col sm={6}><b>Manglik:</b> {member.manglik}</Col>
                     <Col sm={6}><b>Gotra:</b> {member.gotra}</Col>
                     <Col sm={6}><b>Kuldevi:</b> {member.kuldevi}</Col>
                     <Col sm={6}><b>Gender:</b> {member.gender}</Col>
                     <Col sm={6}><b>Mobile:</b> {member.mobile}</Col>
                     <Col sm={6}><b>Email:</b> {member.email}</Col>
                     <Col sm={12}><b>Hobbies:</b> {member.hobbies}</Col>
                     <Col sm={12}><b>Remarks:</b> {member.remarks}</Col>
                   </Row>
                 </Card.Body>
               </Card>

               {/* Education & Profession */}
               <Card className="mb-3 border-0 shadow-sm">
                 <Card.Body>
                   <h5 className="fw-semibold text-danger border-bottom pb-2">
                     Education & Profession
                   </h5>
                   <Row>
                     <Col sm={6}><b>Education:</b> {member.education}</Col>
                     <Col sm={6}><b>Other Qualification:</b> {member.otherQualification}</Col>
                     <Col sm={6}><b>Professional Qualification:</b> {member.professionQualification}</Col>
                     <Col sm={6}><b>Profession:</b> {member.profession}</Col>
                     <Col sm={6}><b>Company:</b> {member.company}</Col>
                     <Col sm={6}><b>Designation:</b> {member.designation}</Col>
                     <Col sm={6}><b>Income:</b> {member.income}</Col>
                 </Row>
                 </Card.Body>
               </Card>

               {/* Family Details */}
               <Card className="mb-3 border-0 shadow-sm">
                 <Card.Body>
                   <h5 className="fw-semibold text-danger border-bottom pb-2">
                     Family Details
                   </h5>
                   <Row>
                   <Col sm={6}><b>Guardian Name:</b> {member.guardianName}</Col>
                    <Col sm={6}><b>Father Name:</b> {member.fatherName}</Col>
                     <Col sm={6}><b>Father Profession:</b> {member.fatherProfession}</Col>
                     <Col sm={6}><b>Father Designation:</b> {member.fatherDesignation}</Col>
                     <Col sm={6}><b>Father Income:</b> {member.fatherIncome}</Col>
                     <Col sm={6}><b>Mother Name:</b> {member.motherName}</Col>
                     <Col sm={6}><b>Native Place:</b> {member.nativePlace}</Col>
                     <Col sm={6}><b>Address:</b> {member.address}</Col>
                     <Col sm={6}><b>City:</b> {member.city}</Col>
                     <Col sm={6}><b>PIN:</b> {member.pin}</Col>
                     <Col sm={6}><b>WhatsApp:</b> {member.whatsapp}</Col>
                     <Col sm={6}><b>NRI:</b> {member.nri}</Col>
                  </Row>
               </Card.Body>
               </Card>
        </Col>
      </Row>
    </Card>
  </div>

  {/* Download PDF Button */}
  <div className="text-end mt-3">
    <Button variant="danger" onClick={handleDownloadPDF}>
      📄 Download Biodata
    </Button>
  </div>
</Container>

  );
};

export default DownloadForm;


