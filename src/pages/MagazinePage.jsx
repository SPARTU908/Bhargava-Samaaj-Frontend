import React from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import DownloadFormMagazine from "./DownloadForm";
import Navbar from "../components/Navbar/Navbar";

const MagazinePage = () => {
  const location = useLocation();
  const members = location.state?.members || [];

  const itemsPerPage = 3; 

  // Split into pages
  const pages = [];
  for (let i = 0; i < members.length; i += itemsPerPage) {
    pages.push(members.slice(i, i + itemsPerPage));
  }

  // Download specific page
  const downloadPage = (index) => {
    const element = document.getElementById(`page-${index}`);

    const opt = {
      margin: 5,
      filename: `Magazine_Page_${index + 1}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  // Download ALL pages
  const downloadAll = () => {
    const element = document.getElementById("all-pages");

    const opt = {
      margin: 5,
      filename: `Magazine_All.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
   <Navbar/>
    <div style={{ padding: "20px" }}>
      <h2>Magazine Preview</h2>

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {pages.map((_, i) => (
          <button key={i} onClick={() => downloadPage(i)}>
            Download Page {i + 1}
          </button>
        ))}

        <button onClick={downloadAll} style={{ marginLeft: "10px" }}>
          Download All
        </button>
      </div>

      {/* All Pages Wrapper */}
      <div id="all-pages">
        {pages.map((pageMembers, i) => (
          <div
            key={i}
            id={`page-${i}`}
            style={{
              pageBreakAfter: "always",
              border: "1px solid #000",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            <DownloadFormMagazine members={pageMembers} />
          </div>
        ))}
      </div>
    </div>
     </>
  );
};

export default MagazinePage;