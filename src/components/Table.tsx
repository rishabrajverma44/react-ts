import { useState } from "react";
import styles from "../Style/table.module.css";
import { UseFormContext } from "../context/UseFormContext";
import type { formInterface } from "../types";
const Table = () => {
  const formCtx = UseFormContext();
  const [openModel, setOpenModel] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

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
                  <button
                    onClick={() =>
                      formCtx.setterFunction(item.id !== null ? item.id : "")
                    }
                    className={styles.edit_btn}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setCurrentId(item.id !== null ? item.id : null);
                      setOpenModel(true);
                    }}
                    className={styles.delete_btn}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openModel && (
        <>
          <div role="alert" id="myModal" className="modal">
            <div className="modal-content">
              <h2>Want to delete ?</h2>
              <div className="buttons">
                <button onClick={() => setOpenModel(false)}>No</button>
                <button
                  onClick={() => {
                    formCtx?.deleteForm(currentId!);
                    setOpenModel(false);
                  }}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
