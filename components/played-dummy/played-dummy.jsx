import Image from 'next/image'
import arrow from '../../public/assets/img/_arrow-left.png';
import logosuit from '../../public/assets/img/logo-suit.png';
import rock from '../../public/assets/img/batu.png';
import paper from '../../public/assets/img/kertas.png';
import scissors from '../../public/assets/img/gunting.png';
import refresh from '../../public/assets/img/refresh.png';
import { useState,useEffect } from 'react';
import {auth,db} from "../../services/firebase"
import { ref, onValue, get, child, set } from 'firebase/database';
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import Header from '../headerLogin'

export default function GamePRSPage() {

  const [playerHand, setPlayerHand] = useState("")
  const [showCompHand, setShowCompHand] = useState("")
  const [userData, setUserData] = useState({})
  const [gameData, setGameData] = useState({})
  const [playCount, setPlayCount] = useState(0)
  const [score, setScore] = useState(0)
  const [scoreComp, setScoreComp] = useState(0)
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const gameDb = '21c39cc6-289b-47c4-879d-d52e47f8d7b8'
  function fetchUserData() {
    // const dbRef = ref(getDatabase());
    get(child(ref(db), `users/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val(), '==> snapshot');
          setUserData(snapshot.val());
          console.log(userData, '==> set userdata');
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchGameData() {
    get(child(ref(db), `games/${gameDb}`))
      .then((response) => {
        if (response) {
        setGameData(response.val())
        console.log(gameData, '==> Ini game Data');
      }
    })
  }

  function writeUserData() {
    set(ref(db, 'users/' + user.uid), {
      ...userData, total_score: + score,
      play_count: + playCount
      
    });

  }

  // function writeGameData() {
  //   set(ref(db, `games/` + gameDb), {...gameData,
  //   play_count: + 
  //   })
  // }

  useEffect(() => {
    let token = sessionStorage.getItem('token')
    if (!token) {
      alert('You must be Signed in to access this page')
      router.push('/')
      return
    }
    if (loading) return;
    fetchUserData();
    fetchGameData()

  }, []);

  function handlePlayerHand (e){
    // console.log(e.target);
    const pHand = e.target.alt
    console.log(pHand, '==> phand');
    setPlayerHand(pHand)
    const comHand = PilihanComputer();
    console.log(comHand, '===> ini pilihan komputer');
    setShowCompHand(comHand)
    writeUserData()
    console.log(score, '==> ini score');
    Result(comHand, pHand);
    setPlayCount(playCount + 1)
  }

  function PilihanComputer(){
    let comp = Math.random();

    if( comp < 0.34 ) return 'rock';
    if( comp >= 0.34 && comp < 0.67 ) return 'paper';
      return 'scissors';
    
  }

  function Result(comp, player) {
    if (player == comp) {
      setScoreComp(scoreComp + 1);
      return setScore(score + 1);
    }
    if (player == 'rock' && comp == 'scissors') {
      setScoreComp(scoreComp - 1)
      return setScore(score + 3)
    }
    if (player == 'rock' && comp == 'paper') {
      setScoreComp(scoreComp + 3)
      return setScore(score - 1)
    }
    if (player == 'paper' && comp == 'scissors') {
      setScoreComp(scoreComp + 3)
      return setScore(score - 1)
    }
    if (player == 'paper' && comp == 'rock') {
      setScoreComp(scoreComp - 1)
      return setScore(score + 3)
    }
    if (player == 'scissors' && comp == 'rock') {
      setScoreComp(scoreComp + 3)
      return setScore(score - 1)
    }
    if (player == 'scissors' && comp == 'paper') {
      setScoreComp(scoreComp - 1)
      return setScore(score + 3)
    }
  }

  function resetScore() {
    setScore(score)
    setScoreComp(scoreComp)
    writeUserData()
    alert('Score Has Been Reset')
  }

  return(
    <>
      <Header title='Rock Paper Scissors Game'/>
      <main>
        <div className='container-top'>
            <div className='row text-center'>
            <div className='col-lg-5 player'>
              <h1>Score Player</h1>
              <h1>{score}</h1>
              <h2>PLAYER 1</h2>      
                <div id="playerOption" className='choices'>
                <button>
                  <Image
                  onClick={handlePlayerHand}
                  height={100}
                  width={100}
                  src={rock} 
                  id="playerRock"
                  alt="rock" />
                </button>
                <button>
                  <Image onClick={handlePlayerHand}
                  height={100}
                  width={100}
                  src={paper}
                  id="playerPaper"
                  alt="paper" />
                </button>
                <button>
                  <Image onClick={handlePlayerHand}
                  height={100}
                  width={100}
                  src={scissors}
                  id="playerScissors" alt="scissors" />
                </button>
                <div>
                      <h6>Player Pick</h6>
                      {playerHand.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className='col-lg-2 versus'>
                    <div id="versusBox">
                        <h2 id="displayResult">VS</h2>
                    </div>
                </div>
                <div className='col-lg-5 com'>
                    <h1>Score Computer</h1>
                    <h1>{scoreComp}</h1>
                    <h2>COM</h2>  
                    <div id="comOption" className='choices'>
                      <button>
                  <Image
                      height={100}
                      width={100}
                      className="choiceImg" 
                      src={rock}
                      id="comRock"
                      alt="rock" />
                      </button>
                      <button>
                        <Image 
                      height={100} width={100} className="choiceImg" src={paper} id="comPaper"
                      alt="paper" />
                      </button>
                      <button>
                        <Image 
                      height={100} 
                      width={100} 
                      className="choiceImg" 
                      src={scissors} 
                      id="comScissors"
                      alt="scissors" />
                      </button>
                      <div>
                      <h6>Computer Pick</h6>
                       {showCompHand.toUpperCase()}
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className='container'>
                <div className='row text-center'>
                    <div className='col-lg refresh-area'>
                            <Image 
                            onClick={resetScore}
                            style={{ cursor: 'pointer' }}
                            height={100} 
                            width={100} 
                            className="choiceImg" src={refresh} 
                            id="refresh"
                            alt="" />
                    </div>
                </div>
            </div>
    </main>

    </>
  )
}