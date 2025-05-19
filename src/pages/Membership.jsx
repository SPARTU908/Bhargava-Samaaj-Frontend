import Navbar from "../components/Navbar/Navbar";
import styles from "./Membership.module.css";
import pdf from "../assets/pdf.png";

const Membership = () => {
  return (
    <>
      <Navbar />
      <>
        <div className={styles.heading}>सदस्य संबंधित जानकारी</div>
        <div className={styles.pdf}>
          <a
            href="/pdfs/Membership/pdf1.pdf"
            target="_blank"
            rel="noopener noreferrer"
          ><img src={pdf} alt="PDF Thumbnail" className={styles.pdf1} />
          <div className={styles.abbs}>ABBS Life Members as on 20.04.2025</div>
          </a>
          <a
            href="/pdfs/Membership/pdf2.pdf"
            target="_blank"
            rel="noopener noreferrer"
          ><img src={pdf} alt="PDF Thumbnail" className={styles.pdf2} />
           <div className={styles.patrika}>Bhargava Patrika Subscriber as on 10.05.2025</div>
          </a>
        </div>
      </>
    </>
  );
};

export default Membership;
