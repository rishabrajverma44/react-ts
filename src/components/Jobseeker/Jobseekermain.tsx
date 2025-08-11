import { useEffect, useState } from "react";
import styles from "../../Style/jobseeker.module.css";
import type { JobSeeker } from "../../types";
import {
  applyFormByFormID,
  getAllForms,
  getUserAppliedFormNumber,
  getUserName,
} from "../../Api/ApiCall/jobSeekers";
import { handleLogout } from "../../utils/logout";
import { toast } from "react-toastify";
import { ReadMore } from "../../utils/ReadMore";
import location from "../../utils/location.png";
const Jobseekermain = () => {
  const [userTableData, setUserTableData] = useState<JobSeeker[]>([]);
  const [userName, setUserName] = useState();
  const [userAppliedFormNumber, setUserAppliedFormNumber] = useState<number>();

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
    const appliedForm = await getUserAppliedFormNumber();
    setUserAppliedFormNumber(appliedForm);
  };

  useEffect(() => {
    getData();
    getUser();
    getAppliedForms();
  }, []);

  return (
    <div>
      <nav role="banner" className="banner">
        <div className="header">
          <h2>Job Application Tracker</h2>
          <p>Total Applied Jobs : {userAppliedFormNumber}</p>
        </div>
        <div className="LogoutBtn">
          <div className="emp-name">
            <span style={{ fontWeight: "bolder" }}>Jobseeker :</span>
            <span>{userName}</span>
          </div>
          <button onClick={handleLogout}>logout</button>
        </div>
      </nav>

      <div className={styles.card_container}>
        {userTableData.length > 0 ? (
          userTableData.map((form: JobSeeker, index: number) => {
            return (
              <div className={styles.card} key={index}>
                <div>
                  <div>
                    <span className={styles.role}> {form.role}</span>
                  </div>
                  <div className={styles.inner_card}>
                    <div>
                      <span>{form.jobType}</span>
                    </div>
                    <div className={styles.right}>
                      <div>
                        <img
                          className={styles.location_img}
                          src={location}
                          alt="location"
                          style={{
                            display: form.jobType === "Remote" ? "none" : "",
                          }}
                        />
                        {form.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.company}>{form.company}</div>
                <div className={styles.footer}>
                  <div className={styles.description}>
                    <div>Description:</div>
                    <ReadMore id="ReadMore" text={form.notes} />
                  </div>

                  <button
                    disabled={form.applied}
                    className={styles.applyBtn}
                    style={{
                      background: form.applied ? "gray" : "",
                    }}
                    onClick={() => applyForm(form.formID)}>
                    {form.applied ? "Applied" : "Easy Apply"}
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
