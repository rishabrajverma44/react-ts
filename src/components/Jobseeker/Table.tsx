import styles from "../../Style/table.module.css";
import type { JobSeeker } from "../../types";
const Table = () => {
  const userTableData: JobSeeker[] = [
    {
      formID: "xyxyxy",
      company: "company name",
      role: "SDE",
      jobtype: "Onsite",
      location: "New delhi",
      status: "Applied",
      date: "12/02/2025",
      notes: "this form is hiring for SDE",
      applyed: true,
    },
  ];
  const applyForm = function (formId: string | null | undefined) {
    console.log(formId);
  };
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
                    <td role="cell">{form.date}</td>
                    <td role="cell">{form.jobtype}</td>
                    <td role="cell">
                      {form.location === "" ? "N/A" : form.location}
                    </td>
                    <td role="cell">{form.role}</td>
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
