import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { getAllUsers } from "../apis/form";
import styles from "./AllUsers.module.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 50;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        console.log("All users:", data);

        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching all users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(users.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = users.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // =========================
  // DOWNLOAD EXCEL
  // =========================

  const downloadExcel = () => {
    if (!users.length) {
      alert("No users available to download.");
      return;
    }

    const excelData = users.map((user, index) => ({
      "S.No": index + 1,

      "Number": user.number || "",
      "Name": user.name || "",
      "Email": user.email || "",
      "Mobile": user.mobile || "",
      "Gender": user.gender || "",

      "Birth Time": user.birthTime || "",
      "Birth Place": user.birthPlace || "",

      "Height": user.height || "",
      "Weight": user.weight || "",

      "Date of Birth": user.dob
        ? new Date(user.dob).toLocaleDateString("en-IN")
        : "",

      "Blood Group": user.bloodGroup || "",
      "Manglik": user.manglik || "",
      "Gotra": user.gotra || "",
      "Kuldevi": user.kuldevi || "",
      "Complexion": user.complexion || "",

      "Education": user.education || "",
      "Profession Qualification":
        user.professionQualification || "",
      "Profession": user.profession || "",
      "Company": user.company || "",
      "Designation": user.designation || "",
      "Income": user.income || "",

      "Hobbies": user.hobbies || "",
      "Other Qualification":
        user.otherQualification || "",

      "Guardian Name": user.guardianName || "",

      "Father Name": user.fatherName || "",
      "Father Profession": user.fatherProfession || "",
      "Father Income": user.fatherIncome || "",
      "Father Designation":
        user.fatherDesignation || "",

      "Mother Name": user.motherName || "",

      "Native Place": user.nativePlace || "",
      "Address": user.address || "",
      "City": user.city || "",
      "PIN": user.pin || "",

      "WhatsApp": user.whatsapp || "",
      "NRI": user.nri || "",

      "Remarks": user.remarks || "",

      "Password": user.password || "",

      "Photo": user.photo || "",
      "BioData": user.bioData || "",

      "Status": user.status || "",

      "Deleted At": user.deletedAt
        ? new Date(user.deletedAt).toLocaleString("en-IN")
        : "",

      "Submitted At": user.submittedAt
        ? new Date(user.submittedAt).toLocaleString("en-IN")
        : "",

      "Created At": user.createdAt
        ? new Date(user.createdAt).toLocaleString("en-IN")
        : "",

      "Updated At": user.updatedAt
        ? new Date(user.updatedAt).toLocaleString("en-IN")
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "All Users"
    );

    XLSX.writeFile(
      workbook,
      "Bhargava-Samaaj-All-Users.xlsx"
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading users...
      </div>
    );
  }

  return (
    <div className={styles.container}>

      {/* HEADER */}

      <div className={styles.header}>

        <div>
          <h2>All Users</h2>

          <p>
            Showing{" "}
            <strong>
              {users.length > 0 ? startIndex + 1 : 0}
            </strong>
            {" - "}
            <strong>
              {Math.min(endIndex, users.length)}
            </strong>
            {" "}of{" "}
            <strong>{users.length}</strong> users
          </p>
        </div>

        <button
          className={styles.downloadButton}
          onClick={downloadExcel}
        >
          Download Excel
        </button>

      </div>

      {/* NO USERS */}

      {users.length === 0 ? (

        <div className={styles.noUsers}>
          No users found.
        </div>

      ) : (

        <>

          {/* TABLE SCROLL CONTAINER */}

          <div className={styles.tableContainer}>

            <table className={styles.table}>

              <thead>
                <tr>

                  <th>S.No.</th>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Gender</th>
                  <th>Birth Time</th>
                  <th>Birth Place</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Date of Birth</th>
                  <th>Blood Group</th>
                  <th>Manglik</th>
                  <th>Gotra</th>
                  <th>Kuldevi</th>
                  <th>Complexion</th>
                  <th>Education</th>
                  <th>Profession Qualification</th>
                  <th>Profession</th>
                  <th>Company</th>
                  <th>Designation</th>
                  <th>Income</th>
                  <th>Hobbies</th>
                  <th>Other Qualification</th>
                  <th>Guardian Name</th>
                  <th>Father Name</th>
                  <th>Father Profession</th>
                  <th>Father Income</th>
                  <th>Father Designation</th>
                  <th>Mother Name</th>
                  <th>Native Place</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>PIN</th>
                  <th>WhatsApp</th>
                  <th>NRI</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th>Photo</th>
                  <th>BioData</th>
                  <th>Deleted At</th>
                  <th>Submitted At</th>
                  <th>Created At</th>
                  <th>Updated At</th>

                </tr>
              </thead>

              <tbody>

                {currentUsers.map((user, index) => (

                  <tr key={user._id || index}>

                    <td>{startIndex + index + 1}</td>

                    <td>{user.number || "-"}</td>

                    <td>{user.name || "-"}</td>

                    <td>{user.email || "-"}</td>

                    <td>{user.mobile || "-"}</td>

                    <td>{user.gender || "-"}</td>

                    <td>{user.birthTime || "-"}</td>

                    <td>{user.birthPlace || "-"}</td>

                    <td>{user.height || "-"}</td>

                    <td>{user.weight || "-"}</td>

                    <td>
                      {user.dob
                        ? new Date(
                            user.dob
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </td>

                    <td>{user.bloodGroup || "-"}</td>

                    <td>{user.manglik || "-"}</td>

                    <td>{user.gotra || "-"}</td>

                    <td>{user.kuldevi || "-"}</td>

                    <td>{user.complexion || "-"}</td>

                    <td>{user.education || "-"}</td>

                    <td>
                      {user.professionQualification || "-"}
                    </td>

                    <td>{user.profession || "-"}</td>

                    <td>{user.company || "-"}</td>

                    <td>{user.designation || "-"}</td>

                    <td>{user.income || "-"}</td>

                    <td>{user.hobbies || "-"}</td>

                    <td>
                      {user.otherQualification || "-"}
                    </td>

                    <td>{user.guardianName || "-"}</td>

                    <td>{user.fatherName || "-"}</td>

                    <td>{user.fatherProfession || "-"}</td>

                    <td>{user.fatherIncome || "-"}</td>

                    <td>
                      {user.fatherDesignation || "-"}
                    </td>

                    <td>{user.motherName || "-"}</td>

                    <td>{user.nativePlace || "-"}</td>

                    <td>{user.address || "-"}</td>

                    <td>{user.city || "-"}</td>

                    <td>{user.pin || "-"}</td>

                    <td>{user.whatsapp || "-"}</td>

                    <td>{user.nri || "-"}</td>

                    <td>{user.remarks || "-"}</td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[user.status]
                        }`}
                      >
                        {user.status || "-"}
                      </span>
                    </td>

                    <td>
                      {user.photo ? (
                        <a
                          href={user.photo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Photo
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      {user.bioData ? (
                        <a
                          href={user.bioData}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View BioData
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      {user.deletedAt
                        ? new Date(
                            user.deletedAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      {user.submittedAt
                        ? new Date(
                            user.submittedAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      {user.updatedAt
                        ? new Date(
                            user.updatedAt
                          ).toLocaleString("en-IN")
                        : "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          <div className={styles.pagination}>

            <button
              onClick={() =>
                goToPage(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                goToPage(currentPage + 1)
              }
              disabled={
                currentPage === totalPages
              }
            >
              Next
            </button>

          </div>

        </>

      )}

    </div>
  );
};

export default AllUsers;