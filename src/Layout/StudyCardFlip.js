import React, { useEffect, useState } from "react";

const viewNext = { front: "back", back: "front"};
function StudyCardFlip({ card = {}, title,  littleChild, nextHandler }) {
    const [view, setView] = useState('front');
    const [flipped, setFlipped] = useState(false);

    function flipHandler() {
        setView((prevState) => viewNext[prevState]);
        setFlipped(true);
    }
    useEffect(() => {
        setView('front');
        setFlipped(false);
    }, [card])
    return (
        <div className={`card ${view} study-card`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{card[view]}</p>
                <button type="button" onClick={flipHandler} className="btn btn-secondary mr-2">Flip</button>
                {flipped
                    ?   <button
                            type="button"
                            onClick={nextHandler}
                            className="btn btn-primary"
                        >
                            Next
                        </button>
                    :   null
                }
            </div>
        </div>
    )
}
export default StudyCardFlip;