import React, {useState} from "react";
import Weather from "../weather/Weather";

function Country({ country, show }) {
    if (show) {
        return(
            <div>
                <h1>{country.name}</h1>
                <p>{country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <div>
                    <img src={country.image}/>
                </div>

                <Weather city={country.capital}/>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

export default Country
