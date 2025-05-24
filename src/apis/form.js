import axios from "axios";

export const registerUser = async (userDetails) => {
  
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/submit`;  
  try {
    const response = await axios.post(reqUrl, userDetails);
  if (response) {
      return response;
    } else {
      throw new Error("Registration failed: No email returned from server");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};


export const getMembers = async () => {
  try {
    const reqUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/form/all`;

    const response = await axios.get(reqUrl);
    console.log(response);
    let result = Array.from(response?.data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getApprovedMembers = async () => {
  const response = await axios.get('https://bhargava-samaaj-backend-3.onrender.com/api/v1/form/approved'); 
  return response.data;
};