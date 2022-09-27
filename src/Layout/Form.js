import { useHistory } from "react-router-dom";
const Form = ({handleChange,handleSubmit,formData, deckId}) =>{
    const history = useHistory();
    return(
    <form onSubmit={handleSubmit} >
            <label>Front:</label>
            <div>
            <textarea 
            name= "front"
            placeholder="front side of the card"
            type= "textarea"
            id ="front"
            rows="5"
            value={formData.front}
            onChange= {handleChange}
            required
            
            />
            </div>
            
            <label>Back:</label>
            <div>
            <textarea
            name="back"
            placeholder="front side of the card"
            type="textarea"
            id="back"
            rows="5"
            value={formData.back}
            onChange={handleChange}
            required
            />
            </div>
            <button className="btn btn-secondary mr-1" onClick={() => history.push(`/decks/${deckId}`) } type = "button">Done</button>
            <button className="btn btn-info mr-1"  type="submit">save</button>

        </form>
    )

}

export default Form;