export default function myFun() {
  const indexDB = window.indexedDB;
  if (indexDB) {
    const request = indexDB.open("mydb", 1);
    console.log(request);
  }
}
