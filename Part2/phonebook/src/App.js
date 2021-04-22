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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newPerson, setNewPerson ] = useState('a new person !!!')
  const [newNumber, setNewNumber] = useState('phone-number')
  const [filterPerson, setFilterPerson] = useState('');

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

  const filterPersonList = () => {
    return persons.filter(person => 
      person.name.slice(0, filterPerson.length).toLowerCase() === filterPerson.toLowerCase())
  }
 
  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilter = (event) => {
    setFilterPerson(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      
      <div>
        filter shown with <input valute={filterPerson} onChange={handlePersonFilter}/>
      </div>
      <h2>add a new</h2>
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
        {/* {persons.map(person => 
          <Person key={person.name} person={person.name} number={person.number}/>
        )} */}
        {
          filterPersonList().map(person =>
            <Person key={person.name} person={person.name} number={person.number}/>
            )
        }
      </div>
    </div>
  )
}

export default App;