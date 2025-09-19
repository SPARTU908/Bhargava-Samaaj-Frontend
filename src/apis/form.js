import axios from "axios";

// export const registerUser = async (userDetails) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/submit`;
//   try {
//     const response = await axios.post(reqUrl, userDetails, {
//       withCredentials: true,
//     });
//     if (response) {
//       return response;
//     } else {
//       throw new Error("Registration failed: No email returned from server");
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };


export const registerUser = async (formData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/submit`;
  try {
    const response = await axios.post(reqUrl, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};


export const getMembers = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/all`;
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    console.log(response);
    let result = Array.from(response?.data);
    return result;
  } catch (error) {
    console.log(error);
  }
};


export const getApprovedMembers = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/approved`;
  const response = await axios.get(reqUrl, {
    withCredentials: true,
  });
  return response.data;
};


export const getPendingFormCount = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/pending/count`;
  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    return response.data.count;
  } catch (error) {
    console.error("Failed to fetch pending form count:", error);
    throw error;
  }
};

export const getRejectedFormCount = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/reject/count`;
  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    
    return response.data.count;
  } catch (error) {
    console.error("Failed to fetch rejected form count:", error);
    throw error;
  }
};

export const getRejectedForms = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/rejected`;
  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch rejected forms:", error);
    throw error;
  }
};


export const getApprovedFormCount = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/approved/count`;
  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    return response.data.count;
  } catch (error) {
    console.error("Failed to fetch approved form count:", error);
    throw error;
  }
};

export const deleteUser = async (email) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/deleteUser/${email}`;
  try {
    const response = await axios.delete(reqUrl, {
      withCredentials: true,
    });
    
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to delete user: No data returned from server");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};


export const updateUserDetails = async (email, updatedData) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/update/${email}`;
  try {
    const response = await axios.patch(reqUrl, updatedData, {
      withCredentials: true,
    });

    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to update user: No data returned from server");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
