import React from "react";

function Country({ country }) {
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
            {country.image}
        </div>
    )
}

export default Country
