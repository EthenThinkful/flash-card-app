import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";
import "./DeckView.css"

const DeckView = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecksWithCards() {
      const response = readDeck(deckId);
      const cardFomApi = await response;
      setDeck(cardFomApi);
      setCards(cardFomApi.cards);
    }
    loadDecksWithCards();
  }, [deckId]);

  const handleCardDelete = (cardId) => {
    if (window.confirm("delete this card? You won't be able to recover it")) {
      deleteCard(cardId);
      history.go(0);
    }
  };

  const handleDelete = (deckId) => {
    if (window.confirm("delete this deck? You won't be able to recover it")) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <div className="mb-4">
        <h2>{deck.name}</h2>
        <div className="row mx-auto">
          <button
            className="btn btn-secondary mr-1"
            onClick={() => history.push(`/decks/${deck.id}/edit`)}
          >
            edit
          </button>
          <button
            className="btn btn-info mr-1"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            study
          </button>
          <button
            className="btn btn-outline-secondary mr-1"
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            add card
          </button>
          <button
            className="btn btn-light ml-auto"
            onClick={() => handleDelete(deck.id)}
          >
            🗑️ this deck
          </button>
        </div>
      </div>
      {cards.map((card, index) => (
        <div key={card.id} className="card px-5 py-3 mb-3">
          <div className="cardTitle">
            Card {index + 1} of {cards.length}
          </div>
          <div className="deck-view-card-info">
            <div className="card-info-front"><b>Front:</b> {card.front} </div>
            <div className="card-info-back"><b>Back:</b> {card.back} </div>
          </div>
          <div className="row ml-auto">
            <button
              className="btn btn-secondary mr-1"
              onClick={() =>
                history.push(`/decks/${deckId}/cards/${card.id}/edit`)
              }
            >
              edit
            </button>
            <button
              className="btn btn-light"
              onClick={() => {
                console.log("This is firing");
                handleCardDelete(card.id);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeckView;
