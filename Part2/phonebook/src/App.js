import React, {useEffect, useState} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/Backend'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newPerson, setNewPerson ] = useState('a new person !!!')
  const [newNumber, setNewNumber] = useState('phone-number')
  const [filterPerson, setFilterPerson] = useState('');

  useEffect(() => {
    personsService.getPersons().then((response) => {
      setPersons(response)
    })
  }, [])
  
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
        setPersons={setPersons}
        persons={persons} 
        filterPerson={filterPerson} 
      />
    </div>
  )
}

export default App;