import {createContext} from "react";

const SET_USER = "SET_USER", LOGOUT = "LOGOUT"
export const defaultState = {
    currentUser: '',
    token: ''
}

const authContext = createContext(defaultState);

export const AppReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case SET_USER:
            return {...state, currentUser: payload, token: payload ? payload.token : ''}
        case LOGOUT:
            return {...state, currentUser: '', token: ''}
        default:
            return state;
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}
export const exit = () => {
    localStorage.removeItem("token");
    return {
        type: LOGOUT,
    }
}
export default authContext;