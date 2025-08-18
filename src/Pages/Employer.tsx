import Filter from "../components/Company/Forms/Filter";
import Header from "../components/Company/Forms/Header";
import Table from "../components/Company/Forms/Table";

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
