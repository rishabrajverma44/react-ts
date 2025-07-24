import styles from "../Style/form.module.css";
import { useState } from "react";

const Form = () => {
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <div id={styles.applicationForm}>
          <label>Company Name:</label>
          <input type="text" placeholder="Company name" />

          <label>Role:</label>
          <input type="text" id="role" placeholder="Enter role" />

          <label>Job Type:</label>
          <select id="jobType">
            <option value="" disabled>
              Select job type
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <label id="locationLabel">Location:</label>
          <input type="text" id="location" placeholder="Enter location" />

          <label>Application Date:</label>
          <input type="date" id="date" />

          <label>Application Status:</label>
          <select id="status" className="form-control">
            <option value="" disabled>
              Select status
            </option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

          <label>Notes:</label>
          <textarea id="notes"></textarea>

          <button type="submit" id="submitBtn">
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
