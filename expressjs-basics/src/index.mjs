import express from 'express';

const app = express();

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



app.get('/', (req, res) => {
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
    console.log(req.body)
    return reponse.send(200)
})

app.get('/api/users/:id', (req, res) => {
    console.log(req.params);
    const parsedId = parseInt(req.params.id )
    if (isNaN(parsedId)){
        return response.status(400).send({msg: "Bad Request. Invalid ID."})
    }
    const findUser = mockUsers.find(user => user.id === parsedId)
    if(!findUser){return res.sendStatus(404)}
        
    return res.send(findUser)
})

app.get('/api/products', (req, res) => {
    res.send({id: 123, username: 'chicken breast', price: 12.99})
})


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
