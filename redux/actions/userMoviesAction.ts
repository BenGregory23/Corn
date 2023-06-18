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

export const addUserMovie = (_id:string, title:string, poster:string, id_tmdb:string):any => {
    
  
    return async (dispatch:any) => {
        try {
            const url = `https://evening-shore-83627.herokuapp.com/users/${_id}/movies`;
            fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
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
            fetch(`https://evening-shore-83627.herokuapp.com/users/${_id}/movies`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
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





