import type { formInterface } from "../types";

export function saveToStorage(data: formInterface[]) {
  localStorage.setItem("jobTracker_applications_new", JSON.stringify(data));
}
export function getFromStorage(): formInterface[] {
  try {
    const data = localStorage.getItem("jobTracker_applications_new");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading from localStorage:", e);
    return [];
  }
}
