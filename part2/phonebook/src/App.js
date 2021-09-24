import './App.css';
import React, {useEffect, useState} from "react";
import Person from "./person/Person";
import Filter from "./filter/Filter";
import PersonForm from "./person-form/PersonForm";
import personService from "./service/Service"

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newTelephone, setNewTelephone] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newTelephone
        }

        if (!persons.find(p => p.name === person.name)) {
            personService.create(person).then(personCreated =>
                setPersons(persons.concat(personCreated)))
        }
        else
            alert(`${person.name} is already added to phonebook`)
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleTelephoneChange = (event) => setNewTelephone(event.target.value)
    const handlePredicateChange = (event) => setFilter(event.target.value)

    const handleDeleteButton = (person) => {
        const confirmDelete = window.confirm(`Delete ${person.name}?`)
        if (confirmDelete) {
            personService.deleteObject(person.id).then(() => {
                alert(`${person.name} deleted successfully`)
                setPersons(persons.filter(p=> p.id !== person.id))
            })
        }
    }

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
                    .map(person => <Person key={person.id} person={person} handleDelete={() => handleDeleteButton(person)}/> )}
            </ul>
        </div>
    )
}

export default App;
