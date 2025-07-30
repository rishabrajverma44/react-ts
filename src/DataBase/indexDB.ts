import type { formInterface } from "../types/types";

const DB_NAME = "JobAplication_ts";
const STORE_NAME = "JobAplicationForms";
//creation of DB table(store)
const openINDEXDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target?.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onerror = () => {
      reject("Error opening database");
    };
    request.onsuccess = (e) => {
      resolve((e.target as IDBRequest).result);
    };
  });
};

// Add a new form
const addFormINDEXDB = async (form: formInterface): Promise<formInterface> => {
  const db = await openINDEXDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put(form);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(form);
    transaction.onerror = () => reject("Error adding form");
  });
};
// Get all forms
const getAllFormsINDEXDB = async (): Promise<formInterface[]> => {
  const db = await openINDEXDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error getting forms");
  });
};
// Delete a form
const deleteFormsINDEXDB = async (id: string): Promise<void> => {
  const db = await openINDEXDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject("Error deleting form");
  });
};
// Update a form
const updateFormINDEX = async (form: formInterface): Promise<formInterface> => {
  const db = await openINDEXDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put(form);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(form);
    transaction.onerror = () => reject("Error updating form");
  });
};
export {
  addFormINDEXDB,
  getAllFormsINDEXDB,
  deleteFormsINDEXDB,
  updateFormINDEX,
};
