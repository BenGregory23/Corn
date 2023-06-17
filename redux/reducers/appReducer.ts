import { FETCH_USER_MOVIES, SET_USER_CONNECTED, SET_USER, SET_LIGHT_MODE, REMOVE_USER_MOVIE, ADD_USER_MOVIE, SET_LANGUAGE } from "../constants"

const initialState = {
    userMovies: [],
    userConnected: false,
    user: {
        _id : "",
    },
    lightMode: false,
    language: "EN",
}


const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_MOVIES:
            return {
                ...state,
                userMovies: action.payload
            }
        case REMOVE_USER_MOVIE:
            return {
                ...state,
                userMovies: state.userMovies.filter(movie => movie.id_tmdb !== action.payload)
            }
        case ADD_USER_MOVIE:
            return {
                ...state,
                userMovies: [...state.userMovies, action.payload]
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
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;

