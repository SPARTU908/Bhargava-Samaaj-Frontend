import axios from "axios";
export const loginUser = async (userDetails) => {
    const { email, password } = userDetails;
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`;
      const response = await axios.post(reqUrl, { email, password });
      localStorage.setItem("bhargava", response?.data?.token);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("name", response?.data?.name);
      let result;
      if (response?.data) {
        result = response;
      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };