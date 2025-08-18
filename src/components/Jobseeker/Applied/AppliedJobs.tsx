import styles from "../../../Style/jobseekerTable.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { JobSeeker } from "../../../types";
import { appliedJobs } from "../../../Api/ApiCall/jobSeekers";

export default function ApplieJobs() {
  const [jobs, setJobs] = useState<JobSeeker[]>([]);
  const navigate = useNavigate();
  const getAppliedForms = async () => {
    const response = await appliedJobs();
    setJobs(response);
  };
  useEffect(() => {
    getAppliedForms();
  }, []);
  return (
    <div className={styles.main}>
      <table>
        <thead>
          <tr>
            <th>Company name</th>
            <th>Role</th>
            <th>jobType</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.formID}
              onClick={() => navigate(`/jobApply/${job.formID}`)}>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.jobType}</td>
              <td>
                {job.jobType === "Remote" ? "remote location" : job.location}
              </td>
              <td>{job.status}</td>
              <td>{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
