import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  element?: React.ReactNode;
  onSendToken: (token: string) => Promise<void>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  element,
  onSendToken,
  ...props
}) => {
  const { state } = useAuth();

  //   const handleSendTokenToServer = async () => {
  //     if (state.token) {
  //       try {
  //         await onSendToken(state.token);
  //       } catch (error) {
  //         console.error("Error sending token to server:", error);
  //       }
  //     }
  //   };

  return state.token ? (
    <>
      <Route {...props} element={element}>
        {children}
      </Route>
      {/* {handleSendTokenToServer()} */}
    </>
  ) : (
    <Navigate to="/signup" />
  );
};

export default PrivateRoute;
