import './App.css';
import React, {useEffect, useState} from "react";
import Person from "./person/Person";
import Filter from "./filter/Filter";
import PersonForm from "./person-form/PersonForm";
import personService from "./service/Service"
import NotificationMessage from "./notification-message/NotificationMessage";

function App() {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newTelephone, setNewTelephone] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

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
            personService
                .create(person)
                .then(personCreated => {
                    successMessage(`Added ${person.name}`)
                    setPersons(persons.concat(personCreated))
                })
                .catch(error => {
                    errorMessage(error.response.data.error)
                })
        }
        else {
            const confirmEdit = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
            const foundPerson = persons.find(p => p.name === person.name)
            const personToEdit = { ...foundPerson, number: person.number }

            if (confirmEdit) {
                personService
                    .update(personToEdit.id, personToEdit)
                    .then(newPerson => {
                        setPersons(persons.map(p => p.id !== foundPerson.id ? p : newPerson))
                        successMessage(`Changed the number phone successfully`)
                    })
                    .catch(error => {
                        errorMessage(error.response.data.error)
                    })
            }
        }
    }

    const successMessage = (message) => {
        createMessage(message, 'success')
    }

    const errorMessage = (message) => {
        createMessage(message, 'error')
    }

    const createMessage = (message, type) => {
        setMessage(message)
        setMessageType(type)
        setTimeout(() => {
            setMessage(null)
        }, 2000)
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleTelephoneChange = (event) => setNewTelephone(event.target.value)
    const handlePredicateChange = (event) => setFilter(event.target.value)

    const handleDeleteButton = (person) => {
        const confirmDelete = window.confirm(`Delete ${person.name}?`)
        if (confirmDelete) {
            personService.deleteObject(person.id)
                .then(() => {
                    alert(`${person.name} deleted successfully`)
                    setPersons(persons.filter(p=> p.id !== person.id))
                })
                .catch((reason) => {
                    errorMessage(`Information of ${person.name} has already been removed from the server`)
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
            <NotificationMessage message={message} type={messageType}></NotificationMessage>
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
