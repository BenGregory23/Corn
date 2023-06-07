import { SET_LIGHT_MODE } from "../constants";

export const setLightMode = (lightMode:boolean) => {
        
    return {
        type: SET_LIGHT_MODE,
        payload: lightMode
    }
}
