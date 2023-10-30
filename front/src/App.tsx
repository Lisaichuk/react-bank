import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthRoute from "./component/authRoute";
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Page } from "./component/page";

import WelcomePage from "./container/WelcomePage";
import SignupPage from "./container/SignupPage";
import SignupConfirmPage from "./container/SignupConfirmPage";
import SigninPage from "./container/SigninPage";
import RecoveryPage from "./container/RecoveryPage";
import RecoveryConfirmPage from "./container/RecoveryConfirmPage";
import BalancePage from "./container/BalancePage";
import SettingsPage from "./container/SettingsPage";
import NotificationsPage from "./container/NotificationsPage";
import RecivePage from "./container/RecivePage";
import SendPage from "./container/SendPage";

function App() {
  const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    const { state } = useAuth();

    if (state.user) {
      return <SignupConfirmPage />;
    }
    if (state.user.isConfirm) {
      return <BalancePage />;
    }

    return <SignupPage />;
  };

  return (
    <AuthProvider>
      <Page>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <WelcomePage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              }
            />
            <Route
              path="/signup-confirm"
              element={
                <PrivateRoute>
                  <SignupConfirmPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SigninPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery"
              element={
                <AuthRoute>
                  <RecoveryPage />
                </AuthRoute>
              }
            />
            <Route
              path="/recovery-confirm"
              element={
                <AuthRoute>
                  <RecoveryConfirmPage />
                </AuthRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <PrivateRoute>
                  <BalancePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/recive"
              element={
                <PrivateRoute>
                  <RecivePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/send"
              element={
                <PrivateRoute>
                  <SendPage />
                </PrivateRoute>
              }
            />
            {/* <Route path="*" Component={Error} /> */}
          </Routes>
        </BrowserRouter>
      </Page>
    </AuthProvider>
  );
}

export default App;
