import React, { useEffect } from 'react';
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


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
                
        
                function exportToPdf() {
                    screenShot()
                }
            
                function screenShot() {
                    const input = document.getElementById('LeaderboardPageComponent')
                    html2canvas(input, {logging:true, letterRendering:1, useCORS:true})
                    .then (canvas => {
                        const imgWidth = 200;
                        const imgHeight =  canvas.height * imgWidth / canvas.width;
                        const imgData = canvas.toDataURL('img/png');
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                        pdf.save('thegames.pdf')
                    })
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
                <h1 className='text-heading text-center'>ROCK PAPER SCISSORS</h1>
                <button onClick={exportToPdf}>Export to PDF</button>

                    <Col>
                    <Table id='LeaderboardPageComponent' className='text-center'>
                    <thead>
                    <tr>
                        <th>USER</th>
                        <th>Play Count</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody className='p-4'>
                    <tr>
                        <th>
            {  
                    dataGame.map(el => {

                        return(
                            <>
                            <span>{el.username.toUpperCase()}</span><br/>
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
                         <span>{el.game.play_count}</span><br/>
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
                              <span >{el.game.score}</span><br/>
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