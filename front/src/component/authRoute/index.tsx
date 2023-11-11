import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import BalancePage from "../../container/BalancePage";

interface AuthRouteProps {
  children: React.ReactElement;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside Auth Provider");
  }

  return context;
};

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { state } = useAuth();
  console.log(state);

  if (state.token && state.user.isConfirm) {
    return <BalancePage />;
  } else {
    return <>{children}</>;
  }
};
