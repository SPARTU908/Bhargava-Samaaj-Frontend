import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// 🔍 Search member by lm_no
export const searchLifeMember = async (lm_no) => {
  try {
     const response = await axios.get(`${BASE_URL}/api/v1/register/lifemember/${lm_no}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching member" };
  }
};

// ✏️ Update empty fields (with optional photo)
export const updateLifeMember = async (lm_no, formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/register/lifemember/update/${lm_no}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating member" };
  }
};
