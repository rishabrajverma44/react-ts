import React, { createContext, useContext, useEffect, useState } from "react";
import type { FormContextType, formInterface } from "../types";
import {
  addFormINDEXDB,
  deleteFormsINDEXDB,
  getAllFormsINDEXDB,
  updateFormINDEX,
} from "../DataBase/indexDB";

interface FormContextProps {
  children: React.ReactNode;
}
type Header = {
  totalApplication: number;
  totalApplied: number;
  totalInterviewing: number;
  totalHired: number;
  totalRejected: number;
};

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
  const [currentForm, setCurrentForm] = useState<formInterface | null>(null);
  const [forms, setForms] = useState<formInterface[]>([]);
  const [searchedQuery, setSearchedQuery] = useState<string>("");
  const [filteredData, setFilterdData] = useState<formInterface[]>([]);
  const [headerData, setHeaderData] = useState<Header | null>(null);

  const generateId = (): string => {
    return `${Math.random().toString(36).slice(2, 9)}`;
  };
  const setterFunction = (formID?: string) => {
    if (formID) {
      setCurrentForm(() => {
        return forms.find((item) => item.id === formID) || null;
      });
    }
  };
  const createForms = (currentForm: formInterface) => {
    console.log(currentForm);
    const id = generateId();
    const newForm: formInterface = {
      ...currentForm,
      id: id,
    };
    setForms((prev) => {
      return [...prev, newForm];
    });
    addFormINDEXDB(newForm);
    setCurrentForm(null);
    getINDEXDBData();
  };

  const deleteForm = (formID: string) => {
    setForms((prev) => prev.filter((form) => form.id !== formID));
    deleteFormsINDEXDB(formID);
    getINDEXDBData();
  };

  const updateForm = (id: string, updateForm: formInterface) => {
    setForms((pre) =>
      pre.map((form) => (form.id === id ? { ...form, ...updateForm } : form))
    );
    setCurrentForm(null);
    updateFormINDEX(updateForm);
    getINDEXDBData();
  };
  //search context
  const searchContext = () => {
    const allTableData: formInterface[] = forms;
    if (!(searchedQuery.trim() === "")) {
      const filteredData = allTableData.filter((element: formInterface) => {
        return (
          element.company.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          element.jobtype.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          element.location
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          element.notes.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterdData(filteredData);
    } else {
      setFilterdData(allTableData);
    }
  };
  //header sum data
  const headerSumData = (data: formInterface[]) => {
    const headerObject = {
      totalApplication: data.length,
      totalApplied: data.filter((form) => form.status === "Applied").length,
      totalInterviewing: data.filter((form) => form.status === "Interviewing")
        .length,
      totalHired: data.filter((form) => form.status === "Rejected").length,
      totalRejected: data.filter((form) => form.status === "Rejected").length,
    };
    setHeaderData(headerObject);
  };
  //index db call
  async function getINDEXDBData() {
    const data: formInterface[] = await getAllFormsINDEXDB();
    if (data) {
      setForms(data);
      setFilterdData(data);
      headerSumData(data);
    }
    console.log(data);
  }

  useEffect(() => {
    searchContext();
  }, [searchedQuery]);

  useEffect(() => {
    getINDEXDBData();
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
      }}>
      {props.children}
    </FormContext.Provider>
  );
};
