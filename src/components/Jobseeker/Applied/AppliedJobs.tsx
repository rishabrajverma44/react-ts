import styles from "../../../Style/jobseekerTable.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { JobSeeker } from "../../../types";
import { appliedJobs } from "../../../Api/ApiCall/jobSeekers";

export default function ApplieJobs() {
  const [jobs, setJobs] = useState<JobSeeker[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [search] = useState<string>("");
  const [sortBy] = useState<string>("");
  const [sortOrder] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setTotalSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState(null);
  const [hasmore, setHasMore] = useState<boolean>(true);

  const navigate = useNavigate();
  const getAppliedForms = async () => {
    setLoading(true);
    const response = await appliedJobs(page, size, search, sortBy, sortOrder);
    if (response) {
      setJobs(response.data);
      setHasMore(response.hasMore);
      setTotalCount(response.total);
    }
    setLoading(false);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalSize(Number(e.target.value));
    setPage(1);
    setJobs([]);
  };

  useEffect(() => {
    getAppliedForms();
  }, [page]);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <>
          <div className="loading">
            <h2>Loading...</h2>
          </div>
        </>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className={styles.main_table}>
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
                        {job.jobType === "Remote"
                          ? "remote location"
                          : job.location}
                      </td>
                      <td>{job.status}</td>
                      <td>{job.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {jobs.length > 10 && (
                <div>
                  <div className={styles.table_page}>
                    <div className={styles.pagination}>
                      <button
                        disabled={page <= 1}
                        onClick={() =>
                          setPage((currentPage) => currentPage - 1)
                        }
                        className="">
                        Prev
                      </button>
                      <span>
                        Page {page} of {Math.ceil(totalCount! / size)}
                      </span>
                      <button
                        disabled={hasmore === false}
                        onClick={() =>
                          setPage((currentPage) => currentPage + 1)
                        }
                        className="">
                        Next
                      </button>
                    </div>

                    <span className={styles.table_filter}>
                      <select
                        name="selectFilterCount"
                        id="count"
                        value={size}
                        onChange={handleFilter}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                      </select>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="loading">
              <h2>No data !</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
