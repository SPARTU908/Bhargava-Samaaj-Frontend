import React, { useState , useRef } from "react";
import axios from "axios";
import styles from './FileUpload.module.css';

const FileUpload = ({url,setUrl}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); 
 

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://bhargava-samaaj-backend-3.onrender.com/upload", formData);
      setUrl(res.data.url); 
      setFile(null);
      fileInputRef.current.value = null;
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.input}>
        <input type="file" name="file" onChange={handleChange} ref={fileInputRef}/>
        <input type="submit" value="Upload"  className={styles.btn}/>
      </form>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* {url && (
          <>
            <img src={url} alt="Uploaded File" />
          </>
        )} */}
      </div>
    </div>
  );
};

export default FileUpload;
