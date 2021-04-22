import React from 'react'

const Person = ({person, number}) => {
    return(
      <p>
        {person} {number}
      </p>
    )
}
  
const Persons = ({persons, filterPerson}) => {
    const filterPersonList = () => {
      return persons.filter(person => 
        person.name.slice(0, filterPerson.length).toLowerCase() === filterPerson.toLowerCase())
    }
    return(
      <div>
        {
          filterPersonList().map(person =>
            <Person key={person.name} person={person.name} number={person.number}/>
            )
        }
      </div>
    )
}

export default Persons