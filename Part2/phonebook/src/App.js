import React, {useState} from 'react';

const Person = ({person, number}) => {
  return(
    <p>
      {person} {number}
    </p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: "Arto Hellas", number: "9998887777"}
  ])
  const [ newPerson, setNewPerson ] = useState('a new person !!!')
  const [newNumber, setNewNumber] = useState('phone-number')

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

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange}/><br/><br />
          number: <input value={newNumber} onChange={handleNumberChange}/><br/><br />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>

      <div>
        {persons.map(person => 
          <Person key={person.name} person={person.name} number={person.number}/>
        )}
      </div>
    </div>
  )
}

export default App;