import React from 'react'

const Filter = ({filterPerson, setFilterPerson}) => {

    const handlePersonFilter = (event) => {
      setFilterPerson(event.target.value)
    }
  
    return(
      <div>
        filter shown with <input valute={filterPerson} onChange={handlePersonFilter}/>
      </div>
    )
}

export default Filter