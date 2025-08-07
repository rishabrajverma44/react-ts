import Header from "../components/Company/Header";
import Filter from "../components/Company/Filter";
import Table from "../components/Company/Table";
import Form from "../components/Company/Form";
import { FormContextProvider } from "../context/FormContextProvider";

const Employer = () => {
  return (
    <FormContextProvider>
      <div>
        <Header />
        <div className="hero-section">
          <div className="main-form">
            <Form />
          </div>
          <div className="main-table">
            <Filter />
            <Table />
          </div>
        </div>
      </div>
    </FormContextProvider>
  );
};

export default Employer;
