import {useContext} from "react";
import authContext from "./authContext";
import SignupConfirmPage from "../pages/signUpConfirmPage/signupConfirmPage";
import WelcomePage from "../pages/wellcomePage/wellcomePage";


export const PrivateRoute = ({children}) => {
    const {state} = useContext(authContext);
    if (state.token && !state.currentUser.isConfirmed) {
        return <SignupConfirmPage/>
    } else if(state.token && state.currentUser.isConfirmed){
        return children
    } else return <WelcomePage/>
};