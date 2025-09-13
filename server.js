import 'dotenv/config';
import express from 'express';


const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res)=> {
    res.send('<h1>Hello World</h1>');
    //res.send({ message: 'Hello World' });
})

app.get('/about', (req, res)=> {
    res.send('<h2>About</h2>')
})

app.listen(PORT, ()=> console.log(`App running on port ${PORT}`))