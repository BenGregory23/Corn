import {describe, expect, it} from "@jest/globals";
import {ADD_USER_MOVIE, FETCH_USER_MOVIES} from "../redux/constants";
import {setUserMovies, fetchUserMovies, addUserMovie} from "../redux/actions/userMoviesAction";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('test user actions', () => {

    it('should create an action to fetch and set user movies', () => {
        const payload = [];
        const expectedAction = {
            type: FETCH_USER_MOVIES,
            payload: payload
        }
        expect(setUserMovies(payload)).toEqual(expectedAction);
    });

    it('should create an action to add a movie', () => {
        const _id = 'user_id';
        const title = 'test';
        const poster = 'test';
        const id_tmdb = '123';
    
        const expectedActions = [
          { type: 'FETCH_USER_MOVIES', payload: [] },
        ];
    
        const store = mockStore({});
    
        return store.dispatch(addUserMovie(_id, title, poster, id_tmdb))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });


});