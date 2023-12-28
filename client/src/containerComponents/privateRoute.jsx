import {useContext} from "react";
import authContext from "../contexts/authContext";
import SignupConfirmPage from "../components/signUpConfirmPage/signupConfirmPage";
import WelcomePage from "../components/wellcomePage/wellcomePage";


export const PrivateRoute = ({children}) => {
    const {state} = useContext(authContext);
    if (state.token && !state.currentUser.isConfirmed) {
        return <SignupConfirmPage/>
    } else if(state.token && state.currentUser.isConfirmed){
        return children
    } else return <WelcomePage/>
};