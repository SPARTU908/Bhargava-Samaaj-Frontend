import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
// import { pdfjs } from "@react-pdf-viewer/core"; 
import '@react-pdf-viewer/core/lib/styles/index.css';


createRoot(document.getElementById("root")).render(<App />);
