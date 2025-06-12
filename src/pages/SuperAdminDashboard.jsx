// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./MatrimonialAdminDashboard.module.css";

// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();


//   const handleReviewForm = () => {
//     navigate("/review"); 
//   };

  
//   const handleViewMembers = () => {
//     navigate("/members"); 
//   };
//   const handleMembership =() => {
//     navigate("/memberadmin")
//   }

//   return (
//     <div className={styles.container}>
//       <h2>Welcome Super Admin</h2>
//       <div className={styles.options}>
//         <button className={styles.optionButton} onClick={handleReviewForm}>
//           Review Form
//         </button>
//         <button className={styles.optionButton} onClick={handleViewMembers}>
//           View All Members
//         </button>
//         <button className={styles.optionButton} onClick={handleMembership}> 
//             Membership Form 
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;



import { useNavigate } from "react-router-dom";
import styles from "./MatrimonialAdminDashboard.module.css";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const handleReviewForm = () => {
    navigate("/review");
  };

  const handleViewMembers = () => {
    navigate("/members");
  };

  const handleMembership = () => {
    navigate("/memberadmin");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Super Admin</h2>
      <div className={styles.options}>
        <button className={styles.optionButton} onClick={handleReviewForm}>
          Review Form
        </button>
        <button className={styles.optionButton} onClick={handleViewMembers}>
          View All Members
        </button>
        <button className={styles.optionButton} onClick={handleMembership}>
          Membership Form
        </button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

