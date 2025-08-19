import type { formInterface } from "../../types";
import axiosInstance from "../axiosInstance";

export const addFormData = async (formData: formInterface) => {
  const response = await axiosInstance
    .post("/company", formData)
    .then((res) => {
      if (res.status === 201) return res.data;
    })
    .catch(() => {
      return null;
    });
  return response;
};

export const getAllForms = async () => {
  const response = await axiosInstance
    .get("/company")
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(() => {
      return null;
    });
  return response;
};

export const getUserDetails = async () => {
  const response = await axiosInstance
    .get("/company/user/userDetails")
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(() => {
      return null;
    });
  return response;
};

export const updateFormData = async (
  formID: string,
  formData: formInterface
) => {
  const response = await axiosInstance
    .put(`/company/${formID}`, formData)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(() => {
      return null;
    });
  return response;
};

export const deleteFormData = async (formID: string) => {
  axiosInstance
    .delete(`/company/${formID}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(() => {
      return null;
    });
};

export const getChartData = async () => {
  const res = axiosInstance
    .get(`/company/user/getchart`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(() => {
      return null;
    });
  return res;
};
