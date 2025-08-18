import styles from "../../../Style/receivedForms.module.css";
import company from "../../../utils/office.png";
import location from "../../../utils/location.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { AppliedJobs } from "../../../types";

export default function ReceivedForms() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<AppliedJobs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setTotalSize] = useState<number>(20);
  const [hasmore, setHasMore] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const lastJobRef = useRef<HTMLDivElement | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    //   const responseData = await getAllForms(
    //     page,
    //     size,
    //     search,
    //     sortBy,
    //     sortOrder
    //   );
    //   if (responseData) {
    //     setJobs((prevJobs) =>
    //       page === 1 || viewType === "table"
    //         ? responseData.data
    //         : [...prevJobs, ...responseData.data]
    //     );
    //     setHasMore(responseData.hasMore);
    //     setTotalCount(responseData.total);
    //   }
    //   setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page, size, search, sortOrder]);

  //scroll
  useEffect(() => {
    if (loading || !hasmore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastJobRef.current) observer.observe(lastJobRef.current);

    return () => {
      if (lastJobRef.current) observer.unobserve(lastJobRef.current);
    };
  }, [loading, hasmore]);

  return (
    <div className={styles.card_container}>
      received forms
      {jobs.map((job, index) => {
        // Attach last JobRef to the last card
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
            <div className={styles.notes}>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.notes || "<p>No additional details provided.</p>",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
