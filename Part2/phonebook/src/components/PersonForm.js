import React, { useState } from 'react'
import personsService from '../services/Backend'
import '../index.css'

const Notification = ({message}) => {
    if (message !== null){
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    else{
        return null
    } 
}

const PersonForm = ({persons, newPerson, newNumber, setNewPerson, setNewNumber, setPersons}) => {
    const [message, setMessage] = useState(null)

    // const checkPersonInArray = (person) => {
    //     return person.name === newPerson
    // }

    const addPerson = (event) => {
        event.preventDefault()

        
            const personObject = {
                name: newPerson,
                number: newNumber
            }
            personsService.postPersons(personObject)
            setPersons(persons.concat(personObject))
            setNewPerson("")
            setNewNumber("")
            setMessage(newPerson + ' has been added to the phonebook')
        
    }

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return(
        <>
        <Notification message={message} />
        <form onSubmit={addPerson}>
        <div>
            name: <input value={newPerson} onChange={handlePersonChange}/><br/><br />
            number: <input value={newNumber} onChange={handleNumberChange}/><br/><br />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
        </>
    )
}

export default PersonForm