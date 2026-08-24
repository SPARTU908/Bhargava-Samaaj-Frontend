import { useState, useEffect } from "react";
import styles from "./MembershipAdminDashboard.module.css";
import MemberAdmin from "../pages/MemberAdmin";
import PendingMemberList from "../pages/PendingMemberList";
import DeletedMembers from "./DeletedMembers";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getMemberCount } from "../apis/member";
import { toast, ToastContainer } from "react-toastify";
import DuplicateMembershipAdmin from "../pages/DuplicateMembershipAdmin";
import "react-toastify/dist/ReactToastify.css";

const MembershipAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const count = await getMemberCount();
        setMemberCount(count);
      } catch (err) {
        console.error("Error fetching pending form count:", err);
      }
    };

    fetchMemberCount();
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "membership":
        return <MemberAdmin />;
      case "duplicate":
        return <DuplicateMembershipAdmin />;
      case "deleted":
        return <DeletedMembers />;
      default:
        return (
          <>
            <div className={styles.renderSection}>
              <div className={styles.widget}>
                <div className={styles.widgetTitle}>
                  Total no. of membership form
                </div>
                <div className={styles.widgetCount}>{memberCount}</div>
              </div>
            </div>
          </>
        );
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000); // Wait for toast to finish before navigating
  };

  const refreshPage = () => {
    window.location.reload();
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
                  selectedSection === "pending" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("pending")}
              ></div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "membership" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("membership")}
              >
                All Membership Form
              </div>

              <div
                className={`${styles.optionButton} ${
                  selectedSection === "duplicate" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("duplicate")}
              >
                Duplicate Membership Form
              </div>

              <div
                className={`${styles.optionButton} ${
                  selectedSection === "deleted" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("deleted")}
              >
                All Deleted Members
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

export default MembershipAdminDashboard;
