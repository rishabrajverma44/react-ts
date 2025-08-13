import { useNavigate } from "react-router-dom";
import { UseFormContext } from "../../context/FormContextProvider";
import styles from "../../Style/search.module.css";

const Filter = () => {
  const navigate = useNavigate();
  //controlled search field
  const formCTX = UseFormContext();
  return (
    <div className={styles.filter}>
      <div className={styles.search_box}>
        <input
          className={styles.searchFileld}
          type="input"
          placeholder="Search "
          value={formCTX?.searchedQuery}
          onChange={(e) => formCTX?.setSearchedQuery(e.target.value)}
        />
        <button
          className={styles.clear}
          onClick={() => formCTX?.setSearchedQuery("")}>
          X
        </button>
      </div>
      <div className={styles.addBtnContainer}>
        <button onClick={() => navigate("/addform")}>Add Form</button>
      </div>
    </div>
  );
};

export default Filter;
