import React from 'react';
import { auth, db } from '../../services/firebase'
import { ref, get, child } from "firebase/database";


export function setToken(uid) {
    try {
        console.log(uid, '==> uid dari set token');
        return (dispatch, state = null) => {
            get(child(ref(db), `users/${uid}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("masuk siniii");
                    const getUser = snapshot.val()
                    console.log(getUser, '=====> dari actions redux ');
                    console.log(getUser.username, "===> ini dari redux game name");
                dispatch({
                    type: 'SET_USERNAME',
                    payload: getUser.username
                })
                dispatch({
                    type: 'SET_SCORE',
                    payload: getUser.game_id.total_score
                })
                dispatch({
                    type: 'SET_GAME_NAME',
                    payload: getUser.game_id.game_name
                })
                dispatch({
                    type: 'USER_LOGOUT',
                    payload: state
                })
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
                    // router.push('/home-page')              
        }
    }         
    catch (err) {
        console.log(err);
        alert(err.message)
    }
}
