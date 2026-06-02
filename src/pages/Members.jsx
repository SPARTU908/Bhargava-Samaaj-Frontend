import React, { useEffect, useState } from "react";
import styles from "./Members.module.css";
import { getApprovedMembers, deleteUser } from "../apis/form";
import MemberInfo from "./MemberInfo";
import { useNavigate } from "react-router-dom";
import DownloadFormMagazine from "./DownloadFormMagazine";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [gender, setGender] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [downloading, setDownloading] = useState(false);
const [progress, setProgress] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    if (!dob) return 0;

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return 0;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteUser(id);
      console.log("User deleted successfully:", result);

      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== id),
      );
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await getApprovedMembers();

      const approvedMembers = result
        .filter((member) => member.status === "approved")
        .map((m) => ({
          ...m,
          age: calculateAge(m.dob),
        }));

      setMembers(approvedMembers);
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [ageRange, city, gender, sortBy, searchQuery]);

  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Varanasi",
    "Srinagar",
    "Amritsar",
    "Ranchi",
    "Coimbatore",
    "Jodhpur",
    "Raipur",
    "Guwahati",
    "Chandigarh",
    "Mysore",
    "Noida",
    "Gurgaon",
    "Thiruvananthapuram",
    "Vijayawada",
    "Gwalior",
    "Jalandhar",
    "Udaipur",
  ];

  const [minAge, maxAge] = ageRange
    ? ageRange.split("-").map(Number)
    : [0, Infinity];

  // 1️⃣ Filter Members
  const filteredMembers = members.filter((member) => {
    const age = member.age;

    // Age range filter
    const ageMatches = member.age >= minAge && member.age <= maxAge;

    // Other filters
    const cityMatches = !city || member.city === city;
    const genderMatches = !gender || member.gender?.toLowerCase() === gender;
    const nameMatches =
      !searchQuery ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase());

    return ageMatches && cityMatches && genderMatches && nameMatches;
  });

  // 🔍 Debug Logs (filtered result)
  console.log("---- FILTERED MEMBERS ----");
  filteredMembers.forEach((m) => {
    console.log(`${m.name} | Age: ${m.age}`);
  });
  console.log("--------------------------");

  // 2️⃣ Sort Members
  let sortedMembers = [...filteredMembers];

  if (sortBy === "age") {
    // Sort by exact birthdate (oldest first)
    sortedMembers.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  } else if (sortBy === "name") {
    sortedMembers.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 🔍 Debug Logs (sorted result)

  sortedMembers.forEach((m) => {
    console.log(`${m.name} | Age: ${m.age}`);
  });

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = sortedMembers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [tempAgeRange, setTempAgeRange] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempSortBy, setTempSortBy] = useState("");
  const [tempGender, setTempGender] = useState("");

  const applyFilters = () => {
    setAgeRange(tempAgeRange);
    setCity(tempCity);
    setSortBy(tempSortBy);
    setGender(tempGender);
  };

  return (
    <>
      <div className={styles.approvedProfiles}>Browse Profiles</div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterBox}>
        <div className={styles.filterItem}>
          <label>Filter by Age:</label>
          <select
            className={styles.selectAge}
            value={tempAgeRange}
            onChange={(e) => setTempAgeRange(e.target.value)}
          >
            <option value="">All</option>
            <option value="20-30">20 - 30</option>
            <option value="31-40">31 - 40</option>
            <option value="41-50">41 - 50</option>
            <option value="51-60">51 - 60</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>Filter by City:</label>
          <select
            className={styles.selectCity}
            value={tempCity}
            onChange={(e) => setTempCity(e.target.value)}
          >
            <option value="">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>Filter by Gender:</label>
          <select
            className={styles.selectGender}
            value={tempGender}
            onChange={(e) => setTempGender(e.target.value.toLowerCase())}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <label>Sort By:</label>
          <select
            className={styles.selectName}
            value={tempSortBy}
            onChange={(e) => setTempSortBy(e.target.value)}
          >
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <button onClick={applyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          onClick={() =>
            navigate("/download-all", {
              state: { filteredMembers: sortedMembers },
            })
          }
          className={styles.downloadButton}
        >
          Download Design 1
        </button>

        {/* <button
         onClick={() => DownloadFormMagazine(sortedMembers)}
          className={styles.downloadButton}
        >
          Download Design 2
        </button> */}

        <button
  onClick={async () => {
    setDownloading(true);
    setProgress(0);

    await DownloadFormMagazine(sortedMembers, setProgress);

    setDownloading(false);
  }}
  className={styles.downloadButton}
>
  {downloading ? `Generating... ${progress}%` : "Download Design 2"}
</button>

{downloading && (
  <div style={{ marginTop: "15px", textAlign: "center" }}>
    <div
      style={{
        width: "100%",
        height: "10px",
        background: "#eee",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg,#4caf50,#81c784)",
          transition: "0.3s",
        }}
      />
    </div>

    <p style={{ marginTop: "8px", fontSize: "14px" }}>
      Generating PDF... {progress}%
    </p>
  </div>
)}
 </div>

      <div className={styles.container}>
        {currentMembers.map((member) => (
          <div key={member._id} className={styles.card1}>
            <div className={styles.name}>{member.name}</div>
            <div className={styles.box}>
              <div className={styles.imageSection}>
                <div className={styles.imageBox}>
                  {member.photo && (
                    <img
                      src={
                        member.photo.startsWith("http")
                          ? member.photo
                          : `${
                              import.meta.env.VITE_BACKEND_URL
                            }/${member.photo.replace(/\\/g, "/")}`
                      }
                      alt="Photo"
                      className={styles.img}
                    />
                  )}
                </div>

                {/* Buttons BELOW the photo */}
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`/download-form/${member._id}`)}
                    className={styles.downloadButton}
                  >
                    Download
                  </button>
                </div>
              </div>

              <MemberInfo member={member} />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.simplePagination}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.prevNext}
          >
            Previous
          </button>

          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.prevNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Members;
