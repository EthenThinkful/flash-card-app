import { readDeck } from "../utils/api/index";
import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import StudyCardFlip from "./StudyCardFlip";
export default function Study() {
  const [deck, setDeck] = useState({ name: "Loading...", cards: []});
  const [currentCard, setCurrentCard] = useState(1);
  const { deckId } = useParams();
  const history = useHistory();
  useEffect(() => {
    readDeck(deckId).then(setDeck)
  }, [deckId]);

  const cardCountNum = deck.cards.length;
  const nextHandler = () => {
    if (currentCard === cardCountNum) {
      const restartToHome = !window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the homepage."
      );
      return restartToHome ? history.push("/") : setCurrentCard(1);
    }
    setCurrentCard((prevState) => Math.min(cardCountNum, prevState + 1));
  };

  const cardTitleText = `Card ${currentCard} of ${cardCountNum}`;
  const card = deck.cards[currentCard - 1];

  if (cardCountNum <= 2) {
    return (
    
    <div>
    <nav aria-label="breadcrumb"> 
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        Study
      </li>
    </ol>
  </nav>
  <p> Not enough cards. </p>
  </div>
    )
  }
  return (
    <div>
      <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      <div key={deck.id} className="card w-50">
        <StudyCardFlip card={card} title={cardTitleText} nextHandler={nextHandler} />
      </div>
    </div>
  );
}