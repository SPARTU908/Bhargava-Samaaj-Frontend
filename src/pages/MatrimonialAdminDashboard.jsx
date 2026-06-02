import { useState, useEffect } from "react";
import styles from "./MatrimonialAdminDashboard.module.css";
import PendingForms from "../pages/PendingForms";
import Members from "../pages/Members";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import {
  getPendingFormCount,
  getRejectedFormCount,
  getDeletedForms,
} from "../apis/form";
import { getApprovedFormCount } from "../apis/form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RejectedForm from "./RejectedForm";
import DeletedUser from "./DeletedUser";
import { getAllMagazines } from "../apis/magazine";

import { useAuth } from "../components/AuthContext";
import MagazineFormData from "./MagazineFormData";

const MatrimonialAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [magazines, setMagazines] = useState([]);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
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
    const fetchRejectedCount = async () => {
      try {
        const count = await getRejectedFormCount();
        setRejectedCount(count);
      } catch (err) {
        console.error("Error fetching rejected form count:", err);
      }
    };

    fetchRejectedCount();
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
    const fetchMagazines = async () => {
      try {
        const res = await getAllMagazines();
        if (res.success) {
          setMagazines(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        console.error("Error fetching magazines:", err);
      }
    };

    fetchMagazines();
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "pending":
        return <PendingForms />;
      case "members":
        return <Members />;
      case "rejected":
        return <RejectedForm />;
     case "magazines":
      return <MagazineFormData/>
   

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
                <div className={styles.widgetTitle}>
                  Total no. of matrimonial form
                </div>
                <div className={styles.widgetCount}>{approvedCount}</div>
              </div>

              <div className={styles.widget}>
                <div className={styles.widgetTitle}>
                  Total no. of rejected form
                </div>
                <div className={styles.widgetCount}>{rejectedCount}</div>
              </div>

              
            </div>
          </>
        );
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");

    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
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
                Pending Matrimonial Form
              </div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "members" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("members")}
              >
                Matrimonial Form
              </div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "rejected" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("rejected")}
              >
                Rejected Form
              </div>

              <div
                className={`${styles.optionButton} ${
                  selectedSection === "magazines" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("magazines")}
              >
                Bhargava Patrika DS Forms
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

export default MatrimonialAdminDashboard;
