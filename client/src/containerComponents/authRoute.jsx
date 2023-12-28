import {useContext} from "react";
import authContext from "../contexts/authContext"
import BalancePage from "../components/balancePage/balancePage";


export const AuthRoute = ({children}) => {
    const {state} = useContext(authContext);

    if (state.token && state.currentUser.isConfirmed) {
        return <BalancePage/>
    } else if(state.token && !state.currentUser.isConfirmed){
        return children
    } else return children
};