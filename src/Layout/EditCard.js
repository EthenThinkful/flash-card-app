import { useParams, useHistory, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck, updateCard, readCard } from "../utils/api";
import Form from "./Form";
const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [currentDeck, setCurrentDeck] = useState(null);
  const [currentCard, setcurrentCard] = useState({ front: "", back: "" });
  const history = useHistory();
  useEffect(() => {
    async function loadDecksWithCards() {
      const response = readDeck(deckId);
      const DeckFomApi = await response;
      const responseCards = readCard(cardId);
      const CardFromApi = await responseCards;

      setCurrentDeck(DeckFomApi);

      setcurrentCard(CardFromApi);
    }
    loadDecksWithCards();
  }, [deckId, cardId]);
  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setcurrentCard({ ...currentCard, [target.name]: value });
  };
  // const { front, back } = currentCard;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(currentCard);
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
            <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active">{`edit card ${currentCard.id}`}</li>
        </ol>
      </nav>
        <h2>Edit Card</h2>
        <Form handleSubmit= {handleSubmit} handleChange={handleChange} formData= {currentCard} deckId={currentDeck.id}/>
    
    </div>
  );
};
export default EditCard;