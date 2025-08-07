import type React from "react";
import styles from "../../Style/form.module.css";
import type { formInterface } from "../../types";
import { useEffect, useState } from "react";
import {
  validationForForm,
  validationForSingleField,
} from "../../formValidation/validation";
import { UseFormContext } from "../../context/FormContextProvider";

const defaultForm: formInterface = {
  company: "",
  role: "",
  jobType: "",
  location: "",
  status: "",
  date: "",
  notes: "",
};

const Form = () => {
  const formsCtx = UseFormContext();
  const [form, setForm] = useState<formInterface>(defaultForm);
  //formInterface
  const [errors, setErrors] = useState<Partial<formInterface>>();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "jobType" && value === "Remote") {
      form.location = "";
    }
    //set all form values based on there names via controlled react form handler function
    setForm((pervious: formInterface) => ({
      ...pervious,
      [name]: value,
    }));
  };
  const validationCheck = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const validationErrors: Partial<formInterface> = validationForSingleField(
      form,
      name,
      value
    );
    if (Object.keys(validationErrors).length > 0) {
      if (errors) setErrors((errors) => ({ ...errors, ...validationErrors }));
      return;
    }
  };
  const handleSubmit = () => {
    const validationErrors = validationForForm(form);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors) setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (formsCtx?.createForms && !form.formID) {
      formsCtx.createForms(form);
    } else if (form.formID) {
      formsCtx?.updateForm(form.formID, form);
    }
    setForm(defaultForm);
  };
  useEffect(() => {
    if (formsCtx !== undefined && formsCtx.currentForm)
      setForm(formsCtx.currentForm);
  }, [formsCtx?.currentForm]);

  return (
    <div>
      <form>
        <div aria-label="Job application form" id={styles.applicationForm}>
          <label htmlFor="company">Company Name:</label>
          <input
            id="company"
            type="text"
            placeholder="Company name"
            name="company"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.company}
            style={{ borderColor: errors?.company ? "red" : "initial" }}
          />
          {errors?.company && (
            <span className={styles.validation_error}>{errors?.company}</span>
          )}
          <label htmlFor="role">Role:</label>
          <input
            id="role"
            type="text"
            name="role"
            placeholder="Enter role"
            value={form.role}
            onChange={handleChange}
            onBlur={validationCheck}
            style={{ borderColor: errors?.role ? "red" : "initial" }}
          />
          {errors?.role && (
            <span className={styles.validation_error}>{errors?.role}</span>
          )}
          <label htmlFor="jobtype">Job Type:</label>
          <select
            id="jobtype"
            name="jobType"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.jobType}
            style={{ borderColor: errors?.jobType ? "red" : "initial" }}>
            <option value="" disabled>
              Select job type
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors?.jobType && (
            <span className={styles.validation_error}>{errors?.jobType}</span>
          )}

          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange}
            onBlur={validationCheck}
            disabled={form.jobType === "Remote" ? true : false}
            style={{ borderColor: errors?.location ? "red" : "initial" }}
          />
          {errors?.location && (
            <span className={styles.validation_error}>{errors?.location}</span>
          )}

          <label htmlFor="date">Application Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.date}
            style={{ borderColor: errors?.date ? "red" : "initial" }}
          />
          {errors?.date && (
            <span className={styles.validation_error}>{errors?.date}</span>
          )}

          <label htmlFor="status">Application Status:</label>
          <select
            id="status"
            name="status"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.status}
            style={{ borderColor: errors?.status ? "red" : "initial" }}>
            <option value="" disabled>
              Select status
            </option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
          {errors?.status && (
            <span className={styles.validation_error}>{errors.status}</span>
          )}

          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            className={styles.notes}
            name="notes"
            value={form.notes}
            onChange={handleChange}></textarea>
          <button type="button" onClick={handleSubmit} id={styles.submitBtn}>
            {form.formID ? "Update" : "Add"} Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
