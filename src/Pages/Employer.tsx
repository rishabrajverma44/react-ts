import Header from "../components/Company/Header";
import Filter from "../components/Company/Filter";
import Table from "../components/Company/Table";
import { FormContextProvider } from "../context/FormContextProvider";

const Employer = () => {
  return (
    <FormContextProvider>
      <Header />
      <Filter />
      <div className="main-table">
        <Table />
      </div>
    </FormContextProvider>
  );
};

export default Employer;
