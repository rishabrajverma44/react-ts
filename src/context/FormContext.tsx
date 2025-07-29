import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type SetStateAction,
} from "react";
import type { formInterface } from "../types/types";
import { getFromStorage, saveToStorage } from "../DataBase/localStorage";

//context types
type FormContextType = {
  forms: formInterface[];
  currentForm: formInterface | null;
  setCurrentForm: React.Dispatch<SetStateAction<formInterface | null>>;
  setterFunction: (formID?: string) => void;
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
    setCurrentForm(null);
  };

  const deleteForm = (formID: string) => {
    setForms((prev) => prev.filter((form) => form.id !== formID));
  };

  const updateForm = (id: string, updatedForm: Omit<formInterface, "id">) => {
    setForms((pre) =>
      pre.map((form) => (form.id === id ? { ...form, ...updatedForm } : form))
    );
    setCurrentForm(null);
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
