import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import styles from "./PendingForms.module.css";
import MemberInfo from "../pages/MemberInfo";

const PendingForms = () => {
  const [pendingForms, setPendingForms] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchPendingForms = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/form/admin/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPendingForms(res.data);
      } catch (err) {
        console.error("Failed to fetch pending forms", err);
      }
    };

    fetchPendingForms();
  }, [token]);

  const handleReview = async (formId, action) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/form/admin/review",
        { formId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingForms((prev) => prev.filter((form) => form._id !== formId));
      alert(`Form ${action}d successfully`);
    } catch (err) {
      console.error(err);
      alert("Error performing action");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Pending User Forms</h2>

        {pendingForms.length === 0 ? (
          <p>No pending forms found.</p>
        ) : (
          pendingForms.map((form) => (
            <>
              <div key={form._id} className={styles.card}>
                <div className={styles.name}>{form.name}</div>

                <div className={styles.row1}>
                  <div>
                    <img
                      src={form.photo}
                      alt="Profile"
                      className={styles.photoThumb}
                    />
                  </div>

                  <div className={styles.info}>
                    <MemberInfo member={form} />
                  </div>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleReview(form._id, "approve")}
                    className={styles.approveBtn}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(form._id, "reject")}
                    className={styles.rejectBtn}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default PendingForms;
