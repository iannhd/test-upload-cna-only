import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import Link  from "next/link";
import { useRouter } from "next/router";
import Header from "../headerLogin";

const GameList = () => {
  const [gameList, setGameList] = useState([]);
  const [gameUrl, setGameUrl] = useState('')
  const router = useRouter()

  function tambahGame() {
    router.push('/game-form')
  }

  function handleGameUrl() {
    // router.push(`/${gameUrl ? gameUrl : ""}`)
    // console.log(game.game_url, '==> handleGame');
  }

  useEffect(() => {
    onValue(
      ref(db, "games"),
      (snapshot) => {
        const newGames = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
            // console.log(childKey, childData, '==> key & data game-list');
          newGames.push({
            key: childKey,
            name: childData.name,
            game_url: childData.game_url,
            description: childData.description,
            play_count: childData.play_count
          });
        });
        // setGameUrl(game_url)
        setGameList(newGames);
        console.log(gameList, '==> game list')
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  return (
    <> 
      <section className="game-list">
      <Header title='Game List' />
      <Container>
          <Button
            color="warning"
            style={{ marginBottom: '10px' }}
            onClick={tambahGame}>
          Tambah
        </Button>
        <Row>
          {gameList &&
            gameList.map((game) => {
              return (
                <Col key={game.key} sm="6">
                  {/* {console.log(game.game_url, '==> handleGame')} */}
                  <Card body style={{ marginBottom: "5px" }}>
                    <CardTitle tag="h5">Game : {game.name.toUpperCase()}</CardTitle>
                    <CardText>Game Description : {game.description.toUpperCase()}</CardText>

                    <CardText>Play Count : {game.play_count}</CardText>
                    <Button
                        color="primary"
                        onClick={(e) => {
                            e.preventDefault()
                            router.push(`/${game.game_url ? game.game_url : ""}`)}}
                    >
                        Play Game
                    </Button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      </section>
    </>
  );
};

export default GameList;