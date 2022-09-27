import { readCard, deleteDeck, listDecks } from "../utils/api/index";
import React, { useEffect, useState } from "react";
import {
  Link,
  Switch,
  Route,
  useLocation,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

export default function Display() {

  

  const history = useHistory();

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    listDecks().then((decks) => {
      setDecks(decks);
    });
  }, []);

  // for (let i = 0; i < card.length; i++) {
  //     return card.name;
  // }

  // console.log(card);

  // setCard({...card, listDecks})
  // console.log(card)

  const handleDelete = (deckId) =>{
    if(window.confirm("delete this deck? You won't be able to recover it" )){
        deleteDeck(deckId);
        history.go(0);
    }
  }
  
console.log(decks)

  return (
    <div className="Decks">
      
      <div><button onClick={() => history.push("/decks/new")} className="btn btn-secondary mb-4">+ Create deck</button></div>
      {decks.map((deck) => (
      <div key={deck.id} className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{deck.description}</h6>
          <p className="card-text text-primary">{deck.cards && deck.cards.length} cards</p>
          <button onClick={() => history.push(`/decks/${deck.id}`)} className="card-link btn btn-info">
            View
          </button>
          <button onClick={() => history.push(`/decks/${deck.id}/study`)} className="card-link btn btn-secondary">
            Study
          </button>
          <button onClick={() => handleDelete(deck.id)} className="btn btn-light float-right">
            🗑️
          </button>
        </div>
      </div>
      
      ))
    }
    </div>
  )
}
  
