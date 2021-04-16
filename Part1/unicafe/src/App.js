import React, {useState} from 'react';

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = total / 3
    const positive = (good / total) * 100
    return (
        <>
        <h2>Statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {isNaN(positive)? 0: positive + " %"}</p>
        </>
    ) 
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return(
        <div>
            <h1>Give Feedback</h1>
            <button onClick={() => setGood(good + 1)}>
                good
            </button>
            <button onClick={() => setNeutral(neutral + 1)}>
                neutral
            </button> 
            <button onClick={() => setBad(bad + 1)}>
                bad
            </button>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;