import { useEffect, useState } from "react";
import styles from "../../Style/jobseeker.module.css";
import type { JobSeeker } from "../../types";
import {
  applyFormByFormID,
  getAllForms,
  getUserAppliedForm,
  getUserName,
} from "../../Api/ApiCall/jobSeekers";
import { handleLogout } from "../../utils/logout";
import { toast } from "react-toastify";
const Jobseekermain = () => {
  const [userTableData, setUserTableData] = useState<JobSeeker[]>([]);
  const [userName, setUserName] = useState();
  const [userAppliedForm, setUserAppliedForm] = useState();

  const applyForm = async function (formId: string | null | undefined) {
    if (formId) {
      const res = await applyFormByFormID(formId);
      await getData();
      await getAppliedForms();
      if (res) toast("Successfully applied !");
    }
  };

  const getData = async () => {
    const data = await getAllForms();
    setUserTableData(data);
  };
  const getUser = async () => {
    const user = await getUserName();
    setUserName(user);
  };
  const getAppliedForms = async () => {
    const appliedForm = await getUserAppliedForm();
    setUserAppliedForm(appliedForm);
  };

  useEffect(() => {
    getData();
    getUser();
    getAppliedForms();
  }, []);

  return (
    <div>
      <nav role="banner" className={styles.banner}>
        <div className={styles.header}>
          <h2>Job Application Tracker</h2>
          <p>
            <span>Total Applied Jobs : {userAppliedForm}</span>
          </p>
        </div>
        <div className={styles.LogoutBtn}>
          <div style={{ textAlign: "center" }}>
            <span>Jonseeker name : {userName}</span>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      </nav>
      {/* {userTableData.length > 0 ? (
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
      )} */}
      <div className={styles.card_container}>
        {userTableData.length > 0 ? (
          userTableData.map((form: JobSeeker, index: number) => {
            return (
              <div className={styles.card} key={index}>
                <div className={styles.inner_card}>
                  <div className={styles.left}>{form.company}</div>
                  <div className={styles.right}>
                    <div>{form.role}</div>
                    <div>{form.jobType}</div>
                    <div>{form.location}</div>
                  </div>
                </div>
                <div className={styles.footer}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>Description:</div>
                    <div>{form.notes}</div>
                  </div>

                  <button
                    disabled={form.applied}
                    style={{
                      background: form.applied ? "gray" : "",
                    }}
                    onClick={() => applyForm(form.formID)}>
                    Easy Apply
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="no_forms">
              <h2>No forms !</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobseekermain;
