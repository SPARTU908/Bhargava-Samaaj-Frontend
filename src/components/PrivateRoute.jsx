// import { Navigate } from "react-router-dom";
// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   return isLoggedIn ? children : <Navigate to="/home" replace />;
// };

// export default PrivateRoute;



import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/home" replace />;
};

export default PrivateRoute;
