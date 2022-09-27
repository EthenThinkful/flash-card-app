import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

const MakeDeck = () => {
  const inititalFormState = {
    name: '',
    description: '',
  }

  const history = useHistory();

  const [formData, setFormData] = useState(inititalFormState)
  const {name, description} = formData

  // const handleChange = ({target}) => {

  // setFormData({
  //   ...formData,
  //   [target.name]: target.value
  //   })
  // }
  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData({...inititalFormState});
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Deck</h2>
      <div className="form-group">
        <label htmlFor="deckName">Name</label>
        <input
        name="name" 
        type="text"
        className="form-control"
        id="deckName" 
        onChange={handleChange} 
        value={name} 
        required={true}
        />
        <small id="littleText" className="form-text text-muted">
          Please enter the name of your deck.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
        name="description" 
        className="form-control" 
        rows="5" 
        id="description" 
        onChange={handleChange} 
        value={description} 
        required={true}>
        </textarea>
        <small id="littleText" className="form-text text-muted">
          Please enter a description of your deck.
        </small>
      </div>
      <button type="submit" className="btn btn-info">
        Submit
      </button>
      <button className="btn btn-secondary ml-2" onClick={() => history.push("/")}>cancel</button>
    </form>
  );
};

export default MakeDeck;
