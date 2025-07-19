// 📄 src/components/FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`✅ Upload successful! File URL: ${res.data.url}`);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Upload failed";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Upload Image or PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            style={{ width: "100%", maxHeight: 200, marginTop: 10 }}
          />
        )}
        <button
          type="submit"
          style={{ marginTop: 10 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
};

export default FileUpload;
