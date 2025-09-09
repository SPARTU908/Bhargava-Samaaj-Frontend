import React, { useEffect, useState } from "react";
import styles from "./Members.module.css";
import { getApprovedMembers } from "../apis/form";
import MemberInfo from "./MemberInfo";


const BiodataUser = () => {
  const [members, setMembers] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [gender, setGender] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await getApprovedMembers();
      const approvedMembers = result.filter(
        (member) => member.status === "approved"
      );
      setMembers(approvedMembers);
    };
    fetchMembers();
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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

  const filteredMembers = members.filter((member) => {
    const age = calculateAge(member.dob);
    const ageMatches =
      !ageRange ||
      (() => {
        const [min, max] = ageRange.split("-").map(Number);
        return age >= min && age <= max;
      })();

    const cityMatches = !city || member.city === city;
    const genderMatches = !gender || member.gender?.toLowerCase() === gender;
    const nameMatches = !searchQuery || member.name.toLowerCase().includes(searchQuery.toLowerCase()); // Search by name

    return ageMatches && cityMatches && genderMatches && nameMatches; // Apply search filter
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Sort by name
    }
    return 0; // No sorting by default
  });

  const [tempAgeRange, setTempAgeRange] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempSortBy, setTempSortBy] = useState("");
  const [tempGender, setTempGender] = useState("");

  const applyFilters = () => {
    setAgeRange(tempAgeRange);
    setCity(tempCity);
    setSortBy(tempSortBy);
    setGender(tempGender);

    // Sync temp values with applied filters so the dropdowns stay updated
    setTempAgeRange(tempAgeRange);
    setTempCity(tempCity);
    setTempSortBy(tempSortBy);
    setTempGender(tempGender);
  };

  return (
  
    <>
 
      <div className={styles.approvedProfiles}>Browse Profiles</div>

      {/* Search Box - Added search by name */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
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
            <option value="30-40">30 - 40</option>
            <option value="40-50">40 - 50</option>
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
          </select>
        </div>

        <div className={styles.filterItem}>
          <button onClick={applyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {sortedMembers.map((member) => (
          <div key={member.id} className={styles.card1}>
            <div className={styles.name}>{member.name}</div>
            <div className={styles.box}>
              <div className={styles.imageBox}>
               {member.bioData &&
                  (() => {
                    const isPdf = member.bioData.endsWith(".pdf");
                    const fixedUrl = isPdf
                      ? member.bioData.replace("/image/upload/", "/raw/upload/")
                      : member.bioData;

                    return (
                      <>
                        <div>
                          <a href={fixedUrl} target="_blank" rel="noreferrer">
                            Download
                          </a>
                          {" | "}
                          {isPdf && (
                            <a href={fixedUrl} target="_blank" rel="noreferrer">
                              View
                            </a>
                          )}
                        </div>

                        {isPdf ? (
                          <iframe
                            src={fixedUrl}
                            width="100%"
                            height="600px"
                            title="PDF Preview"
                            style={{
                              marginTop: "1rem",
                              border: "1px solid #ccc",
                            }}
                          />
                        ) : (
                          <img
                            src={fixedUrl}
                            alt="BioData"
                            style={{
                              maxWidth: "100%",
                              marginTop: "1rem",
                              border: "1px solid #ccc",
                            }}
                          />
                        )}
                      </>
                    );
                  })}

                {member.photo &&
                  (() => {
                    const isPdf = member.photo
                      .split("?")[0]
                      .toLowerCase()
                      .endsWith(".pdf");
                    const fixedUrl = isPdf
                      ? member.photo.replace("/image/upload/", "/raw/upload/")
                      : member.photo;

                    return (
                      <div className={styles.imageBox}>
                        {isPdf ? (
                          <div style={{ marginTop: "1rem" }}>
                            <a href={fixedUrl} target="_blank" rel="noreferrer">
                              View Image
                            </a>
                          </div>
                        ) : (
                          <img
                            src={fixedUrl}
                            alt="Photo"
                            className={styles.img}
                          />
                        )}
                      </div>
                    );
                  })()}
              </div>
              <MemberInfo member={member} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BiodataUser;
