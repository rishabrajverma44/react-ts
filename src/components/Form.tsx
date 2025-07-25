import type React from "react";
import styles from "../Style/form.module.css";
import type { formInterFace } from "../types/types";
import { useState } from "react";

const defaultForm: formInterFace = {
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
  const [form, setForm] = useState<formInterFace>(defaultForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((pervious) => ({ ...pervious, [name]: value }));
    console.log(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
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
            value={form.company}
          />

          <label>Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Enter role"
            value={form.role}
            onChange={handleChange}
          />

          <label>Job Type:</label>
          <select
            id="jobType"
            name="jobtype"
            onChange={handleChange}
            value={form.jobtype}>
            <option value="" disabled>
              Select job type
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <label id="locationLabel">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={form.location}
            onChange={handleChange}
          />

          <label>Application Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={form.date}
          />

          <label>Application Status:</label>
          <select
            id="status"
            className="form-control"
            name="status"
            onChange={handleChange}
            value={form.status}>
            <option value="" disabled>
              Select status
            </option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

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
