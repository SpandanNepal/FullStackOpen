import axios from 'axios'

const url = 'api/persons'

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

const update = (id, personObject) => {
    const request = axios.put(url + '/' + id, personObject);
    return request.then((response) => response.data);
}

const PersonMethods = {
    getPersons,
    postPersons,
    remove,
    update
}
export default PersonMethods;