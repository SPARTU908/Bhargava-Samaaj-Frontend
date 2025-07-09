import React, { useState, useRef } from "react";
import styles from "./BioDataUpload.module.css";

const BioDataUpload = ({ setSelectedFile }) => {
  const [message, setMessage] = useState("Choose file");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setSelectedFile(selectedFile);
    setMessage("File chosen successfully ✅");
  };

  return (
    <div>
      <div className={styles.input}>
        <label className={styles.fileLabel}>
          {message}
          <input
            type="file"
            name="file"
            onChange={handleChange}
            ref={fileInputRef}
            accept="image/png, image/jpeg, image/jpg, application/pdf"
            className={styles.fileInput}
          />
        </label>
      </div>
    </div>
  );
};

export default BioDataUpload;
