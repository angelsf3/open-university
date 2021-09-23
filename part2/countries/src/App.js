import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Countries from "./countries/Countries";
import CountriesAPI from "./countries/CountriesAPI";

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const handleFilterChanges = (event) => setFilter(event.target.value)

    useEffect(() => {
        axios
            .get('https://api.worldbank.org/v2/country/?format=json')
            .then(response => {
                setCountries(response.data[1])
            })
    }, [])

    return(
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilterChanges}/>
            </div>
            <CountriesAPI countries={countries} filter={filter}/>
        </div>
    )
}

export default App;
