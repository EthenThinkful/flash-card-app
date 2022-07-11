import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import {readDeck,createCard} from "../utils/api"
import Form from "./Form";
const AddCard =() =>{
    const{deckId} = useParams();
    const [currentDeck,setcurrentDeck] = useState([]);
    const[formData, setFormData] = useState({front:"",
    back:"",})
    const newForm ={
    front:"",
    back:""
    };

        
    
    useEffect(() => {
        async function loadDeck() {
          const response = readDeck(deckId);
          const DeckFomApi = await response;
          setcurrentDeck(DeckFomApi);
        }
        loadDeck();
      }, [deckId]);


    
    

    const handleChange =(event) =>{
        const {target} = event;
        const value = target.value;
        setFormData({...formData, [target.name]: value});

    }
    const handleSubmit =(event) =>{
        event.preventDefault();
        createCard(currentDeck.id,formData);
        console.log(formData);
        setFormData(newForm);

        


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
          <li className="breadcrumb-item active">{"Add Card"}</li>
        </ol>
      </nav>
            <h2>{currentDeck.name}: Add Card</h2>
            <Form handleChange= {handleChange} handleSubmit={handleSubmit} formData={formData}
             deckId={currentDeck.id} />
        
        </div>
    );

}

export default AddCard;