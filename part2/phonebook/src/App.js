import './App.css';
import React, {useEffect, useState} from "react";
import Person from "./person/Person";
import Filter from "./filter/Filter";
import PersonForm from "./person-form/PersonForm";
import axios from "axios";

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newTelephone, setNewTelephone] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            id: persons.length + 1,
            name: newName,
            telephone: newTelephone
        }

        if (!persons.find(p => p.name === person.name))
            setPersons(persons.concat(person))
        else
            alert(`${person.name} is already added to phonebook`)
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleTelephoneChange = (event) => setNewTelephone(event.target.value)
    const handlePredicateChange = (event) => setFilter(event.target.value)

    const formProps = {
        addPerson: addPerson,
        newName: newName,
        handleNameChange: handleNameChange,
        handleTelephoneChange: handleTelephoneChange
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handlePredicateChange}/>

            <h2>add a new</h2>
            <PersonForm props={formProps}/>

            <h2>Numbers</h2>
            <ul>
                {persons
                    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(person => <Person key={person.id} person={person}/> )}
            </ul>
        </div>
    )
}

export default App;
