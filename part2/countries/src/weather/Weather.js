import React, {useEffect, useState} from "react";
import axios from "axios";

function Weather({ city }) {
    const REACT_API_KEY = process.env.REACT_APP_API_KEY

    const query = `http://api.weatherstack.com/current?access_key=${REACT_API_KEY}&query=${city}`

    const [current, setCurrent] = useState('')

    useEffect(() => {
        axios
            .get(query)
            .then(response => setCurrent(response.data.current))
    }, [])

    return(
        <div>
            <h2>Weather in {city}</h2>
            <b>temperature:</b> {current.temperature} Celcius
            <div>
                <img src={current.weather_icons}/>
            </div>
            <b>wind:</b> {current.wind_speed} mph direction {current.wind_dir}
        </div>)
}

export default Weather
