// import React, { useEffect, useState } from "react";
// import { getAllMembers } from "../apis/member";
// import styles from "./MemberAdmin.module.css"; // reuse same styling

// const PendingMemberList = () => {
//   const [pendingMembers, setPendingMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPending = async () => {
//       try {
//         const allMembers = await getAllMembers();
//         const filtered = allMembers.filter(
//           (member) => member.isFormApproved === false
//         );
//         setPendingMembers(filtered);
//       } catch (err) {
//         console.error("Error fetching pending members:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPending();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Pending Membership Forms</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : pendingMembers.length === 0 ? (
//         <p>No pending forms found.</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th className={styles.title}>Name</th>
//               <th className={styles.title}>Spouse Name</th>
//               <th className={styles.title}>Email</th>
//               <th className={styles.title}>Spouse Email</th>
//               <th className={styles.title}>Mobile</th>
//               <th className={styles.title}>Spouse Mobile</th>
//               <th className={styles.title}>DOB</th>
//               <th className={styles.title}>Address</th>
//               <th className={styles.title}>Membership</th>
//               <th className={styles.title}>Father Name</th>
//               <th className={styles.title}>Pin Code</th>
//               <th className={styles.title}>Gotra</th>
//               <th className={styles.title}>Kuldevi</th>
//               <th className={styles.title}>Signature</th>
//               <th className={styles.title}>Spouse Signature</th>
//               <th className={styles.title}>Photo</th>
//               <th className={styles.title}>Spouse Photo</th>
//               <th className={styles.title}>Occupation</th>
//               <th className={styles.title}>Uploaded Form</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingMembers.map((member, index) => (
//               <tr key={index}>
//                 <td className={styles.tableData}>{member.username}</td>
//                 <td>{member.spouse}</td>
//                 <td>{member.email}</td>
//                 <td>{member.spouseEmail}</td>
//                 <td>{member.mobile}</td>
//                 <td>{member.spouseMobile}</td>
//                 <td>
//                   {new Date(member.dob).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td>{member.address}</td>
//                 <td>{member.membership}</td>
//                 <td>{member.fatherName}</td>
//                 <td>{member.pincode}</td>
//                 <td>{member.gotra}</td>
//                 <td>{member.kuldevi}</td>
//                 <td>
//                   {member.signature && (
//                     <img
//                       src={member.signature}
//                       alt="Signature"
//                       style={{ width: "80px", height: "auto" }}
//                     />
//                   )}
//                 </td>
//                 <td>
//                   {member.spouseSignature && (
//                     <img
//                       src={member.spouseSignature}
//                       alt="Spouse Signature"
//                       style={{ width: "80px", height: "auto" }}
//                     />
//                   )}
//                 </td>
//                 <td>
//                   {member.photo && (
//                     <img
//                       src={member.photo}
//                       alt="Photo"
//                       style={{
//                         width: "80px",
//                         height: "auto",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   )}
//                 </td>
//                 <td>
//                   {member.spousePhoto && (
//                     <img
//                       src={member.spousePhoto}
//                       alt="Spouse Photo"
//                       style={{
//                         width: "80px",
//                         height: "auto",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   )}
//                 </td>
//                 <td>{member.occupation}</td>
//                 <td>
//                   {member.uploadForm ? (
//                     <a
//                       href={member.uploadForm}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View
//                     </a>
//                   ) : (
//                     "Not Uploaded"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PendingMemberList;


import React, { useEffect, useState } from "react";
import { getAllMembers, updateMemberStatus } from "../apis/member"; // Assuming you have this API
import styles from "./PendingMemberList.module.css";

const PendingMemberList = () => {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); // to track which member is updating

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  const fetchPendingMembers = async () => {
    setLoading(true);
    try {
      const allMembers = await getAllMembers();
      const filtered = allMembers.filter((member) => member.isFormApproved === false);
      setPendingMembers(filtered);
    } catch (err) {
      console.error("Error fetching pending members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (memberId, status) => {
  setUpdatingId(memberId);
  try {
    // Call API to update member status: true for approve, false for reject
    await updateMemberStatus(memberId, { isFormApproved: status });

    // Remove updated member from pending list (since approved or rejected)
    setPendingMembers((prev) => prev.filter((m) => m._id !== memberId));

    // Show an alert popup based on status
    const action = status ? "approved" : "rejected";
    alert(`The membership form has been ${action} successfully.`); // Display success alert
  } catch (err) {
    console.error("Failed to update member status:", err);
    alert("Failed to update status, please try again."); // Display error alert
  } finally {
    setUpdatingId(null);
  }
};


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pending Membership Forms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingMembers.length === 0 ? (
        <p>No pending forms found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.title}>Name</th>
                <th className={styles.title}>Spouse Name</th>
                <th className={styles.title}>Email</th>
                <th className={styles.title}>Spouse Email</th>
                <th className={styles.title}>Mobile</th>
                <th className={styles.title}>Spouse Mobile</th>
                <th className={styles.title}>DOB</th>
                <th className={styles.title}>Address</th>
                <th className={styles.title}>Membership</th>
                <th className={styles.title}>Father Name</th>
                <th className={styles.title}>Pin Code</th>
                <th className={styles.title}>Gotra</th>
                <th className={styles.title}>Kuldevi</th>
                <th className={styles.title}>Signature</th>
                <th className={styles.title}>Spouse Signature</th>
                <th className={styles.title}>Photo</th>
                <th className={styles.title}>Spouse Photo</th>
                <th className={styles.title}>Occupation</th>
                <th className={styles.title}>Download Form</th>
                <th className={styles.title}>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {pendingMembers.map((member, index) => (
                <tr key={member._id}>
                  <td>{member.username}</td>
                  <td>{member.spouse}</td>
                  <td>{member.email}</td>
                  <td>{member.spouseEmail}</td>
                  <td>{member.mobile}</td>
                  <td>{member.spouseMobile}</td>
                  <td>
                    {new Date(member.dob).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{member.address}</td>
                  <td>{member.membership}</td>
                  <td>{member.fatherName}</td>
                  <td>{member.pincode}</td>
                  <td>{member.gotra}</td>
                  <td>{member.kuldevi}</td>
                  <td>
                    {member.signature && <img src={member.signature} alt="Signature" style={{ width: "80px" }} />}
                  </td>
                  <td>
                    {member.spouseSignature && (
                      <img src={member.spouseSignature} alt="Spouse Signature" style={{ width: "80px" }} />
                    )}
                  </td>
                  <td>
                    {member.photo && (
                      <img src={member.photo} alt="Photo" style={{ width: "80px", borderRadius: "4px" }} />
                    )}
                  </td>
                  <td>
                    {member.spousePhoto && (
                      <img src={member.spousePhoto} alt="Spouse Photo" style={{ width: "80px", borderRadius: "4px" }} />
                    )}
                  </td>
                  <td>{member.occupation}</td>
                  <td>
                    {member.uploadForm ? (
                      <a href={member.uploadForm} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    ) : (
                      "Not Uploaded"
                    )}
                  </td>
                  <td>
                    <button
                      disabled={updatingId === member.id}
                    onClick={() => handleStatusChange(member._id, true)}
                      className={styles.approveButton}
                    >
                      Approve
                    </button>
                    <button
                      disabled={updatingId === member.id}
                     onClick={() => handleStatusChange(member._id, false)}
                      className={styles.rejectButton}
                      style={{ marginLeft: "8px" }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingMemberList;
