import { FETCH_USER_MOVIES, SET_USER_CONNECTED, SET_USER, SET_LIGHT_MODE } from "../constants"

const initialState = {
    userMovies: [],
    userConnected: false,
    user: {
        _id : "",
    },
    lightMode: false
}


const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_MOVIES:
            return {
                ...state,
                userMovies: action.payload
            }
        case SET_USER_CONNECTED:
            return {
                ...state,
                userConnected: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_LIGHT_MODE:
            return {
                ...state,
                lightMode: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;

