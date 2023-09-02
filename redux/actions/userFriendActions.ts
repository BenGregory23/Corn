import {URL_BACKEND} from "../../constants/constants";
import {getValueFor} from "../../utils/secureStore";
import {FETCH_USER_FRIENDS, ADD_USER_FRIEND, REMOVE_USER_FRIEND} from "../constants";

export const setUserFriends = (userFriends:any) => {
    return {
        type: FETCH_USER_FRIENDS,
        payload: userFriends
    }
}

export const fetchUserFriends = (_id:string):any => {
    
    return async (dispatch:any) => {
        try{
            const url = URL_BACKEND + `/users/${_id}/friends`;
            fetch(url, {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getValueFor('token')
                },
            }).then(res => res.json())
            .then(data => {
              
                dispatch(setUserFriends(data));
            })
            .catch(err => console.log(err));
          
        }catch(err){
            console.log(err);
        }

    }
}


