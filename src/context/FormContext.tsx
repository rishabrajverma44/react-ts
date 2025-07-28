import React, { createContext, useContext, useState } from "react";
import type { formInterface } from "../types/types";

//context types
type FormContextType = {
  forms: formInterface[];
  createForms: (form: Omit<formInterface, "id">) => void;
  updateForm: (id: string, form: Omit<formInterface, "id">) => void;
  deleteForm: (id: string) => void;
};

//context creation and attach to usecontext
const FormContext = createContext<FormContextType | null>(null);
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("component must be used within a provider");
  }
  return context;
};

interface FormContextProps {
  children: React.ReactNode;
}

export const FormContextProvider: React.FC<FormContextProps> = (props) => {
  const [forms, setForms] = useState<formInterface[]>([]);

  const generateId = (): string => {
    return `${Math.random().toString(36).slice(2, 9)}`;
  };

  const createForms = (form: Omit<formInterface, "id">) => {
    const newForm: formInterface = {
      id: generateId(),
      ...form,
    };
    setForms((prev) => [...prev, newForm]);
  };

  const deleteForm = (formID: string) => {
    setForms((prev) => prev.filter((form) => form.id !== formID));
  };

  const updateForm = (id: string, updatedForm: Omit<formInterface, "id">) => {
    setForms((pre) =>
      pre.map((form) => (form.id === id ? { ...form, ...updatedForm } : form))
    );
  };
  return (
    <FormContext.Provider
      value={{ forms, createForms, updateForm, deleteForm }}>
      {props.children}
    </FormContext.Provider>
  );
};
