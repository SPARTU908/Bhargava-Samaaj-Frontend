import { useState, useEffect } from "react";
import styles from "./ConferenceAdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers } from "../apis/registration";
import { getAllAwardUsers } from "../apis/awardForm";
import {
  getAllLifeMembers,
  getUpdatedLifeMembers,
  getNewLifeMembers,
  softDeleteLifeMember,
} from "../apis/lifemember";
import { Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ConferenceAdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [awardForms, setAwardForms] = useState([]);
  const [totalAwardForms, setTotalAwardForms] = useState(0);
  const [lifeMembers, setLifeMembers] = useState([]);
  const [totalLifeMembers, setTotalLifeMembers] = useState(0);
  const [cityFilter, setCityFilter] = useState("");
  const [updatedPage, setUpdatedPage] = useState(1);
  const [newPage, setNewPage] = useState(1);
  const [registeredUsers, setRegisteredUsers] = useState([]);
const [totalUsers, setTotalUsers] = useState(0);

  const [lifeMemberSearch, setLifeMemberSearch] = useState({
    lmNo: "",
    name: "",
  });

  const [updatedLifeMembers, setUpdatedLifeMembers] = useState([]);
  const [totalUpdatedLifeMembers, setTotalUpdatedLifeMembers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newLifeMembers, setNewLifeMembers] = useState([]);
  const [totalNewLifeMembers, setTotalNewLifeMembers] = useState(0);

  const [genderFilter, setGenderFilter] = useState("");

  const cleanCity = (city) => {
    if (!city) return null;

    const c = city.trim().toUpperCase();

    if (!/[A-Z]/.test(c)) return null;

    if (c.length < 2) return null;

    if (/^[^A-Z0-9]+$/.test(c)) return null;

    return c;
  };

  const dynamicCities = [
    ...new Set([
      ...(lifeMembers?.map((m) => cleanCity(m.City)) || []),
      ...(updatedLifeMembers?.map((m) => cleanCity(m.City)) || []),
      ...(newLifeMembers?.map((m) => cleanCity(m.City)) || []),

      "DELHI",
      "MUMBAI",
      "CHENNAI",
      "KOLKATA",
      "HYDERABAD",
      "BENGALURU",
    ]),
  ]
    .filter(Boolean)
    .sort();

  const itemsPerPage = 20;

  const exportToExcel = (data, fileName = "data.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, fileName);
  };

  const exportAwardFormsToExcel = () => {
    const formattedData = awardForms.map((user, index) => ({
      S_No: index + 1,
      Code1: user.code1,
      Code2: user.code2,
      Code3: user.code3,
      Name: user.name,
      DOB: new Date(user.dob).toLocaleDateString(),
      Email: user.email,
      Address: user.address,
      Mobile: user.mobile,
      Pincode: user.pin,
      Qualification: user.academicQualification,
      FatherName: user.father,
      MotherName: user.mother,
      SpouseName: user.spouse,
      Photo: user.photo || "N/A",
      Document1: user.document1 || "N/A",
      Document2: user.document2 || "N/A",
      ProposerName: user.proposerName,
      ProposerEmail: user.proposalEmail,
      ProposerMobile: user.proposalMobile,
      ProposerAddress: user.proposalAddress,
    }));

    exportToExcel(formattedData, "AwardForms.xlsx");
  };

  const handleSoftDelete = async (member) => {
    if (!member?._id) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this life member?"
    );
    if (!confirmDelete) return;

    try {
      const result = await softDeleteLifeMember(member._id);
      alert(result.message);
      setNewLifeMembers((prev) => prev.filter((m) => m._id !== member._id));
    } catch (error) {
      alert(error.message);
    }
  };

  const columns = [
    { header: "LM No", key: "LM_NO" },
    { header: "Year", key: "Year" },
    { header: "Title", key: "Title" },
    { header: "Name", key: "Member_Name" },
    { header: "Card Issue", key: "Card_Issued" },
    { header: "S/O,D/O,W/O", key: "S_O_D_O_W_O" },
    { header: "Address", key: "Address" },
    { header: "Contact", key: "Contact_No" },
    { header: "DOB", key: "Date_of_Birth" },
    { header: "Gotra", key: "Gotra" },
    { header: "Kuldevi", key: "Kuldevi" },
    { header: "City", key: "City" },
    { header: "Pin", key: "Pin" },
    { header: "Email", key: "Email" },
    { header: "Gender", key: "gender" },
    { header: "Category", key: "category" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (res?.users) {
          setRegisteredUsers(res.users);
          setTotalUsers(res.users.length);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchAwardForms = async () => {
      try {
        const res = await getAllAwardUsers();
        if (res?.awardForms) {
          setAwardForms(res.awardForms);
          setTotalAwardForms(res.awardForms.length);
        }
      } catch (err) {
        console.error("Error fetching award forms:", err);
      }
    };

    const fetchLifeMembers = async () => {
      try {
        const res = await getAllLifeMembers();
        if (res) {
          setLifeMembers(res);
          setTotalLifeMembers(res.length);
        }
      } catch (err) {
        console.error("Error fetching life members:", err);
      }
    };

    const fetchUpdatedLifeMembers = async () => {
      try {
        const res = await getUpdatedLifeMembers();
        if (res) {
          setUpdatedLifeMembers(res);
          setTotalUpdatedLifeMembers(res.length);
        }
      } catch (err) {
        console.error("Error fetching updated life members:", err);
      }
    };

    const fetchNewLifeMembers = async () => {
      try {
        const res = await getNewLifeMembers();
        if (res) {
          setNewLifeMembers(res);
          setTotalNewLifeMembers(res.length);
        }
      } catch (err) {
        console.error("Error fetching new life members:", err);
      }
    };

    fetchUsers();
    fetchAwardForms();
    fetchLifeMembers();
    fetchUpdatedLifeMembers();
    fetchNewLifeMembers();
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const filteredLifeMembers = lifeMembers.filter((member) => {
    const lmNo = member.LM_NO || "";
    const name = member.Member_Name || "";
    const city = member.City || "";
    const searchLmNo = lifeMemberSearch.lmNo || "";
    const searchName = lifeMemberSearch.name || "";

    const matchesLmNo =
      searchLmNo === "" ||
      lmNo.toLowerCase().includes(searchLmNo.toLowerCase());
    const matchesName =
      searchName === "" ||
      name.toLowerCase().includes(searchName.toLowerCase());

    const matchesCity =
      cityFilter === "" ||
      (city || "").toLowerCase() === cityFilter.toLowerCase();

    return matchesLmNo && matchesName && matchesCity;
  });

  const updatedFiltered = updatedLifeMembers
    .filter((member) => (genderFilter ? member.gender === genderFilter : true))
    .filter((member) =>
      cityFilter
        ? (member.City || "").toLowerCase() === cityFilter.toLowerCase()
        : true
    );

  const updatedTotalPages = Math.ceil(updatedFiltered.length / itemsPerPage);

  const updatedPaginated = updatedFiltered.slice(
    (updatedPage - 1) * itemsPerPage,
    updatedPage * itemsPerPage
  );

  const newFiltered = newLifeMembers
    .filter((member) => (genderFilter ? member.gender === genderFilter : true))
    .filter((member) =>
      cityFilter
        ? (member.City || "").toLowerCase() === cityFilter.toLowerCase()
        : true
    );

  const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage);

  const newPaginated = newFiltered.slice(
    (newPage - 1) * itemsPerPage,
    newPage * itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredLifeMembers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredLifeMembers.length / itemsPerPage);

  const renderSection = () => {
    switch (selectedSection) {
      case "awardForms":
        return (
          <div className={styles.userTableWrapper}>
            <h4 className="mb-3">Award Form Submissions</h4>
            <button
              onClick={exportAwardFormsToExcel}
              className="btn btn-success"
            >
              📥 Download Excel
            </button>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code1</th>
                  <th>Code2</th>
                  <th>Code3</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Pincode</th>
                  <th>Qualification</th>
                  <th>Father's Name</th>
                  <th>Mother's Name</th>
                  <th>Spouse Name</th>
                  <th>Photo</th>
                  <th>Upload documents of your achievements </th>
                  <th>Upload documents of your achievements </th>
                  <th>Proposer Name</th>
                  <th>Proposer Email</th>
                  <th>Proposer Mobile</th>
                  <th>Proposer Address</th>
                </tr>
              </thead>
              <tbody>
                {awardForms.map((users, index) => (
                  <tr key={users._id}>
                    <td>{index + 1}</td>
                    <td>{users.code1}</td>
                    <td>{users.code2}</td>
                    <td>{users.code3}</td>
                    <td>{users.name}</td>
                    <td>{new Date(users.dob).toLocaleDateString()}</td>
                    <td>{users.email}</td>
                    <td>{users.address}</td>
                    <td>{users.mobile}</td>
                    <td>{users.pin}</td>
                    <td>{users.academicQualification}</td>
                    <td>{users.father}</td>
                    <td>{users.mother}</td>
                    <td>{users.spouse}</td>
                    <td>
                      {users.photo ? (
                        <>
                          {users.photo.endsWith(".pdf") ? (
                            <a
                              href={users.photo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 View Photo (PDF)
                            </a>
                          ) : (
                            <img
                              src={users.photo}
                              alt="Form Photo"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {users.document1 ? (
                        <>
                          {users.document1.endsWith(".pdf") ? (
                            <a
                              href={users.document1}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 View Document 1 (PDF)
                            </a>
                          ) : (
                            <a
                              href={users.document1}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={users.document1}
                                alt="Document 1"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      {users.document2 ? (
                        <>
                          {users.document2.endsWith(".pdf") ? (
                            <a
                              href={users.document2}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 View Document 2 (PDF)
                            </a>
                          ) : (
                            <a
                              href={users.document2}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={users.document2}
                                alt="Document 2"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                              />
                            </a>
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>{users.proposerName}</td>
                    <td>{users.proposalEmail}</td>
                    <td>{users.proposalMobile}</td>
                    <td>{users.proposalAddress}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      case "lifeMembers":
        return (
          <>
            <div className={styles.userTableWrapper}>
              <h4 className="mb-3">ABBS Life Members</h4>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search by LM No"
                  value={lifeMemberSearch.lmNo}
                  onChange={(e) =>
                    setLifeMemberSearch({
                      ...lifeMemberSearch,
                      lmNo: e.target.value,
                    })
                  }
                  className={styles.searchInput}
                />
                <input
                  type="text"
                  placeholder="Search by Name"
                  value={lifeMemberSearch.name}
                  onChange={(e) =>
                    setLifeMemberSearch({
                      ...lifeMemberSearch,
                      name: e.target.value,
                    })
                  }
                  className={styles.searchInput}
                />

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className={styles.searchInput}
                >
                  <option value="">Filter by City</option>
                  {dynamicCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>LM No</th>
                    <th>Year</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Card Issue</th>
                    <th>S/O,D/O,W/O</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Pin</th>
                    <th>Contact No.</th>
                    <th>Email</th>
                    <th>Gotra</th>
                    <th>Kuldevi</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.map((member, index) => (
                    <tr key={member._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{member.LM_NO}</td>
                      <td>{member.Year}</td>
                      <td>{member.Title}</td>
                      <td>{member.Member_Name}</td>
                      <td>{member.Card_Issued}</td>
                      <td>{member.S_O_D_O_W_O}</td>
                      <td>{member.Date_of_Birth}</td>
                      <td>{member.Address}</td>
                      <td>{member.City}</td>
                      <td>{member.Pin}</td>
                      <td>{member.Contact_No}</td>
                      <td>{member.Email}</td>
                      <td>{member.Gotra}</td>
                      <td>{member.Kuldevi}</td>
                      <td>{member.gender}</td>
                      <td>{member.category}</td>
                      <td>
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt="Photo"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        );

      case "updatedLifeMembers":
        return (
          <>
            <div className={styles.userTableWrapper}>
              <h4 className="mb-3">Updated Life Members</h4>

              <div className={styles.exportButtons}>
                <button
                  onClick={() =>
                    exportToExcel(updatedLifeMembers, "UpdatedLifeMembers.xlsx")
                  }
                  className={styles.btn}
                >
                  Export Updated Members
                </button>
              </div>

              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="genderFilter" style={{ fontWeight: 600 }}>
                  Filter by Gender:
                </label>
                <select
                  id="genderFilter"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label style={{ fontWeight: 600 }}>Filter by City:</label>

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="">All</option>
                  {dynamicCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>LM No</th>
                    <th>Year</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Card Issue</th>
                    <th>S/O,D/O,W/O</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Pin</th>
                    <th>Contact No.</th>
                    <th>Email</th>
                    <th>Gotra</th>
                    <th>Kuldevi</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {updatedLifeMembers.map((member, index) => (
                    <tr key={member._id}>
                      <td>{index + 1}</td>
                      <td>{member.LM_NO}</td>
                      <td>{member.Year}</td>
                      <td>{member.Title}</td>
                      <td>{member.Member_Name}</td>
                      <td>{member.Card_Issued}</td>
                      <td>{member.S_O_D_O_W_O}</td>
                      <td>{member.Date_of_Birth}</td>
                      <td>{member.Address}</td>
                      <td>{member.City}</td>
                      <td>{member.Pin}</td>
                      <td>{member.Contact_No}</td>
                      <td>{member.Email}</td>
                      <td>{member.Gotra}</td>
                      <td>{member.Kuldevi}</td>
                      <td>{member.gender}</td>
                      <td>{member.category}</td>
                      <td>
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt="Photo"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))} */}

                  {updatedPaginated.map((member, index) => (
                    <tr key={member._id}>
                      <td>{(updatedPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{member.LM_NO}</td>
                      <td>{member.Year}</td>
                      <td>{member.Title}</td>
                      <td>{member.Member_Name}</td>
                      <td>{member.Card_Issued}</td>
                      <td>{member.S_O_D_O_W_O}</td>
                      <td>{member.Date_of_Birth}</td>
                      <td>{member.Address}</td>
                      <td>{member.City}</td>
                      <td>{member.Pin}</td>
                      <td>{member.Contact_No}</td>
                      <td>{member.Email}</td>
                      <td>{member.Gotra}</td>
                      <td>{member.Kuldevi}</td>
                      <td>{member.gender}</td>
                      <td>{member.category}</td>
                      <td>
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt="Photo"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className={styles.pagination}>
                <button
                  onClick={() => setUpdatedPage((p) => Math.max(p - 1, 1))}
                  disabled={updatedPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {updatedPage} of {updatedTotalPages}
                </span>

                <button
                  onClick={() =>
                    setUpdatedPage((p) => Math.min(p + 1, updatedTotalPages))
                  }
                  disabled={updatedPage === updatedTotalPages}
                >
                  Next
                </button>
              </div>

              <h4 className="mb-3 mt-5">Newly Registered Life Members</h4>

              <div className={styles.exportButtons}>
                <button
                  onClick={() =>
                    exportToExcel(newLifeMembers, "NewLifeMembers.xlsx")
                  }
                  className={styles.btn}
                >
                  Export New Members
                </button>
              </div>

              <div className="mb-3 d-flex align-items-center gap-2">
                <label htmlFor="genderFilter" style={{ fontWeight: 600 }}>
                  Filter by Gender:
                </label>
                <select
                  id="genderFilter"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="">All</option>
                  {dynamicCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>LM No</th>
                    <th>Year</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Card Issue</th>
                    <th>S/O,D/O,W/O</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Pin</th>
                    <th>Contact No.</th>
                    <th>Email</th>
                    <th>Gotra</th>
                    <th>Kuldevi</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Photo</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {newPaginated.map((member, index) => (
                    <tr key={member._id}>
                      <td>{(newPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{member.LM_NO}</td>
                      <td>{member.Year}</td>
                      <td>{member.Title}</td>
                      <td>{member.Member_Name}</td>
                      <td>{member.Card_Issued}</td>
                      <td>{member.S_O_D_O_W_O}</td>
                      <td>{member.Date_of_Birth}</td>
                      <td>{member.Address}</td>
                      <td>{member.City}</td>
                      <td>{member.Pin}</td>
                      <td>{member.Contact_No}</td>
                      <td>{member.Email}</td>
                      <td>{member.Gotra}</td>
                      <td>{member.Kuldevi}</td>
                      <td>{member.gender}</td>
                      <td>{member.category}</td>
                      <td>
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt="Photo"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>
                        <button
                          className={styles.deleteButton} // optional CSS class
                          onClick={() => handleSoftDelete(member)} // pass the member
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className={styles.pagination}>
                <button
                  onClick={() => setNewPage((p) => Math.max(p - 1, 1))}
                  disabled={newPage === 1}
                >
                  Previous
                </button>

                <span>
                  Page {newPage} of {newTotalPages}
                </span>

                <button
                  onClick={() =>
                    setNewPage((p) => Math.min(p + 1, newTotalPages))
                  }
                  disabled={newPage === newTotalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className={styles.renderSection}>
            <div className={styles.widget} style={{ marginTop: "20px" }}>
              <div className={styles.widgetTitle}>
                Total number of Award Form submissions
              </div>
              <div className={styles.widgetCount}>{totalAwardForms}</div>
            </div>
            <div className={styles.widget} style={{ marginTop: "20px" }}>
              <div className={styles.widgetTitle}>
                Total number of ABBS Life Members
              </div>
              <div className={styles.widgetCount}>{totalLifeMembers}</div>
            </div>

            <div className={styles.widget} style={{ marginTop: "20px" }}>
              <div className={styles.widgetTitle}>
                Total number of Updated Life Members
              </div>
              <div className={styles.widgetCount}>
                {totalUpdatedLifeMembers}
              </div>
            </div>

            <div className={styles.widget} style={{ marginTop: "20px" }}>
              <div className={styles.widgetTitle}>
                Total number of New members registered for the Conference
              </div>
              <div className={styles.widgetCount}>{totalNewLifeMembers}</div>
            </div>
          </div>
        );
    }
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
                  selectedSection === "awardForms" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("awardForms")}
              >
                Award Form Submissions
              </div>
            </div>
            <div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "lifeMembers" ? styles.activeButton : ""
                }`}
                onClick={() => setSelectedSection("lifeMembers")}
              >
                ABBS Life Members
              </div>
            </div>

            <div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "updatedLifeMembers"
                    ? styles.activeButton
                    : ""
                }`}
                onClick={() => setSelectedSection("updatedLifeMembers")}
              >
                Updated and New Registered Life Members
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

export default ConferenceAdminDashboard;
