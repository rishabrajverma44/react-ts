import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <img
        style={{ width: "80vw", maxHeight: "400px" }}
        src="https://static.vecteezy.com/system/resources/previews/008/255/804/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-graffiti-sprayed-page-not-found-error-404-isolated-on-white-background-vector.jpg"
        alt="notfoundPage"
      />
      <div>
        <button type="button" onClick={() => navigate("/")}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;
