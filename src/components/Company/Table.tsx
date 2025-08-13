import { useState } from "react";
import styles from "../../Style/table.module.css";
import type { formInterface } from "../../types";
import { UseFormContext } from "../../context/FormContextProvider";
import { ReadMore } from "../../utils/ReadMore";
import { useNavigate } from "react-router-dom";
const Table = () => {
  const formCtx = UseFormContext();
  const navigate = useNavigate();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [currentId, setCurrentId] = useState<string | null | undefined>(null);

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
                <td role="cell">{item.role}</td>
                <td role="cell">{item.jobType}</td>
                <td role="cell">
                  {item.location === "" ? "N/A" : item.location}
                </td>
                <td role="cell">{item.date}</td>
                <td role="cell">{item.status}</td>
                <td role="cell">
                  <ReadMore id="read-more-text" text={item.notes} />
                </td>
                <td role="cell" className={styles.action}>
                  <div className={styles.action_inner}>
                    <button
                      onClick={() => {
                        activeAction(item.formID, "edit");
                      }}
                      className={styles.edit_btn}>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        activeAction(item.formID, "delete");
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
    </div>
  );
};

export default Table;
