import React, {useState} from 'react';
//click display number of characters to side or of the button
//text input and button and counter
//own component
//# of onchanges?

function CounterButton() {
    const [inputAmount, setInputAmount] = useState(0)
    const [increment, setIncrement] = useState(0)

    const handleTextChange = (e) => {
        console.log(e.target.value)
        setInputAmount(e.target.value.length)
    }

    let displayIncrement = () => {
        setIncrement(inputAmount) 
    };

    return (
        <>
            <br/><label>Code Challenge: Character Count</label><br/><br/>
            <input type="text" onChange={handleTextChange}></input>
            <button onClick={displayIncrement}>Click Me!</button>
            <h2>{increment}</h2>
        </>
    )
}

export default CounterButton