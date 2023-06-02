import { FETCH_USER_MOVIES } from "../constants";

export const setUserMovies = (userMovies:any) => {
    return {
        type: FETCH_USER_MOVIES,
        payload: userMovies
    }
}




export const fetchUserMovies = ():any => {
    return async (dispatch:any) => {
        try {
            const moviesPromise = await fetch("https://evening-shore-83627.herokuapp.com/users/6464ca0fea2801eac89e4d23/movies", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })

            const movies = await moviesPromise.json();
            dispatch(setUserMovies(movies));
        }catch(err) {
            console.log(err);
        }
    }
}



