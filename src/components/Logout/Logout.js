import { useMemo } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ setcookie }) => {
  useMemo(() => {
    setcookie(undefined);
  }, []);

  return <Navigate to={"/login"} />;
};

export default Logout;
