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
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{positive} %</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Statistics
