import { SET_LANGUAGE } from "../constants";

export const setLanguage = (language:string) => {

    return {
        type: SET_LANGUAGE,
        payload: language
    }
}
