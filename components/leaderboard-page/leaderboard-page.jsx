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
                // console.log(childData.game_id, "===> ini child data game");
                getData.push({
                    username : childData.username,
                    game : childData.game_id,
                    key : childKey
                })
                setNumpangData(getData)
            })
        })
    }
           
            console.log(Object.entries(numpangData), "===> ini numpang data");
            let dataGame = []
            numpangData.forEach((user)=>{
                // console.log((user.game), "===> dari forEach");
                if(user.game && user.username) {
                    // console.log(user, "===> ini dari dalam IF");
                    dataGame.push(user)

                }})

                // console.log(userName, "====> ini dari userName");
                console.log(dataGame, "====> ini dari dataGame");
                // if(game.game_id){
                //     console.log(game.game_id, "===> game");
                // }

                // if (game.username) {
                //     userName.push(game.username) 
                //     return
                
        



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
                    <Table className='text-center'>
                    <thead>
                    <tr>
                        <th>USER</th>
                        <th>Play Count</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>
            {  
                    dataGame.map(el => {

                        return(
                            <>
                            {el.username}<br/>
                            </>
                            
                        )
                    })
            }
            
                    </th>
                        <th>
                    {
                    dataGame.map(el => {


                        return(
                            <>
                         {el.game.play_count}<br/>   
                            </>

                        )
                    })
            }
                        </th>
                        <th>
                    {
                    dataGame.map(el => {
                        return(
                            <>
                              {el.game.score}<br/>
                            </>

                        )
                    })
            }
                        </th>
            
                    </tr>
                    </tbody>
                    </Table>
                    </Col>
                </Row>
            </Container>
            </section>
            </>
        )
    
}