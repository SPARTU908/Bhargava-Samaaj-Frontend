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
import { getAllConferenceRegistrations } from "../apis/conferenceRegistration";

const MemberDetailsTable = ({ member }) => {
  if (!member) {
    return (
      <div className="alert alert-warning">
        Member details not available.
      </div>
    );
  }

  return (
    <Table
      bordered
      responsive
      size="sm"
      className="align-middle"
    >
      <tbody>
        <tr>
          <th>Registration Number</th>
          <td>
            {member.registrationNumber ||
              "-"}
          </td>

          <th>Member Type</th>
          <td>
            {member.memberType || "-"}
          </td>
        </tr>

        <tr>
          <th>Relation</th>
          <td>
            {member.relation || "-"}
          </td>

          <th>LM No</th>
          <td>
            {member.LM_NO || "-"}
          </td>
        </tr>

        <tr>
          <th>Title</th>
          <td>
            {member.Title || "-"}
          </td>

          <th>Name</th>
          <td>
            {member.Member_Name || "-"}
          </td>
        </tr>

        <tr>
          <th>Membership Year</th>
          <td>
            {member.Year || "-"}
          </td>

          <th>Card Issued</th>
          <td>
            {member.Card_Issued ||
              "-"}
          </td>
        </tr>

        <tr>
          <th>S/O, D/O, W/O</th>
          <td>
            {member.S_O_D_O_W_O ||
              "-"}
          </td>

          <th>Date of Birth</th>
          <td>
            {member.Date_of_Birth ||
              "-"}
          </td>
        </tr>

        <tr>
          <th>Gender</th>
          <td>
            {member.gender || "-"}
          </td>

          <th>Category</th>
          <td>
            {member.category || "-"}
          </td>
        </tr>

        <tr>
          <th>Gotra</th>
          <td>
            {member.Gotra || "-"}
          </td>

          <th>Kuldevi</th>
          <td>
            {member.Kuldevi || "-"}
          </td>
        </tr>

        <tr>
          <th>Mobile</th>
          <td>
            {member.Contact_No ||
              "-"}
          </td>

          <th>Email</th>
          <td>
            {member.Email || "-"}
          </td>
        </tr>

        <tr>
          <th>City</th>
          <td>
            {member.City || "-"}
          </td>

          <th>PIN Code</th>
          <td>
            {member.Pin || "-"}
          </td>
        </tr>

        <tr>
          <th>Address</th>

          <td colSpan="3">
            {member.Address || "-"}
          </td>
        </tr>

        <tr>
          <th>Photo</th>

          <td colSpan="3">
            {member.photo ? (
              <a
                href={member.photo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={member.photo}
                  alt={
                    member.Member_Name ||
                    "Member"
                  }
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border:
                      "1px solid #ddd",
                  }}
                />
              </a>
            ) : (
              "N/A"
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

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

  const [conferenceRegistrations, setConferenceRegistrations] = useState([]);

  const [totalConferenceRegistrations, setTotalConferenceRegistrations] =
    useState(0);

  const [conferenceSearch, setConferenceSearch] = useState("");

  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  const [registrationStatusFilter, setRegistrationStatusFilter] = useState("");

  const [expandedRegistration, setExpandedRegistration] = useState(null);

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
      "Are you sure you want to delete this life member?",
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

    const fetchConferenceRegistrations = async () => {
      try {
        const res = await getAllConferenceRegistrations();

        if (res?.registrations) {
          setConferenceRegistrations(res.registrations);

          setTotalConferenceRegistrations(res.registrations.length);
        }
      } catch (err) {
        console.error("Error fetching conference registrations:", err);
      }
    };

    fetchUsers();
    fetchAwardForms();
    fetchLifeMembers();
    fetchUpdatedLifeMembers();
    fetchNewLifeMembers();
    fetchConferenceRegistrations();
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
        : true,
    );

  const updatedTotalPages = Math.ceil(updatedFiltered.length / itemsPerPage);

  const updatedPaginated = updatedFiltered.slice(
    (updatedPage - 1) * itemsPerPage,
    updatedPage * itemsPerPage,
  );

  const newFiltered = newLifeMembers
    .filter((member) => (genderFilter ? member.gender === genderFilter : true))
    .filter((member) =>
      cityFilter
        ? (member.City || "").toLowerCase() === cityFilter.toLowerCase()
        : true,
    );

  const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage);

  const newPaginated = newFiltered.slice(
    (newPage - 1) * itemsPerPage,
    newPage * itemsPerPage,
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredLifeMembers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredLifeMembers.length / itemsPerPage);

  const filteredConferenceRegistrations =
  conferenceRegistrations.filter(
    (registration) => {
      const primary =
        registration.members?.find(
          (member) =>
            member.memberType ===
            "Primary"
        );

      const search =
        conferenceSearch
          .trim()
          .toLowerCase();

      const matchesSearch =
        !search ||
        primary?.Member_Name
          ?.toLowerCase()
          .includes(search) ||
        primary?.LM_NO
          ?.toLowerCase()
          .includes(search) ||
        primary?.Contact_No
          ?.toLowerCase()
          .includes(search) ||
        primary?.Email
          ?.toLowerCase()
          .includes(search) ||
        registration.members?.some(
          (member) =>
            member.registrationNumber
              ?.toLowerCase()
              .includes(search)
        );

      const matchesPaymentStatus =
        !paymentStatusFilter ||
        registration.payment?.status ===
          paymentStatusFilter;

      const matchesRegistrationStatus =
        !registrationStatusFilter ||
        registration.registrationStatus ===
          registrationStatusFilter;

      return (
        matchesSearch &&
        matchesPaymentStatus &&
        matchesRegistrationStatus
      );
    }
  );

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
                          className={styles.deleteButton}
                          onClick={() => handleSoftDelete(member)}
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


      case "conferenceRegistrations":
  return (
    <div className={styles.userTableWrapper}>
      <div
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <div>
          <h4 className="mb-1">
            Conference Registrations
          </h4>

          <small className="text-muted">
            Total Registrations:{" "}
            {
              filteredConferenceRegistrations.length
            }
          </small>
        </div>
      </div>

      {/* FILTERS */}

      <div
        className="d-flex flex-wrap gap-2 mb-4"
      >
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "320px" }}
          placeholder="Search name, LM No, mobile, registration no..."
          value={conferenceSearch}
          onChange={(e) =>
            setConferenceSearch(
              e.target.value
            )
          }
        />

        <select
          className="form-select"
          style={{ maxWidth: "220px" }}
          value={paymentStatusFilter}
          onChange={(e) =>
            setPaymentStatusFilter(
              e.target.value
            )
          }
        >
          <option value="">
            All Payment Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="submitted">
            Submitted
          </option>

          <option value="verified">
            Verified
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>

        <select
          className="form-select"
          style={{ maxWidth: "240px" }}
          value={
            registrationStatusFilter
          }
          onChange={(e) =>
            setRegistrationStatusFilter(
              e.target.value
            )
          }
        >
          <option value="">
            All Registration Status
          </option>

          <option value="payment_pending">
            Payment Pending
          </option>

          <option value="payment_submitted">
            Payment Submitted
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>
      </div>

      {filteredConferenceRegistrations
        .length === 0 ? (
        <div
          className="alert alert-info"
        >
          No conference registrations
          found.
        </div>
      ) : (
        filteredConferenceRegistrations.map(
          (registration, regIndex) => {
            const primaryMember =
              registration.members?.find(
                (member) =>
                  member.memberType ===
                  "Primary"
              );

            const familyMembers =
              registration.members?.filter(
                (member) =>
                  member.memberType ===
                  "Family"
              ) || [];

            const isExpanded =
              expandedRegistration ===
              registration._id;

            return (
              <div
                key={registration._id}
                style={{
                  border:
                    "1px solid #ddd",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {/* MAIN REGISTRATION */}

                <div
                  style={{
                    padding: "15px",
                    background:
                      "#f8f9fa",
                  }}
                >
                  <div className="row g-3 align-items-center">
                    <div className="col-md-1">
                      <strong>
                        #{regIndex + 1}
                      </strong>
                    </div>

                    <div className="col-md-2">
                      <small className="text-muted d-block">
                        Primary Member
                      </small>

                      <strong>
                        {primaryMember
                          ?.Member_Name ||
                          "-"}
                      </strong>
                    </div>

                    <div className="col-md-2">
                      <small className="text-muted d-block">
                        Registration No.
                      </small>

                      <strong
                        style={{
                          color:
                            "#f4511e",
                        }}
                      >
                        {primaryMember
                          ?.registrationNumber ||
                          "-"}
                      </strong>
                    </div>

                    <div className="col-md-1">
                      <small className="text-muted d-block">
                        Members
                      </small>

                      <strong>
                        {
                          registration.totalMembers
                        }
                      </strong>
                    </div>

                    <div className="col-md-2">
                      <small className="text-muted d-block">
                        Amount
                      </small>

                      <strong>
                        ₹
                        {
                          registration.amount
                        }
                      </strong>
                    </div>

                    <div className="col-md-2">
                      <small className="text-muted d-block">
                        Payment
                      </small>

                      <span
                        className={`badge ${
                          registration
                            .payment
                            ?.status ===
                          "verified"
                            ? "bg-success"
                            : registration
                                  .payment
                                  ?.status ===
                                "rejected"
                              ? "bg-danger"
                              : registration
                                    .payment
                                    ?.status ===
                                  "submitted"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                        }`}
                      >
                        {registration
                          .payment
                          ?.status ||
                          "-"}
                      </span>
                    </div>

                    <div className="col-md-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          setExpandedRegistration(
                            isExpanded
                              ? null
                              : registration._id
                          )
                        }
                      >
                        {isExpanded
                          ? "Hide Details"
                          : "View Complete Details"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPLETE DETAILS */}

                {isExpanded && (
                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    {/* PAYMENT DETAILS */}

                    <h5 className="mb-3">
                      Payment Details
                    </h5>

                    <Table
                      bordered
                      responsive
                      size="sm"
                    >
                      <tbody>
                        <tr>
                          <th>
                            Total Members
                          </th>

                          <td>
                            {
                              registration.totalMembers
                            }
                          </td>

                          <th>
                            Total Amount
                          </th>

                          <td>
                            ₹
                            {
                              registration.amount
                            }
                          </td>
                        </tr>

                        <tr>
                          <th>
                            Transaction ID /
                            UTR
                          </th>

                          <td>
                            {registration
                              .payment
                              ?.transactionId ||
                              "-"}
                          </td>

                          <th>
                            Payment Status
                          </th>

                          <td>
                            {registration
                              .payment
                              ?.status ||
                              "-"}
                          </td>
                        </tr>

                        <tr>
                          <th>
                            Registration
                            Status
                          </th>

                          <td>
                            {registration.registrationStatus ||
                              "-"}
                          </td>

                          <th>
                            Payment Submitted
                          </th>

                          <td>
                            {registration
                              .payment
                              ?.submittedAt
                              ? new Date(
                                  registration.payment.submittedAt
                                ).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </td>
                        </tr>

                        <tr>
                          <th>
                            Verified At
                          </th>

                          <td>
                            {registration
                              .payment
                              ?.verifiedAt
                              ? new Date(
                                  registration.payment.verifiedAt
                                ).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </td>

                          <th>
                            Created At
                          </th>

                          <td>
                            {registration.createdAt
                              ? new Date(
                                  registration.createdAt
                                ).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </td>
                        </tr>

                        <tr>
                          <th>
                            Remarks
                          </th>

                          <td colSpan="3">
                            {registration
                              .payment
                              ?.remarks ||
                              "-"}
                          </td>
                        </tr>

                        <tr>
                          <th>
                            Payment Screenshot
                          </th>

                          <td colSpan="3">
                            {registration
                              .payment
                              ?.screenshot ? (
                              <a
                                href={
                                  registration
                                    .payment
                                    .screenshot
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={
                                    registration
                                      .payment
                                      .screenshot
                                  }
                                  alt="Payment Screenshot"
                                  style={{
                                    width:
                                      "160px",
                                    maxHeight:
                                      "180px",
                                    objectFit:
                                      "contain",
                                    border:
                                      "1px solid #ddd",
                                    borderRadius:
                                      "6px",
                                  }}
                                />
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    {/* PRIMARY */}

                    <h5 className="mt-4 mb-3">
                      Primary Member
                    </h5>

                    <MemberDetailsTable
                      member={
                        primaryMember
                      }
                    />

                    {/* FAMILY */}

                    <h5 className="mt-4 mb-3">
                      Family Members (
                      {
                        familyMembers.length
                      }
                      )
                    </h5>

                    {familyMembers.length >
                    0 ? (
                      familyMembers.map(
                        (
                          familyMember,
                          index
                        ) => (
                          <div
                            key={
                              familyMember._id ||
                              index
                            }
                            style={{
                              marginBottom:
                                "25px",
                            }}
                          >
                            <h6
                              style={{
                                background:
                                  "#fff7f2",
                                padding:
                                  "10px",
                                borderRadius:
                                  "5px",
                                color:
                                  "#f4511e",
                              }}
                            >
                              Family Member{" "}
                              {index + 1}
                              {familyMember.relation
                                ? ` - ${familyMember.relation}`
                                : ""}
                            </h6>

                            <MemberDetailsTable
                              member={
                                familyMember
                              }
                            />
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-muted">
                        No family
                        members added.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          }
        )
      )}
    </div>
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
            <div>
              <div
                className={`${styles.optionButton} ${
                  selectedSection === "conferenceRegistrations"
                    ? styles.activeButton
                    : ""
                }`}
                onClick={() => setSelectedSection("conferenceRegistrations")}
              >
                Conference Registrations
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
