import { useState, useEffect } from 'react';
import Header from '../headerLogin'
import {auth,db} from "../../services/firebase"
import { ref, onValue, get, child, set } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from 'reactstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux'
import Image from 'next/image';
// import { useDispatch } from 'react-redux'

// const [userData, setUserData] = useState('')


export default function ProfilePageComponent() {

    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState({})
    const totalScore = useSelector(state => state.total_score)
    const game_name = useSelector(state => state.game_name)
    // const dispatch = useDispatch()


    const fetchUserdata = () => {
        let showData = ''
        // const dbRef = ref(getDatabase());
        // dispatch(setToken(user.uid))
        get(child(ref(db), `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
            //   console.log(snapshot.val(), '==> snapshot');
              setUserData(snapshot.val());
              showData = snapshot.val()
            //   console.log(showData, '==> ini show data');
            //   console.log(setUserData, '==> set userdata');
              console.log(userData, '==> ini userData');
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      useEffect(() => {
        if (loading) return;
        fetchUserdata();
      }, []);
    

    return (
        <>
        <div className="profilePage">
            <Header title='Profile Page'/>
             <div className="wrapper">
                <div className="card">
                    <div className="cardTitle">
                        <div className="profilePicture">
                        <Image  className='rounded-circle' src={user.photoURL} width="150" height="150"></Image>
                        </div>
                       
                    </div>
                    <div className="cardContent">
                        <div className="username">
                             <div><h3>{user.displayName}</h3></div>
                        </div>
                        <div className="email">
                            <h3>Email</h3>
                            <h6>{user.email}</h6>
                        </div>
                        <div className="gamePlayed">
                            <div className="game">
                                <h3>Game Played</h3>
                            </div>
                            <div className="playedGame">
                                <h6>- {game_name} : High Score ({totalScore} pts)</h6>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}