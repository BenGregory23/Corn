import appReducer from "./appReducer";

// Mocking values
const initialState = {
    userMovies: [],
    userConnected: false,
    user: {
        _id : "",
    },
    lightMode: false,
    language: "EN",
}

// @ts-ignore
export default testReducer = (state = initialState, action) => {

    return appReducer(initialState, action)
}
