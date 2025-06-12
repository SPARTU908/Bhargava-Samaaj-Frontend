import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./DisplayForm.module.css";
import { getAllMembers } from "../apis/member";
import { getAllPayment } from "../apis/payment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DisplayForm = ({ nextStep, }) => {

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const formRef = useRef();
  const location = useLocation();
   const { membership, name, email } = location.state || {};
  const userEmail = location.state?.email;


  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMembers = await getAllMembers();
        const allPayments = await getAllPayment();
        const matchedMember = allMembers.find(
          (m) =>
            m.email?.toLowerCase().trim() === userEmail?.toLowerCase().trim()
        );

        const matchedPayment = allPayments.find(
          (p) =>
            p.email?.toLowerCase().trim() === userEmail?.toLowerCase().trim()
        );

        setMember(matchedMember);
        setPaymentInfo(matchedPayment);
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

  const findPaymentByMember = (email) => {
    return payment.find(
      (p) => p.email?.toLowerCase().trim() === email?.toLowerCase().trim()
    );
  };

  const handleStatusChange = (email, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [email]: newStatus,
    }));
  };
const handleNext = () => {
  navigate("/payment", {
    state: {
      membership,
      name,
      email,
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

  return (
    <>
    <Navbar/>
      <div ref={formRef}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            अखिल भारतीय भार्गव सभा (रजि.) के सभासद बनने <br /> एवं लिमिटेड
            परिचय-पत्र प्राप्त करने हेतु <br />
            आवेदन-पत्र का प्रारूप{" "}
          </div>
          <div className={styles.headerRight}>
            <div>R/No. _____ dt. _____ /____/___ Rs.____</div>
            <div>L/M No. _____ - _____ /_____</div>
          </div>
        </div>

        <div className={styles.age}>
          सम्भवत: 18 वर्ष या उससे अधिक आयु के सभी महिला/पुरुष नियमुसार बन सकते
          हैं |
        </div>

        <div className={styles.imagesection}>
          <div className={styles.address}>
            <span className={styles.firstline}>
              प्रधान सचिव , अखिल भारतीय भार्गव सभा{" "}
            </span>{" "}
            <br /> 401, 3rd Floor,{" "}
            <span className={styles.road}>
              {" "}
              एम्पायर एस्टेट, मेहरौली–गुड़गांव रोड,
            </span>{" "}
            <br />{" "}
            <span className={styles.road}> सुल्तानपुर, नई दिल्ली – </span>
            110030
          </div>

          <div className={styles.pictures}>
            {member?.photo && (
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
            {member?.spousePhoto && (
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
          <div className={styles.line1}>
            1.साधारण सभासद &nbsp; (द्विवार्षिक सत्र के लिए )&nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;300 रुपये
          </div>
          <div className={styles.line2}>
            2.आजीवन सभासद &nbsp; एकल{" "}
            <span className={styles.six}>600 रुपये</span>
          </div>
          <div className={styles.line3}>
            {" "}
            युगल &nbsp;(पति-पत्नी){" "}
            <span className={styles.thousand}>1,000 रुपये</span>{" "}
          </div>
          <hr />
          <div className={styles.line4}>
            डुप्लिकेट परिचय हेतु शुल्क (प्रति सदस्य) -50 रुपये
          </div>
        </div>

        <div className={styles.bank}>
          <span className={styles.bankname}>
            शुल्क जमा करने हेतु बैंक खाता : &nbsp;{" "}
          </span>{" "}
          A/c Name:{" "}
          <span className={styles.bankname}>AKHIL BHARTIYA BHARGAVA SABHA</span>
          &nbsp; &nbsp; SB A/c no:{" "}
          <span className={styles.bankname}> 90442010053572, </span> <br />
          Bank & Branch :{" "}
          <span className={styles.bankname}>
            CANARA BANK, Nehru Place, New Delhi,{" "}
          </span>
          &nbsp;IFSC:
          <span className={styles.bankname}> CNRB0000390 </span> &nbsp; MICR
          Code: <span className={styles.bankname}> 110015016 </span>
        </div>

        <div className={styles.note}>
          नोट: सदस्यता प्राप्त करने हेतु निर्धारित शुल्क के साथ , प्रपत्र पत्र
          पूर्ण रूप से भरा हुआ , हस्ताक्षरित एवं आवश्यक{" "}
          <span className={styles.secline}>
            {" "}
            सत्यापन तथा फोटोग्राफ सहित सभा कार्यालय में पहुंचाना अनिवार्य है।{" "}
          </span>
        </div>

        <div className={styles.oneline}>
          कृपया मुझे / हमें साधारण /आजीवन सदस्यता प्रदान कर लेमिनेटेड परिचय
          -पत्र उपलब्ध कराने का कष्ट करें।
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
                <td>1. {member?.username || ""}</td>
                <td>{member?.fatherName || ""}</td>
                <td>
                  {member?.dob
                    ? new Date(member.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </td>
                <td>{member?.occupation || ""}</td>
              </tr>
              <tr>
                <td>2. {member?.spouse || ""}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.useraddress}>
          पूरा पता : {member?.address || "_______________"}
          <br />
          पिन कोड : {member?.pincode || "_______________"}
        </div>

        <div className={styles.mobile}>
          1. &nbsp; मोबाइल :{member?.mobile || "_______________"} &nbsp; ईमेल :{" "}
          {member?.email || "_______________"}
        </div>
        <div className={styles.mobile2}>
          2. &nbsp; मोबाइल :{member?.spouseMobile || "_______________"} &nbsp;
          ईमेल : {member?.spouseEmail || "_______________"}
        </div>

        <div className={styles.gotra}>
          प्रार्थी / पुरुष सदस्य श्री &nbsp;
          {member?.username || "_______________"} का गोत्र
          {member?.gotra || "_______________"} कुलदेवी
          {member?.kuldevi || "_______________"}
        </div>

        <div className={styles.cash}>संलग्न : </div>
        <div className={styles.cashcol}>
          <div>
            1. &nbsp;सदस्यता प्राप्त करने हेतु स्थानीय भार्गव सभा के प्रधान /
            मंत्री अथवा अखिल भारतीय भार्गव सभा के दो <br />
            &nbsp;पदाधिकारियों/सदस्यों द्वारा सत्यापित आवेदन पत्र।
          </div>
          <div>
            2. &nbsp;सदस्यता शुल्क राशि ₹__________ की रसीद या{" "}
            <span>'अखिल भारतीय भार्गव सभा'</span> &nbsp; के पक्ष में चेक <br />{" "}
            संख्या __________ दिनांक __________ (Cash/UPI/NEFT के माध्यम से भी
            राशि जमा की जा सकती है)।
          </div>
          <div>
            3. &nbsp;प्रत्येक सदस्य की एक-एक फोटो ऊपर दिए गए स्थान पर चिपकाई जाए
            (फोटो पर हस्ताक्षर नहीं किए जाएं)।
          </div>
        </div>

        <div className={styles.datesign}>
          <div className={styles.date}>
            दिनांक :{" "}
            {member?.createdAt
              ? new Date(member.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "_______________"}
          </div>
          <div className={styles.signature}>
            हस्ताक्षर आवेदक : _______________{" "}
          </div>
        </div>

        <div className={styles.shri}>
          श्री {member?.username || "______________________________"} के नमूने
          का हस्ताक्षर &nbsp; &nbsp; श्रीमती /सुश्री{" "}
          {member?.spouse || "______________________________"} के नमूने के
          हस्ताक्षर
        </div>

        <div className={styles.couplesign}>
          {member?.signature && (
            <img
              src={member.signature}
              alt=""
              style={{ width: "150px", height: "150px" }}
            />
          )}
          {member?.spouseSignature && (
            <img
              src={member.spouseSignature}
              alt=""
              style={{ width: "150px", height: "150px", marginLeft: "248px" }}
            />
          )}
        </div>

        <div className={styles.sign}>
          सत्यपनकर्ता (1) नाम ______________________________ &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; सत्यपनकर्ता (2) नाम
          ______________________________
        </div>

        <div className={styles.reference}>
          आ.भा .भा सभा की आजीवन सदस्य संख्या (1) _________________ &nbsp; आ.भा
          .भा सभा की आजीवन सदस्य संख्या (2) _________________
        </div>

        <div className={styles.referencemobile}>
          <div>मोबाइल नंबर (1)______________________________</div>
          <div> मोबाइल नंबर (2)______________________________</div>
        </div>
        <div className={styles.referenceemail}>
          <div> ईमेल:______________________________</div>
          <div> ईमेल:______________________________</div>
        </div>

        <div className={styles.conclusion}>
          (स्थानीय भार्गव सभा के अध्यक्ष / सचिव अथवा अखिल भारतीय सभा के दो
          कार्यकारी सदस्यों के हस्ताक्षर )
        </div>
      </div>

      <div className={styles.buttons}>
        {/* <button  className={styles.submit} onClick={prevStep}>Back</button> */}
        <button
          className={styles.submit}
          onClick={() => downloadAsImage(formRef.current)}
        >
          Download the form
        </button>
        <button  className={styles.submit} onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default DisplayForm;
