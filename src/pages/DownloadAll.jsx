import React, { useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import html2canvas from "html2canvas";
import { getApprovedMembers } from "../apis/form";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const DownloadAll = () => {
  const [members, setMembers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [status, setStatus] = useState("");
  const [eta, setEta] = useState(null);

  const pdfRef = useRef();
  const location = useLocation();

 const formatDOB = (dob) => {
  if (!dob) return "";

  let date;

  if (dob instanceof Date) {
    date = dob;
  }
 
  else if (dob.includes("T")) {
    date = new Date(dob);
  }
  
  else {
    const [year, month, day] = dob.split("-");
    date = new Date(Date.UTC(year, month - 1, day));
  }

  if (isNaN(date.getTime())) return "";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};





  useEffect(() => {
    if (location.state?.filteredMembers) {
      setMembers(
        location.state.filteredMembers.map((m, i) => ({
          ...m,
          index: i,
        }))
      );
    } else {
      const load = async () => {
        const all = await getApprovedMembers();
        const approved = all.filter((m) => m.status === "approved");

        setMembers(
          approved.map((m, i) => ({
            ...m,
            index: i,
            age: calculateAge(m.dob),
          }))
        );
      };
      load();
    }
  }, [location]);

  const renderTemplate = (member) => {
    return `
    <div style="width:794px;  height: 1123px;margin:0 auto;padding:30px;background:#fff;border-radius:10px;">

      <div style="text-align:center;margin-bottom:10px;"></div>

      <div style="width:100%;text-align:center;margin-bottom:10px;">
        <div style="background:linear-gradient(90deg,#ffddc1,#ffc3a0);width:60%;margin:0 auto;padding:12px 0;border-radius:40px;text-align:center;">
          <h1 style="margin:0;font-weight:900;font-size:26px;color:#c0392b;letter-spacing:2px;">
            ${member.name?.toUpperCase()}
          </h1>
        </div>

        <p style="font-style:italic;color:#555;font-size:16px;margin-top:2px;font-weight:500;">
          ${member.profession || ""}
        </p>
      </div>

      <div style="display:flex;gap:20px;padding-bottom:20px;margin-bottom:20px;">
        
        <div style="padding:6px;border-radius:20px;border:3px dashed #e74c3c;display:inline-block;">
          <div style="border-radius:18px;overflow:hidden;border:2px solid #ffd6d6;">
            <img src="${
              member.photo
            }" style="width:200px;height:240px;object-fit:cover;display:block;" crossorigin="anonymous" />
          </div>
        </div>

        <div style="width:70%;">
          <div style="margin-bottom:10px;display:flex;align-items:center;">
            <div style="width:5px;height:28px;background:#007bff;border-radius:4px;margin-right:10px;"></div>
            <h3 style="color:#e74c3c;font-weight:700;margin:0;">Personal Details</h3>
          </div>

          <div style="width:100%;height:1.5px;background:#e6e6e6;margin-bottom:15px;"></div>

          <div style="display:flex;flex-wrap:wrap;margin-top:10px;">
            
          <p style="width:50%;margin-bottom:0rem;">
  <b>DOB:</b> ${formatDOB(member.dob)}
</p>


            <p style="width:50%;margin-bottom:0rem;"><b>Birth Time:</b> ${
              member.birthTime 
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Birth Place:</b> ${
              member.birthPlace
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Height:</b> ${
              member.height
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Weight:</b> ${
              member.weight
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Blood Group:</b> ${
              member.bloodGroup
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Complexion:</b> ${
              member.complexion
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Manglik:</b> ${
              member.manglik
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Gotra:</b> ${
              member.gotra
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Kuldevi:</b> ${
              member.kuldevi
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Mobile:</b> ${
              member.mobile
            }</p>
            <p style="width:50%;margin-bottom:0rem;"><b>Email:</b> ${
              member.email
            }</p>
            <p style="width:100%;margin-bottom:0rem;"><b>Hobbies:</b> ${
              member.hobbies
            }</p>
            <p style="width:100%;margin-bottom:0rem;"><b>Remarks:</b> <span style="font-size:11px;">${
              member.remarks
            }</span></p>
          </div>
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <div style="margin-bottom:10px;display:flex;align-items:center;">
          <div style="width:5px;height:28px;background:#007bff;border-radius:4px;margin-right:10px;"></div>
          <h3 style="color:#e74c3c;font-weight:700;margin:0;">Education & Profession</h3>
        </div>

        <div style="width:100%;height:1.5px;background:#e6e6e6;margin-bottom:15px;"></div>

        <div style="display:flex;flex-wrap:wrap;margin-top:10px;">
          <p style="width:50%;margin-bottom:0rem;"><b>Education:</b> ${
            member.education
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Other Qualification:</b> ${
            member.otherQualification
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Professional Qualification:</b> ${
            member.professionQualification
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Profession:</b> ${
            member.profession
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Company:</b> ${
            member.company
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Designation:</b> ${
            member.designation
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Income:</b> ${
            member.income
          }</p>
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <div style="margin-bottom:10px;display:flex;align-items:center;">
          <div style="width:5px;height:28px;background:#007bff;border-radius:4px;margin-right:10px;"></div>
          <h3 style="color:#e74c3c;font-weight:700;margin:0;">Family Details</h3>
        </div>

        <div style="width:100%;height:1.5px;background:#e6e6e6;margin-bottom:15px;"></div>

        <div style="display:flex;flex-wrap:wrap;margin-top:10px;">
          <p style="width:50%;margin-bottom:0rem;"><b>Guardian Name:</b> ${
            member.guardianName
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Father Name:</b> ${
            member.fatherName
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Father Profession:</b> ${
            member.fatherProfession
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Father Designation:</b> ${
            member.fatherDesignation
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Father Income:</b> ${
            member.fatherIncome
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Mother Name:</b> ${
            member.motherName
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Native Place:</b> ${
            member.nativePlace
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>Address:</b> ${
            member.address
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>City:</b> ${
            member.city
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>PIN:</b> ${member.pin}</p>
          <p style="width:50%;margin-bottom:0rem;"><b>WhatsApp:</b> ${
            member.whatsapp
          }</p>
          <p style="width:50%;margin-bottom:0rem;"><b>NRI:</b> ${member.nri}</p>
        </div>
      </div>

    </div>
    `;
  };

  const generateImage = async (member) => {
    return new Promise(async (resolve) => {
      pdfRef.current.innerHTML = renderTemplate(member);
      await new Promise((res) => {
        const img = pdfRef.current.querySelector("img");
        if (!img) return res();
        if (img.complete) return res();
        img.onload = res;
        img.onerror = res;
      });

      const canvas = await html2canvas(pdfRef.current, {
        scale: 1,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg,0.85");
      const base64 = imgData.split(",")[1];
      resolve({
        name: `${String(member.index + 1).padStart(3, "0")}_${member.name}.jpg`,
        file: base64,
      });
    });
  };

  const downloadAll = async () => {
    setIsDownloading(true);
    setStatus("Starting batch download...");

    const batchSize = 100;
    const total = members.length;
    let batchNumber = 1;

    for (let start = 0; start < total; start += batchSize) {
      const end = Math.min(start + batchSize, total);
      const batch = members.slice(start, end);

      setStatus(`Generating ZIP batch ${batchNumber} (${start + 1} to ${end})`);
      const zip = new JSZip();

      for (let i = 0; i < batch.length; i++) {
        const member = batch[i];

        setCurrentIndex(start + i + 1);
        setProgress(Math.round(((start + i + 1) / total) * 100));
        setStatus(`Generating image ${start + i + 1} of ${total}`);

        const img = await generateImage(member);
        zip.file(img.name, img.file, { base64: true });

        pdfRef.current.innerHTML = "";
        await new Promise((r) => setTimeout(r, 10));
      }

      setStatus(`Compressing ZIP batch ${batchNumber}...`);
      const zipBlob = await zip.generateAsync({ type: "blob" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(zipBlob);
      a.download = `Biodata_Images_Batch_${batchNumber}.zip`;
      a.click();

      batchNumber++;
    }

    setStatus("All batches downloaded successfully!");
    setIsDownloading(false);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "0 20px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "25px",
            color: "#2C3E50",
          }}
        >
          📄 Download All Biodata
        </h1>

        {/* Download Card */}
        {!isDownloading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                maxWidth: "380px",
              }}
            >
              <button
                onClick={downloadAll}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.25s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 123, 255, 0.3)",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#0056d2")}
                onMouseLeave={(e) => (e.target.style.background = "#007bff")}
              >
                📥 Download All as ZIP (Images)
              </button>
            </div>
          </div>
        )}

        {isDownloading && (
          <div
            style={{
              marginTop: "40px",
              background: "#ffffff",
              padding: "30px",
              borderRadius: "14px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.09)",
              maxWidth: "600px",
            }}
          >
            <h3 style={{ marginBottom: 15, color: "#2C3E50" }}>
              Generating Images:{" "}
              <span style={{ color: "#007bff" }}>
                {currentIndex} / {members.length}
              </span>
            </h3>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "26px",
                background: "#eaeaea",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #28a745, #46d36b)",
                  transition: "0.35s ease",
                  borderRadius: "15px",
                }}
              ></div>
            </div>

            <p
              style={{
                marginTop: 15,
                fontSize: "16px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              Progress: <b>{progress}%</b>
            </p>

            <p
              style={{
                marginTop: 8,
                fontSize: "15px",
                color: "#444",
              }}
            >
              {status && <b>{status}</b>}
            </p>
          </div>
        )}

        <div
          ref={pdfRef}
          style={{
            position: "absolute",
            top: "-20000px",
            left: "0px",
            opacity: 1,
            pointerEvents: "none",
            zIndex: -1,
          }}
        ></div>
      </div>
    </>
  );
};

export default DownloadAll;
