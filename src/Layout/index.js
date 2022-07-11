import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Display from "./Display";
import MakeDeck from "./CreateDeck";
import Study from "./Study";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

import {
  Switch,
  Route,
} from "react-router-dom";




function Layout() {

  //   useEffect(
  //     () => {
  //   async function fetchDecks() {
  //     const decks = await listDecks();
  //   }
  //   fetchDecks();
  //   },
  //   []
  // )
  return (
    
    <>
      <Header />
      <div className="container">
        <Switch>
          {/* TODO: Implement the screen starting here */}
          <Route exact path="/">
            <Display />
          </Route>
          {/* useParams makes ":deckId" possible */}
          <Route exact path="/decks/:deckId/study"> 
            <Study />
          </Route>
          <Route exact path="/decks/new">
            <MakeDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route >
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
    
  );
}

export default Layout;
