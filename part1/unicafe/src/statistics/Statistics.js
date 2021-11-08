import React from "react";
import StatisticLine from "../statistic-line/StatisticLine";

function Statistics({ data }) {
    const { good, neutral, bad } = data
    const all = good + neutral + bad
    const average = (all > 0) ? (good / all) - (bad / all) : 0
    const positive = (all > 0) ? (good / all) * 100 : 0

    if (all <= 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return(
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good}/>
                    <StatisticLine text="neutral" value={neutral}></StatisticLine>
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="all" value={all}/>
                    <StatisticLine text="average" value={average}/>
                    <StatisticLine text="positive" value={`${positive} %`}/>
                </tbody>
            </table>
        </div>
    )
}

export default Statistics
