import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const searchLifeMember = async (lm_no) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/register/lifemember/${lm_no}`
    );
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

export const createLifeMember = async (formData, photoFile) => {
  try {
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    if (photoFile) {
      data.append("photo", photoFile);
    }
    const response = await axios.post(
      `${BASE_URL}/api/v1/register/lifemember`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in createLifeMember:", error);
    throw error.response?.data || { message: "Something went wrong." };
  }
};

export const getUpdatedLifeMembers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/register/updated-members`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch updated life members",
      }
    );
  }
};


export const getNewLifeMembers = async (from, to) => {
  try {
    const params = {};

    if (from) params.from = from;
    if (to) params.to = to;

    const response = await axios.get(
      `${BASE_URL}/api/v1/register/life-members/new`,
      { params }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch new life members",
      }
    );
  }
};
