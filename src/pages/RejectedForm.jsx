import React, { useEffect, useState } from "react";
import { getRejectedForms } from "../apis/form";
import styles from "./RejectedForm.module.css";

const RejectedForm = () => {
  const [rejectedForms, setRejectedForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRejectedForms = async () => {
      try {
        const forms = await getRejectedForms();
        setRejectedForms(forms);
      } catch (err) {
        setError("Failed to load rejected forms");
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedForms();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Rejected Member Forms</h2>

      {loading ? (
        <p className={styles.statusMessage}>Loading...</p>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : rejectedForms.length === 0 ? (
        <p className={styles.statusMessage}>No rejected forms found.</p>
      ) : (
        <ul className={styles.formList}>
          {rejectedForms.map((form) => (
            <li key={form._id} className={styles.formItem}>
              <div className={styles.formInfo}>
                <h4>{form.name}</h4>
                <p className={styles.email}>{form.email}</p>
              </div>
              <div className={styles.statusBox}>
                <span className={styles.rejected}>Rejected</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RejectedForm;
