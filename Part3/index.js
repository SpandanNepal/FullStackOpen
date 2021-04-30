const express = require("express")
const app = express()

let notes = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/info', (request, response) => {
    const total = notes.length
    const datetime = new Date()
    response.write(`Phonebook has info for ${total} people \n\n`)
    response.write("" + datetime)
    response.end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)