import { useState, useEffect } from "react";
import styles from "./ConferenceAdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers } from "../apis/registration";
import { Table } from "react-bootstrap";

const ConferenceAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

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

    fetchUsers();
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
                          src={`${BACKEND_URL}/uploads/${user.photo}`}
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
                          href={`${BACKEND_URL}/uploads/${user.paymentSlip}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${BACKEND_URL}/uploads/${user.paymentSlip}`}
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
      default:
        return (
          <div className={styles.renderSection}>
            <div className={styles.widget}>
              <div className={styles.widgetTitle}>
                Total number of registered conference users
              </div>
              <div className={styles.widgetCount}>{totalUsers}</div>
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
