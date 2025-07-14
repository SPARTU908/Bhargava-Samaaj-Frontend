import axios from "axios";


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




export const loginMember = async ({ username, membership }) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/login/member`;

  try {
    const response = await axios.post(reqUrl, { username, membership });

    if (response.status === 200) {
      const { token, memberId, membership } = response.data;

      // Optionally store token for future API calls
      localStorage.setItem("memberToken", token);

      return {
        success: true,
        data: {
          token,
          memberId,
          membership,
        },
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Login failed",
      };
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.message || error.response?.data?.error || error.message;
    console.error("Login error:", errMsg);

    return {
      success: false,
      error: errMsg,
    };
  }
};

export const uploadMemberForm = async (memberId, file) => {
  try {
    const formData = new FormData();
    formData.append('uploadForm', file);

    const response = await axios.post(
     `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/${memberId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    throw error;
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
