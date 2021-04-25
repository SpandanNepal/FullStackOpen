import React from 'react'
import personsService from '../services/Backend'

const handleDelete = (id, person, setPersons) => {
  const result = window.confirm( `Are you sure you want to delete ${person} ?` );
  if (result){
    personsService.remove(id)
    personsService.getPersons().then((response) => {
    setPersons(response)
    })
  }
}

const Person = ({person, setPersons, id, number}) => {
    return(
      <p>
        {person} {number}&nbsp;
        <button onClick={() => handleDelete(id, person, setPersons)}>delete</button>
      </p>
    )
}
  
const Persons = ({persons, setPersons, filterPerson}) => {
    const filterPersonList = () => {
      return persons.filter(person => 
        person.name.slice(0, filterPerson.length).toLowerCase() === filterPerson.toLowerCase())
    }
    return(
      <div>
        {
          filterPersonList().map(person =>
            <Person key={person.name} setPersons={setPersons} id={person.id} person={person.name} number={person.number}/>
            )
        }
      </div>
    )
}

export default Persons