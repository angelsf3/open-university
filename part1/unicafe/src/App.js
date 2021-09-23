import './App.css';
import React, {useState} from "react";
import Button from "./button/Button";
import Statistics from "./statistics/Statistics";

function App() {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const data = { good, neutral, bad }

    const handleGood = () => {
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text="good" value={good}/>
            <Button handleClick={handleNeutral} text="neutral" value={neutral}/>
            <Button handleClick={handleBad} text="bad" value={bad}/>
            <Statistics data={data}/>
        </div>
    )
}

export default App;
