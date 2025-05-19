import React from "react";
import "./PdfGallery.css";

// All months
const allMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// PDF and cover image mapping
const pdfData = [
  {
    year: 2025,
    months:["January","February","March","April"

    ]
  },
  {
    year: 2024,
    months: allMonths,
  },
  {
    year: 2023,
    months: [
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ],
  },
];

// Cover images mapped by "Month-Year"
const coverImages = {
  "January-2025": "/covers/january-2025.png",
  "February-2025": "/covers/february-2025.png",
  "March-2025": "/covers/march-2025.png",
  "April-2025": "/covers/april-2025.png",
  "January-2024": "/covers/jan-2024.png",
  "February-2024": "/covers/feb-2024.png",
  "March-2024": "/covers/march-2024.png",
  "April-2024": "/covers/april-2024.png",
  "May-2024": "/covers/may-2024.png",
  "June-2024": "/covers/june-2024.png",
  "July-2024": "/covers/july-2024.png",
  "August-2024": "/covers/aug-2024.png",
  "September-2024": "/covers/sep-2024.png",
  "October-2024": "/covers/oct-2024.png",
  "November-2024": "/covers/nov-2024.png",
  "December-2024": "/covers/dec-2024.png",
  "April-2023": "/covers/april-2023.png",
  "May-2023": "/covers/may-2023.png",
  "June-2023": "/covers/june-2023.png",
  "July-2023": "/covers/july-2023.png",
  "August-2023": "/covers/aug-2023.png",
  "September-2023": "/covers/sep-2023.png",
  "October-2023": "/covers/oct-2023.png",
  "November-2023": "/covers/nov-2023.png",
  "December-2023": "/covers/dec-2023.png",
};

const PdfGallery = () => {
  return (
    <div className="container">
      {pdfData.map((yearBlock) => (
        <div key={yearBlock.year} className="mb-5">
          <div className="row">
            {yearBlock.months.map((month, index) => {
              const fileKey = `${month}-${yearBlock.year}`;
              const filePath = `/pdfs/${yearBlock.year}/${month}-${yearBlock.year}.pdf`;
              const imagePath = coverImages[fileKey] || "/covers/default.jpg"; // fallback image

              return (
                <div className="col-md-3 mb-4" key={index}>
                  <a
                    href={filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card text-decoration-none"
                  >
                    <img
                      src={imagePath}
                      className="card-img-top"
                      alt={`${month} ${yearBlock.year}`}
                    />
                    <div className="card-body">
                      <p className="card-text text-dark">{month} {yearBlock.year}</p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfGallery;




