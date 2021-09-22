import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Countries from "./countries/Countries";

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const handleFilterChanges = (event) => setFilter(event.target.value)

    useEffect(() => {
        axios
            .get('http://localhost:3001/countries')
            .then(response => setCountries(response.data))
    }, [])

    return(
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilterChanges}/>
            </div>
            <Countries countries={countries} filter={filter}/>
        </div>
    )
}

export default App;
