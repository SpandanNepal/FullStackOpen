import React, {useState} from 'react';

const Person = ({person}) => {
  return(
    <p>
      {person}
    </p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPerson, setNewPerson ] = useState('a new person !!!')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      content: newPerson,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
    
    setPersons(persons.concat(personObject))
    setNewPerson("")
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>

      <div>
        {persons.map(person => 
          <Person key={person.id} person={person.content} />
        )}
      </div>
    </div>
  )
}

export default App;
