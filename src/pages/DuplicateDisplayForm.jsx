import React, { forwardRef } from "react";
import styles from "./DisplayForm.module.css";

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB");
};


const DuplicateDisplayForm = forwardRef(
  ({ member }, ref) => {

    if (!member) return null;

    const spouse = member.spouse || {};


    const downloadApplicationPdf = async (
  application
) => {
  try {
    setDownloading(true);

    /*
     * Pehle selected application set karte hain
     * taaki hidden form render ho sake.
     */
    setSelectedApplication(application);

    /*
     * React ko DOM render karne ka thoda time.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    const element =
      formRef.current;

    if (!element) {
      throw new Error(
        "Form could not be generated."
      );
    }

    /*
     * Images load hone ka wait
     */
    const images =
      element.querySelectorAll("img");

    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {

            if (img.complete) {
              resolve();
              return;
            }

            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );


    const canvas =
      await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });


    const imageData =
      canvas.toDataURL(
        "image/jpeg",
        0.95
      );


    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );


    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      pdf.internal.pageSize.getHeight();


    const imageWidth =
      pdfWidth;

    const imageHeight =
      (canvas.height *
        imageWidth) /
      canvas.width;


    /*
     * Agar form ek page se bada ho
     * to automatically next pages create karega.
     */

    let heightLeft =
      imageHeight;

    let position = 0;


    pdf.addImage(
      imageData,
      "JPEG",
      0,
      position,
      imageWidth,
      imageHeight
    );


    heightLeft -=
      pdfHeight;


    while (heightLeft > 0) {

      position =
        heightLeft -
        imageHeight;

      pdf.addPage();

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        position,
        imageWidth,
        imageHeight
      );

      heightLeft -=
        pdfHeight;
    }


    const safeName =
      application.name
        ?.replace(
          /[^a-zA-Z0-9]/g,
          "_"
        ) ||
      "member";


    pdf.save(
      `Duplicate_Form_${application.abbsLmNo || ""}_${safeName}.pdf`
    );

  } catch (error) {

    console.error(
      "PDF download error:",
      error
    );

    alert(
      "PDF download नहीं हो पाया।"
    );

  } finally {

    setDownloading(false);

    setSelectedApplication(null);
  }
};

    return (
      <div
        ref={ref}
        className={styles.printContainer}
      >
        <div className={styles.pdfPage}>

          {/* HEADER */}
          <div className={styles.header}>

            <div className={styles.headerLeft}>
            अखिल भारतीय भार्गव सभा (रजि.) के सभासद बनने <br /> एवं लिमिटेड
            परिचय-पत्र प्राप्त करने हेतु <br /> आवेदन-पत्र का प्रारूप
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


          {/* OFFICE ADDRESS + PHOTOS */}
          <div className={styles.imagesection}>

            <div className={styles.address}>

              <span className={styles.firstline}>
                          प्रधान सचिव , अखिल भारतीय भार्गव सभा{" "}
                </span>{" "}

               <br /> 401, 3rd Floor,{" "}

            

               <span className={styles.road}>
                           एम्पायर एस्टेट, मेहरौली–गुड़गांव रोड,
                         </span>{" "}

              <br />

              <span className={styles.road}>सुल्तानपुर, नई दिल्ली – </span>
                        110030

            </div>


            <div className={styles.row}>

              <div className={styles.fees}>

                <div className={styles.feeheading}>
                  सदस्यता शुल्क:
                </div>
               <div className={styles.line1}>
                1.साधारण सभासद (द्विवार्षिक सत्र के लिए) - 300 रुपये
              </div>
              <div className={styles.line2}>
                2. आजीवन सभासद (एकल) - 600 रुपये
              </div>
              <div className={styles.line3}>युगल (पति-पत्नी) - 1,000 रुपये</div>

              <div className={styles.line4}>
                डुप्लिकेट परिचय शुल्क - 50 रुपये
              </div>

               

              </div>


              <div className={styles.pictures}>

                {member.photo && (
                  <img
                    src={member.photo}
                    alt="Member"
                    crossOrigin="anonymous"
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                      border: "2px solid black",
                    }}
                  />
                )}


                {spouse.photo && (
                  <img
                    src={spouse.photo}
                    alt="Spouse"
                    crossOrigin="anonymous"
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                      marginLeft: "20px",
                      border: "2px solid black",
                    }}
                  />
                )}

              </div>

            </div>

          </div>


          {/* BANK */}
          <div className={styles.bank}>

            <span className={styles.bankname}>
              शुल्क जमा करने हेतु बैंक खाता:
            </span>

            {" "}A/c Name:{" "}

            <span className={styles.bankname}>
              AKHIL BHARTIYA BHARGAVA SABHA
            </span>

            &nbsp; SB A/c no:{" "}

            <span className={styles.bankname}>
              90442010053572
            </span>

            <br />

            Bank:{" "}

            <span className={styles.bankname}>
              CANARA BANK, Nehru Place,
              New Delhi
            </span>

            &nbsp; IFSC:{" "}

            <span className={styles.bankname}>
              CNRB0000390
            </span>

            &nbsp; MICR:{" "}

            <span className={styles.bankname}>
              110015016
            </span>

          </div>


          {/* NOTE */}
          <div className={styles.note}>
                   नोट: सदस्यता प्राप्त करने हेतु निर्धारित शुल्क के साथ, प्रपत्र पत्र
                   पूर्ण रूप से भरा हुआ, हस्ताक्षरित एवं आवश्यक सत्यापन तथा फोटोग्राफ
                   सहित सभा कार्यालय में पहुंचाना अनिवार्य है।
                 </div>


          <div className={styles.oneline}>
                   कृपया मुझे / हमें साधारण / आजीवन सदस्यता प्रदान कर लेमिनेटेड
                   परिचय-पत्र उपलब्ध कराने का कष्ट करें।
                 </div>
         

          {/* DETAILS TABLE */}
          <div className="table-container">

            <table className={styles.customTable}>

              <thead>
                <tr>
                  <td>नाम</td>
                  <td>पिता/पति का नाम</td>
                  <td>जन्म तिथि</td>
                  <td>व्यवसाय</td>
                  <td>L/M No.</td>
                </tr>
              </thead>


              <tbody>

                <tr>

                  <td>
                    1. {member.name || ""}
                  </td>

                  <td>
                    {member.relationName || ""}
                  </td>

                  <td>
                    {formatDate(member.dob)}
                  </td>

                  <td>
                    {member.occupation || ""}
                  </td>

                  <td>
                    {member.abbsLmNo || ""}
                  </td>

                </tr>


                {spouse.name && (
                  <tr>

                    <td>
                      2. {spouse.name}
                    </td>

                    <td>
                      {spouse.relationName || ""}
                    </td>

                    <td>
                      {formatDate(spouse.dob)}
                    </td>

                    <td>
                      {spouse.occupation || ""}
                    </td>

                    <td>
                      {spouse.abbsLmNo || ""}
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>


          {/* ADDRESSES */}
          <div className={styles.useraddress}>

            <strong>
              पुराना / वर्तमान पता:
            </strong>

            {" "}
            {member.oldAddress || ""}

            <br />

            <strong>
              पुराना पिन कोड:
            </strong>

            {" "}
            {member.pincode || ""}

            <br />

            <strong>
              नया पता:
            </strong>

            {" "}
            {member.newAddress || ""}

            <br />

            <strong>
              नया पिन कोड:
            </strong>

            {" "}
            {member.newPincode || ""}

          </div>


          {/* CONTACT */}
          <div className={styles.mobile}>

            1. मोबाइल :{" "}
            {member.mobile || ""}

            &nbsp;&nbsp;

            ईमेल :{" "}
            {member.email || ""}

          </div>


          {spouse.name && (
            <div className={styles.mobile2}>

              2. मोबाइल :{" "}
              {spouse.mobile || ""}

              &nbsp;&nbsp;

              ईमेल :{" "}
              {spouse.email || ""}

            </div>
          )}


          {/* GOTRA */}
          <div className={styles.gotra}>

            कुमारी/श्री/श्रीमती{" "}

            {member.name}

            {" "}का गोत्र{" "}

            {member.gotra || "________"}

            {" "}कुलदेवी{" "}

            {member.kuldevi || "________"}

          </div>


          {/* ATTACHMENTS */}
                 <div className={styles.cash}>संलग्न :</div>

                  <div className={styles.cashcol}>
                           <div>1. सत्यापन किया गया आवेदन पत्र</div>
                           <div>
                             2. सदस्यता शुल्क राशि ₹__________ की रसीद या चेक संख्या __________
                             दिनांक __________
                           </div>
                           <div>3. प्रत्येक सदस्य की फोटो संलग्न की गई है</div>
                         </div>
 <div className={styles.datesign}>
          <div className={styles.date}>
            दिनांक : {new Date(member.createdAt).toLocaleDateString("en-GB")}
          </div>
          <div className={styles.signature}>
            हस्ताक्षर आवेदक : _______________
          </div>
        </div>

         


          {/* DATE */}
          <div className={styles.datesign}>

            <div className={styles.date}>
              दिनांक :{" "}
              {formatDate(member.createdAt)}
            </div>

            <div className={styles.signature}>
              हस्ताक्षर आवेदक
            </div>

          </div>


          {/* SIGNATURE NAMES */}
          <div className={styles.shri}>

            {member.name}
            {" "}के नमूने का हस्ताक्षर

            {spouse.name && (
              <>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {spouse.name}
                {" "}के नमूने के हस्ताक्षर
              </>
            )}

          </div>


          {/* SIGNATURE IMAGES */}
          <div className={styles.couplesign}>

            {member.signature && (
              <img
                src={member.signature}
                alt="Member Signature"
                crossOrigin="anonymous"
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            )}


            {spouse.signature && (
              <img
                src={spouse.signature}
                alt="Spouse Signature"
                crossOrigin="anonymous"
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "contain",
                  marginLeft: "248px",
                }}
              />
            )}

          </div>

 <div className={styles.sign}>
          सत्यपनकर्ता (1) नाम ______________________ &nbsp; सत्यपनकर्ता (2) नाम
          ______________________
        </div>

        <div className={styles.reference}>
          सदस्य संख्या (1) _________________ &nbsp; सदस्य संख्या (2)
          _________________
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
          (स्थानीय भार्गव सभा के अध्यक्ष / सचिव अथवा अखिल भारतीय सभा के दो
          कार्यकारी सदस्यों के हस्ताक्षर)
        </div>
       
         

          

        </div>
      </div>
    );
  }
);

DuplicateDisplayForm.displayName =
  "DuplicateDisplayForm";

export default DuplicateDisplayForm;