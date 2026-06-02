import jsPDF from "jspdf";

const getBase64ImageFromURL = async (url) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.log("Image load failed", err);
    return null;
  }
};

const val = (v) => {
  if (v === null || v === undefined) return "NA";
  if (typeof v === "string" && v.trim() === "") return "NA";
  return v;
};

const DownloadFormMagazine = async (members, setProgress) => {
  const doc = new jsPDF("p", "mm", "a4");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  // ✅ Footer
  const addFooter = (doc) => {
    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);

      doc.text(
        "Parents are requested to recheck and confirm information themselves from above data.",
        105,
        285,
        { align: "center" },
      );

      doc.text(
        "Contact Email : abbsmatrimony25@gmail.com  Visit: www.bhargavasamajglobal.org",
        105,
        290,
        { align: "center" },
      );
    }
  };

  const pageWidth = doc.internal.pageSize.getWidth();

  // ✅ Title
  doc.setFontSize(14);
  doc.text("LIST OF MARRIAGEABLE CANDIDATES", pageWidth / 2, 10, {
    align: "center",
  });

  let startY = 15;

  const col1X = 12; // Image
  const col2X = 50; // Column 2
  const col3X = 95; // Column 3
  const col4X = 140; // Column 4
  // const colWidth = 40;

  const col2Width = 40;
  const col3Width = 40;
  const col4Width = 55;



  const splitWithLimit = (doc, text, width, maxLines = 4) => {
  const lines = doc.splitTextToSize(text, width);
  if (lines.length > maxLines) {
    return [...lines.slice(0, maxLines), "..."];
  }
  return lines;
};

  for (let i = 0; i < members.length; i++) {
    const m = members[i];

    // ✅ Split into 3 info columns
   const col2Text = [
  `Name: ${val(m.name)}`,
  `DOB: ${val(formatDate(m.dob))}`,
  `Height: ${val(m.height)}`,
  `Gotra: ${val(m.gotra)}`,
  `Kuldevi: ${val(m.kuldevi)}`,
  `Manglik: ${val(m.manglik)}`,
];

 const col3Text = [
  `Profession: ${val(m.profession)}`,
  `Education: ${val(m.education)}`,
  `Company: ${val(m.company)}`,
  `Income: ${val(m.income)}`,
];

const isFatherLate =
  m.fatherName &&
  /^(late|lt\.?)/i.test(m.fatherName.trim());

const parentName = isFatherLate
  ? `Mother: ${val(m.motherName)}`
  : `Father: ${val(m.fatherName)}`;

  const col4Text = [
  `City: ${val(m.city)}`,
  `Phone: ${val(m.mobile)}`,
  `Email: ${val(m.email)}`,
  `Address: ${val(m.address)}`,
  parentName,
];
    doc.setFontSize(18);

    // ✅ Height calculator
    const getHeight = (arr, width) => {
      let h = 0;
      arr.forEach((text) => {
        const split = doc.splitTextToSize(text, width);
        h += split.length * 3.2;
      });
      return h;
    };

    const h2 = getHeight(col2Text, col2Width);
    const h3 = getHeight(col3Text, col3Width);
    const h4 = getHeight(col4Text, col4Width);

    const contentHeight = Math.max(h2, h3, h4, 30);
    const boxHeight = Math.max(contentHeight + 4, 32);

    // ✅ Page break
    if (startY + boxHeight > 285) {
      doc.addPage();
      startY = 15;
    }

    // ✅ Draw outer box
    doc.rect(10, startY, 190, boxHeight);

    // ✅ Column divider lines
    doc.line(45, startY, 45, startY + boxHeight);
    doc.line(90, startY, 90, startY + boxHeight);
    doc.line(135, startY, 135, startY + boxHeight);

    // ✅ COLUMN 1 → IMAGE
    if (m.photo) {
      try {
        const base64Img = await getBase64ImageFromURL(m.photo);

        if (base64Img) {
          doc.addImage(
            base64Img,
            "JPEG",
            col1X,
            startY + (boxHeight - 30) / 2,
            30,
            30,
          );
        }
      } catch (e) {
        console.log("Image error", e);
      }
    }

  // ✅ Set bold font for all columns
doc.setFont("helvetica", "bold");
doc.setFontSize(12);

// ✅ COLUMN 2
let y2 = startY + 4;
col2Text.forEach((text) => {
  const split = doc.splitTextToSize(text, col2Width);
  doc.text(split, col2X, y2);
  y2 += split.length * 3.2;
});

// ✅ COLUMN 3
let y3 = startY + 4;
col3Text.forEach((text) => {
  const split = splitWithLimit(doc, text, col3Width, 4);
  doc.text(split, col3X, y3);
  y3 += split.length * 3.2;
});

// ✅ COLUMN 4
let y4 = startY + 4;
col4Text.forEach((text) => {
  const split = doc.splitTextToSize(text, col4Width);
  doc.text(split, col4X, y4);
  y4 += split.length * 3.2;
});

    startY += boxHeight;

    // ✅ Progress update
    const percent = Math.round(((i + 1) / members.length) * 100);
    if (setProgress) setProgress(percent);

    // ✅ Prevent UI freeze
    await new Promise((r) => setTimeout(r, 5));
  }

  addFooter(doc);

  doc.save("List_of_Candidates.pdf");
};

export default DownloadFormMagazine;
