import { useEffect } from 'react';
import { useState } from "react";
import Header from "../header"
import HeaderLogin from '../headerLogin'
import { auth, db } from "../../services/firebase";
import { ref, set, onValue, get } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth"
import { Container, Row, Col, Table } from 'reactstrap';
import { useRouter } from 'next/router'
import Link from "next/link";
import { list } from 'firebase/storage';
export default function LeaderboardPageComponent(){
    
    const [numpangData, setNumpangData] = useState([])
    const [user, loading] = useAuthState(auth);

    function fetchDataFromDB(){
        console.log("===> masuk sini");
        const dbRef = ref(db, 'users')
        onValue(dbRef, (snapshot) => {
            let getData = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // console.log(childKey, "====> ini ChdildKey");
                // console.log(childData, "====> ini ChildData");
                // console.log(childData.game, "===> ini child data game");
                getData.push({
                    username : childData.username,
                    game : childData.game,
                    key : childKey
                })
            })
            setNumpangData(getData)
            console.log(Object.entries(numpangData), "===> ini numpang data");
            let userName = []
            numpangData.forEach((game)=>{

                if(game.game_id){
                    console.log(game.game_id, "===> game");
                }

                if (game.username) {
                    userName.push(game.username) 
                    return
                }

            })
            console.log(userName, "===> ini username");
        }
        )
    }

    useEffect(()=>{
        fetchDataFromDB()
        if(loading)return;
    },[])
       
        
       
        return(
            <>
            <section className="leaderboard-page">
            {
                user ? <HeaderLogin title = "Leaderboard Page"/> : <Header title ="Leaderboard Page"/>
            }
            <Container>
                <Row>
                <h1>ROCK PAPER SCISSORS</h1>
                    <Col>
                    <Table>
                    <thead>
                    <tr>
                        <th>USER</th>
                        <th>Play Count</th>
                        <th>Score</th>
                    </tr>
                    </thead>
            {
                // numpangData.map(value =>{
                //     console.log(value.username, "===> oi oi");
                //     let userName = value.username
                //     return(

                //         <tbody>
                //         <tr>
                //         <td key={value.username}>
                //             {userName}
                //         </td>
                //         </tr>
                //         </tbody>
                        
                //     )
                // })
            }
                    </Table>
                    </Col>
                </Row>
            </Container>
            </section>
            </>
        )
        
}