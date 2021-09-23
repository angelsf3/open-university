import {useState} from "react";
import CountryAPI from "../country/CountryAPI";

/**
 * Componente auxiliar encargado de generar los datos de un pais usando los datos
 * de una API externa al ejercicio.
 * @constructor
 */
function CountriesAPI({ countries, filter }) {
    const results = countries
        .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    const [country, setCountry] = useState([])
    const [show, setShow] = useState(false)

    const handleShowButton = (selectedEvent) => {
        return () => {
            setShow(!show)
            setCountry(selectedEvent)
        }
    }

    if (filter.length === 0) {
        return (
            <div></div>
        )
    }
    if (results.length === 1) {
        return (
            <div>
                <CountryAPI key={results[0].name} country={results[0]} show={true}></CountryAPI>
            </div>
        )
    }
    if (results.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else {
        return(
            <div>
                {countries
                    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(country => <p key={country.id}>{country.name} <button onClick={handleShowButton(country)}>show</button></p>)
                }
                <CountryAPI country={country} show={show}/>
            </div>
        )
    }
}

export default CountriesAPI
