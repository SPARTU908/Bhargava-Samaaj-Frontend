import axios from 'axios';

export const loginAdmin = async (loginData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
 try {
    const response = await axios.post(reqUrl, loginData);
    if (response?.data?.token) {
      return response.data;
    } else {
      throw new Error("Login failed: No token returned from server");
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return { error: error?.response?.data?.error || "Login failed" };
  }
};