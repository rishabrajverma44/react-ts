export function saveToStorage(data: string) {
  localStorage.setItem("jobTracker_applications_new", JSON.stringify(data));
}

export function getFromStorage() {
  const storageData = localStorage.getItem("jobTracker_applications_new");
  return storageData;
}
