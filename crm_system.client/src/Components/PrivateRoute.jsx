import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token"); // Or any other authentication check

  return token ? element : <Navigate to="/signIn" />;
};

export default PrivateRoute;
