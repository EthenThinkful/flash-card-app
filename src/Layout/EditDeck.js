import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

const EditDeck = () => {
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState(null);
    const history = useHistory();
    const [deckToedit, setDeckToEdit] = useState({ name: "", description: "" });
  
    useEffect(() => {
      async function loadDeck() {
        const response = readDeck(deckId);
        const DeckFomApi = await response;
        setCurrentDeck(DeckFomApi);
        setDeckToEdit(DeckFomApi);
      }
      loadDeck();
    }, [deckId]);
  
    //   const formData = {
    //     name: currentDeck.name ,
    //     description: currentDeck.description,
    //   };
  
    const { name, description } = deckToedit;
    //   console.log(formData);
  
    const handleChange = (event) => {
      const { target } = event;
      const value = target.value;
      setDeckToEdit({ ...deckToedit, [target.name]: value });
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      await updateDeck(deckToedit);
      history.push(`/decks/${deckId}`);
    };
  
    if (!currentDeck) {
      return <h2>loading...</h2>;
    }
  
    return (
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckToedit.id}`}>{deckToedit.name}</Link>
            </li>
            <li className="breadcrumb-item active">{"edit"}</li>
          </ol>
        </nav>
        <h2>Edit Deck</h2>
        <form onSubmit={handleSubmit}>
          <label><b>Name:</b></label>
          <div className="mb-2">
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
  
          <label><b>Description:</b></label>
          <div>
            <textarea
              name="description"
              type="textarea"
              id="description"
              rows="5"
              value={description}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-secondary mr-1" onClick={() => history.push("/")} type="button">
            cancel
          </button>
          <button className="btn btn-info mr-1" type="submit">submit</button>
        </form>
      </div>
    );
  };
  export default EditDeck;