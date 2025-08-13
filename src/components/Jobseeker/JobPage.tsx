import { useState, useEffect } from "react";
import type { JobSeeker } from "../../types";
import GridView from "./GridView";
import TableView from "./TableView";
import { getAllForms } from "../../Api/ApiCall/jobSeekers";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobSeeker[]>([]);
  const [search, setSearch] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);

    const data = await getAllForms();
    setJobs(data);
    // try {
    //   const res = await axios.get("/api/jobs", {
    //     params: { search, page, limit: 10 },
    //   });
    //   setJobs(res.data.data);
    //   setTotalPages(res.data.totalPages);
    // } catch (err) {
    //   console.error(err);
    // }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [search, page]);

  return (
    <div className="p-4">
      {/* <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 mb-4 w-full"
      /> */}

      <div className="" style={{ marginTop: "10px", marginLeft: "30px" }}>
        <button onClick={() => setViewType("grid")} className="">
          Grid View
        </button>
        <button
          style={{ marginLeft: "13px" }}
          onClick={() => setViewType("table")}>
          Table View
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : viewType === "grid" ? (
        <GridView jobs={jobs} />
      ) : (
        <TableView jobs={jobs} />
      )}

      {viewType === "table" && (
        <div className="table_footer_pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="">
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
