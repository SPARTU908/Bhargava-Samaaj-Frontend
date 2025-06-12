import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatrimonialAdminDashboard.module.css";

const MatrimonialAdminDashboard = () => {
  const navigate = useNavigate();

  // Redirect to Review Form
  const handleReviewForm = () => {
    navigate("/review"); // or your route for review form
  };

  // Redirect to View All Members
  const handleViewMembers = () => {
    navigate("/members"); // or the route where all members can be viewed
  };

  return (
    <div className={styles.container}>
      <h2>Welcome Matrimonial Admin</h2>
      <div className={styles.options}>
        <button className={styles.optionButton} onClick={handleReviewForm}>
          Review Form
        </button>
        <button className={styles.optionButton} onClick={handleViewMembers}>
          View All Members
        </button>
      </div>
    </div>
  );
};

export default MatrimonialAdminDashboard;
