import { FETCH_USER_MOVIES } from "../constants";

export const setUserMovies = (userMovies:any) => {
    return {
        type: FETCH_USER_MOVIES,
        payload: userMovies
    }
}


export const fetchUserMovies = (_id:string):any => {
    return async (dispatch:any) => {
        try {
            const moviesPromise = await fetch(`https://evening-shore-83627.herokuapp.com/users/${_id}/movies`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });

            const movies = await moviesPromise.json();
            dispatch(setUserMovies(movies));
        }catch(err) {
            console.log(err);
        }
    }
}



