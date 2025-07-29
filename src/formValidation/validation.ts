import type { formInterface } from "../types/types";

export function validationForForm(form: formInterface) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof formInterface, string>> = {};

  if (!form.company.trim()) errors.company = "Company is required !";
  if (!form.role.trim()) errors.role = "Role is required !";
  if (!form.jobtype.trim()) errors.jobtype = "Job Type is required !";
  if (form.jobtype !== "Remote" && !form.location.trim())
    errors.location = "Location is required !";
  if (!form.date.trim()) errors.date = "Date is required !";
  if (!form.status.trim()) errors.status = "Status is required !";
  return errors;
}

export function validationForSingleField(
  form: formInterface,
  name: string,
  value: string
) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof formInterface, string>> = {};
  switch (name) {
    case "company":
      !value.trim()
        ? (errors.company = "Company is required !")
        : (errors.company = "");
      break;
    case "role":
      !form.role.trim()
        ? (errors.role = "Role is required !")
        : (errors.role = "");
      break;
    case "jobtype":
      !form.jobtype.trim()
        ? (errors.jobtype = "Jobtype is required !")
        : (errors.jobtype = "");
      break;
    case "location":
      !form.location.trim() && form.jobtype !== "Remote"
        ? (errors.location = "Location is required !")
        : (errors.location = "");
      break;
    case "date":
      !form.date.trim()
        ? (errors.date = "Date is required !")
        : (errors.date = "");
      break;
    case "status":
      !form.status.trim()
        ? (errors.status = "Status is required !")
        : (errors.status = "");
      break;
  }
  return errors;
}
