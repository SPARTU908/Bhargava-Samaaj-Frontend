import React, { useState , useRef } from "react";
import axios from "axios";
import styles from "./PhotoUpload.module.css"

const PhotoUpload = ({url,setUrl}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); 
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
  const memberData = new FormData();
    memberData.append("file", file);
  try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/upload`;
      const res = await axios.post(reqUrl, memberData);
      console.log(res.data);
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
        <input type="file" name="file" onChange={handleChange} ref={fileInputRef} accept="image/png, image/jpeg, image/jpg, "/>
        <input type="submit" value="Upload" className={styles.btn} />
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
            <img src={url} alt="Uploaded File"  className={styles.img}/>
          </>
        )} */}
      </div>
    </div>
  );
};

export default PhotoUpload;
