import React, { useState, useEffect } from "react";
import styles from "./MemberInfo.module.css";

const MemberInfo = ({ member }) => {
  const [isPersonalOpen, setPersonalOpen] = useState(false);
  const [isProfessionalOpen, setProfessionalOpen] = useState(false);
  const [isFamilyOpen, setFamilyOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isOtherOpen, setOtherOpen] = useState(false);

  const toggle = (setter) => () => setter((prev) => !prev);

  return (
    <>
      <div className={styles.info}>
        {/* Personal Details */}
        <div className={styles.infoSection}>
          <div
            onClick={toggle(setPersonalOpen)}
            style={{ cursor: "pointer" }}
            className={styles.heading}
          >
            {isPersonalOpen ? "▼" : "►"} Personal Details
          </div>
          {isPersonalOpen && (
            <>
              <div className={styles.details}>
                <div>
                  <b>Membership No:</b> {member.number}
                </div>
                <div>
                  <b>Gender:</b> {member.gender}
                </div>
                <div>
                  <b>Birth Time:</b> {member.birthTime}
                </div>
                <div>
                  <b>Birth Place:</b> {member.birthPlace}
                </div>
                <div>
                <b>DOB:</b> {new Date(member.dob).getDate().toString().padStart(2, '0')}/{(new Date(member.dob).getMonth() + 1).toString().padStart(2, '0')}/{new Date(member.dob).getFullYear()}
                </div>
                <div>
                  <b>Blood Group:</b> {member.bloodGroup}
                </div>
                <div>
                  <b>Height:</b> {member.height}
                </div>
                <div>
                  <b>Weight:</b> {member.weight}
                </div>
                <div>
                  <b>Complexion:</b> {member.complexion}
                </div>
                <div>
                  <b>Manglik:</b> {member.manglik}
                </div>
                <div>
                  <b>Gotra:</b> {member.gotra}
                </div>
                <div>
                  <b>Kuldevi:</b> {member.kuldevi}
                </div>
                <div>
                  <b>Hobbies:</b> {member.hobbies}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Professional Details */}
        <div>
          <h3
            className={styles.heading}
            onClick={toggle(setProfessionalOpen)}
            style={{ cursor: "pointer" }}
          >
            {isProfessionalOpen ? "▼" : "►"} Professional Details
          </h3>
          {isProfessionalOpen && (
            <>
              <div className={styles.details}>
                <div>
                  <b>Education:</b> {member.education}
                </div>
                <div>
                  <b>Professional Qualification:</b>{" "}
                  {member.professionQualification}
                </div>
                <div>
                  <b>Other Qualification:</b> {member.otherQualification}
                </div>
                <div>
                  <b>Profession:</b> {member.profession}
                </div>
                <div>
                  <b>Company:</b> {member.company}
                </div>
                <div>
                  <b>Designation:</b> {member.designation}
                </div>
                <div>
                  <b>Income:</b> {member.income}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Family Details */}
        <div>
          <h3
            className={styles.heading}
            onClick={toggle(setFamilyOpen)}
            style={{ cursor: "pointer" }}
          >
            {isFamilyOpen ? "▼" : "►"} Family Details
          </h3>
          {isFamilyOpen && (
            <>
              <div className={styles.details}>
                <div>
                  <b>Guardian Name:</b> {member.guardianName}
                </div>
                <div>
                  <b>Father's Name:</b> {member.fatherName}
                </div>
                <div>
                  <b>Father's Profession:</b> {member.fatherProfession}
                </div>
                <div>
                  <b>Mother's Name:</b> {member.motherName}
                </div>
                <div>
                  <b>Native Place:</b> {member.nativePlace}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Contact Details */}
        <div>
          <h3
            className={styles.heading}
            onClick={toggle(setContactOpen)}
            style={{ cursor: "pointer" }}
          >
            {isContactOpen ? "▼" : "►"} Contact Details
          </h3>
          {isContactOpen && (
            <>
              <div className={styles.details}>
                <div>
                  <b>Email:</b> {member.email}
                </div>
                <div>
                  <b>Mobile:</b> {member.mobile}
                </div>
                <div>
                  <b>Address:</b> {member.address}
                </div>
                <div>
                  <b>City:</b> {member.city}
                </div>
                <div>
                  <b>PIN:</b> {member.pin}
                </div>
                <div>
                  <b>WhatsApp No.:</b> {member.whatsapp}
                </div>
                <div>
                  <b>Residence:</b> {member.residence}
                </div>
                <div>
                  <b>NRI:</b> {member.nri}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Other Details */}
        <div>
          <h3
            className={styles.heading}
            onClick={toggle(setOtherOpen)}
            style={{ cursor: "pointer" }}
          >
            {isOtherOpen ? "▼" : "►"} Other Details
          </h3>
          {isOtherOpen && (
            <>
              <div className={styles.details}>
                <div>
                  <b>Remarks:</b> {member.remarks}
                </div>
                {/* Only show password if really needed */}
                {/* <div><b>Password:</b> {member.password}</div> */}
                {/* <div><b>Photo:</b> {member.photo && <a href={member.photo} target="_blank" rel="noreferrer">View</a>}</div> */}
                <div>
                  <b>BioData:</b>{" "}
                  {member.bioData && (
                    <a href={member.bioData} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
