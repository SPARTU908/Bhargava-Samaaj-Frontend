import axios from "axios";

// export const registerMember = async (memberDetails) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/register`;
//   try {
//   const response = await axios.post(reqUrl, memberDetails);
//     if (response.status === 201) {
//       return {
//         success: true,
//         data: response.data,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.message,
//       };
//     }
//   } catch (error) {
//     console.error("Registration error:", error.response?.data || error.message);
//     return {
//       success: false,
//       error: error.response?.data || "Something went wrong",
//     };
//   }
// };

// export const getAllMembers = async () => {
//   try {
//     const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/allmember`;

//     const response = await axios.get(reqUrl);
//     console.log(response);
//     return response?.data?.data || [];
  
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getMemberCount = async () => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/count`; 
//   try {
//     const response = await axios.get(reqUrl);
//     return response.data.count; 
//   } catch (error) {
//     console.error("Failed to fetch pending form count:", error);
//     throw error;
//   }
// };



// ✅ Register Member
export const registerMember = async (memberDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/register`;
  try {
    const response = await axios.post(reqUrl, memberDetails, {
      withCredentials: true, // Required for CORS with cookies/sessions
    });

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

// ✅ Get All Members (Protected route)
export const getAllMembers = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/allmember`;

    const response = await axios.get(reqUrl, {
      withCredentials: true, // Important for CORS
    });

    console.log(response);
    return response?.data?.data || [];
  } catch (error) {
    console.log(error);
  }
};

// ✅ Get Member Count (Protected route)
export const getMemberCount = async () => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/count`;
  try {
    const response = await axios.get(reqUrl, {
      withCredentials: true, // Important for CORS
    });

    return response.data.count;
  } catch (error) {
    console.error("Failed to fetch member count:", error);
    throw error;
  }
};
