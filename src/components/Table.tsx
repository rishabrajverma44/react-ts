import styles from "../Style/table.module.css";
const Table = () => {
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
          <tr>
            <td>company</td>
            <td>role</td>
            <td>jobType</td>
            <td>location</td>
            <td>date</td>
            <td>status</td>
            <td>notes</td>
            <td className={styles.action}>
              <button className={styles.edit_btn}>Edit</button>
              <button className={styles.delete_btn}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
