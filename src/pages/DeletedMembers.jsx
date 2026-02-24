import React, { useEffect, useState } from "react";
import { getAllMembers } from "../apis/member";
import Table from "react-bootstrap/Table";
import styles from "./MemberAdmin.module.css";

const DeletedMembers = () => {
  const [members, setMembers] = useState([]);
  const [deletedMembers, setDeletedMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const allMembers = await getAllMembers();

        const deletedIds = JSON.parse(
          localStorage.getItem("deletedMemberIds") || "[]"
        );

        const filtered = allMembers.filter((member) =>
          deletedIds.includes(member._id)
        );

        setMembers(allMembers);
        setDeletedMembers(filtered);
      } catch (error) {
        console.error("Error fetching deleted members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>All Deleted Members</div>
      </div>

      {loading ? (
        <p>Loading deleted members...</p>
      ) : deletedMembers.length === 0 ? (
        <p>No deleted members found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <Table className={styles.table} responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {deletedMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.username}</td>
                  <td>{member.email}</td>
                  <td>{member.mobile}</td>
                  <td>{member.membership}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DeletedMembers;