import axios from "axios";

// export const savePayment = async (paymentDetails) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/register`;

//   try {
//     console.log("Payment details:", paymentDetails);
//     const response = await axios.post(reqUrl, paymentDetails);
//     if (response.status === 201) {
//       return {
//         success: true,
//         data: response.data,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data?.message || "Unexpected response status",
//       };
//     }
//   } catch (error) {
//     console.error(
//       "Payment submission error:",
//       error.response?.data || error.message
//     );
//     return {
//       success: false,
//       error: error.response?.data || "Something went wrong",
//     };
//   }
// };



export const savePayment = async (paymentDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/register`;

  try {
    console.log("Payment details:", paymentDetails);

    const response = await axios.post(reqUrl, paymentDetails);

    // ✅ Accept both 200 (updated) and 201 (created) statuses
    if (response.status === 200 || response.status === 201) {
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
    console.error(
      "Payment submission error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
export const getAllPayment = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/allpayment`;
    const response = await axios.get(reqUrl);
    console.log(response);
     return response.data || [];
  } catch (error) {
    console.log(error);
  }
};

// 

// export const fetchPaymentById = async (id) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/${id}`;
//   try {
//     const response = await axios.get(reqUrl);
//     return {
//       success: true,
//       payment: response.data.payment,
//     };
//   } catch (error) {
//     console.error("Error fetching payment:", error.response?.data || error.message);
//     return {
//       success: false,
//       message: "Failed to fetch payment",
//     };
//   }
// };


export const updateUploadedForm = async (paymentId, uploadedFormUrl) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/upload/:paymentId`;

  try {
    const response = await axios.patch(reqUrl, {
      uploadedForm: uploadedFormUrl,
    });

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.data?.message || "Unexpected response",
      };
    }
  } catch (error) {
    console.error(
      "Error updating uploaded form:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Failed to update uploaded form",
    };
  }
};

export const updatePaymentForm = async (paymentId, formValue) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/update`;

  try {
    const response = await axios.put(reqUrl, {
      paymentId,
      formValue,
    });

    if (response.status === 200) {
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
    console.error(
      "Payment form update error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};


