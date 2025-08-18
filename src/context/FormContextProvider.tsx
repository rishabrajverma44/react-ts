import React, { createContext, useContext, useEffect, useState } from "react";
import type { FormContextType, formInterface, Header } from "../types";
import {
  addFormData,
  deleteFormData,
  getAllForms,
  getUserDetails,
  updateFormData,
} from "../Api/ApiCall/companyApl";
import { useNavigate } from "react-router-dom";

interface FormContextProps {
  children: React.ReactNode;
}

//wrap our context with usecontext hook to each component
const FormContext = createContext<FormContextType | null>(null);
export const UseFormContext = () => {
  const context = useContext(FormContext);
  if (context) {
    return context;
  }
};

//use context as a higer order component function and attach provider to each component
export const FormContextProvider: React.FC<FormContextProps> = (props) => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState<formInterface | null>(null);
  const [forms, setForms] = useState<formInterface[]>([]);
  const [searchedQuery, setSearchedQuery] = useState<string>("");
  const [filteredData, setFilterdData] = useState<formInterface[]>([]);
  const [headerData, setHeaderData] = useState<Header | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const setterFunction = (formID?: string) => {
    if (formID) {
      setCurrentForm(() => {
        return forms.find((item) => item.formID === formID) || null;
      });
    }
  };
  const createForms = async (currentForm: formInterface) => {
    const res = await addFormData(currentForm);
    if (res.company) {
      getFormData();
      navigate("/forms");
    }
    setCurrentForm(null);
  };

  const deleteForm = (formID: string) => {
    deleteFormData(formID);
    getFormData();
  };

  const updateForm = (id: string, form: formInterface) => {
    delete form.formID;
    updateFormData(id, form);
    setCurrentForm(null);
    getFormData();
    navigate("/forms");
  };
  //search context
  const searchContext = () => {
    const allTableData: formInterface[] = forms;
    setCurrentPage(1);
    if (!(searchedQuery.trim() === "")) {
      const filteredData = allTableData.filter((element: formInterface) => {
        return (
          element.company.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          element.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          element.location
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          element.role.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterdData(filteredData);
    } else {
      setFilterdData(allTableData);
    }
  };
  //header sum data
  const headerDetails = (data: formInterface[], companyName: string) => {
    const headerObject = {
      totalApplication: data.length,
      totalApplied: data.filter((form) => form.status === "Applied").length,
      totalInterviewing: data.filter((form) => form.status === "Interviewing")
        .length,
      totalHired: data.filter((form) => form.status === "Rejected").length,
      totalRejected: data.filter((form) => form.status === "Rejected").length,
      companyName: companyName,
    };
    setHeaderData(headerObject);
  };
  // db call
  const getFormData = async () => {
    const data: formInterface[] = await getAllForms();
    const companyName: string = await getUserDetails();
    if (data && companyName) {
      setForms(data);
      setFilterdData(data);
      headerDetails(data, companyName);
    }
  };

  useEffect(() => {
    searchContext();
  }, [searchedQuery, forms]);

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <FormContext.Provider
      value={{
        forms,
        currentForm,
        setCurrentForm,
        setterFunction,
        createForms,
        updateForm,
        deleteForm,
        searchedQuery,
        setSearchedQuery,
        filteredData,
        headerData,
        currentPage,
        setCurrentPage,
      }}>
      {props.children}
    </FormContext.Provider>
  );
};
