import { SET_USER_CONNECTED, SET_USER } from "../constants";

export const setUserConnected = (userConnected:boolean) => {
    
    return {
        type: SET_USER_CONNECTED,
        payload: userConnected
    }
}

export const setUser = (user:object) => {
    
    return {
        type: SET_USER,
        payload: user
    }
}




