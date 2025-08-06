import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
