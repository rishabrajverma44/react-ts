import { useEffect, useState } from "react";
import styles from "../../Style/table.module.css";
import type { JobSeeker } from "../../types";
import axiosInstance from "../../Api/axiosInstance";
import { handleLogout } from "../../utils/logout";
const Table = () => {
  const [userTableData, setUserTableData] = useState<JobSeeker[]>([]);
  const applyForm = function (formId: string | null | undefined) {
    console.log(formId);
    if (formId) {
      axiosInstance
        .post(`job_seeker/apply/${formId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTableData = () => {
    axiosInstance
      .get("job_seeker")
      .then((res) => {
        res.status === 200 && setUserTableData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        handleLogout();
        console.log("error", error);
      });
  };
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <div>
      {userTableData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Job-Type</th>
              <th>Location</th>
              <th>Date</th>
              <th>status</th>
              <th>notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTableData.length > 0 &&
              userTableData.map((form: JobSeeker, index: number) => {
                return (
                  <tr role="row" key={index}>
                    <td role="cell">{form.company}</td>
                    <td role="cell">{form.role}</td>
                    <td role="cell">{form.jobType}</td>
                    <td role="cell">
                      {form.location === "" ? "N/A" : form.location}
                    </td>
                    <td role="cell">{form.date}</td>
                    <td role="cell">{form.status}</td>
                    <td role="cell">{form.notes}</td>
                    <td role="cell" className={styles.action}>
                      <div className={styles.action_inner}>
                        <button onClick={() => applyForm(form.formID)}>
                          Easy Apply
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        ""
      )}
      {userTableData?.length === 0 && (
        <>
          <div className="no_forms">
            <h2>No forms !</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
