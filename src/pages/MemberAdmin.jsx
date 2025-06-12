import React, { useEffect, useState } from "react";
import { getAllMembers } from "../apis/member";
import { getAllPayment } from "../apis/payment";
import styles from "./MemberAdmin.module.css";
// import Navbar from "../components/Navbar/Navbar";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const MemberAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getAllMembers();
        setMembers(result);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const result = await getAllPayment();
        setPayment(result);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, []);

  const findPaymentByMember = (email) => {
    return payment.find(
      (p) => p.email?.toLowerCase().trim() === email?.toLowerCase().trim()
    );
  };

  const handleStatusChange = (email, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [email]: newStatus,
    }));
  };
  const handleLogout = () => {
    navigate("/home");
  };

 const filteredMembers = members.filter((member) => {
                  const status = statusMap[member.email] || "Not Set";
                  if (filterStatus === "All") return true;
                  return status === filterStatus;
                });

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>List of all members</div>
          <div>
            <button className={styles.logout} onClick={handleLogout}>
              Log Out
            </button>
          </div>
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
                <th className={styles.title}>Reference</th>
                <th className={styles.title}>ABBS Number of Reference</th>
                <th className={styles.title}>Phone Number of Reference</th>
                <th className={styles.title}>Payer Name</th>
                <th className={styles.title}>Payer Email </th>
                <th className={styles.title}>Payer Mobile </th>
                <th className={styles.title}>Transaction ID</th>
                <th className={styles.title}>Action</th>
                <th className={styles.title}>Status</th>
              </tr>
            </thead>
            <tbody>
             {filteredMembers.map((member, index) => {
                const memberPayment = findPaymentByMember(member.email);
                const currentStatus = statusMap[member.email] || "Not Set";
               

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
                    <td>{member.membership}</td>
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
                    <td>{member.reference}</td>
                    <td>{member.abbsNumber}</td>
                    <td>{member.referenceNumber}</td>
                    <td>{memberPayment?.name || "N/A"}</td>
                    <td>{memberPayment?.email || "N/A"}</td>
                    <td>{memberPayment?.mobile || "N/A"}</td>
                    <td>{memberPayment?.transaction || "N/A"}</td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() =>
                          handleStatusChange(member.email, "Dispatched")
                        }
                      >
                        Dispatch
                      </button>
                      <button
                        className={styles.button2}
                        onClick={() =>
                          handleStatusChange(member.email, "Pending")
                        }
                      >
                        Pending
                      </button>
                    </td>
                    <td>{currentStatus}</td>
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
