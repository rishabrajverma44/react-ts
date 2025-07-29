import type React from "react";
import styles from "../Style/search.module.css";
import { useState } from "react";

const Filter = () => {
  const [searchValue, setSearch] = useState("");
  function searchFunction() {
    console.log("searching...", searchValue);
  }
  // function debounce(fun: Function) {
  //   let timeout: number;
  //   return function (...args: string[]) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       fun(...args);
  //     }, 4000);
  //   };
  // }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchQuery = e.target.value.trim();
    if (searchQuery.length > 0) {
      searchFunction();
    }
  };
  const handleClear = () => {
    setSearch("");
  };
  return (
    <div>
      <div className={styles.search_box}>
        <input
          className={styles.searchFileld}
          type="input"
          placeholder="Search "
          onChange={handleChange}
          value={searchValue}
        />
        <button className={styles.clear} onClick={handleClear}>
          X
        </button>
      </div>
    </div>
  );
};

export default Filter;
