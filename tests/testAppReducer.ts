import appReducer from "../redux/reducers/appReducer";
import {describe, it, expect} from "@jest/globals";
import {FETCH_USER_MOVIES} from "../redux/constants";
import {fetchUserMovies} from "../redux/actions/userMoviesAction";

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

    it('should handle ADD_FAVORITE_NOUNOURS', () => {
        const id = "647e296f8cbef72d0956f0b9";
        expect(
            appReducer(initialState, {
                type: 'FETCH_USER_MOVIES',
                id,
            })
        ).toEqual({
            nounours: [],
            favoriteNounours: [nounours],
        });
    });

});