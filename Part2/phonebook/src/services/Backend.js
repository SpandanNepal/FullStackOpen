import axios from 'axios'

const url =  'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const postPersons = (personObject) => {
    const request = axios.post(url, personObject)
    return request.then(response => response.data)
}

const PersonMethods = {
    getPersons,
    postPersons
}
export default PersonMethods;