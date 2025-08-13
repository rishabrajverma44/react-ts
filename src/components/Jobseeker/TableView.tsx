import type { JobSeeker } from "../../types";
import styles from "../../Style/jobseekerTable.module.css";
import { useNavigate } from "react-router-dom";

export default function TableView({ jobs }: { jobs: JobSeeker[] }) {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>jobType</th>
            <th>Location</th>
            <th>Status</th>
            {/* <th>applied</th> */}
            <th>Last date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.formID} onClick={() => navigate("/jobApply")}>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.jobType}</td>
              <td>
                {job.jobType === "Remote" ? "remote location" : job.location}
              </td>
              <td>{job.status}</td>
              {/* <td>{job.applied ? "Applied" : "Not Applied"}</td> */}
              <td>{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
