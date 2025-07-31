import { UseFormContext } from "../context/UseFormContext";
import styles from "../Style/search.module.css";

const Filter = () => {
  //controlled search field
  const formCTX = UseFormContext();
  return (
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
  );
};

export default Filter;
