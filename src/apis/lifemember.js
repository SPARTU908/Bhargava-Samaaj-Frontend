import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const searchLifeMember = async (lm_no) => {
  try {
     const response = await axios.get(`${BASE_URL}/api/v1/register/lifemember/${lm_no}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching member" };
  }
};

export const getAllLifeMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/register/lifemembers`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch life members"
    );
  }
};

export const updateLifeMember = async (lm_no, updateData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/register/life-members/${lm_no}`,
      updateData
    );

    return response.data; 
  } catch (error) {
    console.error("Error in updateLifeMember:", error);
    const message = error.response?.data?.message || "Update failed";
    throw new Error(message);
  }
};