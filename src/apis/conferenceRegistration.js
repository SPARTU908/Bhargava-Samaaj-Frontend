import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL;


/*
|--------------------------------------------------------------------------
| Create Conference Registration
|--------------------------------------------------------------------------
*/

export const createConferenceRegistration =
  async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/conference-registration/create`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to create conference registration"
      );
    }
  };


/*
|--------------------------------------------------------------------------
| Get Conference Registration
|--------------------------------------------------------------------------
*/

export const getConferenceRegistration =
  async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/conference-registration/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch registration"
      );
    }
  };


/*
|--------------------------------------------------------------------------
| Submit Payment
|--------------------------------------------------------------------------
*/

export const submitConferencePayment =
  async (
    registrationId,
    transactionId,
    screenshot
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "transactionId",
        transactionId
      );

      formData.append(
        "paymentScreenshot",
        screenshot
      );

      const response = await axios.post(
        `${API_URL}/api/conference-registration/${registrationId}/payment`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Payment submission failed"
      );
    }
  };


export const getAllConferenceRegistrations = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/conference-registration/admin/all`
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Unable to fetch conference registrations"
    );
  }
};

export const checkApprovedConferenceRegistration = async (
  memberId,
) => {
  const response = await axios.get(
    `${API_URL}/api/conference-registration/check-approved/${memberId}`,
  );

  return response.data;
};

export const checkNonAbbsConferenceRegistration =
  async (email, contactNo) => {

    const response = await axios.get(
      `${API_URL}/api/conference-registration/check-non-abbs`,
      {
        params: {
          email,
          contactNo,
        },
      },
    );

    return response.data;
  };