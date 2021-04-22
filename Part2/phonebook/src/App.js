import React, {useState} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


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

  return (
    <div>
      <h1>Phonebook</h1>
      
      <Filter 
        filterPerson={filterPerson} 
        setFilterPerson={setFilterPerson}
      />
      
      <h2>add a new</h2>
      
      <PersonForm 
        persons={persons} 
        newPerson={newPerson} 
        newNumber={newNumber}
        setPersons={setPersons} 
        setNewPerson={setNewPerson} 
        setNewNumber={setNewNumber}
      />
      
      <h2>Numbers</h2>

      <Persons 
        persons={persons} 
        filterPerson={filterPerson} 
      />
    </div>
  )
}

export default App;