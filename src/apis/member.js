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


export const getMemberStatus = async (memberId) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/${memberId}/status`;

  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("memberToken")}`,
      },
    });

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        approved: response.data.data.approved,
        uploadForm: response.data.data.uploadForm,
      };
    } else {
      return {
        success: false,
        error: response.data.message || "Unable to fetch approval status.",
      };
    }
  } catch (error) {
    console.error("Status check error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};


export const updateMemberStatus = async (memberId, data) => {
  console.log("Updating member status with:", memberId, data);
  
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/members/${memberId}/status`;

  try {
    const response = await axios.patch(reqUrl, data, {
      headers: {
        "Content-Type": "application/json",
        // Agar authorization chahiye to yeh bhi add karo:
        // Authorization: `Bearer ${localStorage.getItem("memberToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update member status");
    }
  } catch (error) {
    console.error("Error updating member status:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ Update Dispatch Status of a Member
export const updateMemberDispatch = async (memberId, data) => {
  console.log("Updating member dispatch with:", memberId, data);

  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/members/${memberId}/dispatch`;

  try {
    const response = await axios.patch(reqUrl, data, {
      headers: {
        "Content-Type": "application/json",
        // If backend requires login token, uncomment below:
        // Authorization: `Bearer ${localStorage.getItem("memberToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update member dispatch");
    }
  } catch (error) {
    console.error("Error updating member dispatch:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get Dispatch Status of a Member
export const getMemberDispatchStatus = async (memberId) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/${memberId}/dispatch`;

  try {
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("memberToken")}`,
      },
    });

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        isDispatched: response.data.data.isDispatched,
        dispatchedAt: response.data.data.dispatchedAt,
      };
    } else {
      return {
        success: false,
        error: response.data.message || "Unable to fetch dispatch status.",
      };
    }
  } catch (error) {
    console.error("Dispatch status error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateDispatchStatus = async (id) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/dispatch/${id}`,
      {}, // backend sets isDispatched & dispatchedAt
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error updating dispatch status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
