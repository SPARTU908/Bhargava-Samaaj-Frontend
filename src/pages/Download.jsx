// import Navbar from "../components/Navbar/Navbar";

// const Download = () => {
//   return (
//     <>
//     <Navbar/>
//      <div>Coming Soon</div>
//     </>
   
//   )
// }

// export default Download



// import Navbar from "../components/Navbar/Navbar";

// const pdfFiles = [
//   {
//     id: 1,
//     title: "Bhargava Sabha ki Properties",
//     url: "/pdfs/Bhargava Sabha Ki Properties.pdf",
   
//   },
//   {
//     id: 2,
//     title: "Samaaj Kalyan Sahayata Form 2025-2027",
//     url: "/pdfs/Samaj Kalyan Sahayata Form 2025-2027.pdf",
   
//   },
//   {
//     id: 3,
//     title: "Shiksha Chhatravati Application Form ",
//     url: "/pdfs/Shiksha Chhatravriti Application Form 2025-2027.pdf",
    
//   }
// ];

// const Download = () => {
//   return (
//     <>
//       <Navbar />
//       <div style={styles.container}>
//         <h1 style={styles.heading}>Download PDFs</h1>
//         <div style={styles.grid}>
//           {pdfFiles.map(({ id, title, url, description }) => (
//             <div key={id} style={styles.card}>
//               <div style={styles.iconContainer}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={styles.icon}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//               </div>
//               <h2 style={styles.title}>{title}</h2>
//               <p style={styles.description}>{description}</p>
//               <a href={url} target="_blank" rel="noopener noreferrer" style={styles.button}>
//                 View / Download
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "900px",
//     margin: "40px auto",
//     padding: "0 20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "30px",
//     color: "#333",
//   },
//   grid: {
//     display: "flex",
//     gap: "20px",
//     justifyContent: "center",
//     flexWrap: "wrap",
//   },
//   card: {
//     backgroundColor: "#f9f9f9",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     width: "260px",
//     padding: "20px",
//     textAlign: "center",
//     transition: "transform 0.2s ease",
//     cursor: "pointer",
//   },
//   iconContainer: {
//     backgroundColor: "#0070f3",
//     borderRadius: "50%",
//     width: "60px",
//     height: "60px",
//     margin: "0 auto 15px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   icon: {
//     width: "30px",
//     height: "30px",
//     color: "#fff",
//   },
//   title: {
//     fontSize: "1.25rem",
//     marginBottom: "10px",
//     color: "#111",
//   },
//   description: {
//     fontSize: "0.9rem",
//     color: "#555",
//     marginBottom: "20px",
//   },
//   button: {
//     display: "inline-block",
//     padding: "10px 20px",
//     backgroundColor: "#0070f3",
//     color: "#fff",
//     borderRadius: "6px",
//     textDecoration: "none",
//     fontWeight: "600",
//     boxShadow: "0 2px 8px rgba(0, 112, 243, 0.4)",
//     transition: "background-color 0.3s ease",
//   },
// };

// export default Download;


import Navbar from "../components/Navbar/Navbar";

const pdfFiles = [
  {
    id: 2,
    title: "Samaaj Kalyan Sahayata Form 2025-2027",
    url: "/pdfs/Samaj Kalyan Sahayata Form 2025-2027.pdf",
   
  },
  {
    id: 3,
    title: "Shiksha Chhatravati Application Form ",
    url: "/pdfs/Shiksha Chhatravriti Application Form 2025-2027.pdf",
    
  }
];

const Download = () => {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Download PDFs</h1>
        <div style={styles.grid}>
          {pdfFiles.map(({ id, title, url, description }) => (
            <div key={id} style={styles.card}>
              <h2 style={styles.title}>{title}</h2>
              <p style={styles.description}>{description}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" style={styles.button}>
                View / Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#222",
    fontSize: "2rem",
    fontWeight: "600",
  },
  grid: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    width: "300px",
    padding: "24px 20px",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "12px",
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: "0.95rem",
    color: "#666",
    marginBottom: "20px",
    minHeight: "40px",
  },
  button: {
    display: "inline-block",
    padding: "10px 22px",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    boxShadow: "0 3px 8px rgba(0, 112, 243, 0.25)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};

export default Download;
