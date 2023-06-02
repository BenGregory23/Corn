import { FETCH_USER_MOVIES, USER_CONNECTED } from "../constants"

const initialState = {
    userMovies: [],
    userConnected: false,
    user: {},
}


const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_MOVIES:
            return {
                ...state,
                userMovies: action.payload
            }
        case USER_CONNECTED:
            return {
                ...state,
                userConnected: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;

