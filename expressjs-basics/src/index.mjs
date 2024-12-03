import express from 'express';
import routes from "./routes/index.mjs"
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);


const PORT = process.env.PORT || 3000;

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next()
}

app.get('/', loggingMiddleware, (req, res) => {
    res.cookie('hello', 'world', {maxAge: 10000})
    res.status(201).send( {msg: "Hello World"});
});



app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
