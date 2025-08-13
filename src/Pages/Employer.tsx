import Header from "../components/Company/Header";
import Filter from "../components/Company/Filter";
import Table from "../components/Company/Table";

const Employer = () => {
  return (
    <>
      <Header />
      <Filter />
      <div className="main-table">
        <Table />
      </div>
    </>
  );
};

export default Employer;
