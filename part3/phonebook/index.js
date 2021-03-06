const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

app.use(morgan((tokens, request, response) => {
    return `${request.method} ${request.url} ${response.statusCode} ${JSON.stringify(request.body)}`
}))

app.use(express.static('build'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateRandom = (min, max) => {
    return Math.random() * (max - min) + min
}

const generateId = () => {
    const maxId = (persons.length > 0)
        ? Math.max(...persons.map(person => person.id))
        : 1

    const randomId = generateRandom(maxId * 100, maxId);
    return Math.floor(randomId);
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const today = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${today}</p>`
    )
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    else if (persons.find(person => person.name.includes(body.name))) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    else {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person)
        response.json(person)
    }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
