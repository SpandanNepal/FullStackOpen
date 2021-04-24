import React from 'react'
import personsService from '../services/Backend'

const PersonForm = ({persons, newPerson, newNumber, setNewPerson, setNewNumber, setPersons}) => {

    const checkPersonInArray = (person) => {
        return person.name === newPerson
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(checkPersonInArray) !== undefined && persons.find(checkPersonInArray).name === newPerson){
            const id = persons.find(checkPersonInArray).id
            const result = window.confirm(`Are you sure you want to update the number of ${newPerson} as ${newNumber}` )
            if (result) {
                const personObject = {
                    name: newPerson,
                    number: newNumber
                }
                personsService.update(id, personObject)
                personsService.getPersons().then((response) => {
                    setPersons(response)
                })
            }
        }

        else{
            const personObject = {
                name: newPerson,
                number: newNumber
            }
            personsService.postPersons(personObject)
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

  