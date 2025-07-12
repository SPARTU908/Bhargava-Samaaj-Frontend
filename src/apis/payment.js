import axios from "axios";

// export const savePayment = async (paymentDetails) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/register`;

//   try {
//     console.log("Payment details:", paymentDetails);

//     const response = await axios.post(reqUrl, paymentDetails);

//     if (response.status === 200 || response.status === 201) {
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
//       error: error.response?.data?.message || "Something went wrong",
//     };
//   }
// };
// export const getAllPayment = async () => {
//   try {
//     const reqUrl = `${
//       import.meta.env.VITE_BACKEND_URL
//     }/api/v1/payment/allpayment`;
//     const response = await axios.get(reqUrl);
//     console.log(response);
//     return response.data || [];
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateUploadedForm = async (paymentId, uploadedFormUrl) => {
//   const reqUrl = `${
//     import.meta.env.VITE_BACKEND_URL
//   }/api/v1/payment/upload/:paymentId`;

//   try {
//     const response = await axios.patch(reqUrl, {
//       uploadedForm: uploadedFormUrl,
//     });

//     if (response.status === 200) {
//       return {
//         success: true,
//         data: response.data,
//       };
//     } else {
//       return {
//         success: false,
//         error: response.data?.message || "Unexpected response",
//       };
//     }
//   } catch (error) {
//     console.error(
//       "Error updating uploaded form:",
//       error.response?.data || error.message
//     );
//     return {
//       success: false,
//       error: error.response?.data || "Failed to update uploaded form",
//     };
//   }
// };

// export const updatePaymentForm = async (paymentId, formValue) => {
//   const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/update`;

//   try {
//     const response = await axios.put(reqUrl, {
//       paymentId,
//       formValue,
//     });

//     if (response.status === 200) {
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
//       "Payment form update error:",
//       error.response?.data || error.message
//     );
//     return {
//       success: false,
//       error: error.response?.data?.message || "Something went wrong",
//     };
//   }
// };





export const savePayment = async (paymentDetails) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/create`;

  const { memberId, transactionId } = paymentDetails;

  try {
    console.log("Sending Payment details:", { memberId, transactionId: transactionId });

    const response = await axios.post(
      reqUrl,
      {
        memberId,
        transactionId: transactionId,
      },
      {
        withCredentials: true,
      }
    );

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
    console.error("Payment submission error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

// ✅ Get All Payments
export const getAllPayment = async () => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/allpayment`;
    const response = await axios.get(reqUrl, {
      withCredentials: true,
    });
    console.log(response);
    return response.data || [];
  } catch (error) {
    console.log(error);
  }
};

// ✅ Update Uploaded Form
export const updateUploadedForm = async (paymentId, uploadedFormUrl) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/upload/:paymentId`;

  try {
    const response = await axios.patch(
      reqUrl,
      { uploadedForm: uploadedFormUrl },
      {
        withCredentials: true,
      }
    );

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
    console.error("Error updating uploaded form:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || "Failed to update uploaded form",
    };
  }
};

// ✅ Update Payment Form
export const updatePaymentForm = async (paymentId, formValue) => {
  const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/update`;

  try {
    const response = await axios.put(
      reqUrl,
      { paymentId, formValue },
      {
        withCredentials: true,
      }
    );

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
    console.error("Payment form update error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};