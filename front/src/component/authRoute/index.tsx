import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface AuthRouteProps {
  children: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { state } = useAuth();

  if (state.token) {
    return <Navigate to="/balance" replace />;
  } else {
    return children;
  }
};

export default AuthRoute;
