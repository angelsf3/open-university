import React, {useState} from "react";
import Weather from "../weather/Weather";

/**
 * Componente auxiliar encargado de generar los datos de un pais usando los datos
 * de una API externa al ejercicio.
 * @param country
 * @param show
 * @return {*}
 * @constructor
 */
function CountryAPI({ country, show }) {
    if (show) {
        return(
            <div>
                <h1>{country.name}</h1>
                <p>{country.capitalCity}</p>

                <Weather city={country.capitalCity}/>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

export default CountryAPI
