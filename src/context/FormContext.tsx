import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { formInterface } from "../types/types";

//define formContext type
interface formContextType {
  selectedForm: formInterface | null;
  forms: formInterface[];
  setSelectedForm: React.Dispatch<SetStateAction<formInterface | null>>;
  setForms: React.Dispatch<SetStateAction<formInterface[]>>;
}
//create context
const FormContext = createContext<formContextType | null>(null);

//create and export a higher order function wich will acept component and attach provider to it with its provider value
type Props = { children: ReactNode };
export default function FormContextProvider({ children }: Props) {
  const [forms, setForms] = useState<formInterface[]>([]);
  const [selectedForm, setSelectedForm] = useState<formInterface | null>(null);
  return (
    <FormContext.Provider
      value={{ forms, setSelectedForm, setForms, selectedForm }}>
      {children}
    </FormContext.Provider>
  );
}
