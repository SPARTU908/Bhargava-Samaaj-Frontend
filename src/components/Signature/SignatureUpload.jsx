import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./SignatureUpload.module.css";





const SignatureUpload = ({ file, setFile }) => {
  const [message, setMessage] = useState("Choose file");
  const fileInputRef = useRef(null);

const handleChange = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  setFile(selectedFile);
  setMessage(`📁 ${selectedFile.name} ✅`);
};
  return (
    <div className={styles.input}>
      <label className={styles.fileLabel}>
        {message}
        <input
          type="file"
          name="file"
          onChange={handleChange}
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          className={styles.fileInput}
        />
      </label>
    </div>
  );
};

export default SignatureUpload;
