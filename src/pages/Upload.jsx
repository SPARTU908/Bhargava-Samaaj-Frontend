import React from "react";
import Navbar from "../components/Navbar/Navbar";
const Upload = () => {
    const [uploaddata, setUploadData] = useState({
        name: name || "",
        email: email || "",
        mobile: "",
        transaction: "",
        upload:"",

      });
  return (
    <>
      <Navbar />
      <div className={styles.heading}>Coming Soon!</div>
      
    </>
  );
};

export default Upload;
