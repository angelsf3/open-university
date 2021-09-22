import React, {useState} from "react";
import Country from "../country/Country";

function Countries({ countries, filter }) {
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
                <Country key={results[0].name} country={results[0]} show={true}></Country>
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
                    .map(country => <p key={country.name}>{country.name} <button onClick={handleShowButton(country)}>show</button></p>)
                }
                <Country country={country} show={show}/>
            </div>
        )
    }
}

export default Countries
