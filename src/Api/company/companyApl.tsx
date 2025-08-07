import type { formInterface } from "../../types";
import axiosInstance from "../axiosInstance";

export const getAllForms = async () => {
  var formData = await axiosInstance
    .get("/company")
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("error in getting forms", error);
      return null;
    });
  return formData;
};

export const updateForm = async (formID: string, formData: formInterface) => {
  var response = await axiosInstance
    .put(`/company/${formID}`, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("error in updateform", error);
    });
};
