import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Navbar from "../components/Navbar/Navbar";
import styles from "./DisplayForm.module.css";
import { getAllMembers } from "../apis/member";

const DisplayForm = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { membership, name, email ,memberId,} = location.state || {};
  const userEmail = email;

useEffect(() => {
  const fetchData = async () => {
    try {
      const allMembers = await getAllMembers();
      const matchedMember = allMembers.find(
        (m) => m.email?.toLowerCase().trim() === userEmail?.toLowerCase().trim()
      );

      if (matchedMember) {
        setMember(matchedMember);
        localStorage.setItem("memberId", matchedMember._id); // ✅ save fallback
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  const handleNext = () => {
    navigate("/payment", {
      state: {
        membership,
        name,
        email,
       memberId: member._id,
      },
    });
  };

  const downloadAsImage = async (element) => {
    const canvas = await html2canvas(element, {
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "membership-form.png";
    link.click();
  };

  if (loading) return <div>Loading form...</div>;
  if (!member) return <div>Member data not found.</div>;

  return (
    <>
      <Navbar />
      <div ref={formRef}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            अखिल भारतीय भार्गव सभा (रजि.) के सभासद बनने <br /> एवं लिमिटेड परिचय-पत्र प्राप्त करने हेतु <br /> आवेदन-पत्र का प्रारूप
          </div>
          <div className={styles.headerRight}>
            <div>R/No. _____ dt. _____ /____/___ Rs.____</div>
            <div>L/M No. _____ - _____ /_____</div>
          </div>
        </div>

        <div className={styles.age}>
          सम्भवत: 18 वर्ष या उससे अधिक आयु के सभी महिला/पुरुष नियमुसार बन सकते हैं |
        </div>

        <div className={styles.imagesection}>
          <div className={styles.address}>
            <span className={styles.firstline}>
              प्रधान सचिव , अखिल भारतीय भार्गव सभा{" "}
            </span>{" "}
            <br /> 401, 3rd Floor,{" "}
            <span className={styles.road}>एम्पायर एस्टेट, मेहरौली–गुड़गांव रोड,</span>{" "}
            <br />
            <span className={styles.road}>सुल्तानपुर, नई दिल्ली – </span>
            110030
          </div>

          <div className={styles.pictures}>
            {member.photo && (
              <img
                src={member.photo}
                alt=""
                style={{
                  width: "150px",
                  height: "200px",
                  border: "2px solid black",
                }}
              />
            )}
            {member.spousePhoto && (
              <img
                src={member.spousePhoto}
                alt=""
                style={{
                  width: "150px",
                  height: "200px",
                  marginLeft: "20px",
                  border: "2px solid black",
                }}
              />
            )}
          </div>
        </div>

        <div className={styles.fees}>
          <div className={styles.feeheading}>सदस्यता शुल्क:</div>
          <div className={styles.line1}>1.साधारण सभासद (द्विवार्षिक सत्र के लिए) - 300 रुपये</div>
          <div className={styles.line2}>2. आजीवन सभासद (एकल) - 600 रुपये</div>
          <div className={styles.line3}>युगल (पति-पत्नी) - 1,000 रुपये</div>
        
          <div className={styles.line4}>डुप्लिकेट परिचय शुल्क - 50 रुपये</div>
        </div>

        <div className={styles.bank}>
          <span className={styles.bankname}>शुल्क जमा करने हेतु बैंक खाता:</span>
          A/c Name: <span className={styles.bankname}>AKHIL BHARTIYA BHARGAVA SABHA</span>
          &nbsp; SB A/c no: <span className={styles.bankname}>90442010053572</span> <br />
          Bank: <span className={styles.bankname}>CANARA BANK, Nehru Place, New Delhi</span> &nbsp;
          IFSC: <span className={styles.bankname}>CNRB0000390</span> &nbsp; MICR: <span className={styles.bankname}>110015016</span>
        </div>

        <div className={styles.note}>
          नोट: सदस्यता प्राप्त करने हेतु निर्धारित शुल्क के साथ, प्रपत्र पत्र पूर्ण रूप से भरा हुआ, हस्ताक्षरित एवं आवश्यक सत्यापन तथा फोटोग्राफ सहित सभा कार्यालय में पहुंचाना अनिवार्य है।
        </div>

        <div className={styles.oneline}>
          कृपया मुझे / हमें साधारण / आजीवन सदस्यता प्रदान कर लेमिनेटेड परिचय-पत्र उपलब्ध कराने का कष्ट करें।
        </div>

        <div className="table-container">
          <table className={styles.customTable}>
            <thead>
              <tr>
                <td>नाम</td>
                <td>पिता/पति का नाम</td>
                <td>जन्म तिथि</td>
                <td>व्यवसाय</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. {member.username}</td>
                <td>{member.fatherName}</td>
                <td>
                  {new Date(member.dob).toLocaleDateString("en-GB")}
                </td>
                <td>{member.occupation}</td>
              </tr>
              <tr>
                <td>2. {member.spouse}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.useraddress}>
          पूरा पता : {member.address} <br />
          पिन कोड : {member.pincode}
        </div>

        <div className={styles.mobile}>
          1. मोबाइल : {member.mobile} &nbsp; ईमेल : {member.email}
        </div>
        <div className={styles.mobile2}>
          2. मोबाइल : {member.spouseMobile} &nbsp; ईमेल : {member.spouseEmail}
        </div>

        <div className={styles.gotra}>
          कुमारी/श्री/श्रीमती {member.username} का गोत्र {member.gotra} कुलदेवी {member.kuldevi}
        </div>

        <div className={styles.cash}>संलग्न :</div>
        <div className={styles.cashcol}>
          <div>
            1. सत्यापन किया गया आवेदन पत्र
          </div>
          <div>
            2. सदस्यता शुल्क राशि ₹__________ की रसीद या चेक संख्या __________ दिनांक __________
          </div>
          <div>
            3. प्रत्येक सदस्य की फोटो संलग्न की गई है
          </div>
        </div>

        <div className={styles.datesign}>
          <div className={styles.date}>
            दिनांक : {new Date(member.createdAt).toLocaleDateString("en-GB")}
          </div>
          <div className={styles.signature}>
            हस्ताक्षर आवेदक : _______________
          </div>
        </div>

        <div className={styles.shri}>
          {member.username} के नमूने का हस्ताक्षर &nbsp;&nbsp;
          {member.spouse} के नमूने के हस्ताक्षर
        </div>

        <div className={styles.couplesign}>
          {member.signature && (
            <img
              src={member.signature}
              alt="signature"
              style={{ width: "150px", height: "150px" }}
            />
          )}
          {member.spouseSignature && (
            <img
              src={member.spouseSignature}
              alt="spouse signature"
              style={{ width: "150px", height: "150px", marginLeft: "248px" }}
            />
          )}
        </div>

        <div className={styles.sign}>
          सत्यपनकर्ता (1) नाम ______________________ &nbsp; सत्यपनकर्ता (2) नाम ______________________
        </div>

        <div className={styles.reference}>
          सदस्य संख्या (1) _________________ &nbsp; सदस्य संख्या (2) _________________
        </div>

        <div className={styles.referencemobile}>
          <div>मोबाइल (1)____________________</div>
          <div>मोबाइल (2)____________________</div>
        </div>

        <div className={styles.referenceemail}>
          <div>ईमेल:____________________</div>
          <div>ईमेल:____________________</div>
        </div>

        <div className={styles.conclusion}>
          (स्थानीय भार्गव सभा के अध्यक्ष / सचिव अथवा अखिल भारतीय सभा के दो कार्यकारी सदस्यों के हस्ताक्षर)
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.submit}
          onClick={() => downloadAsImage(formRef.current)}
        >
          Download the form
        </button>
        <button className={styles.submit} onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default DisplayForm;
