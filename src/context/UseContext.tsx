import { createContext, useContext, type SetStateAction } from "react";
import type { formInterface } from "../types/types";

//context types
type FormContextType = {
  forms: formInterface[];
  currentForm: formInterface | null;
  setCurrentForm: React.Dispatch<SetStateAction<formInterface | null>>;
  setterFunction: (formID?: string) => void;
  createForms: (form: Omit<formInterface, "id">) => void;
  updateForm: (id: string, form: formInterface) => void;
  deleteForm: (id: string) => void;
};

//it will be a higher order context funtion
export const FormContext = createContext<FormContextType | null>(null);
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("component must be used within a provider");
  }
  return context;
};
