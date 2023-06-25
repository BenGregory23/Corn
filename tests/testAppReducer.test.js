import { REMOVE_USER_MOVIE, SET_LIGHT_MODE } from "../redux/constants";
import appReducer from "../redux/reducers/appReducer";
import {describe, it, expect} from "@jest/globals";


describe('test reducer', () => {

    const initialState = {
        userMovies: [],
        userConnected: false,
        user: {
            _id : "",
        },
        lightMode: false,
        language: "EN",
    }

    it('should return initial state', () => {
        expect(appReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle FETCH_USER_MOVIES", () => {
        expect(
            appReducer(initialState, {
                type: "FETCH_USER_MOVIES",
                payload: [
                    {
                        _id: "1",
                        title: "test",
                        poster_path: "test",
                        overview: "test",
                        
                    },
                    {
                        "_id": "2",
                        "title": "test2",
                        "poster_path": "test2",
                        "overview": "test2",
                    }
                ]
            })
        ).toEqual({
            ...initialState,
            userMovies: [
                {
                    _id: "1",
                    title: "test",
                    poster_path: "test",
                    overview: "test",
                },
                {
                    "_id": "2",
                    "title": "test2",
                    "poster_path": "test2",
                    "overview": "test2",
                }
            ]
        })
    });

    it("should handle REMOVE_USER_MOVIE", ()=> {
        expect(
            appReducer(initialState,{
                type: REMOVE_USER_MOVIE,
                payload: "1"
            })
        ).toEqual({
            ...initialState,
            userMovies: []
        })
    })

    it("should handle ADD_USER_MOVIE", ()=> {

        

        expect(
            appReducer(initialState,{
                type: "ADD_USER_MOVIE",
                payload: {
                    _id: "1",
                    title: "test",
                    poster_path: "test",
                    overview: "test",
                }
            })
        ).toEqual({
            ...initialState,
            userMovies: [
                {
                    _id: "1",
                    title: "test",
                    poster_path: "test",
                    overview: "test",
                }
            ]
        })
    })

    it("should handle SET_USER_CONNECTED", ()=> {
        expect(
            appReducer(initialState,{
                type: "SET_USER_CONNECTED",
                payload: true
            })
        ).toEqual({
            ...initialState,
            userConnected: true
        })
    })

    it("should handle SET_USER", ()=> {
        expect(
            appReducer(initialState,{
                type: "SET_USER",
                payload: {
                    _id: "1",
                    username: "test",
                    email: "test",
                    password: "test",
                }
            })
        ).toEqual({
            ...initialState,
            user: {
                _id: "1",
                username: "test",
                email: "test",
                password: "test",
            }
        })

    })


    it('should handle SET_LIGHT_MODE', () => {
        expect(
            appReducer(initialState, {
                type: SET_LIGHT_MODE,
                payload: true
            })
        ).toEqual({
            ...initialState,
            lightMode: true
        })
    });

    it('should handle SET_LANGUAGE', () => {
        expect(
            appReducer(initialState, {
                type: "SET_LANGUAGE",
                payload: "FR"
            })
        ).toEqual({
            ...initialState,
            language: "FR"
        })
    });
    

});