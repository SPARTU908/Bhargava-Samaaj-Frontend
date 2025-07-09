import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./PhotoUpload.module.css";

// const PhotoUpload = ({ url, setUrl }) => {
//   const [message, setMessage] = useState("Choose file");
//   const fileInputRef = useRef(null);

//   const handleChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/upload`;
//       const res = await axios.post(reqUrl, formData);
//       setUrl(res.data.url);
//       setMessage("File chosen successfully ✅");
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("Upload failed ❌");
//     }
//   };

//   return (
//     <div>
//       <div className={styles.input}>
//         <label className={styles.fileLabel}>
//           {message}
//           <input
//             type="file"
//             name="file"
//             onChange={handleChange}
//             ref={fileInputRef}
//             accept="image/png, image/jpeg, image/jpg,"
//             className={styles.fileInput}
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default PhotoUpload;




const PhotoUpload = ({ file, setFile }) => {
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

export default PhotoUpload;