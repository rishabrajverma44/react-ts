import type { SetStateAction } from "react";

export interface formInterface {
  formID?: string | null | undefined;
  company: string;
  role: string;
  jobType: string;
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
  createForms: (form: formInterface) => void;
  updateForm: (id: string, form: formInterface) => void;
  deleteForm: (id: string) => void;
  searchedQuery: string;
  setSearchedQuery: React.Dispatch<SetStateAction<string>>;
  filteredData: formInterface[];
  headerData: Header | null;
  isFormDirty: boolean;
}

export interface LoginForm {
  userEmail: string;
  password: string;
}

export interface RegistrationForm {
  userName: string;
  role: string;
  userEmail: string;
  password: string;
}
//job seeker types
export interface JobSeeker {
  formID: string;
  company: string;
  role: string;
  jobType: string;
  location: string;
  status: string;
  date: string;
  notes: string;
  applyed: boolean;
}
