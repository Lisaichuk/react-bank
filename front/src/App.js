import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/wellcomePage/wellcomePage";
import "./App.css";
import SignupPage from "./pages/signupPage/signupPage";
import SigninPage from "./pages/signInPage/signin";
import { AuthRoute } from "./contexts/authRoute";
import BalancePage from "./pages/balancePage/balancePage";
import RecoveryPage from "./pages/recoveryPage/recoveryPage";
import ConfirmPage from "./pages/signUpConfirmPage/signupConfirmPage";
import { useEffect, useReducer } from "react";
import { AppReducer, defaultState, setUser } from "./contexts/authContext";
import authContext from "./contexts/authContext";
import { PrivateRoute } from "./contexts/privateRoute";
import RecoveryConfirmPage from "./pages/recoveryConfirmPage/recoveryConfirmPage";
import NotificationsPage from "./pages/notificationsPage/notificationsPage";
import SettingsPage from "./pages/settingsPage/settingsPage";
import RecievePage from "./pages/recievePage/recievePage";
import SendPage from "./pages/sendPage/sendPage";
import TransactionPage from "./pages/transactionPage/transactionPage";

function App() {
  const [state, dispatch] = useReducer(AppReducer, defaultState);

  const auth = async () => {
    try {
      let res = await fetch("http://localhost:5000/api/auth/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      res = await res.json();
      return res;
    } catch (e) {
      alert(e);
    }
  };

  const getAuthByToken = async () => {
    let res = await auth();
    dispatch(setUser(res.user));
  };
  useEffect(() => {
    if (localStorage.token) getAuthByToken();
  }, []);
  return (
    <BrowserRouter>
      <authContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WelcomePage />
              </AuthRoute>
            }
          ></Route>
          <Route
            path={"/signup"}
            element={
              <AuthRoute>
                {" "}
                <SignupPage />{" "}
              </AuthRoute>
            }
          ></Route>
          <Route
            path={"/signin"}
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          ></Route>
          <Route
            path={"/recovery"}
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          ></Route>
          <Route
            path={"/recovery-confirm"}
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          ></Route>
          <Route
            path={"/signup-confirm"}
            element={
              <PrivateRoute>
                <ConfirmPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/balance"}
            element={
              <PrivateRoute>
                {" "}
                <BalancePage />{" "}
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/notifications"}
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/settings"}
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/recive"}
            element={
              <PrivateRoute>
                <RecievePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/send"}
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={"/transaction/:transactionId"}
            element={
              <PrivateRoute>
                <TransactionPage></TransactionPage>
              </PrivateRoute>
            }
          ></Route>
          <Route path={"*"} element={Error}></Route>
        </Routes>
      </authContext.Provider>
    </BrowserRouter>
  );
}

export default App;
