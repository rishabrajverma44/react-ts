import Filter from "../components/Company/Forms/Filter";
import Table from "../components/Company/Forms/Table";
import Header from "../components/Company/Header";

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
