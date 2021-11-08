import React, {Fragment} from 'react'

function StatisticLine({text, value}) {
    return (
        <Fragment>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </Fragment>
    )
}

export default StatisticLine
