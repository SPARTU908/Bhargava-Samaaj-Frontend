import axios from "axios";


export const vivahmemberRegister = async (vivahmemberDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/register`;
  try {
    const response = await axios.post(reqUrl, vivahmemberDetails, {
      withCredentials: true,
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

// ✅ Login Vivah Member
export const vivahmemberLogin = async (vivahmemberlogin) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/login`;

  try {
    const response = await axios.post(reqUrl, vivahmemberlogin, {

    });
    return { status: response.status, ...response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, ...error.response.data };
    } else {
      return { error: error.message || "Login failed" };
    }
  }
};


export const getPendingMembers = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/member/pending`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching pending members:", err);
    throw err;
  }
};