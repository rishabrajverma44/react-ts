import { useState } from "react";
import styles from "../../../Style/table.module.css";
import type { formInterface } from "../../../types";
import { UseFormContext } from "../../../context/FormContextProvider";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const formCtx = UseFormContext();
  const navigate = useNavigate();

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [currentId, setCurrentId] = useState<string | null | undefined>(null);

  const pageSize = 10;

  const totalForms = formCtx?.filteredData.length || 0;
  const totalPages = Math.ceil(totalForms / pageSize);

  const paginatedData =
    formCtx?.filteredData.slice(
      (formCtx?.currentPage! - 1) * pageSize,
      formCtx?.currentPage! * pageSize
    ) || [];

  function activeAction(id: string | null | undefined, option: string) {
    if (option === "edit" && formCtx) {
      formCtx.setterFunction(id !== null ? id : "");
      navigate("/addform");
    } else if (option === "delete" && formCtx) {
      setCurrentId(id !== null ? id : null);
      setOpenDeleteModel(true);
    }
  }

  return (
    <div>
      {totalForms > 0 ? (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Job-Type</th>
                <th>Location</th>
                <th>Last Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item: formInterface, index: number) => (
                <tr role="row" key={index}>
                  <td role="cell">{item.company}</td>
                  <td role="cell">{item.role}</td>
                  <td role="cell">{item.jobType}</td>
                  <td role="cell">
                    {item.location === "" ? "N/A" : item.location}
                  </td>
                  <td role="cell">{item.date}</td>
                  <td role="cell">{item.status}</td>
                  <td role="cell" className={styles.action}>
                    <div className={styles.action_inner}>
                      <button
                        onClick={() => activeAction(item.formID, "edit")}
                        className={styles.edit_btn}>
                        Edit
                      </button>
                      <button
                        onClick={() => activeAction(item.formID, "delete")}
                        className={styles.delete_btn}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button
              disabled={formCtx?.currentPage! === 1}
              onClick={() => formCtx?.setCurrentPage((prev) => prev - 1)}>
              Prev
            </button>
            <span>
              Page {formCtx?.currentPage!} of {totalPages}
            </span>
            <button
              disabled={formCtx?.currentPage! === totalPages}
              onClick={() => formCtx?.setCurrentPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="no_forms">
          <h2>No forms !</h2>
        </div>
      )}

      {openDeleteModel && (
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
      )}
    </div>
  );
};

export default Table;
