import axios from "axios";

export const registerMember = async (memberDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/register`;
  try {
    console.log(memberDetails);
    const response = await axios.post(reqUrl, memberDetails);
    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.message,
      };
    }
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
};

export const getAllMembers = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/allmember`;

    const response = await axios.get(reqUrl);
    console.log(response);
    return response?.data?.data || [];
  
  } catch (error) {
    console.log(error);
  }
};
