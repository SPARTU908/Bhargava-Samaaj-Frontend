import "./App.css";
import Magazine from "./pages/Magazine";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Census from "./pages/Census";
import Matrimonial from "./pages/Matrimonial";
import Membership from "./pages/Membership";
import Society from "./pages/Society";
import Members from "./pages/Members.jsx";
import Advertisement from "./pages/Advertisement.jsx";
import Download from "./pages/Download.jsx";
import Haridwar from "./pages/Haridwar.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import PendingForms from "./pages/PendingForms.jsx";
import Payment from "./pages/Payment.jsx";

function App() {
  return (
    <>
    {/* <GoogleTranslate/> */}
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/census" element={<Census />} />
          <Route path="/download" element={<Download />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/matrimonial" element={<Matrimonial />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/haridwar" element={<Haridwar />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/society" element={<Society />} />
          <Route path="/members" element={<Members />} />
         <Route path="/login" element={<AdminLogin />} />
         <Route path="/review" element={<PendingForms/>} />
         {/* <Route path="/payment" element={<Payment/>} /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
