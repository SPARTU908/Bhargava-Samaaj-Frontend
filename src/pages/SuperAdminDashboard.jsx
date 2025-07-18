import { useState,useEffect } from "react";
import styles from "./SuperAdminDashboard.module.css";
import PendingForms from "../pages/PendingForms";
import Members from "../pages/Members";
import MemberAdmin from "../pages/MemberAdmin";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getPendingFormCount } from "../apis/form"; 
import {getApprovedFormCount} from "../apis/form";
import {getMemberCount} from "../apis/member";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PendingMemberList from "./PendingMemberList";


const SuperAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [ memberCount, setMemberCount] = useState(0);
 

  const navigate = useNavigate();

   useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const count = await getPendingFormCount();
        setPendingCount(count);
      } catch (err) {
        console.error("Error fetching pending form count:", err);
      }
    };

    fetchPendingCount();
  }, []);

  
   useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        const count = await getApprovedFormCount();
        setApprovedCount(count);
      } catch (err) {
        console.error("Error fetching pending form count:", err);
      }
    };

    fetchApprovedCount();
  }, []);

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
      case "pending":
        return <PendingForms />;
      case "members":
        return <Members/>;
      case "membership":
        return <MemberAdmin />;
      case "pendingmembership":
        return <PendingMemberList />;
      default:
        return (
          <>
            <div className={styles.renderSection}>
              <div className={styles.widget}>
                <div className={styles.widgetTitle}>
                  Total no. of pending matrimonial form 
                </div>
                <div className={styles.widgetCount}>{pendingCount}</div>
              </div>

              <div className={styles.widget}>
                <div className={styles.widgetTitle}>Total no. of matrimonial form</div>
                <div className={styles.widgetCount}>{approvedCount}</div>
              </div>

              <div className={styles.widget}>
                <div className={styles.widgetTitle}>Total no. of membership form</div>
                <div className={styles.widgetCount}>{memberCount}</div>
              </div>

              <div className={styles.widget}>
                <div className={styles.widgetTitle}>Total no. of pending membership form</div>
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
  }, 4000); 
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
              >
                Pending Matrimonial
              </div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "members" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("members")}
              >
                Approved Matrimonial
              </div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "membership" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("membership")}
              >
              Approved Membership
              </div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "pendingmembership" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("pendingmembership")}
              >
                Pending Membership
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

export default SuperAdminDashboard;
