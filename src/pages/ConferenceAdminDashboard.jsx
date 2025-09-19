import { useState, useEffect } from "react";
import styles from "./ConferenceAdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers } from "../apis/registration";
import { getAllAwardUsers } from "../apis/awardForm";  
import { Table } from "react-bootstrap";

const ConferenceAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [awardForms, setAwardForms] = useState([]);
  const [totalAwardForms, setTotalAwardForms] = useState(0);

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (res?.users) {
          setRegisteredUsers(res.users);
          setTotalUsers(res.users.length);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchAwardForms = async () => {
      try {
        const res = await getAllAwardUsers();
        if (res?.awardForms) {
          setAwardForms(res.awardForms);
          setTotalAwardForms(res.awardForms.length);
        }
      } catch (err) {
        console.error("Error fetching award forms:", err);
      }
    };

    fetchUsers();
    fetchAwardForms();
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "allUsers":
        return (
          <div className={styles.userTableWrapper}>
            <h4 className="mb-3">Registered Users</h4>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ABBS Membership No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Pin Code</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Mobile No</th>
                  <th>Photo</th>
                  <th>Payment Slip</th>
                </tr>
              </thead>
              <tbody>
                {registeredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.abbsMembershipNo}</td>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{new Date(user.dob).toLocaleDateString()}</td>
                    <td>{user.address}</td>
                    <td>{user.city}</td>
                    <td>{user.pincode}</td>
                    <td>{user.email}</td>
                    <td>{user.category}</td>
                    <td>{user.mobileNo}</td>
                    <td>
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt="User Photo"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {user.paymentSlip ? (
                        <a
                          href={user.paymentSlip}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={user.paymentSlip}
                            alt="Payment Slip"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      case "awardForms":
        return (
          <div className={styles.userTableWrapper}>
            <h4 className="mb-3">Award Form Submissions</h4>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code1</th>
                  <th>Code2</th>
                  <th>Code3</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Pincode</th>
                  <th>Qualification</th>
                  <th>Father's Name</th>
                  <th>Mother's Name</th>
                  <th>Spouse Name</th>
                  <th>Photo</th>
                  <th>Document1</th>
                  <th>Document2</th>
                  <th>Proposer Name</th>
                  <th>Proposer Email</th>
                  <th>Proposer Mobile</th>
                  <th>Proposer Address</th>
                </tr>
              </thead>
              <tbody>
                {awardForms.map((users, index) => (
                  <tr key={users._id}>
                    <td>{index + 1}</td>
                    <td>{users.code1}</td>
                    <td>{users.code2}</td>
                    <td>{users.code3}</td>
                    <td>{users.name}</td>
                  <td>{new Date(users.dob).toLocaleDateString()}</td>
                    <td>{users.email}</td>
                    <td>{users.mobile}</td>
                    <td>{users.pin}</td>
                    <td>{users.academicQualification}</td>
                    <td>{users.father}</td>
                    <td>{users.mother}</td>
                    <td>{users.spouse}</td>
                    <td>
                      {users.photo ? (
                        <img
                         src={users.photo}
                          alt="Form Photo"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {users.document1 ? (
                        <a
                         href={users.document1}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                               src={users.document1}
                            alt="Document 1"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {users.document2 ? (
                        <a
                           href={users.document2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                               src={users.document2}
                            alt="Document 2"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{users.proposerName}</td>
                    <td>{users.proposalEmail}</td>
                   <td>{users.proposalMobile}</td>
                   <td>{users.proposalAddress}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      default:
        return (
          <div className={styles.renderSection}>
            <div className={styles.widget}>
              <div className={styles.widgetTitle}>
                Total number of registered conference users
              </div>
              <div className={styles.widgetCount}>{totalUsers}</div>
            </div>
            <div className={styles.widget} style={{ marginTop: "20px" }}>
              <div className={styles.widgetTitle}>
                Total number of Award Form submissions
              </div>
              <div className={styles.widgetCount}>{totalAwardForms}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.title}>Welcome</div>
          <div className={styles.dashboard} onClick={refreshPage}>
            <IoMdHome className={styles.home} />
            Dashboard
          </div>
          <div className={styles.options}>
            <div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "allUsers" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("allUsers")}
              >
                All Registered Users
              </div>
            </div>
            <div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "awardForms" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("awardForms")}
              >
                Award Form Submissions
              </div>
            </div>
          </div>
          <div className={styles.logoutWrapper}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.sectionContent}>{renderSection()}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ConferenceAdminDashboard;
