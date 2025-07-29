import type React from "react";
import styles from "../Style/form.module.css";
import type { formInterface } from "../types/types";
import { useState } from "react";
import {
  validationForForm,
  validationForSingleField,
} from "../formValidation/validation";
import { useFormContext } from "../context/FormContext";

const defaultForm: formInterface = {
  id: null,
  company: "",
  role: "",
  jobtype: "",
  location: "",
  status: "",
  date: "",
  notes: "",
};

const Form = () => {
  const formsCtx = useFormContext();
  const [form, setForm] = useState<formInterface>(defaultForm);
  //instead of using null assertion we can use utility type partial of formInterface
  const [errors, setErrors] = useState<Partial<formInterface>>({});

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    //set all form values based on there names via controlled react form handler function
    setForm((pervious) => ({ ...pervious, [name]: value }));
  };
  const validationCheck = (e: any) => {
    const { name, value } = e.target;
    const validationErrors = validationForSingleField(form, name, value);
    if (Object.keys(validationErrors).length > 0) {
      setErrors((errors) => ({ ...errors, ...validationErrors }));
      return;
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const validationErrors = validationForForm(form);
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    setErrors({});
    if (formsCtx.createForms) {
      formsCtx.createForms(form);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id={styles.applicationForm}>
          <label>Company Name:</label>
          <input
            type="text"
            placeholder="Company name"
            name="company"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.company}
            style={{ borderColor: errors.company ? "red" : "initial" }}
          />
          {errors.company && (
            <span style={{ color: "red" }}>{errors.company}</span>
          )}
          <label>Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Enter role"
            value={form.role}
            onChange={handleChange}
            onBlur={validationCheck}
            style={{ borderColor: errors.role ? "red" : "initial" }}
          />
          {errors.role && <span style={{ color: "red" }}>{errors.role}</span>}
          <label>Job Type:</label>
          <select
            id="jobType"
            name="jobtype"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.jobtype}
            style={{ borderColor: errors.jobtype ? "red" : "initial" }}>
            <option value="" disabled>
              Select job type
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {errors.jobtype && (
            <span style={{ color: "red" }}>{errors.jobtype}</span>
          )}

          <label id="locationLabel">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange}
            onBlur={validationCheck}
            style={{ borderColor: errors.location ? "red" : "initial" }}
          />
          {errors.location && (
            <span style={{ color: "red" }}>{errors.location}</span>
          )}

          <label>Application Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.date}
            style={{ borderColor: errors.date ? "red" : "initial" }}
          />
          {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}

          <label>Application Status:</label>
          <select
            id="status"
            className="form-control"
            name="status"
            onChange={handleChange}
            onBlur={validationCheck}
            value={form.status}
            style={{ borderColor: errors.status ? "red" : "initial" }}>
            <option value="" disabled>
              Select status
            </option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
          {errors.status && (
            <span style={{ color: "red" }}>{errors.status}</span>
          )}

          <label>Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}></textarea>

          <button type="submit" id="submitBtn">
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
