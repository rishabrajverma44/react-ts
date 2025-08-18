import axiosInstance from "../axiosInstance";

export const getAllForms = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortOrder: string
) => {
  const response = await axiosInstance
    .get(
      `/job_seeker?page=${page}&size=${size}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    )
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
        return res;
      }
    })
    .catch((err) => {
      console.log("error in applying", err);
      return err;
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
export const getNumbersOfFormApplied = async () => {
  const response = await axiosInstance
    .get("/job_seeker/numbersOfFormApplied")
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
export const getFormByFormId = async (formId: string) => {
  const response = axiosInstance
    .get(`/job_seeker/forms/${formId}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log("error in getting form", err);
      return null;
    });

  return response;
};
export const isAppliedForm = async (formId: string) => {
  const response = await axiosInstance
    .post(`job_seeker/applied/${formId}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      console.log("error", err);
      return err;
    });

  return response;
};
export const appliedJobs = async (
  page: number,
  size: number,
  search: string,
  sortBy: string,
  sortOrder: string
) => {
  const response = await axiosInstance
    .get(
      `/job_seeker/appliedForms?page=${page}&size=${size}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    )
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
