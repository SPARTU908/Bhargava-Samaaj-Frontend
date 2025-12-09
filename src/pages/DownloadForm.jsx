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

    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      // allowTaint: true,
      backgroundColor: null,
      // logging: false,
      // imageTimeout: 0,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${member.name}_Biodata.pdf`);
  };

  if (!member) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container className="my-5">
      <div
        ref={pdfRef}
        style={{
          width: "794px",
          margin: "0 auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10px" }}></div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #ffddc1, #ffc3a0)",
              width: "60%",
              margin: "0 auto",
              padding: "12px 0",
              borderRadius: "40px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontWeight: "900",
                fontSize: "26px",
                color: "#c0392b",
                letterSpacing: "2px",
              }}
            >
              {member.name?.toUpperCase()}
            </h1>
          </div>

          <p
            style={{
              fontStyle: "italic",
              color: "#555",
              fontSize: "16px",
              marginTop: "2px",
              fontWeight: "500",
            }}
          >
            {member.profession}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",

            paddingBottom: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              padding: "6px",
              borderRadius: "20px",
              border: "3px dashed #e74c3c",
              display: "inline-block",
            }}
          >
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                border: "2px solid #ffd6d6",
              }}
            >
              <img
                src={member.photo}
                // crossOrigin="anonymous"
                // referrerPolicy="no-referrer"

                alt="profile"
                style={{
                  width: "200px",
                  height: "240px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          <div style={{ width: "70%" }}>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "28px",
                  background: "#007bff",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              ></div>

              <h3
                style={{
                  color: "#e74c3c",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                Personal Details
              </h3>
            </div>

            <div
              style={{
                width: "100%",
                height: "1.5px",
                background: "#e6e6e6",
                marginBottom: "15px",
              }}
            ></div>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>DOB:</b> {new Date(member.dob).toLocaleDateString()}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Birth Time:</b> {member.birthTime}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Birth Place:</b> {member.birthPlace}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Height:</b> {member.height}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Weight:</b> {member.weight}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Blood Group:</b> {member.bloodGroup}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Complexion:</b> {member.complexion}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Manglik:</b> {member.manglik}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Gotra:</b> {member.gotra}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Kuldevi:</b> {member.kuldevi}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Mobile:</b> {member.mobile}
              </p>
              <p style={{ width: "50%", marginBottom: "0rem" }}>
                <b>Email:</b> {member.email}
              </p>

              <p style={{ width: "100%", marginBottom: "0rem" }}>
                <b>Hobbies:</b> {member.hobbies}
              </p>
              <p style={{ width: "100%", marginBottom: "0rem" }}>
                <b>Remarks:</b>{" "}
                <span style={{ fontSize: "11px" }}>{member.remarks}</span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "28px",
                background: "#007bff",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            ></div>

            <h3
              style={{
                color: "#e74c3c",
                fontWeight: "700",
                margin: 0,
              }}
            >
              Education & Profession
            </h3>
          </div>

          <div
            style={{
              width: "100%",
              height: "1.5px",
              background: "#e6e6e6",
              marginBottom: "15px",
            }}
          ></div>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Education:</b> {member.education}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Other Qualification:</b> {member.otherQualification}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Professional Qualification:</b>{" "}
              {member.professionQualification}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Profession:</b> {member.profession}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Company:</b> {member.company}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Designation:</b> {member.designation}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Income:</b> {member.income}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "28px",
                background: "#007bff",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            ></div>

            <h3
              style={{
                color: "#e74c3c",
                fontWeight: "700",
                margin: 0,
              }}
            >
              Family Details
            </h3>
          </div>

          <div
            style={{
              width: "100%",
              height: "1.5px",
              background: "#e6e6e6",
              marginBottom: "15px",
            }}
          ></div>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Guardian Name:</b> {member.guardianName}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Father Name:</b> {member.fatherName}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Father Profession:</b> {member.fatherProfession}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Father Designation:</b> {member.fatherDesignation}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Father Income:</b> {member.fatherIncome}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Mother Name:</b> {member.motherName}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Native Place:</b> {member.nativePlace}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>Address:</b> {member.address}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>City:</b> {member.city}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>PIN:</b> {member.pin}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>WhatsApp:</b> {member.whatsapp}
            </p>
            <p style={{ width: "50%", marginBottom: "0rem" }}>
              <b>NRI:</b> {member.nri}
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}></div>
      </div>

      <div className="text-end mt-3">
        <Button variant="danger" onClick={handleDownloadPDF}>
          📄 Download Biodata
        </Button>
      </div>
    </Container>
  );
};

export default DownloadForm;


