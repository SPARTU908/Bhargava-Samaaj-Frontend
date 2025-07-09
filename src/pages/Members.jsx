import React, { useEffect, useState } from "react";

import styles from "./Members.module.css";
import { getApprovedMembers } from "../apis/form";
import MemberInfo from "./MemberInfo";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [city, setCity] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await getApprovedMembers();
      console.log(result);
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

    return ageMatches && cityMatches;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0; // no sorting
  });

  return (
    <>
      <div className={styles.filterBox}>
        <label className={styles.filter}>
          Filter by Age:
          <select
            className={styles.selectAge}
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
          >
            <option value="">All</option>
            <option value="20-30">20 - 30</option>
            <option value="30-40">30 - 40</option>
            <option value="40-50">40 - 50</option>
          </select>
        </label>

        <label className={styles.filterCity}>
          Filter by City:
          <select
            className={styles.selectCity}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filterName}>
          Sort By:
          <select
            className={styles.selectName}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">None</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <div className={styles.container}>
        {sortedMembers.map((member) => (
          <div key={member.id} className={styles.card1}>
            <div className={styles.name}>{member.name}</div>
            <div className={styles.box}>
              <div className={styles.imageBox}>
                {/* <img src={member.photo} alt="" className={styles.img} /> */}

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

                {/* For member.photo */}
                {/* {member.photo &&
                  (() => {
                    const isPdf = member.photo.endsWith(".pdf");
                    const fixedUrl = isPdf
                      ? member.photo.replace("/image/upload/", "/raw/upload/")
                      : member.photo;

                    return (
                      <div className={styles.imageBox}>
                        {isPdf ? (
                          <iframe
                            src={fixedUrl}
                            width="100%"
                            height="600px"
                            title="Photo PDF Preview"
                            style={{
                              marginTop: "1rem",
                              border: "1px solid #ccc",
                            }}
                          />
                        ) : (
                          <img
                            src={fixedUrl}
                            alt="Photo"
                            className={styles.img}
                          />
                        )}
                      </div>
                    );
                  })} */}

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

export default Members;
