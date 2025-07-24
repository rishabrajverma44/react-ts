import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";
import Table from "./components/Table";

function App() {
  return (
    <>
      <Header />
      <div className="hero-section">
        <div className="main-form">
          <Form />
        </div>
        <div className="main-table">
          <Table />
        </div>
      </div>
    </>
  );
}

export default App;
