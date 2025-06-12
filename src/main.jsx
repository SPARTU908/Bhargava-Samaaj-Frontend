import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import '@react-pdf-viewer/core/lib/styles/index.css';


createRoot(document.getElementById("root")).render(<App />);
