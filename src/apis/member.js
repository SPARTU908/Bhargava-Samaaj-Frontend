import axios from "axios";


export const registerMember = async(memberDetails)=>{
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/register`;  
  try {
    const response = await axios.post(reqUrl, memberDetails);
  if (response) {
      return response;
    } else {
      throw new Error("Registration failed: No email returned from server");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}


