import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACKEND_URL;


export const searchMemberByLmNo =
  async (lmNo) => {
    try {
      const response =
        await axios.get(
          `${API_URL}/api/duplicate-membership/search/lm/${lmNo}`
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };


export const searchMemberByDetails =
  async (data) => {
    try {
      const response =
        await axios.post(
          `${API_URL}/api/duplicate-membership/search/details`,
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        error
      );
    }
  };


export const submitDuplicateForm =
  async (formData) => {
    try {
      const response =
        await axios.post(
          `${API_URL}/api/duplicate-membership/apply`,
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
      throw (
        error.response?.data ||
        error
      );
    }
  };


export const submitDuplicatePayment =
  async (
    applicationId,
    formData
  ) => {
    try {
      const response =
        await axios.post(
          `${API_URL}/api/duplicate-membership/${applicationId}/payment`,
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
      throw (
        error.response?.data ||
        error
      );
    }
  };