import { USER_CONNECTED } from "../constants";

export const setUserConnected = (userConnected:boolean) => {
    return {
        type: USER_CONNECTED,
        payload: userConnected
    }
}


