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
