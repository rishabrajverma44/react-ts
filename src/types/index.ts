import type { SetStateAction } from "react";

export interface formInterface {
  id: null | string;
  company: string;
  role: string;
  jobtype: string;
  location: string;
  status: string;
  date: string;
  notes: string;
}
// header object
export interface Header {
  totalApplication: number;
  totalApplied: number;
  totalInterviewing: number;
  totalHired: number;
  totalRejected: number;
}
//context types
export interface FormContextType {
  forms: formInterface[];
  currentForm: formInterface | null;
  setCurrentForm: React.Dispatch<SetStateAction<formInterface | null>>;
  setterFunction: (formID?: string) => void;
  createForms: (form: Omit<formInterface, "id">) => void;
  updateForm: (id: string, form: formInterface) => void;
  deleteForm: (id: string) => void;
  searchedQuery: string;
  setSearchedQuery: React.Dispatch<SetStateAction<string>>;
  filteredData: formInterface[];
  headerData: Header | null;
}
