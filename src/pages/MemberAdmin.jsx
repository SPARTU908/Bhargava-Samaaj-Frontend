import React, { useEffect, useState } from "react";
import { getAllMembers } from "../apis/member";
import { getAllPayment } from "../apis/payment";
import styles from "./MemberAdmin.module.css";
import Table from "react-bootstrap/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DisplayForm from "./DisplayForm";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { updateDispatchStatus } from "../apis/member";

const MemberAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResult, paymentsResult] = await Promise.all([
          getAllMembers(),
          getAllPayment(),
        ]);

        console.log("Fetched members:", membersResult);
        console.log("Fetched payments:", paymentsResult);

        // Set raw data
        setMembers(membersResult);
        setPayment(paymentsResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBase64ImageFromUrl = async (imageUrl) => {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  //Generate the pdf

  const membershipTranslations = {
    "साधारण सभासद-द्विवार्षिक सत्र के लिए - 300 रुपये":
      "Regular Member (2 Years) - ₹300",
    "आजीवन सभासद - एकल - 600 रुपये": "Lifetime Member (Single) - ₹600",
    "आजीवन सभासद - युगल-(पति-पत्नी) - 1000 रुपये":
      "Lifetime Member (Couple) - ₹1000",
    "डुप्लिकेट परिचय शुल्क - ₹50 रुपये": "Duplicate ID Fee - ₹50",
  };

  const generateStyledPDF = async (member) => {
    await document.fonts.ready;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<DisplayForm member={member} />);

    setTimeout(async () => {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add extra pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Form_${member.username || member.email}.pdf`);

      document.body.removeChild(container);
    }, 500);
  };

  const findPaymentByMember = (email) => {
    return payment.find(
      (p) => p.email?.toLowerCase().trim() === email?.toLowerCase().trim()
    );
  };

  //   const handleStatusChange = async (memberId) => {
  //   try {
  //     await updateDispatchStatus(memberId);
  //     setStatusMap((prev) => ({
  //       ...prev,
  //       [memberId]: "Dispatched",
  //     }));
  //     alert("Status updated to Dispatched");
  //   } catch (error) {
  //     console.error("Error updating dispatch status:", error);
  //     alert("Failed to update dispatch status.");
  //   }
  // };

  const handleStatusChange = async (memberId) => {
    try {
      await updateDispatchStatus(memberId);

      // Update both local statusMap and members array
      setStatusMap((prev) => ({
        ...prev,
        [memberId]: "Dispatched",
      }));

      setMembers((prev) =>
        prev.map((m) => (m._id === memberId ? { ...m, isDispatched: true } : m))
      );

      alert("Status updated to Dispatched");
    } catch (error) {
      console.error("Error updating dispatch status:", error);
      alert("Failed to update dispatch status.");
    }
  };

  const filteredMembers = members.filter((member) => {
    const status =
      statusMap[member._id] || (member.isDispatched ? "Dispatched" : "Not Set");
    return filterStatus === "All" || status === filterStatus;
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>List of all members</div>
        </div>
        <div className={styles.filterWrapper}>
          <label htmlFor="statusFilter">Filter by Status: </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Not Set">Not Set</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {loading ? (
          <p>Loading members...</p>
        ) : (
          <Table className={styles.table} responsive>
            <thead>
              <tr>
                <th className={styles.title}>Name</th>
                <th className={styles.title}>Spouse Name</th>
                <th className={styles.title}>Email</th>
                <th className={styles.title}>Spouse Email</th>
                <th className={styles.title}>Mobile</th>
                <th className={styles.title}>Spouse Mobile</th>
                <th className={styles.title}>DOB</th>
                <th className={styles.title}>Address</th>
                <th className={styles.title}>Membership</th>
                <th className={styles.title}>Father Name</th>
                <th className={styles.title}>Pin Code</th>
                <th className={styles.title}>Gotra</th>
                <th className={styles.title}>Kuldevi</th>
                <th className={styles.title}>Signature</th>
                <th className={styles.title}>Spouse Signature</th>
                <th className={styles.title}>Photo</th>
                <th className={styles.title}>Spouse Photo</th>
                <th className={styles.title}>Occupation</th>
                <th className={styles.title}>Payer Name</th>
                <th className={styles.title}>Payer Email </th>
                <th className={styles.title}>Payer Mobile </th>
                <th className={styles.title}>Transaction ID</th>
                <th className={styles.title}>Download Form </th>

                <th className={styles.title}>Action</th>
                <th className={styles.title}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => {
                const memberPayment = findPaymentByMember(member.email);
                const currentStatus = statusMap[member.email] || "Not Set";

                const membershipText =
                  membershipTranslations[member.membership] ||
                  member.membership;

                return (
                  <tr key={index}>
                    <td className={styles.tableData}>{member.username}</td>
                    <td>{member.spouse}</td>
                    <td>{member.email}</td>
                    <td>{member.spouseEmail}</td>
                    <td>{member.mobile}</td>
                    <td>{member.spouseMobile}</td>
                    <td>
                      {new Date(member.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{member.address}</td>
                    <td>{membershipText}</td>
                    <td>{member.fatherName}</td>
                    <td>{member.pincode}</td>
                    <td>{member.gotra}</td>
                    <td>{member.kuldevi}</td>
                    <td>
                      {member.signature && (
                        <img
                          src={member.signature}
                          alt="Signature"
                          style={{ width: "80px", height: "auto" }}
                        />
                      )}
                    </td>
                    <td>
                      {member.spouseSignature && (
                        <img
                          src={member.spouseSignature}
                          alt="Spouse Signature"
                          style={{ width: "80px", height: "auto" }}
                        />
                      )}
                    </td>
                    <td>
                      {member.photo && (
                        <img
                          src={member.photo}
                          alt="Photo"
                          style={{
                            width: "80px",
                            height: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {member.spousePhoto && (
                        <img
                          src={member.spousePhoto}
                          alt="Spouse Photo"
                          style={{
                            width: "80px",
                            height: "auto",
                            borderRadius: "4px",
                          }}
                        />
                      )}
                    </td>
                    <td>{member.occupation}</td>

                    <td>{memberPayment?.name || "N/A"}</td>
                    <td>{memberPayment?.email || "N/A"}</td>
                    <td>{memberPayment?.mobile || "N/A"}</td>
                    <td>{memberPayment?.transactionId || "N/A"}</td>
                    <td>
                      <button
                        className={styles.downloadButton}
                        onClick={() => generateStyledPDF(member)}
                      >
                        Download
                      </button>
                    </td>

                    <td>
                      {member.isDispatched ||
                      statusMap[member._id] === "Dispatched" ? (
                        <button className="btn btn-success" disabled>
                          Dispatched
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() => handleStatusChange(member._id)}
                        >
                          Pending
                        </button>
                      )}
                    </td>

                    <td>
                      {statusMap[member._id] ||
                        (member.isDispatched ? "Dispatched" : "Not Set")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default MemberAdmin;
