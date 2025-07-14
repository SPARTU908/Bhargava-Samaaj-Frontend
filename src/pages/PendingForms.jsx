import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PendingForms.module.css";
import MemberInfo from "../pages/MemberInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingForms = () => {
  const [pendingForms, setPendingForms] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const token = localStorage.getItem("adminToken");

  // ✅ Fetch both forms and members on mount
  useEffect(() => {
    const fetchPendingForms = async () => {
      try {
        const reqUrl = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/form/admin/pending`;
        const res = await axios.get(reqUrl, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPendingForms(res.data);
      } catch (err) {
        console.error("Failed to fetch pending forms", err);
      }
    };

    const fetchPendingMembers = async () => {
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/pending`;
        const res = await axios.get(reqUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingMembers(res.data.members); // <-- members array is inside `res.data.members`
      } catch (err) {
        console.error("Failed to fetch pending members", err);
      }
    };

    fetchPendingForms();
    fetchPendingMembers();
  }, [token]);

  const handleReview = async (formId, action) => {
    try {
      const reqUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/form/admin/review`;
      await axios.post(
        reqUrl,
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

  // const handleMemberReview = async (memberId, action) => {
  //   try {
  //     const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/review`;
  //     const res = await axios.post(
  //       reqUrl,
  //       { memberId, action },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     // Update the member status locally
  //     const updated = res.data.member;
  //     setPendingMembers((prev) =>
  //       prev.map((m) => (m._id === updated._id ? updated : m))
  //     );

  //     toast.success(res.data.message, {
  //       position: "top-center",
  //       autoClose: 3000,
  //       theme: "light",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error updating member status");
  //   }
  // };

  const handleMemberReview = async (memberId, action) => {
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/review`;
      const res = await axios.post(
        reqUrl,
        { memberId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data.member;

      // ✅ Remove member from list if status is no longer "pending"
      if (updated.status !== "pending") {
        setPendingMembers((prev) => prev.filter((m) => m._id !== updated._id));
      } else {
        // Otherwise, update the status in place
        setPendingMembers((prev) =>
          prev.map((m) => (m._id === updated._id ? updated : m))
        );
      }

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    } catch (err) {
      console.error(err);
      alert("Error updating member status");
    }
  };

  return (
    <div className={styles.container}>
      {/* SECTION: Pending Forms */}
      <h2 className={styles.title}>Pending User Forms</h2>
      {pendingForms.length === 0 ? (
        <p>No pending forms found.</p>
      ) : (
        pendingForms.map((form) => (
          <div key={form._id} className={styles.card}>
            <div className={styles.name}>{form.name}</div>
            <div className={styles.row1}>
              <div>
                {form.photo?.toLowerCase().endsWith(".pdf") ? (
                  <a
                    href={form.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>View Image</button>
                  </a>
                ) : (
                  <img
                    src={form.photo}
                    alt="Profile"
                    className={styles.photoThumb}
                  />
                )}
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
        ))
      )}

      {/* SECTION: Pending Vivah Members */}
      <h2 className={styles.title}>Pending Login Request</h2>
      {pendingMembers.length === 0 ? (
        <p>No pending Vivah members found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Membership No.</th>
                <th>City</th>
                <th>Gender</th>
                <th>Gotra</th>
                <th>Kuldevi</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.membershipno}</td>
                  <td>{member.city}</td>
                  <td>{member.gender}</td>
                  <td>{member.gotra}</td>
                  <td>{member.kuldevi}</td>
                  <td>{member.status}</td>
                  <td>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.approveBtn}
                        onClick={() =>
                          handleMemberReview(member._id, "approve")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleMemberReview(member._id, "reject")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PendingForms;
