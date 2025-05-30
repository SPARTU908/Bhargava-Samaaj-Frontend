import axios from "axios";

export const savePayment = async (paymentDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment`;

  try {
    console.log("Payment details:", paymentDetails);
    const response = await axios.post(reqUrl, paymentDetails);
    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Unexpected response status",
      };
    }
  } catch (error) {
    console.error("Payment submission error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
};
