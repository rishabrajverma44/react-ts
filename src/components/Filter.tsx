import styles from "../Style/search.module.css";

const Filter = () => {
  return (
    <div>
      <div className={styles.search_box}>
        <input className={styles.searchFileld} type="input" placeholder="Search " />
        <button className={styles.clear}>X</button>
      </div>
    </div>
  );
};

export default Filter;
