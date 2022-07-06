import useInput from "../components/useInput";
import { auth, db, storage } from "../services/firebase";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
// import Header from "../components/headerLogin";
// import { useNavigate } from "react-router-dom";ls

const GameForm = () => {
  const name = useInput("");
  const description = useInput("");
  const game_url = useInput("");
//   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name", name.value);
    console.log("description", description.value);
    console.log("game_url", game_url.value);
    try {
      const response = await set(ref(db, `games/${uuidv4()}`), {
        name: name.value,
        description: description.value,
        game_url: game_url.value,
        play_count: 0,
      });
    //   navigate("/games");

      // console.log(response);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section>
      {/* <Header title='Add New Game'/> */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Game name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Game name"
            type="text"
            {...name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Game Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="Game description"
            type="text"
            {...description}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Game URL</Label>
          <Input
            id="game_url"
            name="game_url"
            placeholder="Game URL"
            type="text"
            {...game_url}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Form>
    </section>
  );
};

export default GameForm;