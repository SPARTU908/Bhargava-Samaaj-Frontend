import { useState } from "react";
import styles from "./UserDashboard.module.css";
import { IoMdHome } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BiodataUser from "./BiodataUser";
import EditUserForm from "./EditUserForm";
import UserProfile from "./UserProfile";

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
     localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };




  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return <UserProfile />;
      case "browse":
        return <BiodataUser />;
      case "edit":
        return <EditUserForm />;
      default:
        return (
          <div className={styles.welcomeText}>
            Welcome to your dashboard. Select an option from the menu.
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.title}>Welcome</div>

          <div className={styles.dashboard} onClick={() => setSelectedSection("home")}>
            <IoMdHome className={styles.homeIcon} />
            Dashboard
          </div>

          <div className={styles.options}>
            <div
              className={`${styles.optionButton} ${
                selectedSection === "profile" ? styles.activeButton : ""
              }`}
              onClick={() => setSelectedSection("profile")}
            >
              My Profile
            </div>

            <div
              className={`${styles.optionButton} ${
                selectedSection === "browse" ? styles.activeButton : ""
              }`}
              onClick={() => setSelectedSection("browse")}
            >
              Browse Biodatas
            </div>

            <div
              className={`${styles.optionButton} ${
                selectedSection === "edit" ? styles.activeButton : ""
              }`}
              onClick={() => setSelectedSection("edit")}
            >
              Edit My Form
            </div>
          </div>

          <div className={styles.logoutWrapper}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.right}>
          <div className={styles.sectionContent}>{renderSection()}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserDashboard;
