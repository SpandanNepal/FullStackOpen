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

const remove = (id) => {
    axios.delete(url + '/' + id)
}

const PersonMethods = {
    getPersons,
    postPersons,
    remove
}
export default PersonMethods;