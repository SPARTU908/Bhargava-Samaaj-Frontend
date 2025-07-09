import axios from "axios";

// export const registerUser = async (userDetails) => {
  
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/submit`;  
//   try {
//     const response = await axios.post(reqUrl, userDetails);
//   if (response) {
//       return response;
//     } else {
//       throw new Error("Registration failed: No email returned from server");
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };


// export const getMembers = async () => {
//   try {
//     const reqUrl = `${
//       import.meta.env.VITE_BACKEND_URL
//     }/api/v1/form/all`;

//     const response = await axios.get(reqUrl);
//     console.log(response);
//     let result = Array.from(response?.data);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getApprovedMembers = async () => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/approved`; 
//   const response = await axios.get(reqUrl); 
//   return response.data;
// };

// export const getPendingFormCount = async () => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/pending/count`; 
//   try {
//     const response = await axios.get(reqUrl);
//     return response.data.count; 
//   } catch (error) {
//     console.error("Failed to fetch pending form count:", error);
//     throw error;
//   }
// };

// export const getApprovedFormCount = async () => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/approved/count`; 
//   try {
//     const response = await axios.get(reqUrl);
//     return response.data.count; 
//   } catch (error) {
//     console.error("Failed to fetch pending form count:", error);
//     throw error;
//   }
// };



// ✅ Register User
export const registerUser = async (userDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/submit`;
  try {
    const response = await axios.post(reqUrl, userDetails, {
      withCredentials: true,
    });
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

// ✅ Get All Members (Protected)
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

// ✅ Get Approved Members (Protected)
export const getApprovedMembers = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/form/approved`;
  const response = await axios.get(reqUrl, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Get Pending Form Count (Protected)
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

// ✅ Get Approved Form Count (Protected)
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
