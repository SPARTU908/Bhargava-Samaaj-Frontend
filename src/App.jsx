import "./App.css";
import Magazine from "./pages/Magazine";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage2 from "./pages/Homepage2";
import About from "./pages/About";
import Census from "./pages/Census";
import Matrimonial from "./pages/Matrimonial";
import Membership from "./pages/Membership";
import Society from "./pages/Society";
import Members from "./pages/Members.jsx";
import Advertisement from "./pages/Advertisement.jsx";
import Download from "./pages/Download.jsx";
import Haridwar from "./pages/Haridwar.jsx";
import PendingForms from "./pages/PendingForms.jsx";
import Payment from "./pages/Payment.jsx"
import Payment1 from "./pages/Payment1.jsx"
import MemberAdmin from "./pages/MemberAdmin.jsx";
import Admin from "./pages/Admin.jsx";
import MatrimonialAdminDashboard from "./pages/MatrimonialAdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard.jsx";
import DisplayForm from "./pages/DisplayForm.jsx";
import MembershipAdminDashboard from "./pages/MembershipAdminDashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import VivahMemberLogin from "./components/VivahMember/VivahMemberLogin.jsx";
import VivahMemberRegister from "./components/VivahMember/VivahMemberRegister.jsx";
import FindYourMatch from "./pages/FindYourMatch.jsx";
import PendingMemberList from "./pages/PendingMemberList.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignFormUpload from "./pages/SignFormUpload.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/census" element={<Census />} />
          <Route path="/download" element={<Download />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/matrimonial" element={<Matrimonial />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/haridwar" element={<Haridwar />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/society" element={<Society />} />
          <Route path="/members" element={
              <PrivateRoute>
                <Members />
              </PrivateRoute>
            }
          />
      
          <Route
            path="/review"
            element={
              <PrivateRoute>
                <PendingForms />
              </PrivateRoute>
            }
          />
 
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/memberadmin"
            element={
              <PrivateRoute>
                <MemberAdmin />
              </PrivateRoute>
            }
          />
            <Route path="/payment1" element={<Payment1 />} />

          <Route path="/admin" element={<Admin />} />
          <Route
            path="/matrimonialadmin"
            element={<MatrimonialAdminDashboard />}
          />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route
            path="/memberadmindashboard"
            element={<MembershipAdminDashboard />}
          />
          <Route path="/displayform" element={<DisplayForm />} />

          <Route
            path="/vivahmemberregister"
            element={<VivahMemberRegister />}
          />
          <Route path="/vivahmemberlogin" element={<VivahMemberLogin />} />
          <Route path="/findyourmatch" element={<FindYourMatch />} />
          <Route path="/pendingmember" element={<PendingMemberList />} />
          <Route path="/sign-form-upload" element={<SignFormUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
