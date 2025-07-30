import React, { useEffect, useState } from "react";
import type { formInterface } from "../types/types";
import { getFromStorage, saveToStorage } from "../DataBase/localStorage";
import "../DataBase/indexDB";
import {
  addFormINDEXDB,
  deleteFormsINDEXDB,
  updateFormINDEX,
} from "../DataBase/indexDB";
import { FormContext } from "./UseContext";

interface FormContextProps {
  children: React.ReactNode;
}

export const FormContextProvider: React.FC<FormContextProps> = (props) => {
  const [currentForm, setCurrentForm] = useState<formInterface | null>(null);
  const [forms, setForms] = useState<formInterface[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const createForms = (currentForm: Omit<formInterface, "id">) => {
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
  };

  const deleteForm = (formID: string) => {
    setForms((prev) => prev.filter((form) => form.id !== formID));
    deleteFormsINDEXDB(formID);
  };

  const updateForm = (id: string, updateForm: formInterface) => {
    setForms((pre) =>
      pre.map((form) => (form.id === id ? { ...form, ...updateForm } : form))
    );
    setCurrentForm(null);
    updateFormINDEX(updateForm);
  };

  useEffect(() => {
    setForms(getFromStorage());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveToStorage(forms);
  }, [forms, isLoaded]);

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
      }}>
      {props.children}
    </FormContext.Provider>
  );
};
