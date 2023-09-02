import { URL_BACKEND } from "../../constants/constants";
import { getValueFor } from "../../utils/secureStore";
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
            const url = URL_BACKEND + `/users/${_id}/movies`;
            const moviesPromise = await fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + getValueFor("token"),
                },
              });

            const movies = await moviesPromise.json();
            console.log(movies.length)
            dispatch(setUserMovies(movies));
        }catch(err) {
            console.log(err);
        }
    }
}

export const addUserMovie = (_id:string, title:string, poster:string, id_tmdb:string):any => {
    
  
    return async (dispatch:any) => {
        try {
            const url = URL_BACKEND + `/users/${_id}/movies`
            console.log(url);
            fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + getValueFor("token"),
                },
                body: JSON.stringify({name: title, poster: poster, id_tmdb:id_tmdb})
              })
              .then(data => {
                    dispatch(fetchUserMovies(_id));
                
              })
              .catch((error) => {
                console.error("Error:", error);
              });
        }catch(err) {
            console.log(err);
        }

    }
}




export const removeUserMovie = (_id:string, movie:any):any => {
    
    return async (dispatch:any) => {
        try {
            const url = URL_BACKEND + `/users/${_id}/movies`
            fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + getValueFor("token"),
                },
                 body: JSON.stringify({id_tmdb: movie.id_tmdb, name: movie.title, poster: movie.poster_path})
              })
                .then((data) => {
                    dispatch(fetchUserMovies(_id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }catch(err) {
            console.log(err);
        }
    }
}





