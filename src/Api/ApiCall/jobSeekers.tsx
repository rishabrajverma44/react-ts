import axiosInstance from "../axiosInstance";

export const getAllForms = async () => {
  const response = await axiosInstance
    .get("/job_seeker")
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
export const applyFormByFormID = async (formId: string) => {
  const response = await axiosInstance
    .post(`job_seeker/apply/${formId}`)
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch(() => {
      return null;
    });
  return response;
};

export const getUserName = async () => {
  const response = await axiosInstance
    .get("/job_seeker/useDetails")
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

export const getUserAppliedForm = async () => {
  const response = await axiosInstance
    .get("/job_seeker/formDetails")
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
