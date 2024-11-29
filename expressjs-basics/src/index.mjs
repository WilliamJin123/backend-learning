import express from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers= [
    { id: 1, username: 'michael', displayName: 'Michael' },
    { id: 2, username: 'emma', displayName: 'Emma' },
    { id: 3, username: 'oliver', displayName: 'Oliver' },
    { id: 4, username: 'sophia', displayName: 'Sophia' },
    { id: 5, username: 'liam', displayName: 'Liam' },
    { id: 6, username: 'ava', displayName: 'Ava' },
    { id: 7, username: 'james', displayName: 'James' }
];


const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
}
const resolveIndexByUserId = (req, res, next) => {
    const { 
        params: {id}
    } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) {
        return res.sendStatus(400)
    }
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
    if (findUserIndex === -1) {
        return res.sendStatus(404)
    }
    req.findUserIndex = findUserIndex
    next()
}
// app.use(loggingMiddleware)





app.get('/', loggingMiddleware, (req, res) => {
    res.status(201).send( {msg: "Hello World"});
});

app.get('/api/users', (req, res) => {
    console.log(req.query)
    const {query: {filter, value}} = req;
    if (!filter && !value){
        return res.send(mockUsers)
    }
    else if (filter && value){
        return res.send(mockUsers.filter(user => user[filter].includes(value)))
    }
    return res.send(mockUsers)
})



app.post('/api/users', (req, res) => {
    
    const {body} = req
    console.log(body)
    const newUser = {id: mockUsers[mockUsers.length-1].id + 1,
        ...body
    }
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {findUserIndex} = req
    return res.send(mockUsers[findUserIndex])
})

app.get('/api/products', (req, res) => {
    res.send({id: 123, username: 'chicken breast', price: 12.99})
})


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req
    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body}
    return res.sendStatus(204)
})

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body}
    return res.sendStatus(204)
})

app.patch('/api/users/:id', (req, res) => {
    const {body, 
        params: {id}
    } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) {
        return response.sendStatus(400)
    }
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId)
    if (findUserIndex === -1) {
        return response.sendStatus(404)
    }
    mockUsers.splice(findUserIndex, 1)
    return response.sendStatus(200)
})