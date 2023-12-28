import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import WelcomePage from "./components/wellcomePage/wellcomePage";
import "./App.css"
import SignupPage from "./components/signupPage/signupPage";
import SigninPage from "./components/signInPage/signin";
import {AuthRoute} from "./containerComponents/authRoute";
import BalancePage from "./components/balancePage/balancePage";
import RecoveryPage from "./components/recoveryPage/recoveryPage";
import ConfirmPage from "./components/signUpConfirmPage/signupConfirmPage";
import {useEffect, useReducer} from "react";
import {AppReducer, defaultState, setUser} from "./contexts/authContext";
import authContext from "./contexts/authContext";
import {PrivateRoute} from "./containerComponents/privateRoute";
import {auth} from "./asyncActions/user";
import RecoveryConfirmPage from "./components/recoveryConfirmPage/recoveryConfirmPage";
import NotificationsPage from "./components/notificationsPage/notificationsPage";
import SettingsPage from "./components/settingsPage/settingsPage";
import RecievePage from "./components/recievePage/recievePage";
import SendPage from "./components/sendPage/sendPage";
import TransactionPage from "./components/transactionPage/transactionPage";

function App() {
    const [state, dispatch] = useReducer(AppReducer, defaultState);
    const getAuthByToken = async () => {
        let res = await auth()
        dispatch(setUser(res.user))

    }
    useEffect(() => {
        if (localStorage.token) getAuthByToken();
    }, [])
    return (
        <BrowserRouter>
            <authContext.Provider value={{state, dispatch}}>
                <Routes>
                    <Route index element={
                        <AuthRoute>
                            <WelcomePage/>
                        </AuthRoute>}>
                    </Route>
                    <Route path={'/signup'} element={<AuthRoute> <SignupPage/> </AuthRoute>}></Route>
                    <Route path={'/signin'} element={<AuthRoute><SigninPage/></AuthRoute>}></Route>
                    <Route path={'/recovery'} element={<AuthRoute><RecoveryPage/></AuthRoute>}></Route>
                    <Route path={'/recovery-confirm'} element={<AuthRoute><RecoveryConfirmPage/></AuthRoute>}></Route>
                    <Route path={'/signup-confirm'} element={<PrivateRoute><ConfirmPage/></PrivateRoute>}></Route>
                    <Route path={'/balance'} element={<PrivateRoute> <BalancePage/> </PrivateRoute>}></Route>
                    <Route path={'/notifications'} element={<PrivateRoute><NotificationsPage/></PrivateRoute>}></Route>
                    <Route path={'/settings'} element={<PrivateRoute><SettingsPage/></PrivateRoute>}></Route>
                    <Route path={'/recive'} element={<PrivateRoute><RecievePage/></PrivateRoute>}></Route>
                    <Route path={'/send'} element={<PrivateRoute><SendPage/></PrivateRoute>}></Route>
                    <Route path={'/transaction/:transactionId'} element={<PrivateRoute><TransactionPage></TransactionPage></PrivateRoute>}></Route>
                    <Route path={'*'} element={Error}></Route>
                </Routes>
            </authContext.Provider>
        </BrowserRouter>
    )
        ;
}

export default App;
