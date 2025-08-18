import React, { useState, useEffect, useRef } from "react";
import type { JobSeeker } from "../../types";
import GridView from "./GridView";
import TableView from "./TableView";
import styles from "../../Style/jobpages.module.css";
import { getAllForms } from "../../Api/ApiCall/jobSeekers";
import gridView from "../../utils/grid.svg";
import tableView from "../../utils/dataTables.svg";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobSeeker[]>([]);
  const [viewType, setViewType] = useState<string>("grid");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(null);
  const [size, setTotalSize] = useState<number>(20);
  const [hasmore, setHasMore] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const lastJobRef = useRef<HTMLDivElement | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    const responseData = await getAllForms(
      page,
      size,
      search,
      sortBy,
      sortOrder
    );
    if (responseData) {
      setJobs((prevJobs) =>
        page === 1 || viewType === "table"
          ? responseData.data
          : [...prevJobs, ...responseData.data]
      );
      setHasMore(responseData.hasMore);
      setTotalCount(responseData.total);
    }
    setLoading(false);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalSize(Number(e.target.value));
    setPage(1);
    setJobs([]);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1);
    setJobs([]);
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
    <>
      <div>
        <div className={styles.header}>
          <div className={styles.filter_box}>
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                setJobs([]);
              }}
              className=""
            />
            <button onClick={() => setSearch("")} className={styles.clear}>
              X
            </button>
          </div>
          <div className={styles.header_grid}>
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
            <button
              onClick={() => {
                setViewType("grid");
                setTotalSize(20);
              }}
              className="">
              <img src={gridView} alt="image grid" />
            </button>
            <button
              style={{ marginLeft: "13px" }}
              onClick={() => {
                setViewType("table");
                setPage(1);
                setTotalSize(10);
              }}>
              <img src={tableView} alt="img table" />
            </button>
          </div>
        </div>

        {viewType === "grid" ? (
          <GridView jobs={jobs} lastJobRef={lastJobRef} />
        ) : (
          <TableView
            jobs={jobs}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        )}

        {loading ? (
          <div>
            <h2 className={styles.nojobs}>Loading....</h2>
          </div>
        ) : (
          <>
            {jobs.length > 0 ? (
              <div className="">
                {viewType === "table" && (
                  <div className={styles.table_footer_pagination}>
                    <div className={styles.table_page}>
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
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className={styles.nojobs}>No jobs found !</h2>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
