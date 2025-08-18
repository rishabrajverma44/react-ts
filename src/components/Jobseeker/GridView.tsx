import type { JobSeeker } from "../../types";
import styles from "../../Style/jobseekerGrid.module.css";
import company from "../../utils/office.png";
import location from "../../utils/location.png";
import { useNavigate } from "react-router-dom";

type GridViewProps = {
  jobs: JobSeeker[];
  lastJobRef?: React.RefObject<HTMLDivElement | null>;
};

export default function GridView({ jobs, lastJobRef }: GridViewProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.card_container}>
      {jobs.map((job, index) => {
        // Attach lastJobRef to the last job card
        const isLastJob = index === jobs.length - 1;

        return (
          <div
            ref={isLastJob ? lastJobRef : null}
            className={styles.card}
            key={job.formID}
            onClick={() => navigate(`/jobApply/${job.formID}`)}>
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
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.company}>
                <img className={styles.company_img} src={company} />
                <span>{job.company}</span>
              </div>
              <div className={styles.loc}>
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
        );
      })}
    </div>
  );
}
