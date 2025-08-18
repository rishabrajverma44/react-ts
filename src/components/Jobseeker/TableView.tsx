import type { JobSeeker } from "../../types";
import styles from "../../Style/jobseekerTable.module.css";
import { useNavigate } from "react-router-dom";

type TableViewProps = {
  jobs: JobSeeker[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
};

export default function TableView({
  jobs,
  sortBy,
  sortOrder,
  onSort,
}: TableViewProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("company")}>
              Company name
              {sortBy === "company" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => onSort("role")}>
              Role {sortBy === "role" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
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
