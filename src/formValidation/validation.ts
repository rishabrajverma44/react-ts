import type { formInterface } from "../types";
//date compare
const dateValidator = (formDate: Date) => {
  const inputDate = formDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate < today;
};
export function validationForForm(form: formInterface) {
  //partrial utility type used for giving types of an object wich accepts (key, type)
  const errors: Partial<Record<keyof formInterface, string>> = {};

  if (!form.company.trim()) errors.company = "Company is required !";
  if (!form.role.trim()) errors.role = "Role is required !";
  if (!form.jobType.trim()) errors.jobType = "Job Type is required !";
  if (form.jobType !== "Remote" && !form.location.trim())
    errors.location = "Location is required !";
  if (!form.date.trim()) errors.date = "Date is required !";
  if (dateValidator(new Date(form.date)))
    errors.date = "Date cannot be in the past!";
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
      if (!value.trim()) {
        errors.company = "Company is required !";
      } else {
        errors.company = "";
      }
      break;
    case "role":
      if (!form.role.trim()) {
        errors.role = "Role is required !";
      } else {
        errors.role = "";
      }
      break;
    case "jobType":
      if (!form.jobType.trim()) {
        errors.jobType = "Jobtype is required !";
      } else {
        errors.jobType = "";
      }
      break;
    case "location":
      if (!form.location.trim() && form.jobType !== "Remote") {
        errors.location = "Location is required !";
      } else {
        errors.location = "";
      }
      break;
    case "date":
      if (!form.date.trim()) {
        errors.date = "Date is required !";
      } else if (dateValidator(new Date(form.date))) {
        errors.date = "Date cannot be in the past!";
      } else {
        errors.date = "";
      }
      break;
    case "status":
      if (!form.status.trim()) {
        errors.status = "Status is required !";
      } else {
        errors.status = "";
      }
      break;
  }
  return errors;
}
