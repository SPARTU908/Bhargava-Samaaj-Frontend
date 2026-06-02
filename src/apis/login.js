import axios from "axios";

export const loginUser = async (userDetails) => {
  const { password } = userDetails;
  const email = userDetails.email?.toLowerCase(); 
 
  try {
     console.log("Login request body:", { email, password }); 
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`;

    const response = await axios.post(
      reqUrl,
      { email, password },
      {
        withCredentials: true,
      }
    );

    localStorage.setItem("bhargava", response?.data?.token);
    localStorage.setItem("email", response?.data?.email);
    localStorage.setItem("name", response?.data?.name);

    return response;
  } catch (error) {
    console.log("Login error from frontend:", error?.response?.data || error.message);
    return error;
  }
};