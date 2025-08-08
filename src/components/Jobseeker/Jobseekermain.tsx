import { useEffect, useState } from "react";
import styles from "../../Style/jobseeker.module.css";
import type { JobSeeker } from "../../types";
import { applyFormByFormID, getAllForms } from "../../Api/ApiCall/jobSeekers";
import { handleLogout } from "../../utils/logout";
const Jobseekermain = () => {
  const [userTableData, setUserTableData] = useState<JobSeeker[]>([]);

  const applyForm = async function (formId: string | null | undefined) {
    if (formId) {
      await applyFormByFormID(formId);
      await getTableData();
    }
  };

  const getTableData = async () => {
    const data = await getAllForms();
    setUserTableData(data);
    console.log(data);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div>
      <nav role="banner" className={styles.banner}>
        <div className={styles.header}>
          <h2>Job Application Tracker</h2>
          <p>
            <span>Total Applied Jobs :</span>
          </p>
        </div>
        <div className={styles.LogoutBtn}>
          <button onClick={handleLogout}>logout</button>
        </div>
      </nav>
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
                        <button
                          disabled={form.applied}
                          style={{
                            background: form.applied ? "gray" : "",
                          }}
                          onClick={() => applyForm(form.formID)}>
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

export default Jobseekermain;
