import { useState } from "react";
import styles from "../../Style/table.module.css";
import { UseFormContext } from "../../context/UseFormContext";
import type { formInterface } from "../../types";
const Table = () => {
  const formCtx = UseFormContext();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openWarnModel, setOpenWarnModel] = useState(false);
  const [currentId, setCurrentId] = useState<string | null | undefined>(null);
  const isFormDirty = formCtx?.isFormDirty;

  function chechDurty(id: string | null | undefined, option: string) {
    if (isFormDirty) {
      setOpenWarnModel(true);
      return;
    } else if (option === "edit" && formCtx) {
      formCtx.setterFunction(id !== null ? id : "");
    } else if (option === "delete" && formCtx) {
      setCurrentId(id !== null ? id : null);
      setOpenDeleteModel(true);
    }
  }

  return (
    <div>
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
          {formCtx?.filteredData.map((item: formInterface, index: number) => {
            return (
              <tr role="row" key={index}>
                <td role="cell">{item.company}</td>
                <td role="cell">{item.date}</td>
                <td role="cell">{item.jobtype}</td>
                <td role="cell">
                  {item.location === "" ? "N/A" : item.location}
                </td>
                <td role="cell">{item.role}</td>
                <td role="cell">{item.status}</td>
                <td role="cell">{item.notes}</td>
                <td role="cell" className={styles.action}>
                  <div className={styles.action_inner}>
                    <button
                      onClick={() => {
                        chechDurty(item.id, "edit");
                      }}
                      className={styles.edit_btn}>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        chechDurty(item.id, "delete");
                      }}
                      className={styles.delete_btn}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {formCtx?.filteredData.length === 0 && (
        <>
          <div className="no_forms">
            <h2>No forms !</h2>
          </div>
        </>
      )}
      {openDeleteModel && (
        <>
          <div role="alert" id="myModal" className="modal">
            <div className="modal-content">
              <h2>Want to delete ?</h2>
              <div className="buttons">
                <button onClick={() => setOpenDeleteModel(false)}>No</button>
                <button
                  onClick={() => {
                    formCtx?.deleteForm(currentId!);
                    setOpenDeleteModel(false);
                  }}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {openWarnModel && (
        <>
          <div role="alert" id="myModal" className="modal">
            <div className="modal-content">
              <h2>Save your form first ! </h2>
              <div className="buttons">
                <button onClick={() => setOpenWarnModel(false)}>Close</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
