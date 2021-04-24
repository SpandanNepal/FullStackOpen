import React from 'react'
import personService from '../services/Backend'

const PersonForm = ({persons, newPerson, newNumber, setNewPerson, setNewNumber, setPersons}) => {

    const checkPersonInArray = (person) => {
        return person.name === newPerson
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(checkPersonInArray) !== undefined && persons.find(checkPersonInArray).name === newPerson){
        alert(newPerson + " is already added to phonebook.");
        }

        else{
        const personObject = {
            name: newPerson,
            number: newNumber
        }
        
        personService.postPersons(personObject)
        // axios.post('http://localhost:3001/persons', personObject)
        // .then(response => {
        //     console.log(response)
        //     setPersons(persons.concat(personObject))
        // })
        setPersons(persons.concat(personObject))
        setNewPerson("")
        setNewNumber("")
        }
    }

    const handlePersonChange = (event) => {
        setNewPerson(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return(
        <form onSubmit={addPerson}>
        <div>
            name: <input value={newPerson} onChange={handlePersonChange}/><br/><br />
            number: <input value={newNumber} onChange={handleNumberChange}/><br/><br />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm

  