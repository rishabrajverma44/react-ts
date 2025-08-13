import type { JobSeeker } from "../../types";
import styles from "../../Style/jobseekerGreed.module.css";
import company from "../../utils/office.png";
import location from "../../utils/location.png";
import { useNavigate } from "react-router-dom";

export default function GridView({ jobs }: { jobs: JobSeeker[] }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card_container}>
      {jobs.map((job) => (
        <div
          className={styles.card}
          key={job.formID}
          onClick={() => navigate("/jobApply")}>
          <div>
            <div className={styles.header_card}>
              <span className={styles.role}> {job.role}</span>
              <span
                style={{ color: job.applied ? "gray" : "blue" }}
                className={styles.Applied}>
                {job.applied ? "Applied" : "Open"}
              </span>
            </div>
            <div className={styles.inner_card}>
              <span className={styles.jobTypeBox}>{job.jobType}</span>
              <div className={styles.right}>
                <div>
                  <img
                    className={styles.location_img}
                    src={location}
                    alt="location"
                    style={{
                      display: job.jobType === "Remote" ? "none" : "",
                    }}
                  />
                  {job.location}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.company}>
            <img className={styles.company_img} src={company} />
            <span>{job.company}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
